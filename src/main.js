import "./theme/index.css";
import "./components/layout/layout.css";
import "./components/sections/sections.css";
import "./pages/pages.css";

import { initializeNavigation } from "./interactions/navigation.js";
import { initializePageTransitions } from "./interactions/pageTransition.js";
import { initializePointerInteractions } from "./interactions/pointer.js";
import { initializeReveals } from "./interactions/reveal.js";
import { initializeVideos } from "./interactions/videos.js";
import { homePage } from "./pages/homePage.js";
import { instagramPage } from "./pages/instagramPage.js";

const path = window.location.pathname.replace(/\/+$/, "") || "/";
const isInstagram = path === "/instagram";

document.title = isInstagram
  ? "Via Gastrobar — Links"
  : "Via Gastrobar — Gastronomia, drinks e noite";

const app = document.querySelector("#app");
const alreadyPrerendered = app.querySelector('[data-page="home"]');

if (isInstagram) {
  app.innerHTML = instagramPage();
} else if (!alreadyPrerendered) {
  app.innerHTML = homePage();
}

document.documentElement.classList.add("is-ready");

if (!isInstagram) {
  initializeNavigation();
  initializeReveals();
  initializeVideos();
  initializePointerInteractions();
}

initializePageTransitions();
