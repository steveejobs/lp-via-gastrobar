import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import { responsiveImageSequence, smartVideo } from "../ui/media.js";

export function heroSection() {
  return `
    <section
      class="hero"
      id="experiencia"
      data-hero
      aria-labelledby="hero-title"
    >
      <div class="hero__copy">
        <p class="eyebrow">Gastronomia · drinks · noite</p>
        <h1 id="hero-title">Uma mesa. <em>A noite inteira.</em></h1>
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

      <div class="hero-stage">
        <figure class="hero-stage__service">
          ${smartVideo({
            src: MEDIA.hero.video,
            label: "Serviço e atmosfera do Via Gastrobar",
            className: "hero-video",
            preload: "auto",
            eager: true,
            priority: true,
            loopStart: 0.15,
            loopEnd: 6.4,
          })}
        </figure>
        <figure class="hero-stage__room">
          ${responsiveImageSequence(MEDIA.hero.room, {
            label: "Bar e adega do Via Gastrobar",
          })}
        </figure>
        <figure class="hero-stage__salon">
          ${responsiveImageSequence(MEDIA.hero.salon, {
            label: "Salão e mesas do Via Gastrobar",
          })}
        </figure>
      </div>

      <div class="hero__scroll" aria-hidden="true">
        <span></span>
        Desça para entrar
      </div>
    </section>
  `;
}
