import "./styles.css";

const LINKS = {
  whatsapp: "https://api.whatsapp.com/send?phone=5563991394000",
  maps: "https://maps.app.goo.gl/jis5grnFQH36mhWs7",
  instagram: "https://www.instagram.com/viagastrobar/",
  phone: "tel:+5563991394000",
};

const arrow = `
  <svg aria-hidden="true" viewBox="0 0 24 24">
    <path d="M5 12h13M13 6l6 6-6 6"></path>
  </svg>
`;

function hero() {
  return `
    <section class="hero" data-scene="arrival" aria-labelledby="hero-title">
      <div class="hero__grain" aria-hidden="true"></div>
      <div class="hero__glow" aria-hidden="true"></div>

      <header class="hero__header">
        <a class="brand" href="/" aria-label="Via Gastrobar, início">
          <img src="/media/logo.jpg" width="856" height="856" alt="Via Gastrobar" />
        </a>

        <div class="hero__time">
          <span class="status-dot" aria-hidden="true"></span>
          <span>Todos os dias<br />a partir das 18h</span>
        </div>
      </header>

      <div class="hero__copy">
        <p class="eyebrow">Gastronomia · drinks · encontros</p>
        <h1 id="hero-title">A noite encontra <em>seu lugar à mesa.</em></h1>
        <p class="hero__lead">Luz baixa, bebida servida e tempo para ficar.</p>

        <div class="hero__actions">
          <a class="button button--light" href="${LINKS.whatsapp}">
            <span>Reservar no WhatsApp</span>
            ${arrow}
          </a>
          <a class="button button--outline" href="${LINKS.maps}">Traçar rota</a>
        </div>
      </div>

      <div class="table-scene" aria-label="Atmosfera do Via Gastrobar">
        <div class="table-scene__surface" aria-hidden="true"></div>
        <div class="table-scene__line" aria-hidden="true"></div>

        <figure class="media media--pour">
          <video
            class="smart-video"
            muted
            playsinline
            loop
            preload="metadata"
            poster="/media/wine-service-01.jpg"
            aria-label="Vinho sendo servido no Via Gastrobar"
          >
            <source src="/media/hero-service.mp4" type="video/mp4" />
          </video>
          <figcaption>O primeiro serviço</figcaption>
        </figure>

        <figure class="media media--room">
          <img
            src="/media/ambient-table.jpg"
            width="1440"
            height="1920"
            alt="Mesa posta no salão do Via Gastrobar"
          />
          <figcaption>Mesa posta</figcaption>
        </figure>

        <figure class="media media--salon">
          <img
            src="/media/ambient-salon.jpg"
            width="1440"
            height="1920"
            alt="Salão com mesas e cadeiras verdes"
          />
          <figcaption>Para chegar sem pressa</figcaption>
        </figure>
      </div>

      <nav class="hero__quick" aria-label="Acessos rápidos">
        <a href="${LINKS.instagram}">Instagram</a>
        <span aria-hidden="true"></span>
        <a href="${LINKS.phone}">(63) 99139-4000</a>
      </nav>

      <button class="motion-toggle" type="button" aria-pressed="false">
        <span class="motion-toggle__icon" aria-hidden="true"></span>
        <span class="motion-toggle__label">Pausar movimento</span>
      </button>
    </section>
  `;
}

function homePage() {
  return `
    ${hero()}

    <main id="conteudo">
      <nav class="quickbar" aria-label="Informações e ações principais">
        <a href="${LINKS.whatsapp}">
          <span class="quickbar__index">01</span>
          <strong>Reservar</strong>
          <small>WhatsApp</small>
        </a>
        <a href="${LINKS.maps}">
          <span class="quickbar__index">02</span>
          <strong>Como chegar</strong>
          <small>Abrir rota</small>
        </a>
        <a href="${LINKS.instagram}">
          <span class="quickbar__index">03</span>
          <strong>Instagram</strong>
          <small>@viagastrobar</small>
        </a>
        <div>
          <span class="quickbar__index">04</span>
          <strong>Funcionamento</strong>
          <small>Todos os dias · 18h</small>
        </div>
      </nav>

      <section class="manifesto section-shell reveal" aria-labelledby="manifesto-title">
        <div>
          <p class="eyebrow">Via Gastrobar</p>
          <h2 id="manifesto-title">A noite ganha forma entre a mesa e o bar.</h2>
        </div>
        <div class="manifesto__copy">
          <p>
            O Via reúne gastronomia, drinks e vinho num espaço pensado para
            conversas sem hora marcada.
          </p>
          <p>
            A luz é baixa. O serviço acontece perto. A mesa convida a ficar.
          </p>
        </div>
      </section>

      <section class="atmosphere" aria-labelledby="atmosphere-title">
        <div class="section-shell atmosphere__heading reveal">
          <p class="eyebrow">Antes do primeiro prato</p>
          <h2 id="atmosphere-title">É o ambiente que começa a noite.</h2>
          <p>Madeira, luz quente e mesas prontas para receber.</p>
        </div>

        <div class="atmosphere-grid section-shell">
          <figure class="atmosphere-grid__wall reveal">
            <img
              src="/media/ambient-wall.jpg"
              width="1440"
              height="1920"
              loading="lazy"
              decoding="async"
              alt="Parede de madeira iluminada no Via Gastrobar"
            />
          </figure>
          <figure class="atmosphere-grid__table reveal">
            <img
              src="/media/ambient-table.jpg"
              width="1440"
              height="1920"
              loading="lazy"
              decoding="async"
              alt="Mesa redonda posta no salão"
            />
          </figure>
          <figure class="atmosphere-grid__wine reveal">
            <img
              src="/media/ambient-wine-wall.jpg"
              width="1440"
              height="1920"
              loading="lazy"
              decoding="async"
              alt="Adega iluminada do Via Gastrobar"
            />
          </figure>
          <p class="atmosphere-grid__note reveal">
            Chegar. Sentar. Deixar a noite encontrar seu ritmo.
          </p>
        </div>
      </section>

      <section class="gastronomy" aria-labelledby="gastronomy-title">
        <div class="section-shell section-heading reveal">
          <div>
            <p class="eyebrow">Gastronomia</p>
            <h2 id="gastronomy-title">Pratos que ocupam o centro da mesa.</h2>
          </div>
          <p>
            Textura, apresentação e serviço vistos de perto — sem transformar a
            experiência em um cardápio.
          </p>
        </div>

        <div class="food-stories section-shell">
          <article class="food-story food-story--first reveal">
            <div class="food-story__copy">
              <span>01</span>
              <h3>Presença e calor</h3>
              <p>Composições servidas para dividir a atenção com a conversa.</p>
            </div>
            <figure class="food-story__main">
              <img
                src="/media/plate-steak-wide.jpg"
                width="1125"
                height="1406"
                loading="lazy"
                decoding="async"
                alt="Prato servido em panela com acompanhamento"
              />
            </figure>
            <figure class="food-story__detail">
              <img
                src="/media/plate-steak-close.jpg"
                width="1125"
                height="1406"
                loading="lazy"
                decoding="async"
                alt="Detalhe da apresentação de um prato"
              />
            </figure>
          </article>

          <article class="food-story food-story--second reveal">
            <div class="food-story__copy">
              <span>02</span>
              <h3>Do mar à mesa</h3>
              <p>Enquadramentos próximos, cor e apresentação em primeiro plano.</p>
            </div>
            <figure class="food-story__main">
              <img
                src="/media/plate-octopus.jpg"
                width="1290"
                height="2293"
                loading="lazy"
                decoding="async"
                alt="Prato de polvo servido no Via Gastrobar"
              />
            </figure>
            <figure class="food-story__detail">
              <img
                src="/media/plate-lobster.jpg"
                width="1290"
                height="2293"
                loading="lazy"
                decoding="async"
                alt="Prato de lagosta servido no Via Gastrobar"
              />
            </figure>
          </article>

          <article class="food-story food-story--third reveal">
            <div class="food-story__copy">
              <span>03</span>
              <h3>Detalhe e textura</h3>
              <p>O prato repousa; a imagem aproxima.</p>
            </div>
            <figure class="food-story__main">
              <img
                src="/media/plate-lamb-wide.jpg"
                width="1440"
                height="1800"
                loading="lazy"
                decoding="async"
                alt="Prato servido em louça verde"
              />
            </figure>
            <figure class="food-story__detail">
              <img
                src="/media/plate-lamb-close.jpg"
                width="1440"
                height="1800"
                loading="lazy"
                decoding="async"
                alt="Detalhe de um prato servido"
              />
            </figure>
          </article>
        </div>
      </section>

      <section class="bar-section" aria-labelledby="bar-title">
        <div class="section-shell section-heading section-heading--bar reveal">
          <div>
            <p class="eyebrow">Bar & vinho</p>
            <h2 id="bar-title">A bebida também conduz a noite.</h2>
          </div>
          <p>Gelo, taça, serviço e luz — cada gesto no seu tempo.</p>
        </div>

        <div class="bar-stage section-shell">
          <figure class="bar-stage__video reveal">
            <video
              class="smart-video"
              muted
              playsinline
              loop
              preload="none"
              poster="/media/drink-lime.jpg"
              data-src="/media/drink-prep.mp4"
              aria-label="Preparo de bebida no bar do Via Gastrobar"
            ></video>
            <figcaption>O ritual começa no bar.</figcaption>
          </figure>

          <figure class="bar-stage__drink reveal">
            <img
              src="/media/drink-coffee.jpg"
              width="1440"
              height="1440"
              loading="lazy"
              decoding="async"
              alt="Drink servido com luz quente"
            />
          </figure>

          <figure class="bar-stage__wine reveal">
            <img
              src="/media/wine-service-02.jpg"
              width="2268"
              height="2268"
              loading="lazy"
              decoding="async"
              alt="Garrafa de vinho apresentada durante o serviço"
            />
          </figure>

          <div class="bar-stage__copy reveal">
            <p>
              Drinks, vinho e serviço dividem a mesma cena: brilho controlado,
              conversa e noite em movimento.
            </p>
          </div>
        </div>
      </section>

      <section class="night-note section-shell reveal" aria-labelledby="night-title">
        <p class="eyebrow">Encontros</p>
        <h2 id="night-title">Mesa posta para a conversa continuar.</h2>
        <p>
          Gastronomia e bebida no mesmo ritmo, do começo da noite ao último brinde.
        </p>
      </section>

      <section class="visit" aria-labelledby="visit-title">
        <div class="visit__media">
          <video
            class="smart-video"
            muted
            playsinline
            loop
            preload="none"
            poster="/media/ambient-bar.jpg"
            data-src="/media/location-close.mp4"
            aria-label="Vista externa do local do Via Gastrobar"
          ></video>
        </div>

        <div class="visit__content">
          <p class="eyebrow">Reserva & localização</p>
          <h2 id="visit-title">Sua mesa começa aqui.</h2>

          <dl>
            <div>
              <dt>Funcionamento</dt>
              <dd>Todos os dias, a partir das 18h</dd>
            </div>
            <div>
              <dt>Endereço</dt>
              <dd>Rua Ipameri, loteamento Dona Nelcia, 3287</dd>
            </div>
            <div>
              <dt>Referência</dt>
              <dd>Ao lado do Via Filadélfia</dd>
            </div>
            <div>
              <dt>Reservas</dt>
              <dd><a href="${LINKS.phone}">(63) 99139-4000</a></dd>
            </div>
          </dl>

          <div class="visit__actions">
            <a class="button button--light" href="${LINKS.whatsapp}">
              Reservar no WhatsApp ${arrow}
            </a>
            <a class="button button--outline" href="${LINKS.maps}">Traçar rota</a>
          </div>
        </div>
      </section>

      <section class="instagram-call section-shell reveal" aria-labelledby="instagram-title">
        <div>
          <p class="eyebrow">Instagram</p>
          <h2 id="instagram-title">Acompanhe a noite.</h2>
        </div>
        <a href="${LINKS.instagram}">
          <span>@viagastrobar</span>
          ${arrow}
        </a>
      </section>
    </main>

    <footer class="footer">
      <a class="footer__brand" href="/" aria-label="Via Gastrobar, início">
        <img src="/media/logo.jpg" width="856" height="856" alt="Via Gastrobar" />
      </a>
      <p>Todos os dias, a partir das 18h</p>
      <address>
        Rua Ipameri, loteamento Dona Nelcia, 3287<br />
        Ao lado do Via Filadélfia
      </address>
      <nav aria-label="Links do rodapé">
        <a href="${LINKS.whatsapp}">Reservas</a>
        <a href="${LINKS.maps}">Rota</a>
        <a href="${LINKS.instagram}">Instagram</a>
      </nav>
    </footer>

    <nav class="mobile-dock" aria-label="Ações rápidas">
      <a href="${LINKS.whatsapp}">Reservar</a>
      <a href="${LINKS.maps}">Rota</a>
    </nav>
  `;
}

function instagramPage() {
  return `
    <main id="conteudo" class="bio-page">
      <div class="bio-page__grain" aria-hidden="true"></div>
      <header class="bio-head">
        <a class="bio-logo" href="/" aria-label="Via Gastrobar, início">
          <img src="/media/logo.jpg" width="856" height="856" alt="Via Gastrobar" />
        </a>
        <p>Gastronomia · drinks · encontros</p>
        <h1>A noite encontra seu lugar à mesa.</h1>
        <span><i aria-hidden="true"></i> Todos os dias · a partir das 18h</span>
      </header>

      <nav class="bio-links" aria-label="Links principais">
        <a class="bio-links__primary" href="${LINKS.whatsapp}">
          Reservar no WhatsApp ${arrow}
        </a>
        <a href="${LINKS.maps}">Como chegar ${arrow}</a>
        <a href="${LINKS.instagram}">Instagram ${arrow}</a>
        <a href="/">Ver site completo ${arrow}</a>
      </nav>

      <section class="bio-strip" aria-label="Galeria curta">
        <figure>
          <img
            src="/media/plate-fish.jpg"
            width="1440"
            height="1440"
            alt="Prato servido no Via Gastrobar"
          />
        </figure>
        <figure>
          <img
            src="/media/drink-coffee.jpg"
            width="1440"
            height="1440"
            alt="Drink servido no Via Gastrobar"
          />
        </figure>
        <figure>
          <img
            src="/media/ambient-table.jpg"
            width="1440"
            height="1920"
            alt="Mesa posta no Via Gastrobar"
          />
        </figure>
      </section>

      <footer class="bio-footer">
        <p>Rua Ipameri, loteamento Dona Nelcia, 3287</p>
        <span>Ao lado do Via Filadélfia</span>
      </footer>
    </main>
  `;
}

function initializeHero() {
  const heroElement = document.querySelector(".hero");
  if (!heroElement) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const toggle = heroElement.querySelector(".motion-toggle");
  const toggleLabel = heroElement.querySelector(".motion-toggle__label");
  const timeline = [
    ["arrival", 700],
    ["table", 5200],
    ["linger", 2800],
  ];

  let index = 0;
  let timer;
  let paused = false;

  const schedule = () => {
    window.clearTimeout(timer);
    if (paused || reducedMotion.matches) return;

    const [scene, duration] = timeline[index];
    heroElement.dataset.scene = scene;
    timer = window.setTimeout(() => {
      index = (index + 1) % timeline.length;
      schedule();
    }, duration);
  };

  toggle?.addEventListener("click", () => {
    paused = !paused;
    heroElement.dataset.paused = String(paused);
    toggle.setAttribute("aria-pressed", String(paused));
    toggleLabel.textContent = paused ? "Retomar movimento" : "Pausar movimento";

    if (paused) {
      window.clearTimeout(timer);
    } else {
      index = 1;
      schedule();
    }
  });

  reducedMotion.addEventListener("change", () => {
    if (reducedMotion.matches) {
      window.clearTimeout(timer);
      heroElement.dataset.scene = "table";
    } else if (!paused) {
      index = 1;
      schedule();
    }
  });

  if (reducedMotion.matches) {
    heroElement.dataset.scene = "table";
  } else {
    schedule();
  }
}

function initializeVideos() {
  const videos = [...document.querySelectorAll(".smart-video")];
  if (!videos.length) return;

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const visibleVideos = new Set();

  const updatePlayback = () => {
    videos.forEach((video) => {
      const canPlay =
        visibleVideos.has(video) && !document.hidden && !reducedMotion.matches;
      if (canPlay) {
        video.play().catch(() => {});
      } else {
        video.pause();
      }
    });
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting && video.dataset.src && !video.src) {
          video.src = video.dataset.src;
          video.load();
        }

        if (entry.intersectionRatio > 0.2) {
          visibleVideos.add(video);
        } else {
          visibleVideos.delete(video);
        }
      });
      updatePlayback();
    },
    { rootMargin: "240px 0px", threshold: [0, 0.2, 0.6] },
  );

  videos.forEach((video) => observer.observe(video));
  document.addEventListener("visibilitychange", updatePlayback);
  reducedMotion.addEventListener("change", updatePlayback);
}

function initializeReveals() {
  const items = document.querySelectorAll(".reveal");
  if (!items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );

  items.forEach((item) => observer.observe(item));
}

function initializeDock() {
  const dock = document.querySelector(".mobile-dock");
  if (!dock) return;

  const update = () => {
    dock.classList.toggle("is-visible", window.scrollY > 420);
  };

  update();
  window.addEventListener("scroll", update, { passive: true });
}

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isInstagram = path === "/instagram";

document.title = isInstagram
  ? "Via Gastrobar — Links"
  : "Via Gastrobar — Gastronomia, drinks e encontros";

document.querySelector("#app").innerHTML = isInstagram
  ? instagramPage()
  : homePage();

initializeHero();
initializeVideos();
initializeReveals();
initializeDock();
