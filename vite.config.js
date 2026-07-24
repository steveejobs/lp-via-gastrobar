import { defineConfig } from "vite";
import { resolve } from "node:path";
import { homePage } from "./src/pages/homePage.js";
import { instagramPage } from "./src/pages/instagramPage.js";

export default defineConfig({
  plugins: [
    {
      name: "via-static-home",
      transformIndexHtml(html, context) {
        const page = context.path?.endsWith("instagram.html")
          ? instagramPage()
          : homePage();
        return html.replace(
          '<div id="app"></div>',
          `<div id="app">${page}</div>`,
        );
      },
    },
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(process.cwd(), "index.html"),
        instagram: resolve(process.cwd(), "instagram.html"),
      },
    },
  },
});
