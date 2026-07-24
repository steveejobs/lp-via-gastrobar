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
  whatsapp: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="M20 11.6a8 8 0 0 1-11.8 7L4 20l1.4-4A8 8 0 1 1 20 11.6Z"></path>
      <path d="M9 8.2c.4 2.4 2.2 4.2 4.6 4.8M14.4 13c.7-.1 1.4-.5 1.6-1.1"></path>
    </svg>
  `,
  instagram: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <rect x="3.5" y="3.5" width="17" height="17" rx="5"></rect>
      <circle cx="12" cy="12" r="4"></circle>
      <circle cx="17.5" cy="6.7" r=".8" fill="currentColor" stroke="none"></circle>
    </svg>
  `,
  home: `
    <svg aria-hidden="true" viewBox="0 0 24 24">
      <path d="m4 11 8-7 8 7v9h-6v-6h-4v6H4Z"></path>
    </svg>
  `,
};

export function externalAttributes(label) {
  return `target="_blank" rel="noopener noreferrer" aria-label="${label} (abre em nova aba)"`;
}
