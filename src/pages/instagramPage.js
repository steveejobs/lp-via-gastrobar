import { MEDIA, SITE } from "../data/site.js";
import { externalAttributes, icons } from "../components/ui/icons.js";
import { responsiveImage, smartVideo } from "../components/ui/media.js";

function imageCycle(images, { eager = false } = {}) {
  return `
    <span class="instagram-cycle" data-instagram-cycle aria-hidden="true">
      ${images
        .map(
          (image, index) => `
            <span class="instagram-cycle__item${index === 0 ? " is-active" : ""}">
              ${responsiveImage({
                ...image,
                alt: "",
                loading: eager ? "eager" : "lazy",
                fetchPriority: index === 0 && eager ? "high" : "auto",
                sizes: "min(38vw, 198px)",
              })}
            </span>
          `,
        )
        .join("")}
    </span>
  `;
}

function motionRailImage(image) {
  return responsiveImage({
    ...image,
    alt: "",
    loading: "eager",
    fetchPriority: "low",
    sizes: "190px",
  });
}

function externalAction({
  className = "",
  href,
  icon,
  title,
  meta,
  label,
  track,
}) {
  return `
    <a
      class="instagram-action ${className}"
      href="${href}"
      ${track ? `data-track="${track}"` : ""}
      ${externalAttributes(label || title)}
    >
      <span class="instagram-action__icon">${icon}</span>
      <span class="instagram-action__copy">
        <strong>${title}</strong>
        ${meta ? `<small>${meta}</small>` : ""}
      </span>
      <span class="instagram-action__arrow">${icons.arrow}</span>
    </a>
  `;
}
export function instagramPage() {
  return `
    <div data-page="instagram">
      <main id="conteudo" class="instagram-page">
        <div class="instagram-canvas">
          <section class="instagram-hero" aria-label="Apresentação do Via Gastrobar">
            <header class="instagram-profile" data-instagram-intro>
              <a class="instagram-profile__logo" href="/" aria-label="Via Gastrobar, site completo">
                <img
                  src="${MEDIA.logo.src}"
                  width="${MEDIA.logo.width}"
                  height="${MEDIA.logo.height}"
                  alt="Via Gastrobar"
                />
              </a>
              <p class="instagram-profile__handle">${SITE.instagramHandle}</p>
              <h1>A noite começa à mesa.</h1>
              <p class="instagram-profile__lead">
                Pratos, drinks e uma atmosfera feita para ficar.
              </p>
              <div class="instagram-profile__status" data-instagram-status>
                <span data-instagram-status-dot aria-hidden="true"></span>
                ${SITE.hours}
              </div>
            </header>

            <figure class="instagram-hero__video">
              ${smartVideo({
                src: MEDIA.hero.video,
                poster: MEDIA.hero.poster,
                label: "Serviço de vinho no Via Gastrobar",
                className: "instagram-opening__video",
                preload: "metadata",
                eager: true,
                priority: true,
                posterWidth: 720,
                posterSizes: "min(62vw, 322px)",
                loopStart: 0.4,
                loopEnd: 11.8,
              })}
            </figure>
          </section>

          <section class="instagram-opening" aria-label="Ações e detalhes do Via Gastrobar">
            <nav class="instagram-actions" aria-label="Ações principais">
              ${externalAction({
                className: "instagram-action--primary",
                href: SITE.links.whatsapp,
                icon: icons.whatsapp,
                title: "Reservar mesa",
                meta: "Falar pelo WhatsApp",
                label: "Reservar mesa pelo WhatsApp",
                track: "hero_reserva",
              })}
              ${externalAction({
                href: SITE.links.maps,
                icon: icons.map,
                title: "Traçar rota",
                meta: "Abrir no Google Maps",
                label: "Traçar rota no Google Maps",
                track: "rota",
              })}
              ${externalAction({
                href: SITE.links.instagram,
                icon: icons.instagram,
                title: "Ver Instagram",
                meta: SITE.instagramHandle,
                label: "Abrir Instagram do Via Gastrobar",
                track: "instagram",
              })}
              <a class="instagram-action" href="/">
                <span class="instagram-action__icon">${icons.home}</span>
                <span class="instagram-action__copy">
                  <strong>Ver experiência completa</strong>
                  <small>Conheça o Via</small>
                </span>
                <span class="instagram-action__arrow">${icons.arrow}</span>
              </a>
            </nav>

            <div class="instagram-opening__media" aria-hidden="true">
              <figure>
                ${imageCycle(
                  [
                    ...MEDIA.bar.drinks,
                    MEDIA.bar.wines[2],
                  ],
                  { eager: true },
                )}
              </figure>
              <figure>
                ${imageCycle(
                  [
                    MEDIA.tableStories[0].main.images[0],
                    MEDIA.tableStories[2].main.images[0],
                    ...MEDIA.sea,
                  ],
                  { eager: true },
                )}
              </figure>
              <figure>
                ${smartVideo({
                  src: MEDIA.bar.detailVideo,
                  poster: MEDIA.bar.detailPoster,
                  label: "Dois drinks servidos no Via Gastrobar",
                  className: "instagram-opening__detail-video",
                  preload: "metadata",
                  posterWidth: 720,
                  posterSizes: "min(30vw, 150px)",
                  loopStart: 0.3,
                  loopEnd: 7.4,
                })}
              </figure>
            </div>
          </section>

          <section class="instagram-night" aria-labelledby="instagram-night-title">
            <div class="instagram-section-heading" data-instagram-reveal="up">
              <p class="eyebrow">Antes de chegar</p>
              <h2 id="instagram-night-title">Entre no Via por alguns segundos.</h2>
            </div>

            <div class="instagram-night__gallery" data-instagram-reveal="clip">
              <figure class="instagram-night__main" data-parallax="13">
                ${smartVideo({
                  src: MEDIA.tableStories[1].main.src,
                  playlist: MEDIA.tableStories[1].main.playlist,
                  poster: MEDIA.tableStories[1].main.poster,
                  label: MEDIA.tableStories[1].main.label,
                  className: "instagram-night__video",
                  preload: "metadata",
                  posterWidth: 720,
                  posterSizes: "min(52vw, 270px)",
                })}
              </figure>
              <figure aria-label="Detalhes da experiência" data-parallax="-8">
                ${imageCycle([
                  MEDIA.atmosphere.main[1],
                  MEDIA.atmosphere.support,
                  MEDIA.atmosphere.cellar,
                ])}
              </figure>
              <figure aria-label="Pratos e serviço" data-parallax="8">
                ${imageCycle([
                  MEDIA.tableStories[2].main.images[1],
                  MEDIA.tableStories[0].main.images[1],
                  MEDIA.bar.wines[0],
                ])}
              </figure>
            </div>

            <p class="instagram-night__note" data-instagram-reveal="left">
              Luz baixa, mesa posta e tempo para a conversa continuar.
            </p>
          </section>

          <section
            class="instagram-motion-rail"
            data-instagram-reveal="rail"
            aria-hidden="true"
          >
            <div class="instagram-motion-rail__track">
              ${[
                MEDIA.atmosphere.main[0],
                MEDIA.bar.drinks[0],
                MEDIA.tableStories[2].main.images[0],
                MEDIA.atmosphere.main[2],
                MEDIA.bar.wines[1],
                MEDIA.atmosphere.cellar,
                MEDIA.atmosphere.main[0],
                MEDIA.bar.drinks[0],
                MEDIA.tableStories[2].main.images[0],
                MEDIA.atmosphere.main[2],
                MEDIA.bar.wines[1],
                MEDIA.atmosphere.cellar,
              ]
                .map((image) => `<span>${motionRailImage(image)}</span>`)
                .join("")}
            </div>
          </section>

          <section class="instagram-visit" aria-labelledby="instagram-visit-title">
            <div class="instagram-section-heading" data-instagram-reveal="up">
              <p class="eyebrow">Para hoje</p>
              <h2 id="instagram-visit-title">Tudo o que você precisa antes de sair.</h2>
            </div>

            <dl class="instagram-visit__facts" data-instagram-reveal="up">
              <div>
                <dt>Funcionamento</dt>
                <dd>${SITE.hours}</dd>
              </div>
              <div>
                <dt>Endereço</dt>
                <dd>${SITE.address}</dd>
              </div>
              <div>
                <dt>Referência</dt>
                <dd>${SITE.reference}</dd>
              </div>
              <div>
                <dt>Reservas</dt>
                <dd>
                  <a href="${SITE.links.phone}" data-track="telefone">
                    ${SITE.phoneLabel}
                  </a>
                </dd>
              </div>
            </dl>

            <a
              class="instagram-route"
              href="${SITE.links.maps}"
              data-track="rota"
              ${externalAttributes("Abrir rota para o Via Gastrobar")}
              data-instagram-reveal="up"
            >
              ${icons.map}
              <span>
                <strong>Abrir rota</strong>
                <small>Google Maps</small>
              </span>
              ${icons.arrow}
            </a>
          </section>

          <section class="instagram-closing" aria-labelledby="instagram-closing-title">
            ${smartVideo({
              src: MEDIA.closing.video,
              poster: MEDIA.atmosphere.main[2].src,
              label: "Ambiente do Via Gastrobar",
              className: "instagram-closing__video",
              preload: "metadata",
              posterWidth: 1440,
              posterSizes: "min(100vw, 520px)",
              loopStart: 0.2,
              loopEnd: 12,
            })}
            <div class="instagram-closing__content" data-instagram-reveal="up">
              <h2 id="instagram-closing-title">A noite está a uma mensagem de distância.</h2>
              <a
                class="instagram-closing__button"
                href="${SITE.links.whatsapp}"
                data-track="final_reserva"
                ${externalAttributes("Reservar mesa pelo WhatsApp")}
              >
                ${icons.whatsapp}
                Reservar mesa
                ${icons.arrow}
              </a>
            </div>
          </section>

          <footer class="instagram-footer">
            <img
              src="${MEDIA.logo.src}"
              width="${MEDIA.logo.width}"
              height="${MEDIA.logo.height}"
              alt="Via Gastrobar"
            />
            <p>${SITE.instagramHandle}</p>
            <nav aria-label="Links finais">
              <a href="/">Site completo</a>
              <a
                href="${SITE.links.instagram}"
                data-track="instagram"
                ${externalAttributes("Instagram do Via Gastrobar")}
              >
                Instagram
              </a>
            </nav>
          </footer>
        </div>
      </main>

      <nav class="instagram-dock" data-instagram-dock aria-label="Ações rápidas">
        <a
          href="${SITE.links.whatsapp}"
          data-track="dock_reserva"
          ${externalAttributes("Reservar mesa pelo WhatsApp")}
        >
          ${icons.whatsapp}
          Reservar mesa
        </a>
        <a
          href="${SITE.links.maps}"
          data-track="rota"
          ${externalAttributes("Traçar rota no Google Maps")}
        >
          ${icons.map}
          <span>Rota</span>
        </a>
      </nav>
    </div>
  `;
}
