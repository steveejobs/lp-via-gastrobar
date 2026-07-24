export function initializePageTransitions() {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (
      !link ||
      reducedMotion.matches ||
      event.defaultPrevented ||
      event.metaKey ||
      event.ctrlKey ||
      event.shiftKey ||
      link.target === "_blank" ||
      link.origin !== window.location.origin ||
      link.hash
    ) {
      return;
    }

    event.preventDefault();
    document.documentElement.classList.add("is-leaving");
    window.setTimeout(() => {
      window.location.href = link.href;
    }, 160);
  });

  window.addEventListener("pageshow", () => {
    document.documentElement.classList.remove("is-leaving");
  });
}

