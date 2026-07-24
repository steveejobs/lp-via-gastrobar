export function initializeVideos() {
  const videos = [...document.querySelectorAll(".smart-video")];
  if (!videos.length) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const visibleVideos = new Set();
  const playlists = new WeakMap();
  const playlistPreloads = new WeakMap();

  const getPlaylist = (video) => {
    if (!playlists.has(video)) {
      const sources = (video.dataset.videoPlaylist || "")
        .split("|")
        .filter(Boolean);
      playlists.set(video, sources);
    }
    return playlists.get(video);
  };

  const preloadNext = (video) => {
    const playlist = getPlaylist(video);
    if (playlist.length < 2 || navigator.connection?.saveData) return;

    const currentIndex = Number(video.dataset.playlistIndex || 0);
    const nextSrc = playlist[(currentIndex + 1) % playlist.length];
    const previousPreload = playlistPreloads.get(video);

    if (previousPreload?.src.endsWith(nextSrc)) return;

    const preload = document.createElement("video");
    preload.muted = true;
    preload.playsInline = true;
    preload.preload = "auto";
    preload.src = nextSrc;
    preload.load();
    playlistPreloads.set(video, preload);
  };

  const load = (video) => {
    if (!video.dataset.src || video.src) return;
    const saveData = navigator.connection?.saveData;
    const mobileHomeHero =
      video.classList.contains("hero-video") &&
      matchMedia("(max-width: 560px)").matches;
    if (saveData || mobileHomeHero) return;
    video.src = video.dataset.src;
    video.removeAttribute("data-src");
    video.load();
    preloadNext(video);
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
    const playlist = getPlaylist(video);
    if (playlist.length > 1) {
      const initialSource = video.dataset.src || video.getAttribute("src");
      const initialIndex = Math.max(0, playlist.indexOf(initialSource));
      video.dataset.playlistIndex = String(initialIndex);
      if (video.src) preloadNext(video);
    }

    video.addEventListener("timeupdate", () => resetSegment(video));
    video.addEventListener("ended", () => {
      const videoPlaylist = getPlaylist(video);
      if (videoPlaylist.length > 1) {
        const currentIndex = Number(video.dataset.playlistIndex || 0);
        const nextIndex = (currentIndex + 1) % videoPlaylist.length;
        video.dataset.playlistIndex = String(nextIndex);
        video.src = videoPlaylist[nextIndex];
        video.load();
        preloadNext(video);
        updatePlayback();
        return;
      }

      video.currentTime = Number(video.dataset.loopStart || 0);
      updatePlayback();
    });
    observer.observe(video);
  });

  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", updatePlayback);
}
