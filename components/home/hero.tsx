import Link from "next/link";
import {
  ArrowLeft,
  FileText,
  Flag,
  Landmark,
  Route,
  Search,
} from "lucide-react";

import {
  AnimatedRoadmap,
  type Milestone,
} from "@/components/ui/animated-roadmap";

import { HeroImage } from "./image-hero";

const roadmapMilestones = [
  {
    id: 1,
    name: "إعرف\nالمتطلبات",
    status: "complete",

    position: {
      top: "74%",
      left: "86%",
    },

    mobilePosition: {
      top: "74%",
      left: "82%",
    },

    labelPosition: "left",
    mobileLabelPosition: "left",

    icon: <FileText strokeWidth={2} />,
  },

  {
    id: 2,
    name: "ابحث عن\nالخدمة",
    status: "complete",

    position: {
      top: "26%",
      left: "72%",
    },

    mobilePosition: {
      top: "24%",
      left: "64%",
    },

    labelPosition: "right",
    mobileLabelPosition: "top",

    icon: <Search strokeWidth={2} />,
  },

  {
    id: 3,
    name: "اتبع\nالخطوات",
    status: "complete",

    position: {
      top: "67%",
      left: "50%",
    },

    mobilePosition: {
      top: "70%",
      left: "50%",
    },

    labelPosition: "left",
    mobileLabelPosition: "left",

    icon: <Route strokeWidth={2} />,
  },

  {
    id: 4,
    name: "راجع\nالمصدر الرسمي",
    status: "complete",

    position: {
      top: "38%",
      left: "27%",
    },

    mobilePosition: {
      top: "38%",
      left: "34%",
    },

    labelPosition: "right",
    mobileLabelPosition: "right",

    icon: <Landmark strokeWidth={2} />,
  },

  {
    id: 5,
    name: "إنجاز المعاملة",
    status: "complete",

    position: {
      top: "19%",
      left: "9%",
    },

    mobilePosition: {
      top: "18%",
      left: "12%",
    },

    labelPosition: "right",
    mobileLabelPosition: "right",

    isFinal: true,

    icon: <Flag strokeWidth={2} />,
  },
] satisfies Milestone[];

export function Hero() {
  return (
    <section
      aria-labelledby="hero-heading"
      dir="rtl"
      className="
        relative
        isolate
        overflow-hidden
        bg-[#E8F2F0]
        text-[#102627]
      "
    >
      {/* ==================================================
          HERO BACKGROUND
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          absolute
          inset-0
          -z-10
        "
      >
        <HeroImage />
      </div>

      {/* ==================================================
          MAIN COLOR OVERLAY
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-0
          z-0

          bg-[linear-gradient(
            90deg,
            rgba(8,63,66,0.08)_0%,
            rgba(232,242,240,0.25)_34%,
            rgba(232,242,240,0.72)_66%,
            rgba(232,242,240,0.97)_100%
          )]
        "
      />

      {/* ==================================================
          TOP FADE
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          top-0
          z-0
          h-28

          bg-gradient-to-b
          from-[#E8F2F0]/70
          to-transparent

          sm:h-36
        "
      />

      {/* ==================================================
          BOTTOM FADE
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          inset-x-0
          bottom-0
          z-0
          h-32

          bg-gradient-to-t
          from-[#F7FAF9]
          via-[#F7FAF9]/70
          to-transparent

          sm:h-40
        "
      />

      {/* ==================================================
          SOFT GOLD ACCENT
      ================================================== */}

      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute

          right-[7%]
          top-[14%]

          z-0

          h-32
          w-32

          rounded-full

          bg-[#D6A544]/[0.06]

          blur-[1px]

          sm:h-40
          sm:w-40
        "
      />

      {/* ==================================================
          MAIN HERO GRID
      ================================================== */}

      <div
        className="
          relative
          z-10

          mx-auto
          grid
          w-full
          max-w-[1380px]

          grid-cols-1
          items-center

          gap-10

          px-4
          pb-16
          pt-24

          sm:gap-12
          sm:px-6
          sm:pb-20
          sm:pt-28

          md:px-8

          lg:[direction:ltr]
          lg:grid-cols-[minmax(0,1.05fr)_minmax(0,1fr)]
          lg:gap-16
          lg:px-10
          lg:pb-16
          lg:pt-24

          xl:gap-20
        "
      >
        {/* ==================================================
            ROADMAP COLUMN
        ================================================== */}

        <div
          className="
            order-2
            w-full

            lg:order-1
            lg:[direction:rtl]
          "
        >
          <div
            className="
              relative
              mx-auto

              w-full
              max-w-[650px]

              rounded-[26px]

              border
              border-white/70

              bg-white/[0.20]

              p-2.5

              shadow-[0_20px_55px_rgba(14,95,99,0.08)]

              backdrop-blur-[3px]

              sm:rounded-[30px]
              sm:p-4

              lg:p-5
            "
          >
            <AnimatedRoadmap
              milestones={roadmapMilestones}
              roadmapWidth="100%"
              roadmapHeight="clamp(300px, 34vw, 430px)"
              animationDuration={1.8}
              showLabels
              aria-label="رحلة المستخدم من البحث عن الخدمة حتى إنجاز المعاملة"
              className="max-w-none"
            />
          </div>
        </div>

        {/* ==================================================
            TEXT / SEARCH COLUMN
        ================================================== */}

        <div
          className="
            order-1
            w-full

            lg:order-2
            lg:[direction:rtl]
          "
        >
          <div
            className="
              mx-auto
              flex
              w-full
              max-w-[640px]

              flex-col
              items-center

              text-center

              lg:items-end
              lg:text-right
            "
          >
            {/* ==================================================
                BADGE
            ================================================== */}

            <div className="w-full">
              <div
                className="
                  inline-flex
                  max-w-full

                  items-center
                  gap-2

                  rounded-full

                  border
                  border-[#0E5F63]/10

                  bg-white/82

                  px-3.5
                  py-1.5

                  text-[11px]
                  font-bold
                  leading-5

                  text-[#0B5558]

                  shadow-[0_6px_18px_rgba(14,95,99,0.06)]

                  backdrop-blur-sm

                  sm:px-4
                  sm:py-2
                  sm:text-xs

                  lg:text-[13px]
                "
              >
                <span
                  aria-hidden="true"
                  className="
                    relative
                    flex
                    h-2.5
                    w-2.5
                    shrink-0
                  "
                >
                  <span
                    className="
                      absolute
                      inset-[-3px]

                      rounded-full

                      bg-[#D6A544]/20
                    "
                  />

                  <span
                    className="
                      relative
                      h-2.5
                      w-2.5

                      rounded-full

                      bg-[#D6A544]
                    "
                  />
                </span>

                <span>إجراءاتك الحكومية .. بوضوح</span>
              </div>
            </div>

            {/* ==================================================
                HERO HEADING
            ================================================== */}

            <h1
              id="hero-heading"
              className="
                mt-7
                w-full
                max-w-[620px]

                text-balance

                text-[clamp(2rem,5vw,3.8rem)]

                font-bold

                leading-[1.22]

                tracking-[-0.03em]

                text-[#102627]

                sm:mt-8

                lg:mt-9
                lg:text-[clamp(2.65rem,3.7vw,3.8rem)]
              "
            >
              مسار يساعدك على معرفة
              <span
                className="
                  mt-2.5
                  block

                  text-[#0E5F63]

                  sm:mt-3
                "
              >
                خطوات الإجراءات الحكومية بوضوح
              </span>
            </h1>

            {/* ==================================================
                DESCRIPTION
            ================================================== */}

            <p
              className="
                mt-6
                w-full
                max-w-[575px]

                text-pretty

                text-[clamp(0.94rem,1.25vw,1.08rem)]

                font-medium

                leading-[1.95]

                text-[#486567]

                sm:mt-7

                lg:max-w-[560px]
                lg:leading-[1.9]
              "
            >
              ابحث عن الخدمة التي تحتاجها، وتعرّف على المتطلبات والخطوات والجهة
              المسؤولة، مع روابط المصادر الرسمية وآخر تاريخ للمراجعة.
            </p>

            {/* ==================================================
                SEARCH FORM
            ================================================== */}

            <form
              action="/search"
              method="get"
              role="search"
              className="
                mt-7
                w-full
                max-w-[620px]

                sm:mt-8
              "
            >
              <label htmlFor="hero-search" className="sr-only">
                ابحث عن خدمة أو إجراء حكومي
              </label>

              <div
                className="
                  flex
                  w-full

                  flex-col
                  gap-2

                  rounded-[18px]

                  border
                  border-[#0E5F63]/10

                  bg-white/92

                  p-2

                  shadow-[0_14px_34px_rgba(14,95,99,0.09)]

                  backdrop-blur-sm

                  transition-[border-color,box-shadow]
                  duration-200

                  focus-within:border-[#0E5F63]/25

                  focus-within:shadow-[0_16px_38px_rgba(14,95,99,0.12)]

                  sm:rounded-[21px]
                  sm:p-2.5

                  md:flex-row
                  md:items-center
                "
              >
                {/* Search icon */}
                <div
                  aria-hidden="true"
                  className="
                    hidden
                    shrink-0
                    items-center
                    justify-center

                    text-[#0E5F63]/40

                    md:flex
                    md:w-9
                  "
                >
                  <Search className="h-5 w-5" strokeWidth={1.9} />
                </div>

                {/* Search input */}
                <input
                  id="hero-search"
                  name="q"
                  type="search"
                  placeholder="ابحث عن خدمة أو إجراء حكومي"
                  autoComplete="off"
                  className="
                    min-h-12
                    min-w-0
                    flex-1

                    rounded-[14px]

                    border-0

                    bg-transparent

                    px-3

                    text-right
                    text-sm
                    font-medium

                    text-[#062F31]

                    outline-none

                    placeholder:text-[#286568]/45

                    sm:min-h-[52px]
                    sm:text-[15px]
                  "
                />

                {/* Search button */}
                <button
                  type="submit"
                  className="
                    inline-flex

                    min-h-12
                    w-full
                    shrink-0

                    items-center
                    justify-center
                    gap-2

                    rounded-[14px]

                    bg-[#0E5F63]

                    px-6

                    text-sm
                    font-bold

                    text-white

                    shadow-[0_7px_18px_rgba(14,95,99,0.16)]

                    transition-[background-color,transform,box-shadow]
                    duration-200

                    hover:bg-[#0A4F52]

                    hover:shadow-[0_9px_22px_rgba(14,95,99,0.2)]

                    active:scale-[0.99]

                    focus-visible:outline-none

                    focus-visible:ring-2
                    focus-visible:ring-[#0E5F63]/60

                    focus-visible:ring-offset-2
                    focus-visible:ring-offset-[#E8F2F0]

                    md:min-h-[52px]
                    md:w-auto
                    md:px-7
                  "
                >
                  <Search
                    aria-hidden="true"
                    className="h-4 w-4"
                    strokeWidth={2}
                  />

                  <span>ابحث</span>
                </button>
              </div>
            </form>

            {/* ==================================================
                ALL SERVICES LINK
            ================================================== */}

            <Link
              href="/search"
              className="
                group

                mt-4

                inline-flex
                min-h-11

                items-center
                gap-2

                rounded-full

                px-3.5
                py-2

                text-sm
                font-bold

                text-[#0A3537]

                transition-[background-color,color]
                duration-200

                hover:bg-white/55

                hover:text-[#051F20]

                focus-visible:outline-none

                focus-visible:ring-2
                focus-visible:ring-[#0E5F63]/50

                focus-visible:ring-offset-4
                focus-visible:ring-offset-transparent

                sm:mt-5

                lg:self-end
              "
            >
              <span>استعرض جميع الخدمات</span>

              <ArrowLeft
                aria-hidden="true"
                className="
                  h-4
                  w-4

                  text-[#0E5F63]

                  transition-transform
                  duration-200

                  group-hover:-translate-x-1
                "
              />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
