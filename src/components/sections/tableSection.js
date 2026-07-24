import { MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import {
  responsiveImage,
  responsiveImageSequence,
  smartVideo,
} from "../ui/media.js";

function storyMedia(media) {
  if (media.type === "video") {
    return smartVideo({
      src: media.src,
      poster: media.poster,
      label: media.label,
    });
  }

  if (media.type === "sequence") {
    return responsiveImageSequence(media.images, {
      label: media.label,
    });
  }

  return responsiveImage(media);
}

function tableStory(story, index) {
  const reverse = index % 2 === 1 ? " table-story--reverse" : "";
  const video = story.main.type === "video" ? " table-story--video" : "";
  const solo = story.support ? "" : " table-story--solo";
  return `
    <article
      class="table-story${reverse}${video}${solo} reveal"
      data-chapter-media
      data-story="${story.id}"
    >
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
        ${storyMedia(story.main)}
      </figure>
      ${
        story.support
          ? `
            <figure class="table-story__support editorial-media">
              ${storyMedia(story.support)}
            </figure>
          `
          : ""
      }
    </article>
  `;
}

export function tableSection() {
  return `
    <section class="table-section chapter" id="mesa" aria-labelledby="table-title">
      <div class="section-shell chapter-heading chapter-heading--split reveal">
        <div>
          <p class="eyebrow">A mesa em foco</p>
          <h2 id="table-title">Pratos no centro da noite.</h2>
        </div>
        <p>
          Da cozinha à mesa, cada chegada convida a ficar mais um pouco.
        </p>
      </div>

      <div class="table-stories section-shell">
        ${MEDIA.tableStories.map(tableStory).join("")}
      </div>

      <section class="sea-note section-shell reveal" aria-labelledby="sea-title">
        <div class="sea-note__copy">
          <p class="eyebrow">Mar & assinatura</p>
          <h3 id="sea-title">O mar também chega à mesa.</h3>
          <a
            class="text-link"
            href="${SITE.links.whatsapp}"
            data-track="table_reserva"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            Reservar para hoje ${icons.arrow}
          </a>
        </div>
        <div class="sea-note__media">
          <figure class="editorial-media" data-pointer-media>
            ${responsiveImageSequence(MEDIA.sea, {
              label: "Pratos do mar servidos no Via Gastrobar",
            })}
          </figure>
        </div>
      </section>
    </section>
  `;
}
