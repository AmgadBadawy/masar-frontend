import { describe, expect, it } from "vitest";

import { normalizeArabic } from "@/lib/search/normalize-arabic";

describe("normalizeArabic", () => {
  it("removes diacritics and tatweel", () => {
    expect(normalizeArabic("بِطَــاقَة")).toBe("بطاقه");
  });

  it("normalizes common alif variants", () => {
    expect(normalizeArabic("أإآا")).toBe("اااا");
  });

  it("normalizes alif maqsura to ya", () => {
    expect(normalizeArabic("على")).toBe("علي");
  });

  it("uses the same comparison form for ta marbuta and ha", () => {
    expect(normalizeArabic("بطاقة")).toBe(normalizeArabic("بطاقه"));
  });

  it("collapses repeated whitespace and trims the result", () => {
    expect(normalizeArabic("  خدمة    تجريبية  ")).toBe("خدمه تجريبيه");
  });

  it("keeps already-normalized Arabic stable", () => {
    expect(normalizeArabic("بيانات تجريبيه")).toBe("بيانات تجريبيه");
  });

  it("preserves English characters while applying intentional case and whitespace normalization", () => {
    expect(normalizeArabic("  Masar   Guide  ")).toBe("masar guide");
  });
});