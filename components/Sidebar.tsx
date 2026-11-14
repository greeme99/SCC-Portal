'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import {
  BarChart3,
  BookOpen,
  ChevronDown,
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

const itemBase =
  'flex min-h-11 items-center gap-3 rounded-md px-4 text-body transition-colors hover:bg-subtle hover:text-main';
const itemActive =
  'aria-[current=page]:bg-primary-light aria-[current=page]:font-semibold aria-[current=page]:text-primary-strong';

const ALL_GROUP_TITLES = NAV_GROUPS.map((g) => g.title);

export function Sidebar({ onNavigate }: { onNavigate: () => void }) {
  const pathname = usePathname();
  const currentType = coachingTypeFromPath(pathname);

  // 카테고리 그룹 열림 상태 (기본값: 모두 열림)
  const [openGroups, setOpenGroups] = useState<Set<string>>(() => new Set(ALL_GROUP_TITLES));

  // 코칭 모델 하위 서브메뉴 열림 상태
  const [openTypes, setOpenTypes] = useState<Set<CoachingType>>(() => new Set(currentType ? [currentType] : []));

  // 최상단 전체 열림/닫힘 판단
  const isAnyOpen = openGroups.size > 0 || openTypes.size > 0;

  // 최상단: 전체 카테고리 하위메뉴를 한 번에 닫거나(카테고리명만 표시) 1단계 서브메뉴만 열기
  const toggleAll = () => {
    if (isAnyOpen) {
      setOpenGroups(new Set());
      setOpenTypes(new Set());
    } else {
      setOpenGroups(new Set(ALL_GROUP_TITLES));
      setOpenTypes(new Set());
    }
  };

  // 카테고리 레벨 토글: 열릴 때는 하위 sub 메뉴만 열리고, 닫힐 때는 하위 세부메뉴까지 모두 닫힘
  const toggleGroup = (title: string) => {
    setOpenGroups((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
        // 상위 카테고리가 닫히면 하위 서브메뉴도 모두 닫힘
        if (title === '코칭 모델') {
          setOpenTypes(new Set());
        }
      } else {
        next.add(title);
        // 열릴 때는 하위 1단계 sub 메뉴(커리어/멘토링/라이프 코칭)만 열린 상태로 시작
        if (title === '코칭 모델') {
          setOpenTypes(new Set());
        }
      }
      return next;
    });
  };

  // 개별 코칭 모델 토글
  const toggleType = (type: CoachingType) => {
    setOpenTypes((prev) => {
      const next = new Set(prev);
      if (next.has(type)) next.delete(type);
      else next.add(type);
      return next;
    });
  };

  return (
    <>
      {/* 최상단 글로벌 전체 접기/열기 컨트롤러 */}
      <div className="mb-1 mt-3 flex items-center justify-between px-1">
        <span className="text-[0.75rem] font-semibold text-muted">카테고리</span>
        <button
          type="button"
          onClick={toggleAll}
          aria-label={isAnyOpen ? '전체 메뉴 닫기' : '전체 메뉴 열기'}
          title={isAnyOpen ? '전체 메뉴 닫기' : '전체 메뉴 열기'}
          className="grid size-7 place-items-center rounded-md border border-line bg-subtle text-muted transition hover:bg-hover hover:text-main active:scale-[0.95]"
        >
          <ChevronsUpDown size={14} aria-hidden />
        </button>
      </div>

      {NAV_GROUPS.map((group) => {
        const isGroupOpen = openGroups.has(group.title);
        const contentId = `group-content-${group.title}`;

        return (
          <div key={group.title} className="mt-4">
            {/* 카테고리 헤더: 클릭 시 하위 서브메뉴 전체 열기/닫기 */}
            <button
              type="button"
              onClick={() => toggleGroup(group.title)}
              aria-expanded={isGroupOpen}
              aria-controls={contentId}
              className="mb-1.5 flex min-h-9 w-full items-center justify-between rounded-md border border-line bg-subtle px-3 py-1.5 text-left transition hover:bg-hover active:scale-[0.99]"
            >
              <h2 className="text-caption font-bold tracking-wider text-main">{group.title}</h2>
              <ChevronDown
                size={15}
                aria-hidden
                className={`text-muted transition-transform duration-200 ${isGroupOpen ? 'rotate-180' : ''}`}
              />
            </button>

            {/* 하위 서브메뉴 영역 */}
            <div id={contentId} hidden={!isGroupOpen}>
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
                <form method="post" action="/api/logout">
                  <button type="submit" className={`${itemBase} w-full text-left`}>
                    <LogOut size={20} strokeWidth={1.75} aria-hidden className="shrink-0" />
                    로그아웃
                  </button>
                </form>
              ) : (
                COACHING_TYPES.map((type) => {
                  const info = COACHING_TYPE_INFO[type];
                  const isOpen = openTypes.has(type);
                  const listId = `stages-${type}`;
                  return (
                    <div key={type} className="mb-1">
                      {/* 서브메뉴: 커리어 코칭, 멘토링 코칭, 라이프 코칭 */}
                      <button
                        type="button"
                        onClick={() => toggleType(type)}
                        aria-expanded={isOpen}
                        aria-controls={listId}
                        className={`group flex min-h-10 w-full items-center gap-2 rounded-md px-2.5 text-left font-semibold transition ${
                          isOpen ? 'bg-subtle text-primary-strong' : 'text-primary hover:bg-subtle'
                        }`}
                      >
                        <span className="size-2 shrink-0 rounded-full bg-primary" aria-hidden />
                        <span className="flex-1 truncate">{info.name}</span>
                        <ChevronRight
                          size={16}
                          aria-hidden
                          className={`shrink-0 text-muted transition-transform duration-200 ${
                            isOpen ? 'rotate-90 text-primary' : ''
                          }`}
                        />
                      </button>
                      <ul id={listId} hidden={!isOpen} className="mt-1 mb-2">
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
          </div>
        );
      })}
    </>
  );
}

export function SidebarFallback() {
  return <div aria-hidden className="h-full" />;
}
