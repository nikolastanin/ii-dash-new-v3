type Props = {
  toast: { id: string; text: string } | null;
};

export default function Toast({ toast }: Props) {
  if (!toast) return null;

  return (
    <div className="fixed top-4 inset-x-0 z-[100] flex justify-center pointer-events-none px-4">
      <div
        key={toast.id}
        className="animate-toast-in pointer-events-auto flex items-center gap-2.5 bg-green-woods text-banana-med rounded-full px-6 py-3 font-display text-sm shadow-lg"
      >
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="flex-shrink-0">
          <path d="M20 6L9 17l-5-5" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        {toast.text}
      </div>
    </div>
  );
}
