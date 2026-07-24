import { MEDIA, SITE } from "../data/site.js";
import { externalAttributes, icons } from "../components/ui/icons.js";
import { responsiveImage } from "../components/ui/media.js";

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
          <header class="instagram-profile">
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
            <div class="instagram-profile__status">
              <span aria-hidden="true"></span>
              ${SITE.hours}
            </div>
          </header>

          <section class="instagram-opening" aria-label="Uma prévia do Via Gastrobar">
            <figure class="instagram-opening__main">
              ${responsiveImage({
                ...MEDIA.atmosphere[0],
                loading: "eager",
                fetchPriority: "high",
                sizes: "min(80vw, 416px)",
              })}
            </figure>
            <figure>
              ${responsiveImage({
                ...MEDIA.bar.drink,
                loading: "eager",
                sizes: "min(38vw, 198px)",
              })}
            </figure>
            <figure>
              ${responsiveImage({
                ...MEDIA.tableStories[0].main,
                loading: "eager",
                sizes: "min(38vw, 198px)",
              })}
            </figure>
          </section>

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

          <section class="instagram-night" aria-labelledby="instagram-night-title">
            <div class="instagram-section-heading">
              <p class="eyebrow">Antes de chegar</p>
              <h2 id="instagram-night-title">Entre no Via por alguns segundos.</h2>
            </div>

            <div class="instagram-night__gallery">
              <figure class="instagram-night__main">
                ${responsiveImage({
                  ...MEDIA.hero.salon,
                  loading: "lazy",
                  fetchPriority: "auto",
                  sizes: "min(80vw, 416px)",
                })}
              </figure>
              <figure>
                ${responsiveImage({
                  ...MEDIA.tableStories[2].main,
                  sizes: "min(38vw, 198px)",
                })}
              </figure>
              <figure>
                ${responsiveImage({
                  src: MEDIA.hero.poster,
                  width: 720,
                  height: 1280,
                  alt: "Vinho sendo servido em uma taça",
                  sizes: "min(38vw, 198px)",
                })}
              </figure>
            </div>

            <p class="instagram-night__note">
              Luz baixa, mesa posta e tempo para a conversa continuar.
            </p>
          </section>

          <section class="instagram-visit" aria-labelledby="instagram-visit-title">
            <div class="instagram-section-heading">
              <p class="eyebrow">Para hoje</p>
              <h2 id="instagram-visit-title">Tudo o que você precisa antes de sair.</h2>
            </div>

            <dl class="instagram-visit__facts">
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
            ${responsiveImage({
              ...MEDIA.hero.room,
              loading: "lazy",
              fetchPriority: "auto",
              sizes: "min(88vw, 458px)",
              alt: "",
            })}
            <div class="instagram-closing__content">
              <p class="eyebrow">Sua mesa</p>
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
