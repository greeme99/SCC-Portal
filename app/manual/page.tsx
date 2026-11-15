import type { Metadata } from 'next';
import Link from 'next/link';
import {
  Compass,
  Download,
  ExternalLink,
  FileCheck2,
  FileText,
  FolderOpen,
  LayoutDashboard,
  Lightbulb,
  Maximize2,
  PlayCircle,
  Share2,
  Sparkles,
} from 'lucide-react';

export const metadata: Metadata = {
  title: '온라인 사용자 매뉴얼 | 삼코동 코칭 포털',
  description: '삼코동 코칭 포털 전체 개요, 3대 코칭 트랙, 1. 코칭 여정, 2. 코치 업무 절차 모션 다이어그램 가이드',
};

export default function ManualPage() {
  return (
    <div className="space-y-10 py-2">
      {/* 1. 최상단 타이틀 & 퀵 액션 배너 */}
      <section className="relative overflow-hidden rounded-3xl border border-line bg-surface p-6 shadow-card md:p-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="space-y-3">
            <div className="inline-flex items-center gap-2 rounded-full border border-line bg-subtle px-3 py-1 text-caption font-bold text-primary">
              <Sparkles size={14} aria-hidden />
              <span>ONLINE USER MANUAL & MOTION GUIDE</span>
            </div>
            <h1 className="text-h1 font-extrabold tracking-tight text-main sm:text-3xl">
              SCC 코칭 포털 온라인 사용자 매뉴얼
            </h1>
            <p className="max-w-2xl text-body text-muted leading-relaxed">
              삼코동 코치의 다회기 코칭 Journey 전 과정을 지원하는 통합 포털의 전체 구조와 핵심 프로세스를
              한눈에 이해하고, 인터랙티브 모션 다이어그램으로 쉽게 따라 할 수 있는 종합 가이드입니다.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <a
              href="/guide/scc_motion_guide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-primary px-4 text-caption font-bold text-on-primary shadow-sm transition hover:opacity-90 cursor-pointer"
            >
              <Maximize2 size={16} aria-hidden />
              <span>모션 가이드 전체화면</span>
              <ExternalLink size={14} aria-hidden />
            </a>
            <a
              href="/guide/scc_motion_guide.html"
              download="scc_coaching_portal_motion_guide.html"
              className="inline-flex min-h-11 items-center gap-2 rounded-xl border border-line bg-subtle px-4 text-caption font-bold text-main transition hover:border-primary/50 hover:bg-surface cursor-pointer"
            >
              <Download size={16} className="text-primary" aria-hidden />
              <span>HTML 파일 다운로드</span>
            </a>
          </div>
        </div>
      </section>

      {/* 2. 섹션 1: 포털 전체 개요 & 4대 코칭 철학 */}
      <section aria-labelledby="section-overview" className="space-y-6">
        <div className="border-b border-line pb-4">
          <h2 id="section-overview" className="text-h2 font-bold text-main">
            🌐 사이트 전체 개요 (System Overview)
          </h2>
          <p className="mt-1 text-caption text-muted">
            삼코동의 코칭 철학과 가치를 온전히 담아낸 웹 기반 코치 파트너십 플랫폼입니다.
          </p>
        </div>

        {/* 4대 코칭 철학 카드 그리드 */}
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-primary-light text-primary">
                <Lightbulb size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-body font-bold text-main">코치는 답을 주지 않는다</h3>
              <p className="mt-2 text-caption text-muted leading-relaxed">
                정답을 일방적으로 제시하는 대신, 고객 스스로 내면의 가치와 강점을 탐색하도록 돕는 질문과 경청 중심의 대화를 지향합니다.
              </p>
            </div>
            <div className="mt-4 border-t border-line/60 pt-2 text-[0.75rem] font-semibold text-primary">
              가이드북 2.2 파트너십 원칙
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-subtle text-primary">
                <PlayCircle size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-body font-bold text-main">Action은 숙제가 아닌 &apos;실험&apos;</h3>
              <p className="mt-2 text-caption text-muted leading-relaxed">
                실행하지 못한 액션 플랜도 비난이나 패널티 없이 자신을 알아가는 귀중한 학습 데이터로 수용하고 다음 회기에서 함께 회고합니다.
              </p>
            </div>
            <div className="mt-4 border-t border-line/60 pt-2 text-[0.75rem] font-semibold text-primary">
              호기심 기반 행동 실험
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-primary-light text-primary">
                <Compass size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-body font-bold text-main">도구보다 고객의 발견이 우선</h3>
              <p className="mt-2 text-caption text-muted leading-relaxed">
                복잡한 워크시트 작성을 강요하지 않으며, 필수 항목을 최소화하고 고객의 언어와 통찰을 그대로 보존하는 유연한 기록을 지원합니다.
              </p>
            </div>
            <div className="mt-4 border-t border-line/60 pt-2 text-[0.75rem] font-semibold text-primary">
              발견 중심 최소 기록
            </div>
          </div>

          <div className="flex flex-col justify-between rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div>
              <div className="grid size-10 place-items-center rounded-xl bg-subtle text-primary">
                <Share2 size={20} aria-hidden />
              </div>
              <h3 className="mt-4 text-body font-bold text-main">SHARE 프로토콜 멘토링</h3>
              <p className="mt-2 text-caption text-muted leading-relaxed">
                멘토의 경험을 나눌 때는 허락 → 맥락 → 통찰 → 선택권 반환 → 행동 연결의 5단계 안심 대화 절차를 준수합니다.
              </p>
            </div>
            <div className="mt-4 border-t border-line/60 pt-2 text-[0.75rem] font-semibold text-primary">
              안전한 조언 &amp; 선택권 존중
            </div>
          </div>
        </div>

        {/* 5대 핵심 메뉴 및 아키텍처 안내 카드 */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          <Link
            href="/dashboard"
            className="group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary-light text-primary">
                <LayoutDashboard size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main group-hover:text-primary transition-colors">
                  대시보드 (/dashboard)
                </h3>
                <span className="text-[0.75rem] font-medium text-muted">실시간 현황 모니터링</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              참여자별 회차 진행률과 코칭일지 제출 현황, 전체 코칭 완료율을 한눈에 파악할 수 있는 종합 현황판입니다.
            </p>
          </Link>

          <Link
            href="/program/overview"
            className="group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-subtle text-primary">
                <Compass size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main group-hover:text-primary transition-colors">
                  프로그램 개요 (/program/overview)
                </h3>
                <span className="text-[0.75rem] font-medium text-muted">운영 기준 및 여정 맵</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              삼코동의 핵심 코칭 철학과 권장 운영 기준(프리세션, 본세션 5회, 진행 간격 등), 전체 코칭 여정 흐름도를 안내합니다.
            </p>
          </Link>

          <Link
            href="/coaching/career/start"
            className="group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary-light text-primary">
                <PlayCircle size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main group-hover:text-primary transition-colors">
                  코칭 여정 (/coaching/[type]/[stage])
                </h3>
                <span className="text-[0.75rem] font-medium text-muted">3대 트랙별 회기 안내</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              커리어, 멘토링, 라이프 코칭의 각 회차별 핵심 목표와 효과적인 추천 질문, 대화 4단계 진행 순서를 상세히 안내합니다.
            </p>
          </Link>

          <Link
            href="/records/journal"
            className="group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-subtle text-primary">
                <FileCheck2 size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main group-hover:text-primary transition-colors">
                  코칭 기록 (/records/[form])
                </h3>
                <span className="text-[0.75rem] font-medium text-muted">온라인 일지 &amp; 소감 작성</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              회기별 코칭일지와 최종 종료 리포트, 코치 및 피코치의 종료 소감을 온라인 설문 양식을 통해 간편하게 작성하고 제출합니다.
            </p>
          </Link>

          <Link
            href="/references"
            className="group rounded-2xl border border-line bg-surface p-5 shadow-card transition hover:-translate-y-1 hover:border-primary/50 hover:shadow-hover"
          >
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-primary-light text-primary">
                <FolderOpen size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main group-hover:text-primary transition-colors">
                  참조 자료실 (/references)
                </h3>
                <span className="text-[0.75rem] font-medium text-muted">운영 매뉴얼 &amp; 자료실</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              코칭 프로그램 운영 가이드북 전문과 구글 드라이브 공유 폴더의 참고 서식, 관련 문서 및 동영상을 열람하고 새 자료를 등록할 수 있습니다.
            </p>
          </Link>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card">
            <div className="flex items-center gap-3">
              <span className="grid size-9 place-items-center rounded-lg bg-subtle text-primary">
                <FileText size={18} aria-hidden />
              </span>
              <div>
                <h3 className="text-body font-bold text-main">안전한 로그인 및 정보 보호</h3>
                <span className="text-[0.75rem] font-medium text-muted">보안 인증 체계</span>
              </div>
            </div>
            <p className="mt-3 text-caption text-muted leading-relaxed">
              비밀번호 인증을 통해 허가된 코치와 관계자만 안전하게 접근할 수 있도록 소중한 코칭 기록과 개인정보를 안전하게 보호합니다.
            </p>
          </div>
        </div>
      </section>

      {/* 3. 섹션 2: 인터랙티브 모션 다이어그램 가이드 연동 (scc_motion_guide.html) */}
      <section aria-labelledby="section-motion-diagram" className="space-y-4">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between border-b border-line pb-4">
          <div>
            <h2 id="section-motion-diagram" className="text-h2 font-bold text-main">
              🎬 인터랙티브 모션 다이어그램 가이드 (Motion Diagram Studio)
            </h2>
            <p className="mt-1 text-caption text-muted">
              하단 화면에서 재생(Space), 속도(0.5x~2.0x), 다크모드, 3대 뷰 탭을 직접 클릭하여 워크플로우를 체험할 수 있습니다.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <a
              href="/guide/scc_motion_guide.html"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-9 items-center gap-1.5 rounded-lg border border-line bg-surface px-3 text-caption font-semibold text-main transition hover:border-primary/50 hover:bg-subtle hover:text-primary cursor-pointer"
            >
              <Maximize2 size={14} aria-hidden />
              <span>새 탭에서 크게 보기</span>
            </a>
          </div>
        </div>

        {/* 안내 배너 */}
        <div className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-line bg-subtle p-3.5 text-caption text-muted">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-md bg-primary px-2 py-0.5 text-[0.75rem] font-bold text-on-primary">
              조작 단축키
            </span>
            <span>
              <strong>Space</strong>: 재생/일시정지 | <strong>← / →</strong>: 이전/다음 단계 | <strong>R</strong>: 처음으로
            </span>
          </div>
          <span className="font-medium text-primary">
            3대 뷰 지원: 전체 기능 구성도 · 1. 코칭 여정 · 2. 코치 업무 절차
          </span>
        </div>

        {/* 임베디드 iframe 뷰어 */}
        <div className="overflow-hidden rounded-2xl border border-line bg-surface shadow-card">
          <iframe
            src="/guide/scc_motion_guide.html"
            title="SCC Coaching Portal 모션 다이어그램 가이드"
            className="h-[820px] w-full border-0 bg-transparent"
            loading="lazy"
          />
        </div>
      </section>

      {/* 4. 섹션 3: 코치 표준 업무 가이드 및 활용 팁 */}
      <section aria-labelledby="section-tips" className="space-y-4">
        <div className="border-b border-line pb-4">
          <h2 id="section-tips" className="text-h2 font-bold text-main">
            💡 코치 실무 활용 로드맵 &amp; 팁
          </h2>
          <p className="mt-1 text-caption text-muted">
            성공적인 코칭 여정 운영을 위한 단계별 실무 체크포인트입니다.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-3">
          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-2">
            <div className="flex items-center gap-2 text-body font-bold text-main">
              <span className="grid size-6 place-items-center rounded-full bg-primary-light text-[0.75rem] font-bold text-primary">
                1
              </span>
              <span>세션 시작 전 (준비)</span>
            </div>
            <ul className="space-y-1.5 text-caption text-muted">
              <li>• 사전 성찰지와 이전 회기 코칭일지 복습</li>
              <li>• 고객의 핵심 발견을 돕는 Powerful Questions 선정</li>
              <li>• 1:1 비밀보장 환경 및 라포 형성 질문 준비</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-2">
            <div className="flex items-center gap-2 text-body font-bold text-main">
              <span className="grid size-6 place-items-center rounded-full bg-primary-light text-[0.75rem] font-bold text-primary">
                2
              </span>
              <span>세션 진행 중 (대화)</span>
            </div>
            <ul className="space-y-1.5 text-caption text-muted">
              <li>• 고객의 언어로 표현된 통찰과 감정 적극 경청</li>
              <li>• 조언이 필요할 땐 SHARE 프로토콜로 허락 구하기</li>
              <li>• 부담 없는 작고 가벼운 행동실험 1가지 도출</li>
            </ul>
          </div>

          <div className="rounded-2xl border border-line bg-surface p-5 shadow-card space-y-2">
            <div className="flex items-center gap-2 text-body font-bold text-main">
              <span className="grid size-6 place-items-center rounded-full bg-primary-light text-[0.75rem] font-bold text-primary">
                3
              </span>
              <span>세션 종료 후 (기록 &amp; 확인)</span>
            </div>
            <ul className="space-y-1.5 text-caption text-muted">
              <li>• 회기 종료 후 24시간 내 코칭일지 작성 (/records/journal)</li>
              <li>• Between 관찰 과제에 대해 가벼운 지지와 격려 제공</li>
              <li>• 5회기 완료 시 종료 리포트 및 상호 소감 작성 안내</li>
            </ul>
          </div>
        </div>
      </section>
    </div>
  );
}
