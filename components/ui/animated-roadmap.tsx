"use client";

import * as React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

export type MilestoneStatus = "complete" | "in-progress" | "pending";

export type MilestoneLabelPosition = "left" | "right" | "top" | "bottom";

export interface Milestone {
  id: number;
  name: React.ReactNode;
  status: MilestoneStatus;

  position: {
    top: string;
    left: string;
  };

  mobilePosition?: {
    top: string;
    left: string;
  };

  labelPosition?: MilestoneLabelPosition;
  mobileLabelPosition?: MilestoneLabelPosition;

  icon?: React.ReactNode;
  isFinal?: boolean;
}

interface AnimatedRoadmapProps extends React.HTMLAttributes<HTMLDivElement> {
  milestones: Milestone[];
  roadmapWidth?: string;
  roadmapHeight?: string;
  animationDuration?: number;
  showLabels?: boolean;
}

/* =========================================================
   LABEL POSITION
========================================================= */

function getLabelClasses(position: MilestoneLabelPosition) {
  switch (position) {
    case "right":
      return `
        left-full
        top-1/2
        ml-2
        -translate-y-1/2

        sm:ml-3
        lg:ml-4

        before:content-['']
        before:absolute
        before:top-1/2
        before:-left-1.5
        before:-translate-y-1/2
        before:border-y-[5px]
        before:border-y-transparent
        before:border-r-[7px]
        before:border-r-white

        sm:before:border-y-[6px]
        sm:before:border-r-[8px]
      `;

    case "left":
      return `
        right-full
        top-1/2
        mr-2
        -translate-y-1/2

        sm:mr-3
        lg:mr-4

        before:content-['']
        before:absolute
        before:top-1/2
        before:-right-1.5
        before:-translate-y-1/2
        before:border-y-[5px]
        before:border-y-transparent
        before:border-l-[7px]
        before:border-l-white

        sm:before:border-y-[6px]
        sm:before:border-l-[8px]
      `;

    case "bottom":
      return `
        top-full
        left-1/2
        mt-2
        -translate-x-1/2

        sm:mt-3
        lg:mt-4

        before:content-['']
        before:absolute
        before:-top-1.5
        before:left-1/2
        before:-translate-x-1/2
        before:border-x-[5px]
        before:border-x-transparent
        before:border-b-[7px]
        before:border-b-white

        sm:before:border-x-[6px]
        sm:before:border-b-[8px]
      `;

    case "top":
    default:
      return `
        bottom-full
        left-1/2
        mb-2
        -translate-x-1/2

        sm:mb-3
        lg:mb-4

        before:content-['']
        before:absolute
        before:-bottom-1.5
        before:left-1/2
        before:-translate-x-1/2
        before:border-x-[5px]
        before:border-x-transparent
        before:border-t-[7px]
        before:border-t-white

        sm:before:border-x-[6px]
        sm:before:border-t-[8px]
      `;
  }
}

function getMobileLabelClasses(position: MilestoneLabelPosition) {
  switch (position) {
    case "right":
      return `
        max-sm:left-full
        max-sm:right-auto
        max-sm:top-1/2
        max-sm:ml-2
        max-sm:mr-0
        max-sm:-translate-y-1/2
      `;

    case "left":
      return `
        max-sm:right-full
        max-sm:left-auto
        max-sm:top-1/2
        max-sm:mr-2
        max-sm:ml-0
        max-sm:-translate-y-1/2
      `;

    case "bottom":
      return `
        max-sm:top-full
        max-sm:left-1/2
        max-sm:right-auto
        max-sm:mt-2
        max-sm:mb-0
        max-sm:-translate-x-1/2
      `;

    case "top":
    default:
      return `
        max-sm:bottom-full
        max-sm:left-1/2
        max-sm:right-auto
        max-sm:mb-2
        max-sm:mt-0
        max-sm:-translate-x-1/2
      `;
  }
}

/* =========================================================
   MILESTONE MARKER
========================================================= */

function MilestoneMarker({
  milestone,
  index,
  reducedMotion,
  showLabels,
}: {
  milestone: Milestone;
  index: number;
  reducedMotion: boolean;
  showLabels: boolean;
}) {
  const labelPosition = milestone.labelPosition ?? "left";

  const mobileLabelPosition = milestone.mobileLabelPosition ?? labelPosition;

  const desktopPosition = milestone.position;

  const mobilePosition = milestone.mobilePosition ?? milestone.position;

  const markerStyle = {
    "--desktop-top": desktopPosition.top,
    "--desktop-left": desktopPosition.left,
    "--mobile-top": mobilePosition.top,
    "--mobile-left": mobilePosition.left,
  } as React.CSSProperties;

  return (
    <motion.div
      initial={
        reducedMotion
          ? {
              opacity: 1,
              scale: 1,
            }
          : {
              opacity: 0,
              scale: 0.82,
            }
      }
      animate={{
        opacity: 1,
        scale: 1,
      }}
      transition={{
        duration: reducedMotion ? 0 : 0.45,
        delay: reducedMotion ? 0 : 0.18 + index * 0.14,
        ease: "easeOut",
      }}
      className="
        absolute
        z-20

        left-[var(--desktop-left)]
        top-[var(--desktop-top)]

        max-sm:left-[var(--mobile-left)]
        max-sm:top-[var(--mobile-top)]
      "
      style={{
        ...markerStyle,
        transform: "translate(-50%, -50%)",
      }}
    >
      <div className="relative flex items-center justify-center">
        {/* =========================================
            FINAL GLOW
        ========================================== */}
        {milestone.isFinal && (
          <>
            <motion.span
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 0.7,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : 0.9,
                ease: "easeOut",
              }}
              className="
                absolute
                inset-[-13px]
                rounded-full
                border
                border-[#D6A544]/30
              "
            />

            <span
              className="
                absolute
                inset-[-8px]
                rounded-full
                bg-[#D6A544]/10
                blur-md
              "
            />
          </>
        )}

        {/* =========================================
            MAIN MARKER
        ========================================== */}
        <div
          className={cn(
            `
              relative
              z-10
              flex
              shrink-0
              items-center
              justify-center
              rounded-full
              bg-white
              text-[#0E5F63]

              transition-transform
              duration-200

              hover:scale-105
            `,

            milestone.isFinal
              ? `
                h-[62px]
                w-[62px]

                border-[2px]
                border-[#D6A544]/55

                shadow-[0_12px_28px_rgba(14,95,99,0.16)]

                sm:h-[76px]
                sm:w-[76px]

                lg:h-[82px]
                lg:w-[82px]
              `
              : `
                h-10
                w-10

                border
                border-white

                shadow-[0_8px_20px_rgba(14,95,99,0.11)]

                sm:h-14
                sm:w-14
              `,
          )}
        >
          {/* =========================================
              FINAL INNER RING
          ========================================== */}
          {milestone.isFinal && (
            <span
              className="
                absolute
                inset-[5px]
                rounded-full
                border
                border-[#0E5F63]/10
              "
            />
          )}

          {/* =========================================
              ICON
          ========================================== */}
          <span
            className={cn(
              "relative z-10 flex items-center justify-center",

              milestone.isFinal
                ? `
                  [&>svg]:h-6
                  [&>svg]:w-6

                  sm:[&>svg]:h-8
                  sm:[&>svg]:w-8
                `
                : `
                  [&>svg]:h-[17px]
                  [&>svg]:w-[17px]

                  sm:[&>svg]:h-5
                  sm:[&>svg]:w-5
                `,
            )}
          >
            {milestone.icon}
          </span>

          {/* =========================================
              GOLD FINISH DOT
          ========================================== */}
          {milestone.isFinal && (
            <span
              className="
                absolute
                -right-0.5
                -top-0.5

                h-3.5
                w-3.5

                rounded-full

                border-2
                border-white

                bg-[#D6A544]

                shadow-sm

                sm:-right-1
                sm:-top-1
                sm:h-4
                sm:w-4
              "
            />
          )}
        </div>

        {/* =========================================
            LABEL
        ========================================== */}
        {showLabels && milestone.name && (
          <span
            className={cn(
              `
                absolute
                z-30

                w-[72px]

                whitespace-pre-line

                rounded-[12px]

                border
                border-white/80

                bg-white/95

                px-2
                py-1.5

                text-center
                text-[8.5px]
                font-bold
                leading-[1.35]

                text-[#102627]

                shadow-[0_8px_20px_rgba(14,95,99,0.09)]

                backdrop-blur-sm

                pointer-events-none
              `,

              `
                sm:w-[94px]
                sm:rounded-[15px]
                sm:px-2.5
                sm:py-2
                sm:text-[11px]
              `,

              `
                lg:w-[112px]
                lg:px-3
                lg:py-2.5
                lg:text-[13px]
              `,

              milestone.isFinal &&
                `
                  border-[#D6A544]/20

                  shadow-[0_10px_24px_rgba(214,165,68,0.10)]
                `,

              getLabelClasses(labelPosition),

              getMobileLabelClasses(mobileLabelPosition),
            )}
          >
            {milestone.name}
          </span>
        )}
      </div>
    </motion.div>
  );
}

/* =========================================================
   ANIMATED ROADMAP
========================================================= */

const AnimatedRoadmap = React.forwardRef<HTMLDivElement, AnimatedRoadmapProps>(
  (
    {
      className,
      milestones,
      roadmapWidth = "100%",
      roadmapHeight = "420px",
      animationDuration = 2,
      showLabels = true,
      style,
      ...props
    },
    ref,
  ) => {
    const reducedMotion = useReducedMotion() ?? false;

    /*
      ======================================================
      ROADMAP PATH

      Start:
      x = 860
      y = 310

      End:
      x = 90
      y = 80

      ViewBox:
      1000 x 420

      وبالتالي:

      Start ≈ left 86%, top 74%
      End   ≈ left 9%,  top 19%

      وده متوافق مع الـ milestones.
    */

    const path = `
      M 860 310

      C 820 294,
        775 120,
        715 120

      C 650 120,
        590 292,
        505 292

      C 420 292,
        355 165,
        280 165

      C 205 165,
        160 92,
        90 80
    `;

    const startPoint = {
      x: 860,
      y: 310,
    };

    const endPoint = {
      x: 90,
      y: 80,
    };

    return (
      <div
        ref={ref}
        dir="rtl"
        className={cn(
          `
            relative
            mx-auto
            w-full
            overflow-visible
          `,
          className,
        )}
        style={{
          width: roadmapWidth,
          ...style,
        }}
        {...props}
      >
        <div
          className="
            relative
            w-full
            overflow-visible
          "
          style={{
            height: roadmapHeight,
          }}
        >
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 1000 420"
            preserveAspectRatio="none"
            className="
              pointer-events-none
              absolute
              inset-0
              h-full
              w-full
              overflow-visible
            "
            aria-hidden="true"
          >
            {/* =========================================
                SOFT OUTER ROAD
            ========================================== */}
            <path
              d={path}
              fill="none"
              stroke="#DCEBE6"
              strokeWidth="22"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {/* =========================================
                MAIN ROAD
            ========================================== */}
            <motion.path
              d={path}
              fill="none"
              stroke="#0E5F63"
              strokeWidth="5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
              }}
              animate={{
                pathLength: 1,
              }}
              transition={{
                duration: reducedMotion ? 0 : animationDuration,
                ease: "easeInOut",
              }}
            />

            {/* =========================================
                SUBTLE ROAD DETAIL
            ========================================== */}
            <motion.path
              d={path}
              fill="none"
              stroke="#8FB7B1"
              strokeWidth="2"
              strokeDasharray="1 9"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{
                pathLength: 0,
                opacity: 0,
              }}
              animate={{
                pathLength: 1,
                opacity: 0.8,
              }}
              transition={{
                duration: reducedMotion ? 0 : animationDuration,
                ease: "easeInOut",
              }}
            />

            {/* =========================================
                START CAP
            ========================================== */}
            <circle
              cx={startPoint.x}
              cy={startPoint.y}
              r="7"
              fill="white"
              stroke="#0E5F63"
              strokeWidth="3"
            />

            {/* =========================================
                FINISH MARKER
            ========================================== */}
            <motion.g
              initial={
                reducedMotion
                  ? {
                      opacity: 1,
                      scale: 1,
                    }
                  : {
                      opacity: 0,
                      scale: 0.65,
                    }
              }
              animate={{
                opacity: 1,
                scale: 1,
              }}
              transition={{
                duration: reducedMotion ? 0 : 0.5,
                delay: reducedMotion ? 0 : animationDuration + 0.1,
                ease: "easeOut",
              }}
              style={{
                transformOrigin: `${endPoint.x}px ${endPoint.y}px`,
              }}
            >
              {/* Finish glow */}
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="17"
                fill="#D6A544"
                fillOpacity="0.10"
              />

              {/* Finish dot */}
              <circle
                cx={endPoint.x}
                cy={endPoint.y}
                r="6"
                fill="#D6A544"
                stroke="white"
                strokeWidth="3"
              />
            </motion.g>
          </svg>

          {/* =========================================
              MILESTONES
          ========================================== */}
          {milestones.map((milestone, index) => (
            <MilestoneMarker
              key={milestone.id}
              milestone={milestone}
              index={index}
              reducedMotion={reducedMotion}
              showLabels={showLabels}
            />
          ))}
        </div>
      </div>
    );
  },
);

AnimatedRoadmap.displayName = "AnimatedRoadmap";

export { AnimatedRoadmap };
