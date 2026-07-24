export function initializeNavigation() {
  const header = document.querySelector("[data-site-header]");
  const trigger = document.querySelector("[data-menu-trigger]");
  const menu = document.querySelector("[data-mobile-menu]");
  const dock = document.querySelector("[data-mobile-dock]");
  const hero = document.querySelector("[data-hero]");

  const setMenu = (open) => {
    if (!trigger || !menu) return;
    trigger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
  };

  trigger?.addEventListener("click", () => {
    setMenu(trigger.getAttribute("aria-expanded") !== "true");
  });

  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") setMenu(false);
  });

  const update = () => {
    const passedHero = hero
      ? window.scrollY > Math.max(180, hero.offsetHeight * 0.72)
      : window.scrollY > 420;
    header?.classList.toggle("is-scrolled", window.scrollY > 24);
    dock?.classList.toggle("is-visible", passedHero);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

