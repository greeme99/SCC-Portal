'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon } from 'lucide-react';

type Theme = 'light' | 'dark';
const STORAGE_KEY = 'scd.theme';

function applyTheme(target: Theme) {
  if (typeof document === 'undefined') return;
  document.documentElement.setAttribute('data-theme', target);
  document.querySelectorAll('iframe').forEach((frame) => {
    try {
      frame.contentWindow?.postMessage({ type: 'scd:set-theme', theme: target }, '*');
    } catch {}
  });
}

function readTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved === 'dark' ? 'dark' : 'light';
  } catch {
    return 'light';
  }
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  return () => window.removeEventListener('storage', handler);
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'light');

  function handleSelect(next: Theme) {
    try {
      window.localStorage.setItem(STORAGE_KEY, next);
    } catch {}
    applyTheme(next);
    window.dispatchEvent(new Event('storage'));
  }

  return (
    <div
      role="radiogroup"
      aria-label="화면 모드 선택 (라이트 / 다크)"
      className="flex items-center gap-1 rounded-lg border border-line bg-subtle p-1 shadow-xs"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        aria-label="라이트 모드"
        title="라이트 모드"
        onClick={() => handleSelect('light')}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-caption font-semibold transition-all ${
          theme === 'light'
            ? 'bg-surface text-primary shadow-card scale-[1.02]'
            : 'text-muted hover:text-main'
        }`}
      >
        <Sun size={15} strokeWidth={2} aria-hidden />
        <span className="hidden sm:inline">Light</span>
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        aria-label="다크 모드"
        title="다크 모드"
        onClick={() => handleSelect('dark')}
        className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-caption font-semibold transition-all ${
          theme === 'dark'
            ? 'bg-surface text-primary shadow-card scale-[1.02]'
            : 'text-muted hover:text-main'
        }`}
      >
        <Moon size={15} strokeWidth={2} aria-hidden />
        <span className="hidden sm:inline">Dark</span>
      </button>
    </div>
  );
}
