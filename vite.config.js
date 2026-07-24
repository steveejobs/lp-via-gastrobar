import { defineConfig } from "vite";
import { homePage } from "./src/pages/homePage.js";

export default defineConfig({
  plugins: [
    {
      name: "via-static-home",
      transformIndexHtml(html) {
        return html.replace(
          '<div id="app"></div>',
          `<div id="app">${homePage()}</div>`,
        );
      },
    },
  ],
});

