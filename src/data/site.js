const WHATSAPP_MESSAGE =
  "Olá! Vim pelo site do Via Gastrobar e gostaria de reservar uma mesa.";

export const SITE = {
  name: "Via Gastrobar",
  instagramHandle: "@viagastrobar",
  address: "Rua Ipameri, loteamento Dona Nelcia, 3287",
  reference: "Ao lado do Via Filadélfia",
  hours: "Todos os dias, a partir das 18h",
  phoneLabel: "(63) 99139-4000",
  links: {
    whatsapp: `https://api.whatsapp.com/send?phone=5563991394000&text=${encodeURIComponent(
      WHATSAPP_MESSAGE,
    )}`,
    maps: "https://maps.app.goo.gl/jis5grnFQH36mhWs7",
    instagram: "https://www.instagram.com/viagastrobar/",
    phone: "tel:+5563991394000",
  },
};

export const NAVIGATION = [
  { label: "Experiência", href: "#experiencia" },
  { label: "O lugar", href: "#lugar" },
  { label: "A mesa", href: "#mesa" },
  { label: "O bar", href: "#bar" },
  { label: "Localização", href: "#localizacao" },
];

export const MEDIA = {
  logo: {
    src: "/media/logo-transparent.png",
    width: 856,
    height: 856,
  },
  hero: {
    video: "/media/hero-service.mp4",
    poster: "/media/hero-service-poster.webp",
    room: {
      src: "/media/ambient-bar.webp",
      width: 1440,
      height: 1920,
      alt: "Bar do Via Gastrobar",
      sizes: "(max-width: 900px) 38vw, 24vw",
      loading: "eager",
      fetchPriority: "high",
    },
    salon: {
      src: "/media/ambient-salon.webp",
      width: 1440,
      height: 1920,
      alt: "Salão do Via Gastrobar",
      sizes: "(max-width: 900px) 44vw, 28vw",
      loading: "eager",
      fetchPriority: "high",
    },
  },
  atmosphere: [
    {
      src: "/media/ambient-table.webp",
      width: 1440,
      height: 1920,
      alt: "Mesa redonda posta no salão do Via Gastrobar",
      position: "main",
    },
    {
      src: "/media/ambient-wall.webp",
      width: 1440,
      height: 1920,
      alt: "Parede de madeira com frase iluminada",
      position: "support",
    },
    {
      src: "/media/ambient-wine-wall.webp",
      width: 1440,
      height: 1920,
      alt: "Adega iluminada no Via Gastrobar",
      position: "detail",
    },
  ],
  tableStories: [
    {
      id: "presenca",
      index: "01",
      title: "Presença à mesa",
      copy: "O prato chega ao centro. O resto da noite encontra seu tempo.",
      main: {
        src: "/media/plate-steak-wide.webp",
        width: 1125,
        height: 1406,
        alt: "Prato servido em panela sobre a mesa",
      },
      support: {
        src: "/media/plate-steak-close.webp",
        width: 1125,
        height: 1406,
        alt: "Detalhe do mesmo prato servido",
      },
    },
    {
      id: "ritmo",
      index: "02",
      title: "Do fogo à mesa",
      copy: "O preparo ganha movimento antes de chegar à mesa.",
      main: {
        type: "video",
        src: "/media/plate-lamb-prep.mp4",
        poster: "/media/plate-lamb-prep-poster.webp",
        label: "Preparo de um prato do Via Gastrobar",
      },
      support: {
        src: "/media/plate-lamb-close.webp",
        width: 1440,
        height: 1800,
        alt: "Detalhe do mesmo prato em louça verde",
      },
    },
    {
      id: "servico",
      index: "03",
      title: "Servido sem pressa",
      copy: "Da cozinha à mesa, a noite encontra mais um motivo para ficar.",
      main: {
        src: "/media/plate-fish.webp",
        width: 1440,
        height: 1440,
        alt: "Prato servido em louça verde",
      },
      support: {
        src: "/media/plate-risotto-close.webp",
        width: 1440,
        height: 1440,
        alt: "Detalhe do mesmo prato servido",
      },
    },
  ],
  sea: [
    {
      src: "/media/plate-octopus.webp",
      width: 1290,
      height: 2293,
      alt: "Prato de polvo fotografado de perto",
    },
  ],
  bar: {
    video: "/media/drink-prep.mp4",
    poster: "/media/drink-prep-poster.webp",
    drink: {
      src: "/media/drink-lime.webp",
      width: 1440,
      height: 1440,
      alt: "Drink de limão servido no Via Gastrobar",
    },
    wine: {
      src: "/media/wine-service-02.webp",
      width: 2268,
      height: 2268,
      alt: "Garrafa de vinho apresentada durante o serviço",
    },
  },
  closing: {
    video: "/media/location-close.mp4",
    poster: "/media/ambient-bar.webp",
  },
};
