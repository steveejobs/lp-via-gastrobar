import { initializeVideos } from "./videos.js";

export function initializeInstagramPage() {
  const dock = document.querySelector("[data-instagram-dock]");
  const status = document.querySelector("[data-instagram-status]");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  let statusTimer = 0;
  const updateStatus = () => {
    const now = new Date();
    const isOpen = now.getHours() >= 18;

    status?.classList.toggle("is-open", isOpen);
    status?.classList.toggle("is-closed", !isOpen);
    status?.setAttribute(
      "aria-label",
      `${status.textContent.trim()}. ${isOpen ? "Aberto agora" : "Abre às 18h"}.`,
    );

    window.clearTimeout(statusTimer);
    statusTimer = window.setTimeout(
      updateStatus,
      (60 - now.getSeconds()) * 1000 - now.getMilliseconds() + 50,
    );
  };

  updateStatus();

  const updateDock = () => {
    dock?.classList.toggle("is-visible", window.scrollY > 560);
  };

  updateDock();
  window.addEventListener("scroll", updateDock, { passive: true });

  initializeVideos();

  const revealItems = [...document.querySelectorAll("[data-instagram-reveal]")];
  const showReveal = (item) => {
    item.classList.add("is-in-view");
    item.classList.remove("is-before");
  };

  if (reducedMotion.matches || !("IntersectionObserver" in window)) {
    revealItems.forEach(showReveal);
  } else {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          showReveal(entry.target);
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: "-6% 0px -8% 0px", threshold: [0, 0.12, 0.45] },
    );

    revealItems.forEach((item) => {
      if (item.getBoundingClientRect().top < innerHeight * 0.94) {
        showReveal(item);
      } else {
        revealObserver.observe(item);
      }
    });
  }

  const cycles = [...document.querySelectorAll("[data-instagram-cycle]")];
  const cycleTimers = new Map();

  const stopCycle = (cycle) => {
    window.clearInterval(cycleTimers.get(cycle));
    cycleTimers.delete(cycle);
  };

  const advanceCycle = (cycle) => {
    const items = [...cycle.querySelectorAll(".instagram-cycle__item")];
    const active = Math.max(
      0,
      items.findIndex((item) => item.classList.contains("is-active")),
    );
    items[active]?.classList.remove("is-active");
    items[(active + 1) % items.length]?.classList.add("is-active");
  };

  const startCycle = (cycle) => {
    if (
      cycleTimers.has(cycle) ||
      reducedMotion.matches ||
      document.hidden
    ) {
      return;
    }
    const index = cycles.indexOf(cycle);
    cycleTimers.set(
      cycle,
      window.setInterval(
        () => advanceCycle(cycle),
        3400 + (index % 3) * 650,
      ),
    );
  };

  if (!reducedMotion.matches && "IntersectionObserver" in window) {
    const cycleObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) startCycle(entry.target);
          else stopCycle(entry.target);
        });
      },
      { rootMargin: "80px 0px", threshold: 0.12 },
    );
    cycles.forEach((cycle) => cycleObserver.observe(cycle));
  }

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) {
      cycles.forEach(stopCycle);
      return;
    }
    cycles
      .filter((cycle) => {
        const bounds = cycle.getBoundingClientRect();
        return bounds.bottom > -80 && bounds.top < innerHeight + 80;
      })
      .forEach(startCycle);
  });

  const parallaxItems = [...document.querySelectorAll("[data-parallax]")];
  let parallaxFrame = 0;

  const updateParallax = () => {
    parallaxFrame = 0;
    if (reducedMotion.matches) return;

    parallaxItems.forEach((item) => {
      const bounds = item.getBoundingClientRect();
      if (bounds.bottom < -80 || bounds.top > innerHeight + 80) return;

      const speed = Number(item.dataset.parallax || 0);
      const distance =
        (bounds.top + bounds.height / 2 - innerHeight / 2) / innerHeight;
      const offset = Math.max(-18, Math.min(18, distance * speed));
      item.style.setProperty("--parallax-y", `${offset.toFixed(2)}px`);
    });
  };

  const requestParallax = () => {
    if (parallaxFrame) return;
    parallaxFrame = requestAnimationFrame(updateParallax);
  };

  const restoreVisualState = () => {
    updateDock();
    revealItems
      .filter((item) => item.getBoundingClientRect().top < innerHeight)
      .forEach(showReveal);
    cycles
      .filter((cycle) => {
        const bounds = cycle.getBoundingClientRect();
        return bounds.bottom > -80 && bounds.top < innerHeight + 80;
      })
      .forEach(startCycle);
    requestParallax();
  };

  updateParallax();
  window.addEventListener("scroll", requestParallax, { passive: true });
  window.addEventListener("resize", requestParallax, { passive: true });
  window.addEventListener("pageshow", restoreVisualState);
}
