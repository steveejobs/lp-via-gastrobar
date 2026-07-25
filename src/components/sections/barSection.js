import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import {
  responsiveImageSequence,
  smartVideo,
} from "../ui/media.js";

export function barSection() {
  return `
    <section class="bar-section chapter" id="bar" aria-labelledby="bar-title">
      <div class="section-shell chapter-heading chapter-heading--split reveal">
        <div>
          <p class="eyebrow">O bar em movimento</p>
          <h2 id="bar-title">A taça muda o ritmo.</h2>
        </div>
        <p>
          Gelo, luz e serviço entram em cena sem competir com a conversa.
        </p>
      </div>

      <div class="bar-composition section-shell">
        <figure
          class="bar-composition__video editorial-media reveal"
          data-pointer-media
        >
          ${smartVideo({
            src: MEDIA.bar.champagneVideo,
            label: "Champagne servido no Via Gastrobar",
            loopStart: 1.5,
          })}
        </figure>
        <figure class="bar-composition__drink editorial-media reveal" data-pointer-media>
          ${responsiveImageSequence(MEDIA.bar.drinks, {
            label: "Drinks servidos no Via Gastrobar",
          })}
        </figure>
        <figure class="bar-composition__detail-video editorial-media reveal">
          ${smartVideo({
            src: MEDIA.bar.detailVideo,
            label: "Drinks preparados no Via Gastrobar",
          })}
        </figure>
        <div class="bar-composition__copy reveal">
          <p>Da primeira taça ao tempo de permanecer.</p>
          <a
            class="text-link"
            href="${SITE.links.whatsapp}"
            data-track="bar_reserva"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            Reservar mesa ${icons.arrow}
          </a>
        </div>
      </div>
    </section>
  `;
}
