#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const AxeBuilder = require("@axe-core/playwright").default;
const { chromium } = require("playwright");

const BASE_URL = process.env.AUDIT_URL || "http://127.0.0.1:4173";
const OUTPUT_ROOT = path.resolve(
  process.cwd(),
  process.env.AUDIT_OUTPUT || "artifacts/audit/current",
);

const VIEWPORTS = [
  { name: "desktop-1440x900", width: 1440, height: 900 },
  { name: "desktop-1366x768", width: 1366, height: 768 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-375x812", width: 375, height: 812 },
  { name: "mobile-430x932", width: 430, height: 932 },
];

async function incrementalScroll(page) {
  await page.evaluate(async () => {
    const wait = (duration) =>
      new Promise((resolve) => window.setTimeout(resolve, duration));
    const step = Math.max(260, Math.round(window.innerHeight * 0.72));
    const end = document.documentElement.scrollHeight - window.innerHeight;

    for (let y = 0; y < end; y += step) {
      window.scrollTo({ top: y, behavior: "instant" });
      await wait(90);
    }

    window.scrollTo({ top: end, behavior: "instant" });
    await wait(350);
  });
}

async function collectRuntimeData(page) {
  return page.evaluate(() => {
    const links = [...document.querySelectorAll("a[href]")].map((link) => ({
      label: link.textContent.trim().replace(/\s+/g, " "),
      href: link.href,
      visible: Boolean(
        link.offsetWidth ||
          link.offsetHeight ||
          link.getClientRects().length,
      ),
    }));

    const videos = [...document.querySelectorAll("video")].map((video) => ({
      src: video.currentSrc || video.src || video.dataset.src || "",
      paused: video.paused,
      readyState: video.readyState,
      preload: video.preload,
      inViewport:
        video.getBoundingClientRect().top < window.innerHeight &&
        video.getBoundingClientRect().bottom > 0,
    }));

    const navigation = performance.getEntriesByType("navigation")[0];
    const resources = performance.getEntriesByType("resource");

    return {
      title: document.title,
      lang: document.documentElement.lang,
      headings: [...document.querySelectorAll("h1,h2,h3")].map((heading) => ({
        level: heading.tagName,
        text: heading.textContent.trim().replace(/\s+/g, " "),
      })),
      links,
      videos,
      document: {
        width: document.documentElement.scrollWidth,
        height: document.documentElement.scrollHeight,
        viewportWidth: window.innerWidth,
        viewportHeight: window.innerHeight,
        horizontalOverflow:
          document.documentElement.scrollWidth > window.innerWidth + 1,
      },
      timing: navigation
        ? {
            domContentLoaded: Math.round(
              navigation.domContentLoadedEventEnd,
            ),
            load: Math.round(navigation.loadEventEnd),
            responseStart: Math.round(navigation.responseStart),
            transferSize: navigation.transferSize,
          }
        : null,
      resources: {
        count: resources.length,
        transferSize: Math.round(
          resources.reduce((total, item) => total + item.transferSize, 0),
        ),
        imageCount: resources.filter(
          (item) => item.initiatorType === "img",
        ).length,
        videoCount: resources.filter(
          (item) => item.initiatorType === "video",
        ).length,
      },
      vitals: window.__auditVitals || {},
    };
  });
}

async function collectInitialSnapshot(page) {
  return page.evaluate(() => {
    const resources = performance.getEntriesByType("resource");
    return {
      scrollY: window.scrollY,
      vitals: { ...(window.__auditVitals || {}) },
      resources: {
        count: resources.length,
        transferSize: Math.round(
          resources.reduce((total, item) => total + item.transferSize, 0),
        ),
        images: resources.filter((item) => item.initiatorType === "img").length,
        videos: resources.filter((item) => item.initiatorType === "video").length,
      },
    };
  });
}

async function auditViewport(browser, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    colorScheme: "dark",
    locale: "pt-BR",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const consoleMessages = [];
  const pageErrors = [];
  const failedRequests = [];

  page.on("console", (message) => {
    if (["error", "warning"].includes(message.type())) {
      consoleMessages.push({
        type: message.type(),
        text: message.text(),
      });
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || "unknown",
    });
  });

  await page.addInitScript(() => {
    window.__auditVitals = { cls: 0, lcp: null, longTasks: 0 };

    new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const last = entries.at(-1);
      if (last) window.__auditVitals.lcp = Math.round(last.startTime);
    }).observe({ type: "largest-contentful-paint", buffered: true });

    new PerformanceObserver((list) => {
      list.getEntries().forEach((entry) => {
        if (!entry.hadRecentInput) {
          window.__auditVitals.cls += entry.value;
        }
      });
    }).observe({ type: "layout-shift", buffered: true });

    new PerformanceObserver((list) => {
      window.__auditVitals.longTasks += list.getEntries().length;
    }).observe({ type: "longtask", buffered: true });
  });

  const response = await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });

  await page.screenshot({
    path: path.join(OUTPUT_ROOT, `${viewport.name}-initial.png`),
  });
  await page.waitForTimeout(2200);
  await page.screenshot({
    path: path.join(OUTPUT_ROOT, `${viewport.name}-settled.png`),
  });
  const initialSnapshot = await collectInitialSnapshot(page);

  const menuTrigger = page.locator(
    '[data-menu-trigger], button[aria-controls*="menu" i]',
  );
  let menu = { available: false };
  if ((await menuTrigger.count()) && (await menuTrigger.first().isVisible())) {
    menu = { available: true };
    await menuTrigger.first().click();
    await page.waitForTimeout(250);
    menu.expanded =
      (await menuTrigger.first().getAttribute("aria-expanded")) === "true";
    await page.screenshot({
      path: path.join(OUTPUT_ROOT, `${viewport.name}-menu.png`),
    });
    await menuTrigger.first().click();
  }

  await incrementalScroll(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(OUTPUT_ROOT, `${viewport.name}-full.png`),
  });

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze()
    .then((result) => ({
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        description: violation.description,
        nodes: violation.nodes.length,
      })),
      passes: result.passes.length,
      incomplete: result.incomplete.length,
    }))
    .catch((error) => ({
      error: error.message,
      violations: [],
      passes: 0,
      incomplete: 0,
    }));

  const runtime = await collectRuntimeData(page);
  await context.close();

  return {
    viewport,
    status: response?.status() || null,
    menu,
    consoleMessages,
    pageErrors,
    failedRequests,
    initialSnapshot,
    accessibility,
    ...runtime,
  };
}

async function auditInteractions(browser) {
  const links = [
    { name: "whatsapp", selector: 'a[href*="api.whatsapp.com"]' },
    { name: "route", selector: 'a[href*="maps.app.goo.gl"]' },
    { name: "instagram", selector: 'a[href*="instagram.com"]' },
  ];
  const clicks = [];

  for (const item of links) {
    const linkContext = await browser.newContext({
      viewport: { width: 390, height: 844 },
      locale: "pt-BR",
    });
    const page = await linkContext.newPage();
    await page.goto(BASE_URL, {
      waitUntil: "domcontentloaded",
      timeout: 45_000,
    });
    const link = page.locator(`${item.selector}:visible`).first();
    const href = await link.getAttribute("href");
    let openedUrl = null;
    try {
      const popupPromise = linkContext.waitForEvent("page", { timeout: 12_000 });
      await link.click();
      const popup = await popupPromise;
      await popup
        .waitForLoadState("domcontentloaded", { timeout: 12_000 })
        .catch(() => {});
      await popup.waitForTimeout(500);
      openedUrl = popup.url();
      await popup.close();
    } catch (error) {
      openedUrl = `erro: ${error.name}`;
    }
    clicks.push({ name: item.name, href, openedUrl });
    await linkContext.close();
  }

  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: "pt-BR",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  const barVideo = page.locator("#bar video").first();
  await barVideo.scrollIntoViewIfNeeded();
  await page.waitForTimeout(1_200);
  const videoInView = await barVideo.evaluate((video) => ({
    paused: video.paused,
    readyState: video.readyState,
    currentTime: video.currentTime,
  }));
  await page.evaluate(() => window.scrollTo({ top: 0, behavior: "instant" }));
  await page.waitForTimeout(350);
  const videoAfterReturn = await barVideo.evaluate((video) => ({
    paused: video.paused,
    currentTime: video.currentTime,
  }));

  const result = {
    clicks,
    returnPreserved: new URL(page.url()).origin === new URL(BASE_URL).origin,
    videoInView,
    videoAfterReturn,
  };
  await context.close();
  return result;
}

async function auditReducedMotion(browser) {
  const context = await browser.newContext({
    viewport: { width: 390, height: 844 },
    locale: "pt-BR",
    reducedMotion: "reduce",
  });
  const page = await context.newPage();
  await page.goto(BASE_URL, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForTimeout(400);
  const state = await page.evaluate(() => ({
    reducedMotion: matchMedia("(prefers-reduced-motion: reduce)").matches,
    playingVideos: [...document.querySelectorAll("video")].filter(
      (video) => !video.paused,
    ).length,
    hiddenRevealItems: [...document.querySelectorAll(".reveal")].filter(
      (item) => getComputedStyle(item).opacity === "0",
    ).length,
  }));
  await incrementalScroll(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(OUTPUT_ROOT, "mobile-390x844-reduced-motion.png"),
  });
  await context.close();
  return state;
}

async function main() {
  await fs.mkdir(OUTPUT_ROOT, { recursive: true });

  const executablePath =
    process.env.CHROME_PATH ||
    "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe";
  const browser = await chromium.launch({
    executablePath,
    headless: true,
  });

  try {
    const results = [];
    for (const viewport of VIEWPORTS) {
      process.stdout.write(`Auditando ${viewport.name}...\n`);
      results.push(await auditViewport(browser, viewport));
    }
    const reducedMotion = await auditReducedMotion(browser);
    const interactions = await auditInteractions(browser);
    const report = {
      generatedAt: new Date().toISOString(),
      url: BASE_URL,
      reducedMotion,
      interactions,
      results,
    };
    await fs.writeFile(
      path.join(OUTPUT_ROOT, "report.json"),
      `${JSON.stringify(report, null, 2)}\n`,
      "utf8",
    );
    process.stdout.write(`Relatório salvo em ${OUTPUT_ROOT}\n`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
