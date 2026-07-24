import { MEDIA } from "../../data/site.js";
import {
  responsiveImage,
  responsiveImageSequence,
} from "../ui/media.js";

export function atmosphereSection() {
  const { main, support, cellar } = MEDIA.atmosphere;

  return `
    <section class="atmosphere chapter" id="lugar" aria-labelledby="place-title">
      <div class="section-shell chapter-heading reveal">
        <p class="eyebrow">Primeiro, o lugar</p>
        <h2 id="place-title">Entre pela luz.<br />Fique pela atmosfera.</h2>
        <p>
          Madeira, mesas postas e um salão que muda de ritmo quando a noite começa.
        </p>
      </div>

      <div class="atmosphere-composition section-shell">
        <figure
          class="atmosphere-composition__main editorial-media reveal"
          data-pointer-media
          data-cursor-label="ver"
        >
          ${responsiveImageSequence(main, {
            label: "Ambientes do Via Gastrobar",
          })}
        </figure>
        <figure
          class="atmosphere-composition__support editorial-media reveal"
          data-pointer-media
        >
          ${responsiveImage(support)}
        </figure>
        <figure class="atmosphere-composition__detail editorial-media reveal">
          ${responsiveImage(cellar)}
        </figure>
        <p class="atmosphere-composition__note reveal">
          A mesa está pronta antes do primeiro pedido.
        </p>
      </div>
    </section>
  `;
}
