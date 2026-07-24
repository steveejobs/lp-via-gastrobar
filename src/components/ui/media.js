function responsiveSrcSet(image) {
  if (!image.src?.startsWith("/media/") || !image.src.endsWith(".webp")) {
    return "";
  }
  const filename = image.src.split("/").at(-1).replace(/\.webp$/, "");
  const candidates = [480, 960]
    .filter((width) => width < image.width)
    .map(
      (width) => `/media/responsive/${filename}-${width}.webp ${width}w`,
    );
  return [...candidates, `${image.src} ${image.width}w`].join(", ");
}

export function responsiveImage(image, className = "") {
  const srcset = responsiveSrcSet(image);
  const loading = image.loading || "lazy";
  const fetchPriority =
    image.fetchPriority || (loading === "eager" ? "high" : "auto");
  const fallback = image.fallbackSrc
    ? `onerror="this.onerror=null; this.removeAttribute('srcset'); this.src='${image.fallbackSrc}'"`
    : "";

  return `
    <img
      class="${className}"
      src="${image.src}"
      ${srcset ? `srcset="${srcset}"` : ""}
      sizes="${
        image.sizes ||
        "(max-width: 560px) 88vw, (max-width: 900px) 48vw, 44vw"
      }"
      width="${image.width}"
      height="${image.height}"
      loading="${loading}"
      fetchpriority="${fetchPriority}"
      decoding="async"
      ${fallback}
      alt="${image.alt}"
    />
  `;
}

export function responsiveImageSequence(
  images,
  {
    className = "",
    label = "Sequência de imagens",
    offset = 0,
    transition = "soft",
  } = {},
) {
  const sequenceClass = `media-sequence media-sequence--${Math.min(
    images.length,
    3,
  )} ${className}`.trim();

  return `
    <span
      class="${sequenceClass}"
      role="img"
      aria-label="${label}"
      data-media-sequence
      data-sequence-offset="${offset}"
      data-sequence-transition="${transition}"
    >
      ${images
        .map((image, index) =>
          responsiveImage(
            {
              ...image,
              alt: "",
              sizes:
                image.sizes ||
                "(max-width: 560px) 88vw, (max-width: 900px) 46vw, 30vw",
            },
            `media-sequence__item${
              index === offset % images.length
                ? " is-sequence-current"
                : ""
            }`,
          ).replace(
            `class="media-sequence__item${
              index === offset % images.length
                ? " is-sequence-current"
                : ""
            }"`,
            `class="media-sequence__item${
              index === offset % images.length
                ? " is-sequence-current"
                : ""
            }" aria-hidden="true"`,
          ),
        )
        .join("")}
    </span>
  `;
}

export function smartVideo({
  src,
  playlist = [],
  poster,
  label,
  className = "",
  preload = "none",
  eager = false,
  priority = false,
  posterWidth = 720,
  posterSizes = "(max-width: 900px) 58vw, 44vw",
  loopStart,
  loopEnd,
}) {
  const source = eager ? `src="${src}"` : `data-src="${src}"`;
  const playlistAttribute =
    playlist.length > 1
      ? `data-video-playlist="${playlist.join("|")}"`
      : "";
  const segment =
    loopEnd !== undefined
      ? `data-loop-start="${loopStart || 0}" data-loop-end="${loopEnd}"`
      : "";
  const posterFilename = poster
    ?.split("/")
    .at(-1)
    .replace(/\.webp$/, "");
  const posterSrcSet =
    poster?.endsWith(".webp") && posterFilename
      ? [
          posterWidth > 480
            ? `/media/responsive/${posterFilename}-480.webp 480w`
            : "",
          posterWidth > 960
            ? `/media/responsive/${posterFilename}-960.webp 960w`
            : "",
          `${poster} ${posterWidth}w`,
        ]
          .filter(Boolean)
          .join(", ")
      : "";
  const fallback = poster
    ? `
      <img
        class="smart-video__fallback"
        src="${poster}"
        ${posterSrcSet ? `srcset="${posterSrcSet}"` : ""}
        sizes="${posterSizes}"
        alt=""
        aria-hidden="true"
        loading="${priority ? "eager" : "lazy"}"
        fetchpriority="${priority ? "high" : "auto"}"
        decoding="async"
      />
    `
    : "";

  return `
    <span class="smart-video-frame">
      ${fallback}
      <video
        class="smart-video ${className}"
        muted
        playsinline
        ${source}
        ${playlistAttribute}
        ${segment}
        preload="${preload}"
        ${poster ? `poster="${poster}"` : ""}
        aria-hidden="true"
        data-media-label="${label}"
      ></video>
    </span>
  `;
}
