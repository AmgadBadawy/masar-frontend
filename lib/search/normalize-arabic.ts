const ARABIC_DIACRITICS = /[\u0610-\u061A\u064B-\u065F\u0670\u06D6-\u06ED]/g;

/**
 * Produces a predictable comparison value for Arabic catalogue search.
 * It intentionally normalizes only common spelling variants and presentation
 * marks; it does not stem words or infer alternate meanings.
 */
export function normalizeArabic(value: string): string {
  return value
    .normalize("NFKC")
    .replace(ARABIC_DIACRITICS, "")
    .replace(/[\u0640]/g, "")
    .replace(/[أإآ]/g, "ا")
    .replace(/ى/g, "ي")
    // This comparison-only fallback covers common keyboard substitutions,
    // such as searching بطاقة as بطاقه.
    .replace(/ة/g, "ه")
    .replace(/\s+/g, " ")
    .trim()
    .toLocaleLowerCase("ar");
}