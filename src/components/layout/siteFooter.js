import { MEDIA, SITE } from "../../data/site.js";
import { externalAttributes } from "../ui/icons.js";

export function siteFooter() {
  return `
    <footer class="site-footer">
      <a class="site-footer__brand" href="#experiencia" aria-label="Via Gastrobar, início">
        <img
          src="${MEDIA.logo.src}"
          width="${MEDIA.logo.width}"
          height="${MEDIA.logo.height}"
          alt="Via Gastrobar"
        />
      </a>
      <p>${SITE.hours}</p>
      <address>
        ${SITE.address}<br />
        ${SITE.reference}
      </address>
      <nav aria-label="Links do rodapé">
        <a href="${SITE.links.whatsapp}" ${externalAttributes("Reservas pelo WhatsApp")}>Reservas</a>
        <a href="${SITE.links.maps}" ${externalAttributes("Rota no Google Maps")}>Rota</a>
        <a href="${SITE.links.instagram}" ${externalAttributes("Instagram do Via Gastrobar")}>Instagram</a>
      </nav>
    </footer>
  `;
}

