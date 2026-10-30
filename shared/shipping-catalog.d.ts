export type ShippingProductId =
  | 'green-basic'
  | 'green-excelso'
  | 'green-supremo'
  | 'roasted-castillo'
  | 'roasted-bourbon'
  | 'roasted-fermented';

export type ShippingProductGroup = 'green' | 'roasted';

export declare const MIN_KG: number;
export declare const KG_STEP: number;
export declare const PRODUCTS: { id: ShippingProductId; group: ShippingProductGroup; maxKg: number }[];
export declare const DESTINATIONS: { code: string; en: string; enIn: string; es: string }[];
export declare const OTHER_COUNTRY: 'OTHER';

export type ContainerProductId =
  | 'washed-79'
  | 'washed-81-antioquia'
  | 'washed-82'
  | 'washed-84-antioquia'
  | 'decaf-84'
  | 'honey-yellow-85'
  | 'fermented-85'
  | 'honey-red-86'
  | 'fermented-86'
  | 'honey-black-86'
  | 'natural-86'
  | 'natural-87'
  | 'chiroso-87'
  | 'pink-bourbon-87'
  | 'geisha-88'
  | 'wush-wush-89';

export type ContainerProductGroup = 'standard' | 'process' | 'variety';

export declare const CONTAINER: { bagKg: number; minBags: number; fullBags: number };
export declare const CONTAINER_PRODUCTS: { id: ContainerProductId; group: ContainerProductGroup }[];
