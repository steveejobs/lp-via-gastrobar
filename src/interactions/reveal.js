const textMotionSelector = [
  ".hero__copy h1",
  ".opening-note h2",
  ".chapter-heading h2",
  ".table-story__copy h3",
  ".sea-note h3",
  ".bar-composition__copy p",
  ".reservation-bridge h2",
  ".visit-section__content h2",
].join(",");

export function prepareTextMotion() {
  document.querySelectorAll(textMotionSelector).forEach((element) => {
    if (element.dataset.motionReady === "true") return;

    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
    );
    const textNodes = [];
    let currentNode = walker.nextNode();

    while (currentNode) {
      if (currentNode.textContent.trim()) textNodes.push(currentNode);
      currentNode = walker.nextNode();
    }

    let letterIndex = 0;
    textNodes.forEach((textNode) => {
      const fragment = document.createDocumentFragment();
      const parts = textNode.textContent.split(/(\s+)/);

      parts.forEach((part) => {
        if (!part) return;
        if (/^\s+$/.test(part)) {
          fragment.append(document.createTextNode(part));
          return;
        }

        const word = document.createElement("span");
        word.className = "motion-word";
        Array.from(part).forEach((letter) => {
          const character = document.createElement("span");
          character.className = "motion-letter";
          character.style.setProperty("--letter-index", letterIndex);
          character.style.setProperty(
            "--letter-delay",
            `${letterIndex * 14}ms`,
          );
          character.textContent = letter;
          word.append(character);
          letterIndex += 1;
        });
        fragment.append(word);
      });

      textNode.replaceWith(fragment);
    });

    element.dataset.motionReady = "true";
  });
}

export function initializeReveals() {
  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  const items = [...document.querySelectorAll(".reveal")];
  if (!items.length || reducedMotion.matches || !("IntersectionObserver" in window)) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  items.forEach((item) => {
    if (item.getBoundingClientRect().top > window.innerHeight * 0.92) {
      item.classList.add("will-reveal");
    } else {
      item.classList.add("is-visible");
    }
  });

  const pendingItems = new Set(
    items.filter((item) => item.classList.contains("will-reveal")),
  );
  let fallbackFrame = 0;
  let observer;

  const revealItem = (item) => {
    item.classList.add("is-visible");
    item.classList.remove("will-reveal");
    pendingItems.delete(item);
    observer?.unobserve(item);
  };

  observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting || entry.boundingClientRect.top < 0) {
          revealItem(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -5% 0px", threshold: 0.05 },
  );

  pendingItems.forEach((item) => observer.observe(item));

  const revealPassedItems = () => {
    window.cancelAnimationFrame(fallbackFrame);
    fallbackFrame = window.requestAnimationFrame(() => {
      pendingItems.forEach((item) => {
        if (item.getBoundingClientRect().top < window.innerHeight * 0.94) {
          revealItem(item);
        }
      });
    });
  };

  window.addEventListener("scroll", revealPassedItems, { passive: true });
  window.addEventListener("resize", revealPassedItems, { passive: true });
}
