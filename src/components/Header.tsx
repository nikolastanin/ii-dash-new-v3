"use client";

import { useState } from "react";
import { RESOURCES } from "@/lib/data";

type Props = {
  onLogoClick: () => void;
  onScrollToTools: () => void;
  onStartOver: () => void;
};

export default function Header({ onLogoClick, onScrollToTools, onStartOver }: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const guides = Object.values(RESOURCES).filter((r) => r.type === "guide");

  const guidesList = (idPrefix: string) => (
    <ul className="flex flex-col gap-1">
      {guides.map((g) => (
        <li key={idPrefix + g.id}>
          <a
            href={g.url}
            target="_blank"
            rel="noreferrer"
            className="block text-sm font-semibold px-4 py-2.5 rounded-20 hover:bg-brandlight/50 transition-colors"
          >
            {g.title}
          </a>
        </li>
      ))}
    </ul>
  );

  return (
    <header className="sticky top-0 z-50 bg-canvas">
      <div className="max-w-5xl mx-auto w-full px-6 py-5 flex items-center justify-between gap-4">
        <button onClick={onLogoClick} className="font-display uppercase text-lg tracking-tight flex-shrink-0">
          meetdoug
        </button>

        <nav className="hidden sm:flex items-center gap-3">
          <div className="relative group nav-group">
            <button
              className="bg-surface text-ink border-2 border-ink/10 px-5 py-3 text-sm rounded-full font-semibold inline-flex items-center gap-2"
              aria-haspopup="true"
            >
              Guides
              <svg className="nav-chevron" width="14" height="14" viewBox="0 0 24 24" fill="none">
                <path d="M19 9l-7 7-7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
            <div className="nav-dropdown absolute left-0 top-[calc(100%+10px)] w-72 bg-surface rounded-20 shadow-lg shadow-green-woods/20 p-3 z-50">
              {guidesList("desktop-")}
            </div>
          </div>
          <button onClick={onScrollToTools} className="bg-surface text-ink border-2 border-ink/10 px-5 py-3 text-sm rounded-full font-semibold">
            Tools
          </button>
          <button
            onClick={onStartOver}
            className="bg-candy-ruby text-banana-med px-5 py-3 text-sm rounded-full font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Start over
          </button>
        </nav>

        <button
          onClick={() => setMobileOpen((v) => !v)}
          aria-label="Menu"
          className="sm:hidden w-11 h-11 rounded-full bg-surface border-2 border-ink/10 flex items-center justify-center"
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
            <path d="M4 6h16M4 12h16M4 18h10" stroke="#540329" strokeWidth="2" strokeLinecap="round" />
          </svg>
        </button>
      </div>

      {mobileOpen && (
        <div className="sm:hidden px-6 pb-5">
          <div className="bg-surface rounded-20 border-2 border-ink/10 p-5 flex flex-col gap-4">
            <p className="text-xs uppercase tracking-wide font-semibold text-inksoft">Guides</p>
            {guidesList("mobile-")}
            <button
              onClick={() => {
                onScrollToTools();
                setMobileOpen(false);
              }}
              className="text-left bg-canvas rounded-full px-5 py-3 text-sm font-semibold"
            >
              Tools
            </button>
            <button
              onClick={() => {
                onStartOver();
                setMobileOpen(false);
              }}
              className="text-left bg-candy-ruby text-banana-med rounded-full px-5 py-3 text-sm font-display uppercase tracking-wide"
            >
              Start over
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
