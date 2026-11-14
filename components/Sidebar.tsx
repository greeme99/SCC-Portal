'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ChevronRight,
  ChevronsUpDown,
  FileText,
  Globe,
  House,
  LogOut,
  MessageCircle,
  PenLine,
  Share2,
  type LucideIcon,
} from 'lucide-react';
import {
  COACHING_TYPES,
  COACHING_TYPE_INFO,
  NAV_GROUPS,
  STAGES,
  coachingTypeFromPath,
  isActiveLink,
  stageBadge,
  stageTitle,
  type CoachingType,
  type NavIcon,
} from '@/lib/navigation';

const ICONS: Record<NavIcon, LucideIcon> = {
  chart: BarChart3,
  home: House,
  pencil: PenLine,
  file: FileText,
  message: MessageCircle,
  share: Share2,
  globe: Globe,
  book: BookOpen,
};

// 선택 메뉴: 연한 파란 배경 + 파란 글자 (DEC-014)
const itemBase =
  'flex min-h-11 items-center gap-3 rounded-md px-4 text-body transition-colors hover:bg-subtle hover:text-main';
const itemActive = 'aria-[current=page]:bg-primary-light aria-[current=page]:font-semibold aria-[current=page]:text-primary-strong';

function initialOpen(type: CoachingType | null): Set<CoachingType> {
  return new Set(type ? [type] : []);
}

function GroupHeader({
  children,
  isFirst,
  action,
}: {
  children: string;
  isFirst?: boolean;
  action?: React.ReactNode;
}) {
  return (
    <div
      className={`${
        isFirst ? 'mt-3' : 'mt-5'
      } mb-2 flex items-center justify-between rounded-md border border-line bg-subtle px-3 py-1.5`}
    >
      <h2 className="text-caption font-bold tracking-wider text-main">{children}</h2>
      {action}
    </div>
  );
}

export function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const currentType = coachingTypeFromPath(pathname);
  // 보고 있는 유형만 펼친다 (DEC-013). 사용자가 직접 펼친 유형은 다른 화면으로 갈 때까지 유지
  const [state, setState] = useState(() => ({ base: currentType, open: initialOpen(currentType) }));
  // 다른 유형 화면으로 이동하면 그 유형만 펼친 상태로 되돌린다 (렌더 중 파생 상태 갱신)
  if (state.base !== currentType) setState({ base: currentType, open: initialOpen(currentType) });
  const expanded = state.base === currentType ? state.open : initialOpen(currentType);

  const toggle = (type: CoachingType) =>
    setState((prev) => {
      const open = new Set(prev.open);
      if (open.has(type)) open.delete(type);
      else open.add(type);
      return { ...prev, open };
    });

  const isAllOpen = COACHING_TYPES.every((t) => expanded.has(t));

  const toggleAll = () => {
    setState((prev) => {
      const nextOpen = isAllOpen ? new Set<CoachingType>() : new Set<CoachingType>(COACHING_TYPES);
      return { ...prev, open: nextOpen };
    });
  };

  return (
    <>
      {NAV_GROUPS.map((group, idx) => (
        <div key={group.title}>
          <GroupHeader
            isFirst={idx === 0}
            action={
              group.kind === 'coaching' ? (
                <button
                  type="button"
                  onClick={toggleAll}
                  aria-label={isAllOpen ? '코칭 모델 전체 접기' : '코칭 모델 전체 펼치기'}
                  title={isAllOpen ? '코칭 모델 전체 접기' : '코칭 모델 전체 펼치기'}
                  className="flex items-center gap-1 rounded border border-line bg-surface px-1.5 py-0.5 text-[0.7rem] font-semibold text-muted transition hover:bg-subtle hover:text-main active:scale-[0.96]"
                >
                  <ChevronsUpDown size={12} aria-hidden />
                  <span>{isAllOpen ? '전체 접기' : '전체 펼치기'}</span>
                </button>
              ) : undefined
            }
          >
            {group.title}
          </GroupHeader>
          {group.kind === 'links' ? (
            <ul>
              {group.links.map((link) => {
                const Icon = ICONS[link.icon];
                return (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      onClick={onNavigate}
                      aria-current={isActiveLink(link.href, pathname) ? 'page' : undefined}
                      className={`${itemBase} ${itemActive}`}
                    >
                      <Icon size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
                      {link.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          ) : group.kind === 'settings' ? (
            // 로그아웃: 세션 쿠키를 지우고 입장 화면으로 (DEC-032). 자바스크립트 없이도 동작하는 폼 전송
            <form method="post" action="/api/logout">
              <button type="submit" className={`${itemBase} w-full text-left`}>
                <LogOut size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
                로그아웃
              </button>
            </form>
          ) : (
            COACHING_TYPES.map((type) => {
              const info = COACHING_TYPE_INFO[type];
              const open = expanded.has(type);
              const listId = `stages-${type}`;
              return (
                <div key={type} className="mb-1">
                  <button
                    type="button"
                    onClick={() => toggle(type)}
                    aria-expanded={open}
                    aria-controls={listId}
                    className={`group flex min-h-10 w-full items-center gap-2 rounded-md px-2.5 text-left font-semibold transition ${
                      open ? 'bg-subtle text-primary-strong' : 'text-primary hover:bg-subtle'
                    }`}
                  >
                    <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                    <span className="flex-1 truncate">{info.name}</span>
                    <span className="rounded bg-surface px-1.5 py-0.5 text-[0.7rem] font-medium text-muted shadow-xs group-hover:text-body">
                      {open ? '접기' : '펼치기'}
                    </span>
                    <ChevronRight
                      size={16}
                      aria-hidden
                      className={`shrink-0 transition-transform duration-200 ${
                        open ? 'rotate-90 text-primary' : 'text-muted'
                      }`}
                    />
                  </button>
                  <ul id={listId} hidden={!open} className="mt-1 mb-2">
                    {STAGES.map((stage) => {
                      const href = `/coaching/${type}/${stage}`;
                      const label = `${stageTitle(stage)} · ${info.themes[stage]}`;
                      return (
                        <li key={stage}>
                          <Link
                            href={href}
                            onClick={onNavigate}
                            aria-current={pathname === href ? 'page' : undefined}
                            className={`group ${itemBase} ${itemActive} min-h-10 gap-2`}
                          >
                            <span
                              aria-hidden
                              className="grid size-6 shrink-0 place-items-center rounded-sm border border-line bg-subtle text-caption font-semibold text-body group-aria-[current=page]:border-primary group-aria-[current=page]:bg-surface group-aria-[current=page]:text-primary"
                            >
                              {stageBadge(stage)}
                            </span>
                            {/* 긴 이름은 한 줄 말줄임, 전체 이름은 툴팁으로 (05 §4.1) */}
                            <span className="min-w-0 truncate" title={label}>
                              {label}
                            </span>
                          </Link>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              );
            })
          )}
        </div>
      ))}
    </>
  );
}

// 주소를 알기 전(프리렌더) 보여줄 자리 표시. 선택 강조 없이 같은 높이를 유지한다
export function SidebarFallback() {
  return <div aria-hidden className="h-full" />;
}
