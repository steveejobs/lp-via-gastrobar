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
  let sequenceStep = 0;
  const showSequenceStep = (sequence, step) => {
    const items = [...sequence.querySelectorAll(".media-sequence__item")];
    if (!items.length) return;

    const offset = Number(sequence.dataset.sequenceOffset || 0);
    const nextIndex = (step + offset) % items.length;
    const nextItem = items[nextIndex];
    if (!nextItem.complete || nextItem.naturalWidth === 0) return;

    items.forEach((item) => item.classList.remove("is-sequence-current"));
    nextItem.classList.add("is-sequence-current");
  };

  const updateSequence = (sequence) => {
    sequence.classList.toggle(
      "is-sequence-active",
      visibleSequences.has(sequence) && !document.hidden,
    );
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          visibleSequences.add(entry.target);
          showSequenceStep(entry.target, sequenceStep);
        } else {
          visibleSequences.delete(entry.target);
        }
        updateSequence(entry.target);
      });
    },
    { rootMargin: "120px 0px", threshold: 0.08 },
  );

  sequences.forEach((sequence) => {
    const items = [...sequence.querySelectorAll(".media-sequence__item")];
    items.forEach((item) => {
      item.addEventListener("error", () => {
        item.classList.remove("is-sequence-current");
        const fallback = items.find(
          (candidate) =>
            candidate !== item &&
            candidate.complete &&
            candidate.naturalWidth > 0,
        );
        fallback?.classList.add("is-sequence-current");
      });
      item.addEventListener("load", () => {
        if (
          !items.some((candidate) =>
            candidate.classList.contains("is-sequence-current"),
          )
        ) {
          item.classList.add("is-sequence-current");
        }
      });
    });
    observer.observe(sequence);
  });
  window.setInterval(() => {
    if (document.hidden) return;
    sequenceStep += 1;
    visibleSequences.forEach((sequence) =>
      showSequenceStep(sequence, sequenceStep),
    );
  }, 6000);

  document.addEventListener("visibilitychange", () => {
    sequences.forEach(updateSequence);
  });
}

export function initializeSeaGalleries() {
  const galleries = [...document.querySelectorAll("[data-sea-gallery]")];
  if (!galleries.length) return;

  const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
  if (reducedMotion.matches || !("IntersectionObserver" in window)) return;

  const visibleGalleries = new Set();
  const advanceGallery = (gallery) => {
    if (gallery.classList.contains("is-shifting")) return;

    const track = gallery.querySelector(".sea-gallery__track");
    const firstItem = track?.firstElementChild;
    if (!track || !firstItem) return;

    const gap = Number.parseFloat(getComputedStyle(track).columnGap) || 0;
    const distance = firstItem.getBoundingClientRect().width + gap;
    track.style.setProperty("--sea-shift", `${distance}px`);
    gallery.classList.add("is-shifting");

    let fallbackTimer;
    const finish = (event) => {
      if (
        event &&
        (event.target !== track || event.propertyName !== "transform")
      ) {
        return;
      }

      window.clearTimeout(fallbackTimer);
      track.removeEventListener("transitionend", finish);
      track.append(firstItem);
      gallery.classList.add("is-resetting");
      gallery.classList.remove("is-shifting");
      track.getBoundingClientRect();
      requestAnimationFrame(() => gallery.classList.remove("is-resetting"));
    };

    track.addEventListener("transitionend", finish);
    fallbackTimer = window.setTimeout(() => finish(), 1500);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        galleryToggle(entry.target, entry.isIntersecting);
      });
    },
    { rootMargin: "100px 0px", threshold: 0.12 },
  );

  const galleryToggle = (gallery, isVisible) => {
    if (isVisible) visibleGalleries.add(gallery);
    else visibleGalleries.delete(gallery);
  };

  galleries.forEach((gallery) => observer.observe(gallery));
  window.setInterval(() => {
    if (document.hidden) return;
    visibleGalleries.forEach(advanceGallery);
  }, 4600);
}
