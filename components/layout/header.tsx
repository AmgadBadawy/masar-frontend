"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";

import { BrandLogo } from "./brand-logo";

const navItems = [
  { label: "الرئيسية", href: "/" },
  { label: "كل الخدمات", href: "/search" },
  { label: "عن مسار", href: "/about" },
  { label: "المفضلة", href: "/favorites" },
];

export function Header() {
  const pathname = usePathname();

  const getLinkState = (href: string) => {
    return href === "/"
      ? pathname === "/"
      : pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <header
      dir="rtl"
      className="
        absolute
        inset-x-0
        top-0
        z-50
        bg-transparent
        text-[#102627]
      "
    >
      <a
        href="#main-content"
        className="
          sr-only
          z-[100]
          rounded-md
          bg-[#0E5F63]
          px-4
          py-2
          text-sm
          font-bold
          text-white
          focus:not-sr-only
          focus:absolute
          focus:right-4
          focus:top-3
          focus:outline-none
          focus:ring-2
          focus:ring-[#D6A544]
          focus:ring-offset-2
          focus:ring-offset-[#E8F2F0]
        "
      >
        تخطى إلى المحتوى
      </a>

      <div
        className="
          mx-auto
          flex
          min-h-16
          w-full
          max-w-[1240px]
          items-center
          justify-between
          px-4
          sm:min-h-[4.5rem]
          sm:px-6
          lg:px-8
        "
      >
        <Link
          href="/"
          aria-label="مسار - الصفحة الرئيسية"
          className="
            relative
            z-30
            flex
            shrink-0
            items-center
            rounded-lg
            p-0.5
            transition-transform
            duration-200
            hover:scale-[1.02]
            focus-visible:outline-none
            focus-visible:ring-2
            focus-visible:ring-[#0E5F63]
            focus-visible:ring-offset-2
          "
        >
          <BrandLogo priority light={false} />
        </Link>

        <nav
          aria-label="التنقل الرئيسي"
          className="
            absolute
            left-1/2
            hidden
            -translate-x-1/2
            lg:block
          "
        >
          <ul
            className="
              flex
              items-center
              justify-center
              gap-1
              rounded-full
              border
              border-white/70
              bg-white/45
              p-1
              shadow-[0_8px_28px_rgba(14,95,99,0.07)]
              backdrop-blur-md
            "
          >
            {navItems.map((item) => {
              const isCurrent = getLinkState(item.href);

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    aria-current={isCurrent ? "page" : undefined}
                    className={`
                      inline-flex
                      min-h-10
                      items-center
                      justify-center
                      whitespace-nowrap
                      rounded-full
                      px-5
                      font-[var(--font-body)]
                      text-sm
                      font-bold
                      transition-[background-color,color,box-shadow]
                      duration-200
                      xl:px-6
                      ${
                        isCurrent
                          ? `
                            bg-[#0E5F63]
                            text-white
                            shadow-[0_5px_14px_rgba(14,95,99,0.18)]
                          `
                          : `
                            text-[#294A4C]
                            hover:bg-white/65
                            hover:text-[#0E5F63]
                          `
                      }
                      focus-visible:outline-none
                      focus-visible:ring-2
                      focus-visible:ring-[#0E5F63]/50
                      focus-visible:ring-offset-2
                    `}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <details className="group relative z-50 mr-auto lg:hidden">
          <summary
            aria-label="فتح قائمة التنقل"
            className="
              flex
              h-10
              w-10
              cursor-pointer
              list-none
              items-center
              justify-center
              rounded-xl
              border
              border-white/60
              bg-white/55
              text-[#0E5F63]
              shadow-[0_6px_18px_rgba(14,95,99,0.07)]
              backdrop-blur-md
              transition-[background-color,border-color]
              duration-200
              hover:bg-white/75
              [&::-webkit-details-marker]:hidden
              focus-visible:outline-none
              focus-visible:ring-2
              focus-visible:ring-[#0E5F63]/50
            "
          >
            <span className="sr-only">فتح قائمة التنقل</span>

            <Menu className="h-5 w-5 group-open:hidden" strokeWidth={2} />

            <X className="hidden h-5 w-5 group-open:block" strokeWidth={2} />
          </summary>

          <div className="fixed inset-x-0 top-16 sm:top-[4.5rem]">
            <nav
              aria-label="التنقل على الهاتف"
              className="
                w-full
                border-b
                border-[#0E5F63]/10
                bg-[#E8F2F0]/96
                p-4
                text-[#102627]
                shadow-[0_18px_40px_rgba(14,95,99,0.10)]
                backdrop-blur-xl
              "
            >
              <ul
                className="
                  mx-auto
                  flex
                  w-full
                  max-w-[1180px]
                  flex-col
                  gap-1.5
                  px-1
                  sm:px-3
                "
              >
                {navItems.map((item) => {
                  const isCurrent = getLinkState(item.href);

                  return (
                    <li key={item.href}>
                      <Link
                        href={item.href}
                        aria-current={isCurrent ? "page" : undefined}
                        className={`
                          flex
                          min-h-12
                          w-full
                          items-center
                          rounded-xl
                          px-4
                          font-[var(--font-body)]
                          text-sm
                          font-bold
                          transition-colors
                          duration-200
                          ${
                            isCurrent
                              ? "bg-[#D7EAE7] text-[#0E5F63]"
                              : "text-[#294A4C] hover:bg-white/70"
                          }
                          focus-visible:outline-none
                          focus-visible:ring-2
                          focus-visible:ring-[#0E5F63]/40
                        `}
                      >
                        {item.label}
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </nav>
          </div>
        </details>
      </div>
    </header>
  );
}
