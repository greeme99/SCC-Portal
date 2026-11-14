'use client';

import { useSyncExternalStore } from 'react';
import { Sun, Moon, Laptop } from 'lucide-react';

type Theme = 'light' | 'dark' | 'system';
const STORAGE_KEY = 'scd.theme';

function applyTheme(target: Theme) {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  if (target === 'system') {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    root.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
  } else {
    root.setAttribute('data-theme', target);
  }
}

function readTheme(): Theme {
  try {
    const saved = window.localStorage.getItem(STORAGE_KEY) as Theme | null;
    return saved === 'light' || saved === 'dark' || saved === 'system' ? saved : 'system';
  } catch {
    return 'system';
  }
}

function subscribe(callback: () => void) {
  const handler = () => callback();
  window.addEventListener('storage', handler);
  const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
  mediaQuery.addEventListener('change', handler);

  return () => {
    window.removeEventListener('storage', handler);
    mediaQuery.removeEventListener('change', handler);
  };
}

export function ThemeToggle() {
  const theme = useSyncExternalStore(subscribe, readTheme, () => 'system');

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
      aria-label="화면 모드 선택"
      className="flex items-center gap-0.5 rounded-lg border border-line bg-subtle p-1"
    >
      <button
        type="button"
        role="radio"
        aria-checked={theme === 'light'}
        aria-label="라이트 모드"
        title="라이트 모드"
        onClick={() => handleSelect('light')}
        className={`grid size-7 place-items-center rounded-md text-caption transition ${
          theme === 'light'
            ? 'bg-surface font-semibold text-primary shadow-card'
            : 'text-muted hover:text-main'
        }`}
      >
        <Sun size={15} strokeWidth={2} aria-hidden />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'system'}
        aria-label="시스템 자동 모드"
        title="시스템 자동 모드"
        onClick={() => handleSelect('system')}
        className={`grid size-7 place-items-center rounded-md text-caption transition ${
          theme === 'system'
            ? 'bg-surface font-semibold text-primary shadow-card'
            : 'text-muted hover:text-main'
        }`}
      >
        <Laptop size={15} strokeWidth={2} aria-hidden />
      </button>

      <button
        type="button"
        role="radio"
        aria-checked={theme === 'dark'}
        aria-label="다크 모드"
        title="다크 모드"
        onClick={() => handleSelect('dark')}
        className={`grid size-7 place-items-center rounded-md text-caption transition ${
          theme === 'dark'
            ? 'bg-surface font-semibold text-primary shadow-card'
            : 'text-muted hover:text-main'
        }`}
      >
        <Moon size={15} strokeWidth={2} aria-hidden />
      </button>
    </div>
  );
}
