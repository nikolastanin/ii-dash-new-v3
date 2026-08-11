type Props = {
  pct: number; // 0-1
  strokeWidth?: number;
  className?: string;
  valueClassName?: string;
  caption?: string;
  captionClassName?: string;
  id?: string;
};

export default function ProgressDonut({
  pct,
  strokeWidth = 22,
  className = "",
  valueClassName = "font-display text-banana-med",
  caption,
  captionClassName = "text-banana-med/70",
  id,
}: Props) {
  const r = 50 - strokeWidth / 2;
  const circ = 2 * Math.PI * r;

  return (
    <div id={id} className={`relative flex-shrink-0 ${className}`}>
      <svg viewBox="0 0 100 100" className="w-full h-full -rotate-90">
        <circle cx="50" cy="50" r={r} fill="none" stroke="var(--color-candy-med)" strokeWidth={strokeWidth} />
        <circle
          cx="50"
          cy="50"
          r={r}
          fill="none"
          stroke="var(--color-green-med)"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          strokeDasharray={`${pct * circ} ${circ}`}
          className="transition-[stroke-dasharray] duration-300 ease-out"
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 grid place-items-center text-center">
        <div>
          {caption && <p className={`text-xs font-semibold ${captionClassName}`}>{caption}</p>}
          <p className={valueClassName}>{Math.round(pct * 100)}%</p>
        </div>
      </div>
    </div>
  );
}
