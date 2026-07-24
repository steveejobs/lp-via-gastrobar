import { MEDIA, SITE } from "../data/site.js";
import { externalAttributes, icons } from "../components/ui/icons.js";

export function instagramPage() {
  return `
    <main id="conteudo" class="bio-page">
      <header class="bio-head">
        <a class="bio-logo" href="/" aria-label="Via Gastrobar, início">
          <img
            src="${MEDIA.logo.src}"
            width="${MEDIA.logo.width}"
            height="${MEDIA.logo.height}"
            alt="Via Gastrobar"
          />
        </a>
        <p class="eyebrow">Gastronomia · drinks · noite</p>
        <h1>A noite começa à mesa.</h1>
        <span>${SITE.hours}</span>
      </header>

      <nav class="bio-links" aria-label="Links principais">
        <a
          class="bio-links__primary"
          href="${SITE.links.whatsapp}"
          ${externalAttributes("Reservar mesa pelo WhatsApp")}
        >
          Reservar mesa ${icons.arrow}
        </a>
        <a href="${SITE.links.maps}" ${externalAttributes("Traçar rota no Google Maps")}>
          Traçar rota ${icons.arrow}
        </a>
        <a href="${SITE.links.instagram}" ${externalAttributes("Instagram do Via Gastrobar")}>
          Instagram ${icons.arrow}
        </a>
        <a href="/">Ver site completo ${icons.arrow}</a>
      </nav>

      <section class="bio-strip" aria-label="Galeria curta">
        <img src="/media/plate-fish.webp" width="1440" height="1440" alt="Prato servido" />
        <img src="/media/drink-coffee.webp" width="1440" height="1440" alt="Drink servido" />
        <img src="/media/ambient-table.webp" width="1440" height="1920" alt="Mesa posta" />
      </section>

      <footer class="bio-footer">
        <p>${SITE.address}</p>
        <span>${SITE.reference}</span>
      </footer>
    </main>
  `;
}
