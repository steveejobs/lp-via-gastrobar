export function initializeReveals() {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const items = [...document.querySelectorAll(".reveal")];
  if (!items.length || reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  items.forEach((item) => {
    if (item.getBoundingClientRect().top > window.innerHeight * 0.92) {
      item.classList.add("will-reveal");
    } else {
      item.classList.add("is-visible");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add("is-visible");
          entry.target.classList.remove("will-reveal");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0.05 },
  );

  items
    .filter((item) => item.classList.contains("will-reveal"))
    .forEach((item) => observer.observe(item));
}

