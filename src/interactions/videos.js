export function initializeVideos() {
  const videos = [...document.querySelectorAll(".smart-video")];
  if (!videos.length) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const visibleVideos = new Set();

  const load = (video) => {
    if (!video.dataset.src || video.src) return;
    const saveData = navigator.connection?.saveData;
    if (saveData) return;
    video.src = video.dataset.src;
    video.removeAttribute("data-src");
    video.load();
  };

  const resetSegment = (video) => {
    const start = Number(video.dataset.loopStart || 0);
    const end = Number(video.dataset.loopEnd || 0);
    if (end && video.currentTime >= end) {
      video.currentTime = start;
    }
  };

  const updatePlayback = () => {
    videos.forEach((video) => {
      const canPlay =
        visibleVideos.has(video) &&
        !document.hidden &&
        !reducedMotion.matches &&
        !document.body.classList.contains("menu-open");

      if (canPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;
        if (entry.isIntersecting) load(video);
        if (entry.intersectionRatio >= 0.4) {
          visibleVideos.add(video);
        } else {
          visibleVideos.delete(video);
        }
      });
      updatePlayback();
    },
    { rootMargin: "220px 0px", threshold: [0, 0.4, 0.7] },
  );

  videos.forEach((video) => {
    video.addEventListener("timeupdate", () => resetSegment(video));
    video.addEventListener("ended", () => {
      video.currentTime = Number(video.dataset.loopStart || 0);
      updatePlayback();
    });
    observer.observe(video);
  });

  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", updatePlayback);
}
