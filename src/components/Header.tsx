"use client";

import { useEffect, useRef, useState } from "react";
import { RESOURCES } from "@/lib/data";
import type { NotificationItem } from "@/lib/types";

type Props = {
  onLogoClick: () => void;
  onScrollToTools: () => void;
  onStartOver: () => void;
  onOpenLibrary: () => void;
  onOpenGoals: () => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
};

export default function Header({
  onLogoClick,
  onScrollToTools,
  onStartOver,
  onOpenLibrary,
  onOpenGoals,
  notifications,
  onMarkNotificationsRead,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const guides = Object.values(RESOURCES).filter((r) => r.type === "guide");
  const unreadCount = notifications.filter((n) => !n.read).length;

  // The header's real height (e.g. from a taller logo image) can drift from
  // any hardcoded guess — measure it and keep --header-h in sync so sticky
  // bars positioned below it never end up hidden behind it.
  useEffect(() => {
    const el = headerRef.current;
    if (!el) return;
    const setHeaderHeight = () => document.documentElement.style.setProperty("--header-h", `${el.offsetHeight}px`);
    setHeaderHeight();
    const observer = new ResizeObserver(setHeaderHeight);
    observer.observe(el);
    return () => observer.disconnect();
  }, [mobileOpen]);

  const notificationsList = (
    <ul className="flex flex-col gap-1 max-h-72 overflow-y-auto">
      {notifications.length === 0 && <li className="text-sm text-inksoft px-4 py-2.5">You&rsquo;re all caught up.</li>}
      {notifications.map((n) => (
        <li key={n.id} className="text-sm font-semibold px-4 py-2.5 rounded-20">
          {n.text}
        </li>
      ))}
    </ul>
  );

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
    <header ref={headerRef} className="sticky top-0 z-50 bg-canvas">
      <div className="max-w-5xl mx-auto w-full px-6 py-5 flex items-center justify-between gap-4">
        <button onClick={onLogoClick} className="font-display uppercase text-lg tracking-tight flex-shrink-0">
         <img src="https://love-logic.github.io/mortgageinsiders/icon.svg" alt="" /> dougy
        </button>

        <nav className="hidden sm:flex items-center gap-3">
          <button onClick={onOpenGoals} className="bg-surface text-ink border-2 border-ink/10 px-5 py-3 text-sm rounded-full font-semibold">
            Goals
          </button>
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
          <button onClick={onOpenLibrary} className="bg-surface text-ink border-2 border-ink/10 px-5 py-3 text-sm rounded-full font-semibold">
            Resources
          </button>
          <div className="relative nav-group">
            <button
              onClick={() => {
                setBellOpen((v) => !v);
                if (!bellOpen) onMarkNotificationsRead();
              }}
              aria-label="Notifications"
              aria-haspopup="true"
              className="relative w-11 h-11 rounded-full bg-surface border-2 border-ink/10 flex items-center justify-center"
            >
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                <path
                  d="M18 8a6 6 0 1 0-12 0c0 4-2 5-2 7h16c0-2-2-3-2-7Z M9 19a3 3 0 0 0 6 0"
                  stroke="#540329"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 rounded-full bg-candy-ruby text-banana-med text-[10px] font-bold flex items-center justify-center">
                  {unreadCount}
                </span>
              )}
            </button>
            {bellOpen && (
              <>
                <button
                  aria-label="Close notifications"
                  onClick={() => setBellOpen(false)}
                  className="fixed inset-0 z-40 cursor-default"
                />
                <div className="nav-dropdown force-open absolute right-0 top-[calc(100%+10px)] w-72 bg-surface rounded-20 shadow-lg shadow-green-woods/20 p-3 z-50">
                  {notificationsList}
                </div>
              </>
            )}
          </div>
          <button
            onClick={onStartOver}
            className="bg-candy-ruby text-banana-med px-5 py-3 text-sm rounded-full font-display uppercase tracking-wide hover:opacity-90 transition-opacity"
          >
            Start over
          </button>
        </nav>

        <button
          onClick={() => {
            setMobileOpen((v) => !v);
            if (!mobileOpen) onMarkNotificationsRead();
          }}
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
            <button
              onClick={() => {
                onOpenGoals();
                setMobileOpen(false);
              }}
              className="text-left bg-canvas rounded-full px-5 py-3 text-sm font-semibold"
            >
              Goals
            </button>
            <p className="text-xs uppercase tracking-wide font-semibold text-inksoft">Notifications</p>
            {notificationsList}
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
                onOpenLibrary();
                setMobileOpen(false);
              }}
              className="text-left bg-canvas rounded-full px-5 py-3 text-sm font-semibold"
            >
              Resources
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
