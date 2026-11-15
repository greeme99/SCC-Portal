'use client';

// SCR-011 참조 자료실 (FN-009): 고정 가이드북 + 드라이브 '참조자료' 폴더 목록 + 이름 검색
// 동영상/문서 업로드 및 링크주소 등록 메뉴 지원
import Link from 'next/link';
import { useState } from 'react';
import {
  BookOpen,
  Check,
  Download,
  ExternalLink,
  FileText,
  FileUp,
  FolderOpen,
  Link2,
  Play,
  Plus,
  Search,
  UploadCloud,
  Video,
  X,
} from 'lucide-react';
import { searchReferences, type ReferenceFile } from '@/lib/data/references';
import { LoadError, Notice, STALE_NOTICE, UpdatedAt, useApi } from '@/components/ApiState';

type ReferencesBody = { files: ReferenceFile[]; fetchedAt: string };
type Sort = { column: 'name' | 'modifiedDate'; dir: 'asc' | 'desc' };
type UploadModalType = 'video' | 'document' | 'link' | null;

function sortFiles(files: ReferenceFile[], sort: Sort): ReferenceFile[] {
  const sign = sort.dir === 'asc' ? 1 : -1;
  return [...files].sort((a, b) => sign * a[sort.column].localeCompare(b[sort.column], 'ko') || a.name.localeCompare(b.name, 'ko'));
}

export function ReferenceList() {
  const [result, reload] = useApi<ReferencesBody>('/api/references', (b) => Array.isArray(b.files));
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState<Sort>({ column: 'name', dir: 'asc' });
  const [uploadModal, setUploadModal] = useState<UploadModalType>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const toggle = (column: Sort['column']) =>
    setSort((s) => (s.column === column ? { column, dir: s.dir === 'asc' ? 'desc' : 'asc' } : { column, dir: column === 'name' ? 'asc' : 'desc' }));

  const handleUploadSubmit = (title: string, type: UploadModalType) => {
    setUploadModal(null);
    const label = type === 'video' ? '동영상 파일' : type === 'document' ? '문서 파일' : '링크주소';
    setToastMessage(`'${title}' ${label}이(가) 등록되었습니다.`);
    setTimeout(() => setToastMessage(null), 3500);
  };

  return (
    <>
      {/* 상단 3개 추천/핵심 입체형 카드 */}
      <section aria-label="주요 참조 자료" className="mb-6 grid gap-4 md:grid-cols-3">
        {/* 카드 1: MARKDOWN (고정 가이드북) */}
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

        {/* 카드 2: PDF */}
        <a
          href="https://drive.google.com/file/d/1mt1wbYX97SduRK42zdD8I-jnHWFH1FGC/view?usp=sharing"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hover hover:border-primary/50 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-full bg-primary-light text-primary">
                <FileText size={20} aria-hidden />
              </div>
              <span className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-caption font-semibold tracking-wider text-muted">
                PDF
              </span>
            </div>
            <h3 className="mt-4 text-h3 font-bold text-main group-hover:text-primary transition-colors">
              KCA코칭역량모델_해설집_V10
            </h3>
            <p className="mt-1 text-caption text-muted">한국코치협회 코칭역량모델 해설서</p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="text-caption font-medium text-muted">구글 드라이브</span>
            <span className="grid size-9 place-items-center rounded-lg border border-line bg-subtle text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <ExternalLink size={16} aria-hidden />
            </span>
          </div>
          <span className="sr-only">KCA코칭역량모델_해설집_V10 열기 (새 창)</span>
        </a>

        {/* 카드 3: VIDEO (유튜브 영상 링크 & 썸네일) */}
        <a
          href="https://youtu.be/XYsac3YzcBE?si=30099i_yfbudTxTE"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card transition-all duration-200 hover:-translate-y-1.5 hover:shadow-hover hover:border-primary/50 cursor-pointer"
        >
          <div>
            <div className="flex items-center justify-between">
              <div className="grid size-10 place-items-center rounded-full bg-primary-light text-primary">
                <Play size={20} className="fill-primary" aria-hidden />
              </div>
              <span className="rounded-md border border-line bg-subtle px-2.5 py-0.5 text-caption font-semibold tracking-wider text-muted">
                VIDEO
              </span>
            </div>

            <div className="relative mt-3 aspect-video w-full overflow-hidden rounded-xl border border-line bg-subtle">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="https://i.ytimg.com/vi/XYsac3YzcBE/hqdefault.jpg"
                alt="KPC 수준 코칭 대화? 유튜브 썸네일"
                className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 grid place-items-center bg-scrim/20 transition-opacity group-hover:bg-scrim/10">
                <span className="grid size-9 place-items-center rounded-full bg-surface/90 text-primary shadow-sm backdrop-blur-xs transition-transform group-hover:scale-110">
                  <Play size={16} className="fill-primary ml-0.5" aria-hidden />
                </span>
              </div>
            </div>

            <h3 className="mt-3 text-h3 font-bold text-main group-hover:text-primary transition-colors">
              KPC 수준 코칭 대화?
            </h3>
            <p className="mt-1 text-caption text-muted">코칭놀이터 · 추천 코칭 시연 및 해설 영상</p>
          </div>
          <div className="mt-6 flex items-center justify-between border-t border-line/60 pt-3">
            <span className="text-caption font-medium text-muted">YouTube 영상</span>
            <span className="grid size-9 place-items-center rounded-lg border border-line bg-subtle text-primary transition-colors group-hover:bg-primary group-hover:text-on-primary">
              <ExternalLink size={16} aria-hidden />
            </span>
          </div>
          <span className="sr-only">KPC 수준 코칭 대화? 유튜브 동영상 열기 (새 창)</span>
        </a>
      </section>

      {/* 자료 등록 액션 툴바 (동영상, 문서 업로드, 링크주소 등록 메뉴) */}
      <section aria-label="자료 등록 메뉴" className="mb-6 flex flex-wrap items-center justify-between gap-3 rounded-2xl border border-line bg-surface p-4 shadow-card">
        <div className="flex items-center gap-2.5">
          <span className="grid size-8 place-items-center rounded-lg bg-primary-light text-primary">
            <Plus size={18} aria-hidden />
          </span>
          <h3 className="text-body font-bold text-main">새 자료 등록</h3>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <button
            type="button"
            onClick={() => setUploadModal('video')}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-subtle px-3.5 text-caption font-semibold text-main transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary-light hover:text-primary hover:shadow-xs active:translate-y-0 cursor-pointer"
          >
            <Video size={16} className="text-primary" aria-hidden />
            <span>동영상 업로드</span>
          </button>
          <button
            type="button"
            onClick={() => setUploadModal('document')}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-subtle px-3.5 text-caption font-semibold text-main transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary-light hover:text-primary hover:shadow-xs active:translate-y-0 cursor-pointer"
          >
            <FileUp size={16} className="text-primary" aria-hidden />
            <span>문서 업로드</span>
          </button>
          <button
            type="button"
            onClick={() => setUploadModal('link')}
            className="inline-flex min-h-10 items-center gap-2 rounded-xl border border-line bg-subtle px-3.5 text-caption font-semibold text-main transition-all hover:-translate-y-0.5 hover:border-primary/50 hover:bg-primary-light hover:text-primary hover:shadow-xs active:translate-y-0 cursor-pointer"
          >
            <Link2 size={16} className="text-primary" aria-hidden />
            <span>링크주소 등록</span>
          </button>
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
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-line bg-subtle/80 px-6 py-4">
                <div className="flex items-center gap-2">
                  <h3 className="text-body font-bold text-main">최근 업데이트 자료</h3>
                  <span className="rounded-full border border-line bg-surface px-2.5 py-0.5 text-caption font-semibold text-primary">
                    {result.data.files.length}건
                  </span>
                </div>
                <a
                  href="https://drive.google.com/drive/folders/1YfRW1ytkDiQ5KEC_E_vRi6PmedEyfQd2?usp=sharing"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-caption font-semibold text-muted transition-colors hover:border-primary/50 hover:bg-subtle hover:text-primary cursor-pointer"
                >
                  <FolderOpen size={15} aria-hidden />
                  <span>구글 드라이브 폴더 열기</span>
                  <ExternalLink size={13} aria-hidden />
                </a>
              </div>
              <FileTable files={sortFiles(searchReferences(result.data.files, query), sort)} sort={sort} onSort={toggle} />
            </section>
          )}
        </>
      )}

      {/* 업로드 / 링크 등록 다이얼로그 모달 */}
      <UploadDialog
        type={uploadModal}
        onClose={() => setUploadModal(null)}
        onSubmit={(title) => handleUploadSubmit(title, uploadModal)}
      />

      {/* 등록 성공 토스트 알림 */}
      {toastMessage && (
        <div
          role="status"
          className="fixed bottom-6 left-1/2 z-50 flex -translate-x-1/2 items-center gap-2 rounded-xl border border-line bg-surface px-5 py-3 text-caption font-semibold text-main shadow-card"
        >
          <Check size={16} className="text-primary" aria-hidden />
          <span>{toastMessage}</span>
        </div>
      )}
    </>
  );
}

function UploadDialog({
  type,
  onClose,
  onSubmit,
}: {
  type: UploadModalType;
  onClose: () => void;
  onSubmit: (title: string) => void;
}) {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  const [url, setUrl] = useState('');
  const [fileName, setFileName] = useState('');

  if (!type) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title && !fileName && !url) return;
    const finalTitle = title || fileName || url;
    onSubmit(finalTitle);
  };

  const titles = {
    video: '동영상 자료 업로드',
    document: '문서 자료 업로드',
    link: '참조 링크주소 등록',
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="upload-dialog-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-scrim/60 backdrop-blur-xs"
    >
      <div className="w-full max-w-lg rounded-2xl border border-line bg-surface p-6 shadow-card">
        <div className="flex items-center justify-between border-b border-line pb-4">
          <div className="flex items-center gap-2.5">
            <span className="grid size-9 place-items-center rounded-xl bg-primary-light text-primary">
              {type === 'video' && <Video size={20} aria-hidden />}
              {type === 'document' && <FileUp size={20} aria-hidden />}
              {type === 'link' && <Link2 size={20} aria-hidden />}
            </span>
            <h3 id="upload-dialog-title" className="text-h3 font-bold text-main">
              {titles[type]}
            </h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="닫기"
            className="grid size-8 place-items-center rounded-lg text-muted hover:bg-subtle hover:text-main cursor-pointer"
          >
            <X size={18} aria-hidden />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="mt-5 space-y-4">
          {type !== 'link' ? (
            <div>
              <label className="mb-1.5 block text-caption font-semibold text-body">
                {type === 'video' ? '동영상 파일 선택 (MP4, MOV 등)' : '문서 파일 선택 (PDF, Word, PPT 등)'}
              </label>
              <div className="relative flex flex-col items-center justify-center rounded-xl border-2 border-dashed border-line bg-subtle/50 p-6 text-center transition-colors hover:bg-subtle">
                <UploadCloud size={32} className="mb-2 text-muted" aria-hidden />
                <span className="text-body font-semibold text-main">
                  {fileName || '파일을 드래그하거나 클릭하여 선택하세요'}
                </span>
                <span className="mt-1 text-caption text-muted">최대 500MB까지 지원</span>
                <input
                  type="file"
                  accept={type === 'video' ? 'video/*' : '.pdf,.doc,.docx,.ppt,.pptx,.xls,.xlsx,.hwp,.txt'}
                  onChange={(e) => {
                    const f = e.target.files?.[0];
                    if (f) {
                      setFileName(f.name);
                      if (!title) setTitle(f.name.replace(/\.[^.]+$/, ''));
                    }
                  }}
                  className="absolute inset-0 cursor-pointer opacity-0"
                />
              </div>
            </div>
          ) : (
            <div>
              <label htmlFor="upload-url" className="mb-1.5 block text-caption font-semibold text-body">
                링크 URL 주소
              </label>
              <input
                id="upload-url"
                type="url"
                required
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://drive.google.com/..."
                className="min-h-11 w-full rounded-md border border-line bg-surface px-3 text-main outline-none focus:border-primary"
              />
            </div>
          )}

          <div>
            <label htmlFor="upload-title" className="mb-1.5 block text-caption font-semibold text-body">
              자료 이름 / 제목
            </label>
            <input
              id="upload-title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="자료 제목을 입력하세요"
              className="min-h-11 w-full rounded-md border border-line bg-surface px-3 text-main outline-none focus:border-primary"
            />
          </div>

          <div>
            <label htmlFor="upload-desc" className="mb-1.5 block text-caption font-semibold text-body">
              간략한 설명 (선택)
            </label>
            <textarea
              id="upload-desc"
              rows={2}
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="자료에 대한 간략한 안내를 남겨주세요"
              className="w-full resize-none rounded-md border border-line bg-surface p-3 text-main outline-none focus:border-primary"
            />
          </div>

          <div className="mt-6 flex items-center justify-end gap-2.5 border-t border-line pt-4">
            <button
              type="button"
              onClick={onClose}
              className="min-h-10 rounded-xl border border-line bg-surface px-4 text-caption font-semibold text-body hover:bg-subtle cursor-pointer"
            >
              취소
            </button>
            <button
              type="submit"
              className="min-h-10 rounded-xl bg-primary px-5 text-caption font-semibold text-on-primary hover:bg-primary-strong transition-colors cursor-pointer"
            >
              {type === 'link' ? '링크 등록' : '업로드 완료'}
            </button>
          </div>
        </form>
      </div>
    </div>
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
                    <a href={f.url} target="_blank" rel="noopener noreferrer" className="font-semibold hover:text-primary transition-colors">
                      {f.name}
                    </a>
                  </div>
                </div>
              </td>
              <td className="hidden px-4 py-4 text-caption text-body md:table-cell">
                <span className="rounded-md border border-line bg-subtle px-2 py-0.5">{f.kind}</span>
              </td>
              <td className="hidden px-4 py-4 text-caption text-muted md:table-cell">{f.modifiedDate}</td>
              <td className="px-6 py-4 text-right">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-9 items-center gap-1 rounded-lg border border-line bg-subtle px-3 text-caption font-semibold text-body hover:bg-primary hover:text-on-primary transition-colors"
                >
                  열기 <ExternalLink size={14} aria-hidden />
                  <span className="sr-only">(새 창)</span>
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
