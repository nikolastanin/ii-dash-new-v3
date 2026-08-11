"use client";

import type { Resource } from "@/lib/types";

type Props = {
  resource: Resource | null;
  onClose: () => void;
};

function youtubeEmbedUrl(url: string): string | null {
  const match = url.match(/(?:v=|youtu\.be\/|embed\/)([\w-]{11})/);
  return match ? `https://www.youtube.com/embed/${match[1]}?autoplay=1` : null;
}

export default function ResourceLightbox({ resource, onClose }: Props) {
  if (!resource) return null;

  const embedSrc = resource.type === "video" ? youtubeEmbedUrl(resource.url) : resource.url;

  return (
    <div className="fixed inset-0 z-[110] flex items-center justify-center bg-ink/55 backdrop-blur-sm p-4 md:p-8" onClick={onClose}>
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex h-full max-h-[85vh] w-full max-w-4xl flex-col overflow-hidden rounded-[2rem] bg-surface"
      >
        <div className="flex items-center justify-between gap-4 border-b border-ink/10 px-5 py-4">
          <p className="font-display text-lg text-candy-ruby truncate">{resource.title}</p>
          <div className="flex flex-shrink-0 items-center gap-4">
            <a href={resource.url} target="_blank" rel="noreferrer" className="text-sm font-semibold text-inksoft hover:text-ink">
              Open in new tab ↗
            </a>
            <button
              onClick={onClose}
              aria-label="Close"
              className="grid size-9 place-items-center rounded-full bg-canvas text-sm font-semibold text-candy-ruby"
            >
              ✕
            </button>
          </div>
        </div>

        <div className="flex-1 bg-canvas">
          {embedSrc ? (
            <iframe
              src={embedSrc}
              title={resource.title}
              className="h-full w-full border-0"
              allow="autoplay; encrypted-media; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center p-8 text-center text-sm text-inksoft">
              This resource can&rsquo;t be previewed here.{" "}
              <a href={resource.url} target="_blank" rel="noreferrer" className="ml-1 underline">
                Open it in a new tab
              </a>{" "}
              instead.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
