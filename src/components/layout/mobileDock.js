import { SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";

export function mobileDock() {
  return `
    <nav class="mobile-dock" data-mobile-dock aria-label="Ações rápidas">
      <a
        href="${SITE.links.whatsapp}"
        data-track="dock_reserva"
        ${externalAttributes("Reservar mesa pelo WhatsApp")}
      >
        Reservar mesa
        ${icons.arrow}
      </a>
      <a
        href="${SITE.links.maps}"
        data-track="rota"
        ${externalAttributes("Traçar rota no Google Maps")}
      >
        ${icons.map}
        <span>Rota</span>
      </a>
    </nav>
  `;
}
