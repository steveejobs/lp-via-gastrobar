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
    if (bounds.bottom <= window.innerHeight * 0.03) return "after";
    if (bounds.top >= window.innerHeight * 0.8) return "before";
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
      rootMargin: "-3% 0px -20% 0px",
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
  const transitionTimers = new WeakMap();
  const cycleTimers = new WeakMap();
  const sequenceSteps = new WeakMap();
  const showSequenceStep = (sequence, step) => {
    const items = [...sequence.querySelectorAll(".media-sequence__item")];
    if (!items.length) return false;

    const offset = Number(sequence.dataset.sequenceOffset || 0);
    const nextIndex = (step + offset) % items.length;
    const nextItem = items[nextIndex];
    if (!nextItem.complete || nextItem.naturalWidth === 0) return false;

    const currentItem = items.find((item) =>
      item.classList.contains("is-sequence-current"),
    );
    if (currentItem === nextItem) return false;

    const delay = Number(sequence.dataset.sequenceDelay || 0);
    window.clearTimeout(transitionTimers.get(sequence));
    items.forEach((item) => {
      item.classList.remove("is-sequence-entering", "is-sequence-leaving");
    });

    if (currentItem) {
      currentItem.classList.add("is-sequence-leaving");
      nextItem.classList.add("is-sequence-entering");
      sequence.classList.remove("is-sequence-transitioning");
      sequence.getBoundingClientRect();
      sequence.classList.add("is-sequence-transitioning");
    }

    items.forEach((item) => item.classList.remove("is-sequence-current"));
    nextItem.classList.add("is-sequence-current");

    if (currentItem) {
      const timer = window.setTimeout(() => {
        items.forEach((item) => {
          item.classList.remove("is-sequence-entering", "is-sequence-leaving");
        });
        sequence.classList.remove("is-sequence-transitioning");
      }, 1700 + delay);
      transitionTimers.set(sequence, timer);
    }
    return true;
  };

  const updateSequence = (sequence) => {
    sequence.classList.toggle(
      "is-sequence-active",
      visibleSequences.has(sequence) && !document.hidden,
    );
  };

  const scheduleSequence = (sequence) => {
    window.clearTimeout(cycleTimers.get(sequence));
    if (!visibleSequences.has(sequence) || document.hidden) return;

    const timer = window.setTimeout(() => {
      const nextStep = (sequenceSteps.get(sequence) || 0) + 1;
      if (showSequenceStep(sequence, nextStep)) {
        sequenceSteps.set(sequence, nextStep);
      }
      scheduleSequence(sequence);
    }, 6000);
    cycleTimers.set(sequence, timer);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!visibleSequences.has(entry.target)) {
            visibleSequences.add(entry.target);
            scheduleSequence(entry.target);
          }
        } else {
          visibleSequences.delete(entry.target);
          window.clearTimeout(cycleTimers.get(entry.target));
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
  document.addEventListener("visibilitychange", () => {
    sequences.forEach((sequence) => {
      updateSequence(sequence);
      if (document.hidden) {
        window.clearTimeout(cycleTimers.get(sequence));
      } else if (visibleSequences.has(sequence)) {
        scheduleSequence(sequence);
      }
    });
  });
}
