#!/usr/bin/env node

const fileSystem = require("node:fs");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

const ROOT = process.cwd();
const OUTPUT = path.resolve(
  ROOT,
  process.env.MEDIA_INVENTORY_OUTPUT || "artifacts/media-inventory",
);
const IMAGE_EXTENSIONS = new Set([".jpg", ".jpeg", ".png", ".webp"]);
const VIDEO_EXTENSIONS = new Set([".mp4", ".webm", ".mov"]);

function contentType(filePath) {
  const extension = path.extname(filePath).toLowerCase();
  return (
    {
      ".jpg": "image/jpeg",
      ".jpeg": "image/jpeg",
      ".png": "image/png",
      ".webp": "image/webp",
      ".mp4": "video/mp4",
      ".webm": "video/webm",
      ".mov": "video/quicktime",
    }[extension] || "application/octet-stream"
  );
}

async function listOriginals() {
  const entries = await fs.readdir(ROOT, { withFileTypes: true });
  return entries
    .filter((entry) => entry.isFile())
    .map((entry) => entry.name)
    .filter((name) => {
      const extension = path.extname(name).toLowerCase();
      return IMAGE_EXTENSIONS.has(extension) || VIDEO_EXTENSIONS.has(extension);
    })
    .sort((a, b) => a.localeCompare(b, "pt-BR", { numeric: true }));
}

async function createServer() {
  const server = http.createServer(async (request, response) => {
    try {
      const pathname = decodeURIComponent(new URL(request.url, "http://x").pathname);
      const filename = pathname.replace(/^\/media\//, "");
      const candidate = path.resolve(ROOT, filename);

      if (
        !pathname.startsWith("/media/") ||
        path.dirname(candidate) !== ROOT
      ) {
        response.writeHead(404).end("Not found");
        return;
      }

      const stats = await fs.stat(candidate);
      const range = request.headers.range;
      const headers = {
        "Content-Type": contentType(candidate),
        "Cache-Control": "no-store",
        "Accept-Ranges": "bytes",
      };

      if (range) {
        const [startText, endText] = range.replace("bytes=", "").split("-");
        const start = Number.parseInt(startText, 10);
        const end = endText
          ? Number.parseInt(endText, 10)
          : stats.size - 1;
        response.writeHead(206, {
          ...headers,
          "Content-Range": `bytes ${start}-${end}/${stats.size}`,
          "Content-Length": end - start + 1,
        });
        fileSystem.createReadStream(candidate, { start, end }).pipe(response);
        return;
      }

      response.writeHead(200, {
        ...headers,
        "Content-Length": stats.size,
      });
      fileSystem.createReadStream(candidate).pipe(response);
    } catch {
      response.writeHead(404).end("Not found");
    }
  });

  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  const address = server.address();
  return {
    server,
    baseUrl: `http://127.0.0.1:${address.port}`,
  };
}

function pageMarkup(files, baseUrl) {
  const cards = files
    .map((filename) => {
      const encoded = filename
        .split("/")
        .map(encodeURIComponent)
        .join("/");
      const src = `${baseUrl}/media/${encoded}`;
      const extension = path.extname(filename).toLowerCase();
      const media = IMAGE_EXTENSIONS.has(extension)
        ? `<img src="${src}" alt="" />`
        : `
          <div class="video-frames" data-video="${src}">
            <video muted playsinline preload="metadata" src="${src}"></video>
            <video muted playsinline preload="metadata" src="${src}"></video>
            <video muted playsinline preload="metadata" src="${src}"></video>
          </div>
        `;
      return `
        <article class="card">
          <div class="media">${media}</div>
          <strong>${filename}</strong>
          <span class="meta">carregando metadados…</span>
        </article>
      `;
    })
    .join("");

  return `
    <!doctype html>
    <html lang="pt-BR">
      <head>
        <meta charset="utf-8" />
        <style>
          * { box-sizing: border-box; }
          body {
            margin: 0;
            padding: 32px;
            color: #f5ead9;
            background: #0d1f1c;
            font: 14px/1.45 Arial, sans-serif;
          }
          h1 { margin: 0 0 28px; font: 34px Georgia, serif; }
          .grid {
            display: grid;
            grid-template-columns: repeat(4, minmax(0, 1fr));
            gap: 18px;
          }
          .card {
            min-width: 0;
            padding: 10px;
            border: 1px solid #3a514a;
            background: #132926;
          }
          .media {
            height: 280px;
            margin-bottom: 10px;
            overflow: hidden;
            background: #091412;
          }
          img, video {
            width: 100%;
            height: 100%;
            display: block;
            object-fit: contain;
          }
          .video-frames {
            height: 100%;
            display: grid;
            grid-template-columns: repeat(3, 1fr);
            gap: 3px;
          }
          strong, .meta { display: block; overflow-wrap: anywhere; }
          strong { color: #f0dfc8; }
          .meta { margin-top: 3px; color: #aebcb7; font-size: 11px; }
        </style>
      </head>
      <body>
        <h1>Inventário visual — originais Via Gastrobar</h1>
        <main class="grid">${cards}</main>
      </body>
    </html>
  `;
}

async function prepareMedia(page) {
  await page.waitForFunction(() =>
    [...document.images].every((image) => image.complete),
  );

  await page.evaluate(async () => {
    const waitForMetadata = (video) =>
      new Promise((resolve) => {
        if (video.readyState >= 1) {
          resolve();
          return;
        }
        video.addEventListener("loadedmetadata", resolve, { once: true });
        video.addEventListener("error", resolve, { once: true });
      });
    const seek = (video, time) =>
      new Promise((resolve) => {
        video.addEventListener("seeked", resolve, { once: true });
        video.currentTime = time;
      });

    await Promise.all(
      [...document.querySelectorAll(".video-frames")].map(async (group) => {
        const videos = [...group.querySelectorAll("video")];
        await Promise.all(videos.map(waitForMetadata));
        const duration = videos[0]?.duration || 0;
        await Promise.all(
          videos.map((video, index) =>
            seek(video, duration * [0.12, 0.5, 0.86][index]),
          ),
        );
      }),
    );

    document.querySelectorAll(".card").forEach((card) => {
      const image = card.querySelector("img");
      const video = card.querySelector("video");
      const meta = card.querySelector(".meta");
      if (image) {
        meta.textContent = `${image.naturalWidth}×${image.naturalHeight} · imagem`;
      } else if (video) {
        meta.textContent = `${video.videoWidth}×${video.videoHeight} · ${video.duration.toFixed(1)}s · vídeo (12% / 50% / 86%)`;
      }
    });
  });
}

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });
  const files = await listOriginals();
  const { server, baseUrl } = await createServer();
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  try {
    const page = await browser.newPage({
      viewport: { width: 1600, height: 1000 },
      deviceScaleFactor: 1,
    });
    await page.setContent(pageMarkup(files, baseUrl), {
      waitUntil: "domcontentloaded",
    });
    await prepareMedia(page);
    await page.screenshot({
      fullPage: true,
      path: path.join(OUTPUT, "originals-contact-sheet.png"),
    });

    const inventory = await page.evaluate(() =>
      [...document.querySelectorAll(".card")].map((card) => ({
        file: card.querySelector("strong").textContent,
        metadata: card.querySelector(".meta").textContent,
      })),
    );
    await fs.writeFile(
      path.join(OUTPUT, "inventory.json"),
      `${JSON.stringify(inventory, null, 2)}\n`,
      "utf8",
    );
    process.stdout.write(`Inventário salvo em ${OUTPUT}\n`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
