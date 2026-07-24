#!/usr/bin/env node

const fs = require("node:fs/promises");
const path = require("node:path");
const AxeBuilder = require("@axe-core/playwright").default;
const { chromium } = require("playwright");

const URL = process.env.AUDIT_URL || "http://127.0.0.1:4173/instagram.html";
const OUTPUT = path.resolve(
  process.cwd(),
  process.env.AUDIT_OUTPUT || "artifacts/audit/instagram",
);
const VIEWPORTS = [
  { name: "mobile-360x800", width: 360, height: 800 },
  { name: "mobile-375x812", width: 375, height: 812 },
  { name: "mobile-390x844", width: 390, height: 844 },
  { name: "mobile-412x915", width: 412, height: 915 },
  { name: "mobile-430x932", width: 430, height: 932 },
];

async function scrollPage(page) {
  await page.evaluate(async () => {
    const pause = (time) =>
      new Promise((resolve) => window.setTimeout(resolve, time));
    const step = Math.round(window.innerHeight * 0.78);
    const end = document.documentElement.scrollHeight - window.innerHeight;
    for (let top = 0; top < end; top += step) {
      window.scrollTo({ top, behavior: "instant" });
      await pause(90);
    }
    window.scrollTo({ top: end, behavior: "instant" });
    await pause(250);
  });
}

async function auditViewport(browser, viewport) {
  const context = await browser.newContext({
    viewport: { width: viewport.width, height: viewport.height },
    locale: "pt-BR",
    reducedMotion: "no-preference",
  });
  const page = await context.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  page.on("console", (message) => {
    if (message.type() === "error") consoleErrors.push(message.text());
  });
  page.on("requestfailed", (request) => {
    failedRequests.push({
      url: request.url(),
      failure: request.failure()?.errorText || "unknown",
    });
  });

  const response = await page.goto(URL, {
    waitUntil: "domcontentloaded",
    timeout: 45_000,
  });
  await page.waitForTimeout(500);
  await page.screenshot({
    path: path.join(OUTPUT, `${viewport.name}-initial.png`),
  });

  const initial = await page.evaluate(() => ({
    scrollY: window.scrollY,
    documentHeight: document.documentElement.scrollHeight,
    horizontalOverflow: document.documentElement.scrollWidth > innerWidth + 1,
    h1Count: document.querySelectorAll("h1").length,
    resources: performance.getEntriesByType("resource").reduce(
      (summary, resource) => {
        summary.count += 1;
        summary.transferSize += resource.transferSize;
        return summary;
      },
      { count: 0, transferSize: 0 },
    ),
    primaryVisible: Boolean(
      document
        .querySelector(".instagram-action--primary")
        ?.getBoundingClientRect().top < innerHeight,
    ),
    routeVisible: Boolean(
      [...document.querySelectorAll(".instagram-action")][1]
        ?.getBoundingClientRect().top < innerHeight,
    ),
  }));

  await scrollPage(page);
  await page.screenshot({
    fullPage: true,
    path: path.join(OUTPUT, `${viewport.name}-full.png`),
  });

  const touchTargets = await page.evaluate(() =>
    [...document.querySelectorAll("a,button")]
      .filter((element) => {
        const style = getComputedStyle(element);
        return style.visibility !== "hidden" && style.display !== "none";
      })
      .map((element) => {
        const rect = element.getBoundingClientRect();
        return {
          text: element.textContent.trim().replace(/\s+/g, " "),
          width: Math.round(rect.width),
          height: Math.round(rect.height),
        };
      })
      .filter((target) => target.width < 44 || target.height < 44),
  );

  const accessibility = await new AxeBuilder({ page })
    .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
    .analyze()
    .then((result) => ({
      violations: result.violations.map((violation) => ({
        id: violation.id,
        impact: violation.impact,
        nodes: violation.nodes.length,
      })),
      incomplete: result.incomplete.map((item) => ({
        id: item.id,
        nodes: item.nodes.length,
      })),
      passes: result.passes.length,
    }));

  await context.close();
  return {
    viewport,
    status: response?.status() || null,
    initial,
    touchTargets,
    accessibility,
    consoleErrors,
    failedRequests,
  };
}

async function auditLinks(browser) {
  const targets = [
    { name: "whatsapp", selector: 'a[href*="api.whatsapp.com"]' },
    { name: "maps", selector: 'a[href*="maps.app.goo.gl"]' },
    { name: "instagram", selector: 'a[href*="instagram.com"]' },
  ];
  const results = [];

  for (const target of targets) {
    const context = await browser.newContext({
      viewport: { width: 390, height: 844 },
      locale: "pt-BR",
    });
    const page = await context.newPage();
    await page.goto(URL, { waitUntil: "domcontentloaded", timeout: 45_000 });
    const link = page.locator(`${target.selector}:visible`).first();
    const href = await link.getAttribute("href");
    let openedUrl = null;
    try {
      const popupPromise = page
        .waitForEvent("popup", { timeout: 12_000 })
        .catch(() => null);
      await link.click();
      const popup = await popupPromise;
      if (popup) {
        await popup
          .waitForLoadState("domcontentloaded", { timeout: 12_000 })
          .catch(() => {});
        openedUrl = popup.url();
        await popup.close();
      } else {
        openedUrl = "erro: popup não abriu";
      }
    } catch (error) {
      openedUrl = `erro: ${error.name}`;
    }
    results.push({ name: target.name, href, openedUrl });
    await context.close();
  }

  return results;
}

async function main() {
  await fs.mkdir(OUTPUT, { recursive: true });
  const browser = await chromium.launch({
    executablePath:
      process.env.CHROME_PATH ||
      "C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe",
    headless: true,
  });

  try {
    const results = [];
    for (const viewport of VIEWPORTS) {
      process.stdout.write(`Auditando ${viewport.name}...\n`);
      results.push(await auditViewport(browser, viewport));
    }
    const links = await auditLinks(browser);
    await fs.writeFile(
      path.join(OUTPUT, "report.json"),
      `${JSON.stringify(
        {
          generatedAt: new Date().toISOString(),
          url: URL,
          links,
          results,
        },
        null,
        2,
      )}\n`,
      "utf8",
    );
    process.stdout.write(`Relatório salvo em ${OUTPUT}\n`);
  } finally {
    await browser.close();
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
