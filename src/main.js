import "./theme/index.css";
import "./components/layout/layout.css";
import "./components/sections/sections.css";
import "./pages/pages.css";

import { initializeNavigation } from "./interactions/navigation.js";
import { initializeInstagramPage } from "./interactions/instagram.js";
import { initializePageTransitions } from "./interactions/pageTransition.js";
import { initializePointerInteractions } from "./interactions/pointer.js";
import { initializeReveals } from "./interactions/reveal.js";
import { initializeTracking } from "./interactions/tracking.js";
import { initializeVideos } from "./interactions/videos.js";
import { homePage } from "./pages/homePage.js";
import { instagramPage } from "./pages/instagramPage.js";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isInstagram = path === "/instagram" || path === "/instagram.html";

document.title = isInstagram
  ? "Via Gastrobar — Links"
  : "Via Gastrobar — Gastronomia, drinks e noite";

const app = document.querySelector("#app");
const alreadyPrerenderedHome = app.querySelector('[data-page="home"]');
const alreadyPrerenderedInstagram = app.querySelector(
  '[data-page="instagram"]',
);

if (isInstagram && !alreadyPrerenderedInstagram) {
  app.innerHTML = instagramPage();
} else if (!isInstagram && !alreadyPrerenderedHome) {
  app.innerHTML = homePage();
}

if (isInstagram) {
  document.documentElement.classList.add("is-ready");
  initializeInstagramPage();
} else {
  document.documentElement.classList.add("is-ready");
  initializeNavigation();
  initializeReveals();
  initializeVideos();
  initializePointerInteractions();
}

initializePageTransitions();
initializeTracking();
