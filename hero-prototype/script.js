const hero = document.querySelector(".hero");
const video = document.querySelector(".media--pour video");
const motionToggle = document.querySelector(".motion-toggle");
const motionLabel = document.querySelector(".motion-toggle__label");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

const timeline = [
  { scene: "arrival", duration: 650 },
  { scene: "table", duration: 5200 },
  { scene: "linger", duration: 2600 },
];

let step = 0;
let timer = null;
let pausedByUser = false;

function syncVideo() {
  const shouldPlay =
    !pausedByUser && !reducedMotion.matches && !document.hidden;

  if (shouldPlay) {
    video.play().catch(() => {});
  } else {
    video.pause();
  }
}

function scheduleScene() {
  window.clearTimeout(timer);

  if (pausedByUser || reducedMotion.matches) {
    return;
  }

  const current = timeline[step];
  hero.dataset.scene = current.scene;

  timer = window.setTimeout(() => {
    step = (step + 1) % timeline.length;
    scheduleScene();
  }, current.duration);
}

function setPaused(nextPaused) {
  pausedByUser = nextPaused;
  hero.dataset.paused = String(nextPaused);
  motionToggle.setAttribute("aria-pressed", String(nextPaused));
  motionLabel.textContent = nextPaused
    ? "Retomar movimento"
    : "Pausar movimento";

  if (nextPaused) {
    window.clearTimeout(timer);
  } else {
    step = 1;
    scheduleScene();
  }

  syncVideo();
}

motionToggle.addEventListener("click", () => {
  setPaused(!pausedByUser);
});

document.addEventListener("visibilitychange", syncVideo);

reducedMotion.addEventListener("change", () => {
  if (reducedMotion.matches) {
    hero.dataset.scene = "table";
    window.clearTimeout(timer);
  } else if (!pausedByUser) {
    step = 1;
    scheduleScene();
  }

  syncVideo();
});

const observer = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      syncVideo();
    } else {
      video.pause();
    }
  },
  { threshold: 0.1 },
);

observer.observe(hero);

if (reducedMotion.matches) {
  hero.dataset.scene = "table";
} else {
  scheduleScene();
}

syncVideo();
