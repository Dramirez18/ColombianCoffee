/// <reference types="vite/client" />

/** false in the production build while customer login is not published (vite.config.ts). */
declare const __LOGIN_PUBLIC__: boolean;

// Alias de vite.config.ts a los archivos de idioma de @clerk/localizations.
declare module 'clerk-localization-es' {
  export const esES: Record<string, unknown>;
}
declare module 'clerk-localization-nl' {
  export const nlNL: Record<string, unknown>;
}
declare module 'clerk-localization-de' {
  export const deDE: Record<string, unknown>;
}
declare module 'clerk-localization-fr' {
  export const frFR: Record<string, unknown>;
}
declare module 'clerk-localization-sv' {
  export const svSE: Record<string, unknown>;
}
