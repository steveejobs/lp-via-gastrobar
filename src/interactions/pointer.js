export function initializePointerInteractions() {
  const precisePointer = matchMedia("(pointer: fine)");
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (!precisePointer.matches || reducedMotion.matches) return;

  document.querySelectorAll("[data-pointer-media]").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = (event.clientX - bounds.left) / bounds.width;
      const y = (event.clientY - bounds.top) / bounds.height;
      element.style.setProperty("--pointer-x", `${Math.round(x * 100)}%`);
      element.style.setProperty("--pointer-y", `${Math.round(y * 100)}%`);
      element.style.setProperty("--tilt-x", `${(0.5 - y) * 1.2}deg`);
      element.style.setProperty("--tilt-y", `${(x - 0.5) * 1.2}deg`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--tilt-x");
      element.style.removeProperty("--tilt-y");
    });
  });

  document.querySelectorAll(".magnetic").forEach((element) => {
    element.addEventListener("pointermove", (event) => {
      const bounds = element.getBoundingClientRect();
      const x = ((event.clientX - bounds.left) / bounds.width - 0.5) * 6;
      const y = ((event.clientY - bounds.top) / bounds.height - 0.5) * 6;
      element.style.setProperty("--magnetic-x", `${x.toFixed(2)}px`);
      element.style.setProperty("--magnetic-y", `${y.toFixed(2)}px`);
    });
    element.addEventListener("pointerleave", () => {
      element.style.removeProperty("--magnetic-x");
      element.style.removeProperty("--magnetic-y");
    });
  });
}

