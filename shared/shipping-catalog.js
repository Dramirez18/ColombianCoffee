// Datos PÚBLICOS del cotizador de envío, compartidos por la página (src/pages/Shipping.tsx)
// y la función (api/estimate.js). Aquí no van precios, tarifas ni zonas DHL: eso vive en el
// servidor (api/_pricing.js y la configuración PRICING_CONFIG).

/** Kilos netos mínimos por envío. Las muestras (250 g – 1 kg) se piden por WhatsApp. */
export const MIN_KG = 10;

/** Paso del campo de cantidad; el servidor redondea al mismo paso. */
export const KG_STEP = 0.5;

/**
 * Topes del régimen FNC de pequeñas cantidades: 60 kg de verde y 50,4 kg de tostado por envío.
 * Por encima, la exportación es ordinaria (pallet o contenedor) y se cotiza aparte.
 */
export const PRODUCTS = [
  { id: 'green-basic', group: 'green', maxKg: 60 },
  { id: 'green-excelso', group: 'green', maxKg: 60 },
  { id: 'green-supremo', group: 'green', maxKg: 60 },
  { id: 'roasted-castillo', group: 'roasted', maxKg: 50 },
  { id: 'roasted-bourbon', group: 'roasted', maxKg: 50 },
  { id: 'roasted-fermented', group: 'roasted', maxKg: 50 },
];

/** Destinos con zona DHL conocida. `enIn` es la forma en inglés dentro de una frase. */
export const DESTINATIONS = [
  { code: 'DE', en: 'Germany', enIn: 'Germany', es: 'Alemania' },
  { code: 'BE', en: 'Belgium', enIn: 'Belgium', es: 'Bélgica' },
  { code: 'ES', en: 'Spain', enIn: 'Spain', es: 'España' },
  { code: 'US', en: 'United States', enIn: 'the United States', es: 'Estados Unidos' },
  { code: 'FR', en: 'France', enIn: 'France', es: 'Francia' },
  { code: 'NL', en: 'Netherlands', enIn: 'the Netherlands', es: 'Países Bajos' },
  { code: 'PL', en: 'Poland', enIn: 'Poland', es: 'Polonia' },
  { code: 'SE', en: 'Sweden', enIn: 'Sweden', es: 'Suecia' },
  { code: 'AE', en: 'United Arab Emirates', enIn: 'the United Arab Emirates', es: 'Emiratos Árabes Unidos' },
];

export const OTHER_COUNTRY = 'OTHER';

/**
 * Contenedor de 20' FOB Cartagena (café verde). El precio de contenedor aplica desde 100 sacos de
 * 70 kg; 275 sacos llenan el contenedor. Los nombres en la web son genéricos (proceso, puntaje,
 * variedad): nunca el nombre comercial del lote del proveedor.
 */
export const CONTAINER = { bagKg: 70, minBags: 100, fullBags: 275 };

export const CONTAINER_PRODUCTS = [
  { id: 'washed-79', group: 'standard' },
  { id: 'washed-81-antioquia', group: 'standard' },
  { id: 'washed-82', group: 'standard' },
  { id: 'washed-84-antioquia', group: 'standard' },
  { id: 'decaf-84', group: 'standard' },
  { id: 'honey-yellow-85', group: 'process' },
  { id: 'fermented-85', group: 'process' },
  { id: 'honey-red-86', group: 'process' },
  { id: 'fermented-86', group: 'process' },
  { id: 'honey-black-86', group: 'process' },
  { id: 'natural-86', group: 'process' },
  { id: 'natural-87', group: 'process' },
  { id: 'chiroso-87', group: 'variety' },
  { id: 'pink-bourbon-87', group: 'variety' },
  { id: 'geisha-88', group: 'variety' },
  { id: 'wush-wush-89', group: 'variety' },
];
