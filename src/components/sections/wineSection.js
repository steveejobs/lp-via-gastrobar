import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import {
  responsiveImage,
  responsiveImageSequence,
} from "../ui/media.js";

export function wineSection() {
  return `
    <section class="wine-section chapter" id="vinhos" aria-labelledby="wine-title">
      <div class="section-shell chapter-heading chapter-heading--split reveal">
        <div>
          <p class="eyebrow">A adega</p>
          <h2 id="wine-title">O vinho encontra a noite.</h2>
        </div>
        <p>
          Rótulos escolhidos para acompanhar a mesa, o prato e o tempo de ficar.
        </p>
      </div>

      <div class="wine-composition section-shell">
        <figure class="wine-composition__cellar editorial-media reveal">
          ${responsiveImage(MEDIA.wine.cellar)}
        </figure>

        <figure class="wine-composition__service editorial-media reveal">
          ${responsiveImageSequence(MEDIA.wine.service, {
            label: "Serviço de vinhos no Via Gastrobar",
            transition: "vertical",
          })}
        </figure>

        <figure class="wine-composition__detail editorial-media reveal">
          ${responsiveImageSequence(MEDIA.wine.details, {
            label: "Taça e garrafas selecionadas",
            transition: "vertical",
            delay: 180,
          })}
        </figure>

        <div class="wine-composition__copy reveal">
          <p>Da adega à taça, cada escolha acompanha a experiência.</p>
          <a
            class="text-link"
            href="${SITE.links.whatsapp}"
            data-track="wine_reserva"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            Reservar mesa ${icons.arrow}
          </a>
        </div>
      </div>
    </section>
  `;
}
