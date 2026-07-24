import { MEDIA, SITE } from "../data/site.js";
import { externalAttributes, icons } from "../components/ui/icons.js";

function externalAction({ className = "", href, icon, title, meta, label }) {
  return `
    <a
      class="instagram-action ${className}"
      href="${href}"
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
              <img
                src="/media/ambient-table.webp"
                width="1440"
                height="1920"
                alt="Mesa posta no salão do Via Gastrobar"
              />
            </figure>
            <figure>
              <img
                src="/media/drink-coffee.webp"
                width="1440"
                height="1440"
                alt="Drink servido com luz quente"
              />
            </figure>
            <figure>
              <img
                src="/media/plate-steak-wide.webp"
                width="1125"
                height="1406"
                alt="Prato servido no Via Gastrobar"
              />
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
            })}
            ${externalAction({
              href: SITE.links.maps,
              icon: icons.map,
              title: "Traçar rota",
              meta: "Abrir no Google Maps",
              label: "Traçar rota no Google Maps",
            })}
            ${externalAction({
              href: SITE.links.instagram,
              icon: icons.instagram,
              title: "Ver Instagram",
              meta: SITE.instagramHandle,
              label: "Abrir Instagram do Via Gastrobar",
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
                <img
                  src="/media/ambient-salon.webp"
                  width="1440"
                  height="1920"
                  loading="lazy"
                  decoding="async"
                  alt="Salão com mesas e cadeiras verdes"
                />
              </figure>
              <figure>
                <img
                  src="/media/plate-fish.webp"
                  width="1440"
                  height="1440"
                  loading="lazy"
                  decoding="async"
                  alt="Prato servido em louça verde"
                />
              </figure>
              <figure>
                <img
                  src="/media/hero-service-poster.webp"
                  width="720"
                  height="1280"
                  loading="lazy"
                  decoding="async"
                  alt="Vinho sendo servido em uma taça"
                />
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
                <dd><a href="${SITE.links.phone}">${SITE.phoneLabel}</a></dd>
              </div>
            </dl>

            <a
              class="instagram-route"
              href="${SITE.links.maps}"
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
            <img
              src="/media/ambient-bar.webp"
              width="1440"
              height="1920"
              loading="lazy"
              decoding="async"
              alt=""
            />
            <div class="instagram-closing__content">
              <p class="eyebrow">Sua mesa</p>
              <h2 id="instagram-closing-title">A noite está a uma mensagem de distância.</h2>
              <a
                class="instagram-closing__button"
                href="${SITE.links.whatsapp}"
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
              <a href="${SITE.links.instagram}" ${externalAttributes("Instagram do Via Gastrobar")}>
                Instagram
              </a>
            </nav>
          </footer>
        </div>
      </main>

      <nav class="instagram-dock" data-instagram-dock aria-label="Ações rápidas">
        <a href="${SITE.links.whatsapp}" ${externalAttributes("Reservar mesa pelo WhatsApp")}>
          ${icons.whatsapp}
          Reservar mesa
        </a>
        <a href="${SITE.links.maps}" ${externalAttributes("Traçar rota no Google Maps")}>
          ${icons.map}
          <span>Rota</span>
        </a>
      </nav>
    </div>
  `;
}
