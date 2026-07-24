import { HOME_MEDIA as MEDIA, SITE } from "../../data/site.js";
import { externalAttributes, icons } from "../ui/icons.js";
import { smartVideo } from "../ui/media.js";

export function visitSection() {
  return `
    <section class="visit-section chapter" id="localizacao" aria-labelledby="visit-title">
      <div class="visit-section__media reveal">
        ${smartVideo({
          src: MEDIA.closing.video,
          label: "Vista do local do Via Gastrobar",
        })}
        <div class="visit-section__media-copy">
          <p class="eyebrow">Uma noite no Via</p>
          <p>Da chegada ao último brinde, cada cena convida a ficar.</p>
        </div>
      </div>

      <div class="visit-section__content reveal">
        <p class="eyebrow">Reserva & localização</p>
        <h2 id="visit-title">Sua mesa está a uma mensagem de distância.</h2>

        <dl>
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

        <div class="visit-section__actions">
          <a
            class="button button--primary magnetic"
            href="${SITE.links.whatsapp}"
            data-track="final_reserva"
            ${externalAttributes("Reservar mesa pelo WhatsApp")}
          >
            Reservar mesa ${icons.arrow}
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

        <a
          class="visit-section__instagram"
          href="${SITE.links.instagram}"
          data-track="instagram"
          ${externalAttributes("Instagram do Via Gastrobar")}
        >
          <span>Ver Instagram</span>
          <strong>${SITE.instagramHandle}</strong>
          ${icons.arrow}
        </a>
      </div>
    </section>
  `;
}
