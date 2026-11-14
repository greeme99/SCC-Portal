'use client';

// SCR-011 참조 자료실 (FN-009): 고정 가이드북 + 드라이브 '참조자료' 폴더 목록 + 이름 검색
// 목록을 못 불러와도 고정 자료는 항상 보인다
import Link from 'next/link';
import { useState } from 'react';
import { BookOpen, Download, ExternalLink, FileText, Info, Play, Search } from 'lucide-react';
import { searchReferences, type ReferenceFile } from '@/lib/data/references';
import { LoadError, Notice, STALE_NOTICE, UpdatedAt, useApi } from '@/components/ApiState';

type ReferencesBody = { files: ReferenceFile[]; fetchedAt: string };
type Sort = { column: 'name' | 'modifiedDate'; dir: 'asc' | 'desc' };

function sortFiles(files: ReferenceFile[], sort: Sort): ReferenceFile[] {
  const sign = sort.dir === 'asc' ? 1 : -1;
  return [...files].sort((a, b) => sign * a[sort.column].localeCompare(b[sort.column], 'ko') || a.name.localeCompare(b.name, 'ko'));
}

export function ReferenceList() {
  const [result, reload] = useApi<ReferencesBody>('/api/references', (b) => Array.isArray(b.files));
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>({ column: 'name', dir: 'asc' });

  const toggle = (column: Sort['column']) =>
    setSort((s) => (s.column === column ? { column, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { column, dir: column === 'name' ? 'asc' : 'desc' }));

  return (
    <>
      {/* 상단 3개 추천/핵심 입체형 카드 (제공 이미지 스타일) */}
      <section aria-label="주요 참조 자료" className="mb-8 grid gap-4 md:grid-cols-3">
        {/* 카드 1: VIDEO */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hover hover:border-primary/50 cursor-pointer">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-full bg-primary-light text-primary">
                <Play size={20} className="fill-primary" aria-hidden />
              </div>
              <span className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-caption font-semibold tracking-wider text-muted">
                VIDEO
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-bold text-main">RAG 기반 사내 지식 검색 시스템 활용법</h3>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="text-caption font-medium text-muted">15:20</span>
            <button
              type="button"
              aria-label="영상 자료 다운로드"
              className="grid size-9 place-items-center rounded-lg border border-line bg-subtle text-body transition-colors hover:bg-primary hover:text-on-primary"
            >
              <Download size={16} aria-hidden />
            </button>
          </div>
        </div>

        {/* 카드 2: MARKDOWN (고정 가이드북) */}
        <Link
          href="/references/guidebook"
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hover hover:border-primary/50 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-full bg-subtle text-primary">
                <BookOpen size={20} aria-hidden />
              </div>
              <span className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-caption font-semibold tracking-wider text-muted">
                MARKDOWN
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-bold text-main group-hover:text-primary transition-colors">
              코칭 프로그램 가이드북
            </h3>
            <p className="mt-1 text-caption text-muted">표준 프로세스 및 운영 매뉴얼 (기본 자료)</p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="text-caption font-medium text-muted">45KB</span>
            <span className="grid size-9 place-items-center rounded-lg border border-line bg-subtle text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <Download size={16} aria-hidden />
            </span>
          </div>
          <span className="sr-only">코칭 프로그램 가이드북 열기</span>
        </Link>

        {/* 카드 3: PDF */}
        <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hover hover:border-primary/50 cursor-pointer">
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-full bg-primary-light text-primary">
                <Info size={20} aria-hidden />
              </div>
              <span className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-caption font-semibold tracking-wider text-muted">
                PDF
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-bold text-main">AI 윤리 및 저작권 준수 사항</h3>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="text-caption font-medium text-muted">1.5MB</span>
            <button
              type="button"
              aria-label="윤리 가이드 PDF 다운로드"
              className="grid size-9 place-items-center rounded-lg border border-line bg-subtle text-body transition-colors hover:bg-primary hover:text-on-primary"
            >
              <Download size={16} aria-hidden />
            </button>
          </div>
        </div>
      </section>

      {/* 검색 바 & 새로고침 시각 */}
      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">
        <label className="relative block w-full max-w-sm">
          <span className="sr-only">자료 이름 검색</span>
          <Search size={18} aria-hidden className="absolute left-3 top-1/2 -translate-y-1/2 text-muted" />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="자료 이름 검색"
            className="min-h-11 w-full rounded-md border border-line bg-surface pl-10 pr-3 text-main"
          />
        </label>
        {result.status === 'ok' && <UpdatedAt fetchedAt={result.data.fetchedAt} />}
      </div>

      {result.status === 'loading' && (
        <div className="space-y-3" aria-busy="true" aria-label="불러오는 중">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-16 animate-pulse rounded-xl bg-subtle" />
          ))}
        </div>
      )}

      {result.status === 'error' && <LoadError onRetry={reload} source="구글 드라이브" code={result.code} />}

      {result.status === 'ok' && (
        <>
          {result.stale && <Notice>{STALE_NOTICE}</Notice>}
          {result.data.files.length === 0 ? (
            <Notice>추가된 자료가 없습니다. 관리자가 구글 드라이브 &apos;참조자료&apos; 폴더에 올리면 표시됩니다.</Notice>
          ) : (
            <section aria-label="최근 업데이트 자료" className="overflow-hidden rounded-2xl border border-line shadow-card">
              <div className="border-b border-line bg-subtle/80 px-6 py-4">
                <h3 className="text-body font-bold text-main">최근 업데이트 자료</h3>
              </div>
              <FileTable files={sortFiles(searchReferences(result.data.files, query), sort)} sort={sort} onSort={toggle} />
            </section>
          )}
        </>
      )}
    </>
  );
}

function SortButton({ column, label, sort, onSort }: { column: Sort['column']; label: string; sort: Sort; onSort: (c: Sort['column']) => void }) {
  const active = sort.column === column;
  return (
    <button type="button" onClick={() => onSort(column)} className="inline-flex min-h-11 items-center gap-1">
      {label}
      <span aria-hidden className={active ? 'text-primary' : 'opacity-35'}>
        {active ? (sort.dir === 'asc' ? '▲' : '▼') : '⇅'}
      </span>
    </button>
  );
}

function FileTable({ files, sort, onSort }: { files: ReferenceFile[]; sort: Sort; onSort: (c: Sort['column']) => void }) {
  const ariaSort = (column: Sort['column']) => (sort.column === column ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none');
  if (files.length === 0) return <Notice>검색어와 맞는 자료가 없습니다.</Notice>;
  return (
    <div className="overflow-x-auto bg-surface">
      <table className="w-full border-collapse text-left">
        <thead>
          <tr className="border-b border-line bg-subtle/40 text-caption font-semibold text-body">
            <th scope="col" aria-sort={ariaSort('name')} className="px-6 py-3">
              <SortButton column="name" label="이름" sort={sort} onSort={onSort} />
            </th>
            <th scope="col" className="hidden px-4 py-3 md:table-cell">
              형식
            </th>
            <th scope="col" aria-sort={ariaSort('modifiedDate')} className="hidden px-4 py-3 md:table-cell">
              <SortButton column="modifiedDate" label="수정일" sort={sort} onSort={onSort} />
            </th>
            <th scope="col" className="px-6 py-3 text-right">
              <span className="sr-only">열기</span>
            </th>
          </tr>
        </thead>
        <tbody>
          {files.map((f) => (
            <tr key={f.id} className="border-b border-line last:border-b-0 hover:bg-subtle/60 transition-colors cursor-pointer">
              <td className="px-6 py-4 text-main">
                <div className="flex items-center gap-3">
                  <div className="grid size-9 shrink-0 place-items-center rounded-lg border border-line bg-subtle text-muted">
                    <FileText size={18} aria-hidden />
                  </div>
                  <div>
                    <strong className="block text-body font-semibold text-main">{f.name}</strong>
                    <span className="block text-caption text-muted">Update: {f.modifiedDate}</span>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-4 text-body md:table-cell">{f.kind}</td>
              <td className="hidden px-4 py-4 text-body md:table-cell">{f.modifiedDate}</td>
              <td className="px-6 py-4 text-right">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-11 items-center gap-1.5 font-semibold text-primary hover:text-primary-strong transition-colors"
                >
                  열기 <ExternalLink size={16} aria-hidden />
                  <span className="sr-only">{f.name} (새 창)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
