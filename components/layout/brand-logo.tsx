"use client";

import Image from "next/image";

type BrandLogoProps = {
  priority?: boolean;
  light?: boolean;
  className?: string;
};

export function BrandLogo({
  priority = false,
  light = false,
  className = "",
}: BrandLogoProps) {
  return (
    <div
      className={`relative h-9 w-[130px] sm:h-10 sm:w-[145px] transition-all duration-200 ${className}`}
    >
      <Image
        src="/brand/masar-logo.svg"
        alt="مسار - الصفحة الرئيسية"
        fill
        priority={priority}
        sizes="(min-width: 640px) 145px, 130px"
        className={`object-contain object-right transition-all duration-300 drop-shadow-[0_2px_10px_rgba(0,0,0,0.18)] ${
          light ? "brightness-110" : ""
        }`}
      />
    </div>
  );
}
