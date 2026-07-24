export function initializeNavigation() {
  const header = document.querySelector("[data-site-header]");
  const trigger = document.querySelector("[data-menu-trigger]");
  const menu = document.querySelector("[data-mobile-menu]");
  const dock = document.querySelector("[data-mobile-dock]");
  const hero = document.querySelector("[data-hero]");
  const inertWhenMenuOpen = [
    document.querySelector("#conteudo"),
    document.querySelector(".site-footer"),
    dock,
  ].filter(Boolean);

  const menuFocusable = () =>
    [
      trigger,
      ...menu.querySelectorAll(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      ),
    ].filter((element) => element.getClientRects().length);

  const setMenu = (open, restoreFocus = true) => {
    if (!trigger || !menu) return;
    trigger.setAttribute("aria-expanded", String(open));
    menu.setAttribute("aria-hidden", String(!open));
    document.body.classList.toggle("menu-open", open);
    inertWhenMenuOpen.forEach((element) => {
      element.inert = open;
    });

    if (open) {
      window.requestAnimationFrame(() => {
        menu.querySelector("a[href]")?.focus();
      });
    } else if (restoreFocus) {
      trigger.focus();
    }
  };

  trigger?.addEventListener("click", () => {
    setMenu(trigger.getAttribute("aria-expanded") !== "true");
  });

  menu?.addEventListener("click", (event) => {
    if (event.target.closest("a")) setMenu(false);
  });

  document.addEventListener("keydown", (event) => {
    const menuOpen = trigger?.getAttribute("aria-expanded") === "true";
    if (event.key === "Escape" && menuOpen) {
      event.preventDefault();
      setMenu(false);
      return;
    }

    if (event.key !== "Tab" || !menuOpen) return;

    const focusable = menuFocusable();
    const first = focusable[0];
    const last = focusable.at(-1);

    if (!focusable.includes(document.activeElement)) {
      event.preventDefault();
      first?.focus();
    } else if (event.shiftKey && document.activeElement === first) {
      event.preventDefault();
      last?.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
      event.preventDefault();
      first?.focus();
    }
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
