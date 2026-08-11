import type { ReactNode } from "react";
import { RESOURCE_COLORS, RESOURCE_ICON_TEXT, RESOURCE_TYPE_LABELS } from "@/lib/data";
import type { GuideResource, Resource, ToolResource } from "@/lib/types";
import ResourceIcon from "./ResourceIcon";

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

export function ResourceRow({ resource }: { resource: Resource }) {
  const color = RESOURCE_COLORS[resource.type];
  const iconTextClass = RESOURCE_ICON_TEXT[resource.type] || "text-white";
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type] || "Resource";
  return (
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="flex items-center gap-3 bg-canvas rounded-20 px-4 py-3 hover:bg-brandlight/50 transition-colors"
    >
      <span className="w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0" style={{ backgroundColor: color }}>
        <ResourceIcon type={resource.type} className={iconTextClass} />
      </span>
      <span className="flex-1 min-w-0">
        <span className="block text-[11px] font-semibold uppercase tracking-wide text-inksoft">{typeLabel}</span>
        <span className="block text-sm font-semibold truncate">{resource.title}</span>
      </span>
      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" className="text-inksoft flex-shrink-0">
        <path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </a>
  );
}

export function ToolCard({ tool }: { tool: ToolResource }) {
  return (
    <div className="bg-surface rounded-20 border-2 border-ink/10 w-64 flex-shrink-0 flex flex-col overflow-hidden">
      <div className="bg-ink text-white py-7 flex items-center justify-center gap-2.5">
        <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-display text-sm">
          {tool.provider.charAt(0)}
        </span>
        <span className="font-display uppercase tracking-wide">{tool.provider}</span>
      </div>
      <div className="p-6 flex flex-col flex-1">
        <p className="font-semibold text-sm mb-1.5">{tool.title}</p>
        <p className="text-sm text-inksoft mb-5 flex-1 leading-relaxed">{tool.description}</p>
        <a
          href={tool.url}
          className="text-center bg-ink text-white rounded-28 px-5 py-3 text-sm font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
        >
          {tool.cta}
        </a>
      </div>
    </div>
  );
}

export function GuideCard({ guide }: { guide: GuideResource }) {
  return (
    <div className="rounded-[2rem] bg-green-light p-6">
      <div className="flex justify-between items-start gap-3 mb-2.5">
        <span className="font-sans text-xs font-semibold text-green-woods">by {guide.author}</span>
        <span className="text-xs text-candy-ruby/65 whitespace-nowrap mt-0.5">{guide.readTimeMins} mins</span>
      </div>
      <h3 className="font-display text-[clamp(1.1rem,2vw,1.35rem)] text-candy-ruby mb-2">{guide.title}</h3>
      <p className="text-sm text-candy-ruby/65 mb-4 leading-relaxed line-clamp-3">{guide.description}</p>
      <a href={guide.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-green-woods hover:underline">
        Read more →
      </a>
    </div>
  );
}

export function HighlightCard({ resource }: { resource: Resource }) {
  const color = RESOURCE_COLORS[resource.type];
  const typeLabel = RESOURCE_TYPE_LABELS[resource.type] || "Resource";

  let cover: ReactNode = null;
  if (resource.type === "tool") {
    cover = (
      <div className="bg-ink text-white py-9 flex items-center justify-center gap-2.5">
        <span className="w-9 h-9 rounded-full bg-white/15 flex items-center justify-center font-display text-sm">
          {resource.provider.charAt(0)}
        </span>
        <span className="font-display uppercase tracking-wide">{resource.provider}</span>
      </div>
    );
  } else if (resource.type === "video") {
    cover = (
      <div className="py-11 flex items-center justify-center" style={{ backgroundColor: color }}>
        <span className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" className="text-white">
            <path d="M10 8.7v6.6l5.5-3.3-5.5-3.3Z" fill="currentColor" />
          </svg>
        </span>
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
        <p className="font-semibold text-sm mb-1.5">{resource.title}</p>
        <p className="text-sm text-inksoft mb-4 leading-relaxed line-clamp-3">{resource.description}</p>
        <span className="inline-block bg-ink text-white rounded-28 px-4 py-2 text-xs font-display uppercase tracking-wide">
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
    <a
      href={resource.url}
      target="_blank"
      rel="noreferrer"
      className="block bg-surface rounded-20 border-2 border-ink/10 overflow-hidden break-inside-avoid mb-5 hover:border-ink/25 transition-colors"
    >
      {cover}
      <div className="p-5">{body}</div>
    </a>
  );
}
