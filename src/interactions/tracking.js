function sendToAvailableAnalytics(name, properties) {
  if (typeof window.gtag === "function") {
    window.gtag("event", name, properties);
  }

  if (typeof window.plausible === "function") {
    window.plausible(name, { props: properties });
  }

  if (Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: name,
      ...properties,
    });
  }
}

export function initializeTracking() {
  document.addEventListener("click", (event) => {
    const target = event.target.closest("[data-track]");
    if (!target) return;

    const name = target.dataset.track;
    const properties = {
      page: window.location.pathname,
      destination: target.getAttribute("href") || "",
      label: target.textContent.trim().replace(/\s+/g, " "),
    };

    sendToAvailableAnalytics(name, properties);
    window.dispatchEvent(
      new CustomEvent("via:conversion", {
        detail: { name, ...properties },
      }),
    );
  });
}
