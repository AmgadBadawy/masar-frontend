import Link from "next/link";
import { ArrowUpLeft } from "lucide-react";

import { BrandLogo } from "./brand-logo";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer
      dir="rtl"
      className="
        relative
        overflow-hidden
        border-t
        border-[#0F686D]/10
        bg-gradient-to-b
        from-[#F3F9F7]
        via-[#E8F2F0]
        to-[#DDEDEA]
        text-[#173537]
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -left-32
          -top-40
          h-[360px]
          w-[360px]
          rounded-full
          bg-[#D6A544]/[0.08]
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-40
          bottom-[-180px]
          h-[420px]
          w-[420px]
          rounded-full
          bg-[#0F686D]/[0.05]
          blur-3xl
        "
      />

      <div className="relative z-10 mx-auto w-full max-w-[1180px] px-4 py-12 sm:px-6 sm:py-14 lg:px-8 lg:py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12 md:gap-12">
          <div className="space-y-5 md:col-span-5 lg:col-span-6">
            <Link
              href="/"
              aria-label="مسار - الصفحة الرئيسية"
              className="
                inline-flex
                rounded-lg
                p-1
                transition-transform
                duration-200
                hover:scale-[1.02]
                focus-visible:outline-none
                focus-visible:ring-2
                focus-visible:ring-[#D6A544]
                focus-visible:ring-offset-2
                focus-visible:ring-offset-[#E8F2F0]
              "
            >
              <BrandLogo />
            </Link>

            <p className="max-w-md text-sm font-medium leading-[1.9] text-[#486567] sm:text-base">
              مسار منصة إرشادية تساعدك على فهم وتبسيط خطوات الإجراءات الحكومية
              والوصول إلى المصدر الرسمي للخدمة بوضوح وسهولة.
            </p>

            <div className="flex items-center gap-2 text-xs font-bold text-[#587375] sm:text-sm">
              <span
                aria-hidden="true"
                className="h-2 w-2 rounded-full bg-[#D6A544]"
              />
              <span>منصة إرشادية للوصول إلى المعلومة الرسمية</span>
            </div>
          </div>

          <div className="md:col-span-3 lg:col-span-3">
            <h2 className="text-base font-bold text-[#163638] sm:text-lg">
              التنقل
            </h2>

            <nav aria-label="روابط التذييل" className="mt-4">
              <ul className="space-y-3 text-sm font-semibold sm:text-base">
                <li>
                  <Link
                    href="/"
                    className="
                      inline-flex
                      py-1
                      text-[#486567]
                      transition-colors
                      duration-200
                      hover:text-[#0F686D]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#D6A544]
                    "
                  >
                    الرئيسية
                  </Link>
                </li>

                <li>
                  <Link
                    href="/search"
                    className="
                      inline-flex
                      py-1
                      text-[#486567]
                      transition-colors
                      duration-200
                      hover:text-[#0F686D]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#D6A544]
                    "
                  >
                    كل الخدمات
                  </Link>
                </li>

                <li>
                  <Link
                    href="/about"
                    className="
                      inline-flex
                      py-1
                      text-[#486567]
                      transition-colors
                      duration-200
                      hover:text-[#0F686D]
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#D6A544]
                    "
                  >
                    عن مسار
                  </Link>
                </li>
              </ul>
            </nav>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <h2 className="text-base font-bold text-[#163638] sm:text-lg">
              عن المعلومات
            </h2>

            <div
              className="
                mt-4
                rounded-2xl
                border
                border-[#0F686D]/10
                bg-white/55
                p-4
                shadow-[0_12px_30px_rgba(14,95,99,0.06)]
                backdrop-blur-md
              "
            >
              <p className="text-xs font-medium leading-[1.9] text-[#506B6D] sm:text-sm">
                مسار ليست جهة حكومية ولا تنفذ الخدمات نيابةً عنك. استخدم المصدر
                الرسمي دائمًا كمرجع نهائي للإجراء.
              </p>

              <Link
                href="/about"
                className="
                  mt-4
                  inline-flex
                  items-center
                  gap-2
                  text-xs
                  font-bold
                  text-[#0F686D]
                  transition-colors
                  duration-200
                  hover:text-[#0A4F52]
                  focus-visible:outline-none
                  focus-visible:ring-2
                  focus-visible:ring-[#D6A544]
                "
              >
                <span>اعرف المزيد عن مسار</span>
                <ArrowUpLeft className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        <div
          className="
            mt-10
            flex
            flex-col
            gap-3
            border-t
            border-[#0F686D]/10
            pt-6
            text-xs
            font-medium
            text-[#6A8182]
            sm:mt-12
            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:text-sm
          "
        >
          <p>© {currentYear} مسار. جميع الحقوق محفوظة.</p>

          <p className="font-semibold text-[#385758]">
            معلومات أوضح. خطوات أبسط.
          </p>
        </div>
      </div>
    </footer>
  );
}
