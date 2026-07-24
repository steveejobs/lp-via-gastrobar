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
  if (
    !items.length ||
    reducedMotion.matches ||
    !("IntersectionObserver" in window)
  ) {
    items.forEach((item) => item.classList.add("is-visible"));
    return;
  }

  const setState = (item, state) => {
    item.classList.toggle("is-visible", state === "visible");
    item.classList.toggle("is-before", state === "before");
    item.classList.toggle("is-after", state === "after");
    item.classList.toggle("will-reveal", state === "before");
  };

  const stateFromBounds = (bounds) => {
    if (bounds.bottom <= window.innerHeight * 0.08) return "after";
    if (bounds.top >= window.innerHeight * 0.92) return "before";
    return "visible";
  };

  items.forEach((item) => {
    setState(item, stateFromBounds(item.getBoundingClientRect()));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const state = entry.isIntersecting
          ? "visible"
          : stateFromBounds(entry.boundingClientRect);
        setState(entry.target, state);
      });
    },
    {
      rootMargin: "-8% 0px -8% 0px",
      threshold: [0, 0.08, 0.3],
    },
  );

  items.forEach((item) => observer.observe(item));

  const restoreStates = () => {
    items.forEach((item) => {
      setState(item, stateFromBounds(item.getBoundingClientRect()));
    });
  };

  window.addEventListener("pageshow", restoreStates);
  window.addEventListener("resize", restoreStates, { passive: true });
}

export function initializeMediaSequences() {
  const sequences = [...document.querySelectorAll("[data-media-sequence]")];
  if (!sequences.length) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const visibleSequences = new Set();
  const updateSequence = (sequence) => {
    sequence.classList.toggle(
      "is-sequence-active",
      visibleSequences.has(sequence) && !document.hidden,
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) visibleSequences.add(entry.target);
        else visibleSequences.delete(entry.target);
        updateSequence(entry.target);
      });
    },
    { rootMargin: "120px 0px", threshold: 0.08 },
  );

  sequences.forEach((sequence) => observer.observe(sequence));
  document.addEventListener("visibilitychange", () => {
    sequences.forEach(updateSequence);
  });
}
