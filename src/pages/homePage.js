import { mobileDock } from "../components/layout/mobileDock.js";
import { siteFooter } from "../components/layout/siteFooter.js";
import { siteHeader } from "../components/layout/siteHeader.js";
import { actionBar } from "../components/sections/actionBar.js";
import { atmosphereSection } from "../components/sections/atmosphereSection.js";
import { barSection } from "../components/sections/barSection.js";
import { heroSection } from "../components/sections/heroSection.js";
import { tableSection } from "../components/sections/tableSection.js";
import { visitSection } from "../components/sections/visitSection.js";

export function homePage() {
  return `
    <div data-page="home">
      ${siteHeader()}
      <main id="conteudo">
        ${heroSection()}
        ${actionBar()}

        <section class="opening-note section-shell reveal" aria-labelledby="opening-title">
          <p class="eyebrow">Via Gastrobar</p>
          <h2 id="opening-title">Chegue para jantar.<br />Fique pela noite.</h2>
          <div>
            <p>
              O ambiente abre a cena. A mesa aproxima. O bar mantém a noite em movimento.
            </p>
            <p>${"Todos os dias, a partir das 18h."}</p>
          </div>
        </section>

        ${atmosphereSection()}
        ${tableSection()}
        ${barSection()}

        <section class="reservation-bridge section-shell reveal" aria-labelledby="bridge-title">
          <p class="eyebrow">A noite continua</p>
          <h2 id="bridge-title">A próxima cena é a sua mesa.</h2>
        </section>

        ${visitSection()}
      </main>
      ${siteFooter()}
      ${mobileDock()}
    </div>
  `;
}
