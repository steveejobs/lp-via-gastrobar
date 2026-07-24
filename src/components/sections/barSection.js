import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import { responsiveImage, smartVideo } from "../ui/media.js";

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
          data-cursor-label="ver"
        >
          ${smartVideo({
            src: MEDIA.bar.video,
            poster: MEDIA.bar.poster,
            label: "Preparo de drink no Via Gastrobar",
          })}
          <figcaption>O ritual começa no bar.</figcaption>
        </figure>
        <figure class="bar-composition__drink editorial-media reveal" data-pointer-media>
          ${responsiveImage(MEDIA.bar.drink)}
        </figure>
        <figure class="bar-composition__wine editorial-media reveal">
          ${responsiveImage(MEDIA.bar.wine)}
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
