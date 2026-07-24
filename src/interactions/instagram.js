export function initializeInstagramPage() {
  const dock = document.querySelector("[data-instagram-dock]");
  if (!dock) return;

  const updateDock = () => {
    dock.classList.toggle("is-visible", window.scrollY > 560);
  };

  updateDock();
  window.addEventListener("scroll", updateDock, { passive: true });
}

