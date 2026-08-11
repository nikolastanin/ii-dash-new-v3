type Props = {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Yes, I'm sure",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/40 px-6" onClick={onCancel}>
      <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-surface rounded-30 p-7 text-center">
        <p className="font-display text-xl text-candy-ruby mb-2">{title}</p>
        {description && <p className="text-sm text-inksoft leading-relaxed mb-6">{description}</p>}
        <div className="flex flex-col gap-3">
          <button
            onClick={onConfirm}
            className="w-full bg-candy-ruby text-banana-med rounded-full px-5 py-3 text-sm font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            {confirmLabel}
          </button>
          <button onClick={onCancel} className="w-full bg-canvas text-ink rounded-full px-5 py-3 text-sm font-semibold">
            {cancelLabel}
          </button>
        </div>
      </div>
    </div>
  );
}
