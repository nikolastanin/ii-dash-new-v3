"use client";

type Props = {
  saved: boolean;
  onToggle: () => void;
  className?: string;
};

export default function SaveButton({ saved, onToggle, className = "" }: Props) {
  return (
    <button
      onClick={onToggle}
      aria-label={saved ? "Remove from saved" : "Save resource"}
      className={`rounded-full flex items-center justify-center flex-shrink-0 hover:scale-105 transition-transform ${className}`}
    >
      <svg width="14" height="14" viewBox="0 0 24 24" fill={saved ? "currentColor" : "none"} className="text-candy-ruby">
        <path
          d="M6 3.5A1.5 1.5 0 0 1 7.5 2h9A1.5 1.5 0 0 1 18 3.5v18l-6-4.2-6 4.2v-18Z"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
