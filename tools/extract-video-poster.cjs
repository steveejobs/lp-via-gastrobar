#!/usr/bin/env node

const fileSystem = require("node:fs");
const fs = require("node:fs/promises");
const http = require("node:http");
const path = require("node:path");
const { chromium } = require("playwright");

async function serveVideo(input) {
  const stats = await fs.stat(input);
  const server = http.createServer((request, response) => {
    const range = request.headers.range;
    if (range) {
      const [startText, endText] = range.replace("bytes=", "").split("-");
      const start = Number.parseInt(startText, 10);
      const end = endText
        ? Number.parseInt(endText, 10)
        : stats.size - 1;
      response.writeHead(206, {
        "Content-Type": "video/mp4",
        "Access-Control-Allow-Origin": "*",
        "Accept-Ranges": "bytes",
        "Content-Range": `bytes ${start}-${end}/${stats.size}`,
        "Content-Length": end - start + 1,
      });
      fileSystem.createReadStream(input, { start, end }).pipe(response);
      return;
    }

    response.writeHead(200, {
      "Content-Type": "video/mp4",
      "Access-Control-Allow-Origin": "*",
      "Accept-Ranges": "bytes",
      "Content-Length": stats.size,
    });
    fileSystem.createReadStream(input).pipe(response);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  return {
    server,
    url: `http://127.0.0.1:${server.address().port}/video.mp4`,
  };
}

async function main() {
  const [inputArg, outputArg, timeArg = "1"] = process.argv.slice(2);
  if (!inputArg || !outputArg) {
    throw new Error(
      "Uso: node tools/extract-video-poster.cjs <video> <saida.jpg> [segundos]",
    );
  }

  const input = path.resolve(process.cwd(), inputArg);
  const output = path.resolve(process.cwd(), outputArg);
  const time = Number(timeArg);
  await fs.access(input);
  await fs.mkdir(path.dirname(output), { recursive: true });
  const { server, url } = await serveVideo(input);

  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  try {
    const page = await browser.newPage();
    await page.setContent(
      `<video crossorigin="anonymous" muted playsinline preload="auto" src="${url}"></video>`,
    );
    const dataUrl = await page.evaluate(async (targetTime) => {
      const video = document.querySelector("video");
      await new Promise((resolve, reject) => {
        if (video.readyState >= 1) {
          resolve();
          return;
        }
        video.addEventListener("loadedmetadata", resolve, { once: true });
        video.addEventListener("error", reject, { once: true });
      });
      await new Promise((resolve) => {
        video.addEventListener("seeked", resolve, { once: true });
        video.currentTime = Math.min(targetTime, Math.max(0, video.duration - 0.1));
      });

      const canvas = document.createElement("canvas");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      canvas.getContext("2d").drawImage(video, 0, 0);
      return canvas.toDataURL("image/jpeg", 0.88);
    }, time);

    const encoded = dataUrl.replace(/^data:image\/jpeg;base64,/, "");
    await fs.writeFile(output, Buffer.from(encoded, "base64"));
    process.stdout.write(`Poster salvo em ${output}\n`);
  } finally {
    await browser.close();
    await new Promise((resolve) => server.close(resolve));
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
