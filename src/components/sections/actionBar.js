import { SITE } from "../../data/site.js";
import { externalAttributes } from "../ui/icons.js";

export function actionBar() {
  return `
    <nav class="action-bar" aria-label="Informações e ações principais">
      <a
        href="${SITE.links.whatsapp}"
        data-track="actionbar_reserva"
        ${externalAttributes("Reservar mesa pelo WhatsApp")}
      >
        <span>01</span>
        <strong>Reservar mesa</strong>
        <small>WhatsApp</small>
      </a>
      <a
        href="${SITE.links.maps}"
        data-track="rota"
        ${externalAttributes("Traçar rota no Google Maps")}
      >
        <span>02</span>
        <strong>Traçar rota</strong>
        <small>Google Maps</small>
      </a>
      <div>
        <span>03</span>
        <strong>Funcionamento</strong>
        <small>Todos os dias · 18h</small>
      </div>
      <a
        href="${SITE.links.instagram}"
        data-track="instagram"
        ${externalAttributes("Instagram do Via Gastrobar")}
      >
        <span>04</span>
        <strong>${SITE.instagramHandle}</strong>
        <small>Instagram</small>
      </a>
    </nav>
  `;
}
