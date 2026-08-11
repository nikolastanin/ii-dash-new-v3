type Props = {
  toast: { id: string; text: string } | null;
  position?: "top-center" | "top-right";
  variant?: "success" | "reminder";
};

const POSITION_CLASS = {
  "top-center": "inset-x-0 flex justify-center",
  "top-right": "right-4 flex justify-end",
};

const VARIANT_CLASS = {
  success: "bg-green-woods text-banana-med",
  reminder: "bg-candy-ruby text-banana-med",
};

export default function Toast({ toast, position = "top-center", variant = "success" }: Props) {
  if (!toast) return null;

  return (
    <div className={`fixed top-4 z-[100] pointer-events-none px-4 ${POSITION_CLASS[position]}`}>
      <div
        key={toast.id}
        className={`animate-toast-in pointer-events-auto flex items-center gap-2.5 rounded-full px-6 py-3 font-display text-sm shadow-lg ${VARIANT_CLASS[variant]}`}
      >
        {variant === "success" ? (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        ) : (
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
            <path
              d="M18 8a6 6 0 1 0-12 0c0 4-2 5-2 7h16c0-2-2-3-2-7Z M9 19a3 3 0 0 0 6 0"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        )}
        {toast.text}
      </div>
    </div>
  );
}
