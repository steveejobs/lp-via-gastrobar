import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import { responsiveImage, smartVideo } from "../ui/media.js";

export function heroSection() {
  return `
    <section
      class="hero"
      id="experiencia"
      data-hero
      aria-labelledby="hero-title"
    >
      <div class="hero__ambient" aria-hidden="true"></div>

      <div class="hero__copy">
        <p class="eyebrow">Gastronomia · drinks · noite</p>
        <h1 id="hero-title">A noite começa <em>à mesa.</em></h1>
        <p class="hero__lead">
          Pratos, drinks e uma atmosfera feita para ficar.
        </p>

        <div class="hero__actions">
          <a
            class="button button--primary magnetic"
            href="${SITE.links.whatsapp}"
            data-track="hero_reserva"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            <span>Reservar mesa</span>
            ${icons.arrow}
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

        <dl class="hero__facts">
          <div>
            <dt>Funcionamento</dt>
            <dd>Todos os dias · a partir das 18h</dd>
          </div>
          <div>
            <dt>Onde</dt>
            <dd>Ao lado do Via Filadélfia</dd>
          </div>
        </dl>
      </div>

      <div class="hero-stage editorial-media" data-pointer-media>
        <div class="hero-stage__light" aria-hidden="true"></div>
        <figure class="hero-stage__service">
          ${smartVideo({
            src: MEDIA.hero.video,
            poster: MEDIA.hero.poster,
            label: "Serviço e atmosfera do Via Gastrobar",
            className: "hero-video",
            preload: "metadata",
            priority: true,
            loopStart: 0.15,
            loopEnd: 6.4,
          })}
          <figcaption>O primeiro serviço</figcaption>
        </figure>
        <figure class="hero-stage__room">
          ${responsiveImage(MEDIA.hero.room)}
          <figcaption>O bar espera</figcaption>
        </figure>
        <figure class="hero-stage__salon">
          ${responsiveImage(MEDIA.hero.salon)}
          <figcaption>Para chegar sem pressa</figcaption>
        </figure>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span></span>
        Desça para entrar
      </div>
    </section>
  `;
}
