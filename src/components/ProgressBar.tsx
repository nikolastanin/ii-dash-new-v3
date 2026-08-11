export default function ProgressBar({ done, total, className = "" }: { done: number; total: number; className?: string }) {
  const pct = total ? (done / total) * 100 : 0;
  return (
    <div className={`h-2 w-full overflow-hidden rounded-full bg-green-woods/15 ${className}`}>
      <div
        className="h-full rounded-full bg-green-woods transition-[width] duration-300 ease-out"
        style={{ width: `${pct}%` }}
      />
    </div>
  );
}
