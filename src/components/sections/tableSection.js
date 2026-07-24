import { MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import { responsiveImage } from "../ui/media.js";

function tableStory(story, index) {
  const reverse = index % 2 === 1 ? " table-story--reverse" : "";
  return `
    <article class="table-story${reverse} reveal" data-chapter-media>
      <div class="table-story__copy">
        <span>${story.index}</span>
        <h3>${story.title}</h3>
        <p>${story.copy}</p>
      </div>
      <figure
        class="table-story__main editorial-media"
        data-pointer-media
        data-cursor-label="servir"
      >
        ${responsiveImage(story.main)}
      </figure>
      <figure class="table-story__support editorial-media">
        ${responsiveImage(story.support)}
      </figure>
    </article>
  `;
}

export function tableSection() {
  return `
    <section class="table-section chapter" id="mesa" aria-labelledby="table-title">
      <div class="section-shell chapter-heading chapter-heading--split reveal">
        <div>
          <p class="eyebrow">A mesa em foco</p>
          <h2 id="table-title">Uma cena de cada vez.</h2>
        </div>
        <p>
          Três ensaios curtos. Uma imagem conduz; a segunda aproxima o detalhe.
        </p>
      </div>

      <div class="table-stories section-shell">
        ${MEDIA.tableStories.map(tableStory).join("")}
      </div>

      <section class="sea-note section-shell reveal" aria-labelledby="sea-title">
        <div class="sea-note__copy">
          <p class="eyebrow">Mar & assinatura</p>
          <h3 id="sea-title">Um recorte. Sem transformar a noite em catálogo.</h3>
          <a
            class="text-link"
            href="${SITE.links.whatsapp}"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            Reservar para hoje ${icons.arrow}
          </a>
        </div>
        <div class="sea-note__media">
          ${MEDIA.sea
            .map(
              (image) => `
                <figure class="editorial-media" data-pointer-media>
                  ${responsiveImage(image)}
                </figure>
              `,
            )
            .join("")}
        </div>
      </section>
    </section>
  `;
}
