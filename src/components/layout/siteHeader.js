import { MEDIA, NAVIGATION, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";

function navigationLinks() {
  return NAVIGATION.map(
    (item) => `<a class="nav-link" href="${item.href}">${item.label}</a>`,
  ).join("");
}

export function siteHeader() {
  return `
    <header class="site-header" data-site-header>
      <a class="site-brand" href="#experiencia" aria-label="Via Gastrobar, início">
        <img
          src="${MEDIA.logo.src}"
          width="${MEDIA.logo.width}"
          height="${MEDIA.logo.height}"
          alt="Via Gastrobar"
        />
      </a>

      <nav class="desktop-navigation" aria-label="Navegação principal">
        ${navigationLinks()}
      </nav>

      <a
        class="header-reservation"
        href="${SITE.links.whatsapp}"
        data-track="header_reserva"
        ${externalAttributes("Reservar mesa pelo WhatsApp")}
      >
        Reservar
        ${icons.arrow}
      </a>

      <button
        class="menu-trigger"
        type="button"
        aria-expanded="false"
        aria-controls="mobile-menu"
        data-menu-trigger
      >
        <span>Menu</span>
        <span class="menu-trigger__open">${icons.menu}</span>
        <span class="menu-trigger__close">${icons.close}</span>
      </button>
    </header>

    <div
      class="mobile-menu"
      id="mobile-menu"
      data-mobile-menu
      role="dialog"
      aria-modal="true"
      aria-label="Menu principal"
      aria-hidden="true"
    >
      <nav aria-label="Navegação mobile">
        ${navigationLinks()}
      </nav>
      <div class="mobile-menu__actions">
        <a
          class="button button--primary"
          href="${SITE.links.whatsapp}"
          data-track="header_reserva"
          ${externalAttributes("Reservar mesa pelo WhatsApp")}
        >
          Reservar mesa ${icons.arrow}
        </a>
        <a
          class="button button--secondary"
          href="${SITE.links.maps}"
          data-track="rota"
          ${externalAttributes("Traçar rota no Google Maps")}
        >
          Traçar rota
        </a>
      </div>
      <p>${SITE.hours}</p>
    </div>
  `;
}
