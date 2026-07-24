export function responsiveImage(image, className = "") {
  return `
    <img
      class="${className}"
      src="${image.src}"
      width="${image.width}"
      height="${image.height}"
      loading="lazy"
      decoding="async"
      alt="${image.alt}"
    />
  `;
}

export function smartVideo({
  src,
  poster,
  label,
  className = "",
  preload = "none",
  eager = false,
  loopStart,
  loopEnd,
}) {
  const source = eager ? `src="${src}"` : `data-src="${src}"`;
  const segment =
    loopEnd !== undefined
      ? `data-loop-start="${loopStart || 0}" data-loop-end="${loopEnd}"`
      : "";

  return `
    <video
      class="smart-video ${className}"
      muted
      playsinline
      ${source}
      ${segment}
      preload="${preload}"
      poster="${poster}"
      aria-hidden="true"
      data-media-label="${label}"
    ></video>
  `;
}
