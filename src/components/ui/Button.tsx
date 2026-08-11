"use client";

import type { ButtonHTMLAttributes } from "react";

/* Ported directly from Mortgage Insiders' brand button: full pill,
   dark fill, yellow Yowza label, circle holding a chevron. */

const variants = {
  green: { pill: "bg-green-woods text-banana-med", circle: "bg-candy-med", chevron: "text-candy-ruby" },
  maroon: { pill: "bg-candy-ruby text-banana-med", circle: "bg-candy-med", chevron: "text-candy-ruby" },
  yellow: { pill: "bg-banana-med text-candy-ruby", circle: "bg-green-woods", chevron: "text-banana-med" },
  cream: { pill: "bg-creamy text-candy-ruby", circle: "bg-candy-med", chevron: "text-candy-ruby" },
} as const;

type Variant = keyof typeof variants;

type Props = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "children"> & {
  children: string;
  variant?: Variant;
  size?: "md" | "lg";
  fullWidth?: boolean;
  /** Border-only pill, no fill. Hardcoded to candy-ruby — `variant` is ignored when set, since mortgageinsiders only defines this one outline treatment. */
  outline?: boolean;
};

export default function Button({
  children,
  variant = "maroon",
  size = "md",
  fullWidth = false,
  outline = false,
  className = "",
  ...rest
}: Props) {
  const v = variants[variant];
  const dims =
    size === "lg"
      ? "h-[3.6rem] pl-8 pr-[4.8px] text-lg md:h-[4.5rem] md:pl-10 md:pr-[6px] md:text-3xl"
      : "h-14 pl-7 pr-[4.8px] text-lg md:text-xl";
  const circle = size === "lg" ? "size-[3rem] md:size-[3.75rem]" : "size-[2.9rem]";

  if (outline) {
    return (
      <button
        className={`group flex h-[3.6rem] items-center justify-between rounded-full border-[3px] border-candy-ruby pl-[27px] pr-[2.8px] font-display text-lg uppercase text-candy-ruby transition-transform hover:scale-[1.03] active:scale-[0.98] md:inline-flex md:h-[4.5rem] md:justify-center md:px-9 md:text-3xl ${fullWidth ? "w-full md:w-auto" : ""} ${className}`}
        {...rest}
      >
        {children}
        <span className="grid size-[46px] shrink-0 place-items-center rounded-full bg-candy-ruby md:hidden">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            className="w-1/2 text-candy-med transition-transform duration-200 ease-out group-hover:translate-x-[18%]"
            aria-hidden="true"
          >
            <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>
    );
  }

  return (
    <button
      className={`group inline-flex items-center gap-6 rounded-full font-display uppercase transition-transform duration-200 ease-out hover:scale-[1.03] active:scale-[0.98] ${fullWidth ? "w-full justify-between md:w-auto md:justify-start" : ""} ${v.pill} ${dims} ${className}`}
      {...rest}
    >
      <span className="whitespace-nowrap">{children}</span>
      <span className={`grid place-items-center rounded-full flex-shrink-0 ${v.circle} ${circle}`}>
        <svg
          viewBox="0 0 24 24"
          fill="none"
          className={`w-1/2 ${v.chevron} transition-transform duration-200 ease-out group-hover:translate-x-[18%]`}
          aria-hidden="true"
        >
          <path d="M9 5l7 7-7 7" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
    </button>
  );
}
