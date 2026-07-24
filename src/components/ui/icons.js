export const icons = {
  arrow: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M5 12h13M13 6l6 6-6 6"></path>
    </svg>
  `,
  menu: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M4 8h16M4 16h16"></path>
    </svg>
  `,
  close: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M6 6l12 12M18 6 6 18"></path>
    </svg>
  `,
  map: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M12 21s6-5.7 6-12a6 6 0 1 0-12 0c0 6.3 6 12 6 12Z"></path>
      <circle cx="12" cy="9" r="2"></circle>
    </svg>
  `,
};

export function externalAttributes(label) {
  return `target="_blank" rel="noopener noreferrer" aria-label="${label} (abre em nova aba)"`;
}

