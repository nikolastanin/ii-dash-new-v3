import type { ReactNode } from "react";
import { RESOURCE_COLORS, RESOURCE_ICON_TEXT, RESOURCE_TYPE_LABELS } from "@/lib/data";
import type { GuideResource, Resource, ToolResource } from "@/lib/types";
import ResourceIcon from "./ResourceIcon";
import Button from "./ui/Button";
import SaveButton from "./SaveButton";

type SaveProps = {
  saved?: boolean;
  onToggleSaved?: () => void;
};

// A resource click should open our own tool's dedicated page when it has
// one, and only fall back to the lightbox preview for everything else.
function openResource(
  resource: Resource,
  onOpenResource: (resource: Resource) => void,
  onOpenInternal?: (screen: string) => void
) {
  if (resource.type === "tool" && resource.internalScreen && onOpenInternal) {
    onOpenInternal(resource.internalScreen);
    return;
  }
  onOpenResource(resource);
}

export function ResourceBubble({ resource }: { resource: Resource }) {
  const color = RESOURCE_COLORS[resource.type];
  const iconTextClass = RESOURCE_ICON_TEXT[resource.type] || "text-white";
  return (
    <span
      className="w-7 h-7 rounded-full flex items-center justify-center flex-shrink-0 ring-2 ring-surface -ml-2 first:ml-0"
      style={{ backgroundColor: color }}
    >
      <ResourceIcon type={resource.type} className={iconTextClass} />
    </span>
  );
}

export function ResourceBubbleStack({ resources }: { resources: Resource[] }) {
  const preview = resources.slice(0, 3);
  const extra = resources.length - preview.length;
  if (!resources.length) return null;
  return (
    <span className="flex items-center flex-shrink-0">
      {preview.map((r) => (
        <ResourceBubble key={r.id} resource={r} />
      ))}
      {extra > 0 && (
        <span className="w-7 h-7 rounded-full bg-canvas text-inksoft flex items-center justify-center flex-shrink-0 ring-2 ring-surface -ml-2 text-[10px] font-bold">
          +{extra}
        </span>
      )}
    </span>
  );
}

export function ResourceRow({
  resource,
  saved,
  onToggleSaved,
  onOpenResource,
  onOpenInternal,
}: {
  resource: Resource;
  onOpenResource: (resource: Resource) => void;
  onOpenInternal?: (screen: string) => void;
} & SaveProps) {
  const color = RESOURCE_COLORS[resource.type];
  const iconTextClass = RESOURCE_ICON_TEXT[resource.type] || "text-white";
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type] || "Resource";
  return (
    <div className="flex items-center gap-3 bg-canvas rounded-20 px-4 py-3 hover:bg-brandlight/50 transition-colors">
      <button
        type="button"
        onClick={() => openResource(resource, onOpenResource, onOpenInternal)}
        className="flex items-center gap-3 flex-1 min-w-0 text-left"
      >
      {resource.type === "video" ? (
        <span className="relative w-16 h-9 rounded-md overflow-hidden flex-shrink-0 bg-canvas">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src="https://love-logic.github.io/mortgageinsiders/og-card.png"
            alt=""
            className="w-full h-full object-cover"
          />
          <span className="absolute inset-0 flex items-center justify-center bg-black/30">
            <span className="w-5 h-5 rounded-full bg-white/90 flex items-center justify-center">
              <ResourceIcon type="video" className="text-black" />
            </span>
          </span>
        </span>
      ) : (
        <span
          className="w-16 h-9 rounded-md flex items-center justify-center flex-shrink-0"
          style={{ backgroundColor: color }}
        >
          <ResourceIcon type={resource.type} className={iconTextClass} />
        </span>
      )}
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-inksoft">{typeLabel}</span>
        <span className="block text-sm font-semibold truncate">{resource.title}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-inksoft flex-shrink-0">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
      </button>
      {onToggleSaved && <SaveButton saved={!!saved} onToggle={onToggleSaved} className="w-8 h-8 bg-transparent flex-shrink-0" />}
    </div>
  );
}

export function ToolCard({
  tool,
  saved,
  onToggleSaved,
  onOpenInternal,
  onOpenResource,
}: {
  tool: ToolResource;
  onOpenInternal?: (screen: string) => void;
  onOpenResource: (resource: Resource) => void;
} & SaveProps) {
  return (
    <div className="relative w-72 flex-shrink-0 flex flex-col justify-between rounded-[2rem] bg-surface border-2 border-transparent hover:border-ink/40 transition-colors p-7">
      {onToggleSaved && <SaveButton saved={!!saved} onToggle={onToggleSaved} className="absolute top-4 right-4 w-8 h-8 bg-canvas" />}
      <div>
        <span className="font-sans text-xs font-semibold text-green-woods">Free tool</span>
        <h3 className="mt-3 font-display text-[clamp(1.4rem,2.2vw,1.7rem)] text-candy-ruby pr-8">{tool.title}</h3>
        <p className="mt-2 text-xs text-candy-ruby/55 leading-relaxed">{tool.description}</p>
      </div>
      {tool.internalScreen ? (
        <Button onClick={() => onOpenInternal?.(tool.internalScreen!)} variant="green" className="mt-7 self-start">
          {tool.cta}
        </Button>
      ) : (
        <Button onClick={() => onOpenResource(tool)} variant="green" className="mt-7 self-start">
          {tool.cta}
        </Button>
      )}
    </div>
  );
}

export function GuideCard({
  guide,
  saved,
  onToggleSaved,
  onOpenResource,
}: { guide: GuideResource; onOpenResource: (resource: Resource) => void } & SaveProps) {
  return (
    <div className="rounded-[2rem] bg-green-light p-6">
      <div className="flex justify-between items-start gap-3 mb-2.5">
        <span className="font-sans text-xs font-semibold text-green-woods">by {guide.author}</span>
        <div className="flex items-center gap-2 flex-shrink-0">
          <span className="text-xs text-candy-ruby/65 whitespace-nowrap mt-0.5">{guide.readTimeMins} mins</span>
          {onToggleSaved && <SaveButton saved={!!saved} onToggle={onToggleSaved} className="bg-creamy w-6 h-6" />}
        </div>
      </div>
      <h3 className="font-display text-[clamp(1.1rem,2vw,1.35rem)] text-candy-ruby mb-2">{guide.title}</h3>
      <p className="text-sm text-candy-ruby/65 mb-4 leading-relaxed line-clamp-3">{guide.description}</p>
      <button type="button" onClick={() => onOpenResource(guide)} className="text-sm font-semibold text-green-woods hover:underline">
        Read more →
      </button>
    </div>
  );
}

export function HighlightCard({
  resource,
  saved,
  onToggleSaved,
  onOpenResource,
  onOpenInternal,
  className = "",
}: {
  resource: Resource;
  onOpenResource: (resource: Resource) => void;
  onOpenInternal?: (screen: string) => void;
  className?: string;
} & SaveProps) {
  const color = RESOURCE_COLORS[resource.type];
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type] || "Resource";

  let cover: ReactNode = null;
  if (resource.type === "video") {
    cover = (
      <div className="relative h-32 overflow-hidden flex-shrink-0">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://love-logic.github.io/mortgageinsiders/og-card.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/30">
          <span className="w-10 h-10 rounded-full bg-white/90 flex items-center justify-center">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" className="text-black">
              <path d="M10 8.7v6.6l5.5-3.3-5.5-3.3Z" fill="currentColor" />
            </svg>
          </span>
        </div>
      </div>
    );
  } else if (resource.type === "guide") {
    cover = (
      <div className="bg-brandlight py-9 flex items-center justify-center">
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" className="text-green-woods">
          <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
          <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2Z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        </svg>
      </div>
    );
  }

  let body: ReactNode;
  if (resource.type === "tool") {
    body = (
      <>
        <span className="font-sans text-xs font-semibold text-green-woods">Free tool</span>
        <p className="mt-3 font-display text-lg text-candy-ruby">{resource.title}</p>
        <p className="mt-2 text-xs text-candy-ruby/55 leading-relaxed line-clamp-2">{resource.description}</p>
        <span className="mt-4 inline-flex items-center gap-2 rounded-full bg-green-woods text-banana-med px-4 py-2 text-xs font-display uppercase tracking-wide">
          {resource.cta} →
        </span>
      </>
    );
  } else {
    body = (
      <>
        <p className="text-[11px] uppercase tracking-wide font-semibold" style={{ color }}>
          {typeLabel}
        </p>
        <p className="font-semibold text-sm mt-1.5 mb-1.5">{resource.title}</p>
        {resource.type === "guide" && (
          <>
            <p className="text-xs text-inksoft mb-2.5">
              by {resource.author} · {resource.readTimeMins} mins
            </p>
            <p className="text-sm text-inksoft leading-relaxed line-clamp-3">{resource.description}</p>
          </>
        )}
        {resource.type === "video" && <p className="text-xs text-inksoft">{resource.channel}</p>}
      </>
    );
  }

  return (
    <div className={`relative break-inside-avoid ${className}`}>
      <button
        type="button"
        onClick={() => openResource(resource, onOpenResource, onOpenInternal)}
        className="block w-full text-left bg-surface rounded-20 border-2 border-transparent overflow-hidden hover:border-ink/40 transition-colors"
      >
        {cover}
        <div className="p-5">{body}</div>
      </button>
      {onToggleSaved && (
        <SaveButton saved={!!saved} onToggle={onToggleSaved} className="absolute top-3 right-3 w-8 h-8 bg-surface" />
      )}
    </div>
  );
}
