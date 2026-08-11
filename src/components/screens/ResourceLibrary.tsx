"use client";

import { useMemo, useState } from "react";
import { RESOURCES } from "@/lib/data";
import { HighlightCard } from "@/components/resources";
import type { Resource } from "@/lib/types";

type Props = {
  savedIds: Set<string>;
  onToggleSaved: (id: string) => void;
  onOpenResource: (resource: Resource) => void;
  onOpenInternal: (screen: string) => void;
  onBack: () => void;
};

export default function ResourceLibrary({ savedIds, onToggleSaved, onOpenResource, onOpenInternal, onBack }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<string | null>(null);
  const [savedOnly, setSavedOnly] = useState(false);

  const all = useMemo(() => Object.values(RESOURCES), []);
  const categories = useMemo(
    () => [...new Set(all.map((r) => r.category).filter((c): c is string => Boolean(c)))],
    [all]
  );

  const filtered = all.filter((r) => {
    if (savedOnly && !savedIds.has(r.id)) return false;
    if (category && r.category !== category) return false;
    if (query) {
      const q = query.toLowerCase();
      const description = "description" in r ? r.description : "";
      if (!r.title.toLowerCase().includes(q) && !description.toLowerCase().includes(q)) return false;
    }
    return true;
  });

  return (
    <section className="min-h-screen">
      <div className="max-w-5xl mx-auto w-full px-6 pt-7 pb-3">
        <button onClick={onBack} className="text-sm text-inksoft hover:text-ink flex items-center gap-1.5">
          <span aria-hidden="true">←</span> Back
        </button>
      </div>

      <main className="max-w-5xl mx-auto w-full px-6 pb-24">
        <h1 className="font-display text-[clamp(2rem,5vw,3rem)] text-candy-ruby mb-3">Every resource, in one place.</h1>
        <p className="text-inksoft text-lg mb-8 max-w-xl">
          Every guide, tool, video and link we&rsquo;ve gathered — search, filter, and save what&rsquo;s useful to you.
        </p>

        <div className="flex items-center gap-3 rounded-full border-2 border-ink/15 px-6 mb-5 focus-within:border-green-woods transition-colors">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" className="text-inksoft flex-shrink-0">
            <circle cx="11" cy="11" r="7" stroke="currentColor" strokeWidth="2" />
            <path d="M21 21l-4.3-4.3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
          <input
            type="text"
            placeholder="Search guides, tools and more…"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="h-14 w-full bg-transparent outline-none text-base"
          />
        </div>

        <div className="flex flex-wrap gap-2.5 mb-10">
          <button
            className={`chip bg-surface border-2 border-ink/15 rounded-full px-5 py-2.5 text-sm hover:border-ink/40 transition-colors ${category === null ? "selected" : ""}`}
            onClick={() => setCategory(null)}
          >
            All
          </button>
          {categories.map((c) => (
            <button
              key={c}
              className={`chip bg-surface border-2 border-ink/15 rounded-full px-5 py-2.5 text-sm hover:border-ink/40 transition-colors ${category === c ? "selected" : ""}`}
              onClick={() => setCategory(c)}
            >
              {c}
            </button>
          ))}
          <button
            className={`chip bg-surface border-2 border-ink/15 rounded-full px-5 py-2.5 text-sm hover:border-ink/40 transition-colors ${savedOnly ? "selected" : ""}`}
            onClick={() => setSavedOnly((v) => !v)}
          >
            Saved only
          </button>
        </div>

        {filtered.length === 0 ? (
          <p className="text-inksoft text-sm">No resources match your filters.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
            {filtered.map((r) => (
              <HighlightCard
                key={r.id}
                resource={r}
                saved={savedIds.has(r.id)}
                onToggleSaved={() => onToggleSaved(r.id)}
                onOpenResource={onOpenResource}
                onOpenInternal={onOpenInternal}
              />
            ))}
          </div>
        )}
      </main>
    </section>
  );
}
