import Image from "next/image";

export function HeroImage() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 -z-30 overflow-hidden"
    >
      <Image
        src="/images/masar-hero-background.webp"
        alt=""
        fill
        priority
        quality={75}
        sizes="100vw"
        className="object-cover object-[67%_center] opacity-[0.62] sm:object-[64%_center] sm:opacity-[0.68] lg:object-[60%_center] lg:opacity-[0.72]"
      />
    </div>
  );
}
