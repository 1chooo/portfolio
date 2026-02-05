interface SlugifyOptions {
  replacement?: string;
  remove?: RegExp;
  lower?: boolean;
  strict?: boolean;
  locale?: string;
  trim?: boolean;
}

interface CharMap {
  [key: string]: string;
}

interface LocaleMap {
  [key: string]: CharMap;
}

export type { SlugifyOptions, CharMap, LocaleMap };
