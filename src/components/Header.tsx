"use client";

import { useEffect, useRef, useState } from "react";
import { RESOURCES } from "@/lib/data";
import type { NotificationItem } from "@/lib/types";
import MeetDougModal from "@/components/MeetDougModal";

type Props = {
  onLogoClick: () => void;
  onScrollToTools: () => void;
  onStartOver: () => void;
  onOpenLibrary: () => void;
  onOpenGoals: () => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  // Bumped whenever the intro tour finishes — used as a key to remount the
  // eye and replay its blink animation. Starts at 0 so it never blinks on
  // first page load, only after an actual "finish" event.
  blinkKey?: number;
};

export default function Header({
  onLogoClick,
  onScrollToTools,
  onStartOver,
  onOpenLibrary,
  onOpenGoals,
  notifications,
  onMarkNotificationsRead,
  blinkKey = 0,
}: Props) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [bellOpen, setBellOpen] = useState(false);
  const [meetDougOpen, setMeetDougOpen] = useState(false);
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
        <button onClick={onLogoClick} className="font-display uppercase text-lg tracking-tight flex-shrink-0 flex flex-col items-center gap-1">
          <svg
            key={blinkKey}
            width="44"
            height="44"
            viewBox="0 0 408.2 449.7"
            role="button"
            aria-label="Meet Dougy"
            onClick={(e) => {
              e.stopPropagation();
              setMeetDougOpen(true);
            }}
            className={`cursor-pointer hover:animate-logo-jitter ${blinkKey > 0 ? "animate-logo-jitter" : ""}`}
          >
            <path fill="#540329" d="M408.2,244.8c0,113.2-91.4,204.9-204.1,204.9S0,358,0,244.8,91.4,39.9,204.1,39.9s204.1,91.7,204.1,204.9" />
            <path
              fill="#ffbfd9"
              d="M377.4,86.3c-3.3-17.7-13-34.5-30.9-18.9-62.3,54.3-195.2,6.9-253.3,86.2-29.4,40.1-37.7,90.6-20.4,136.5,14.7,38.9,41,70.4,78.1,87.8,27.9,13.1,58,14.4,87.7,9.2,29.4-7.9,53.8-22,73.9-45.4,10.9-12.6,20-26.2,27.6-40.6,19.3-36.3,29.1-77.3,34.9-118.4,4.4-31.3,8.1-65.1,2.4-96.5"
            />
            <path fill="#540329" d="M401.3,31.2c5.9,22.3-7.4,45.2-29.7,51.1-22.3,5.9-45.1-7.5-50.9-29.8-5.9-22.3,7.4-45.2,29.7-51.1,22.3-5.9,45,7.5,50.9,29.8" />
            <g key={blinkKey} className={blinkKey > 0 ? "logo-eye animate-logo-blink" : "logo-eye"}>
              <path fill="#fff" d="M250.2,190.1c0,29.8-24,53.9-53.6,53.9s-53.6-24.1-53.6-53.9,24-53.9,53.6-53.9,53.6,24.1,53.6,53.9" />
              <path
                fill="#540329"
                d="M242.3,179.6c0,16.6-13.3,29.9-29.9,29.9s-29.9-13.5-29.9-29.9,13.3-29.9,29.9-29.9,29.9,13.5,29.9,29.9"
              />
            </g>
          </svg>
          dougy
        </button>

        <nav className="hidden sm:flex items-center gap-3">
          <button
            id="tour-goals-btn"
            onClick={onOpenGoals}
            className="bg-surface text-ink border-2 border-ink/10 px-5 py-3 text-sm rounded-full font-semibold"
          >
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
          <div id="tour-bell-btn" className="relative nav-group">
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

      <MeetDougModal open={meetDougOpen} onClose={() => setMeetDougOpen(false)} />
    </header>
  );
}
