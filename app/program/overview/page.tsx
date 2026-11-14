import type { Metadata } from 'next';
import { PageHeader } from '@/components/PageHeader';
import { Card, QuestionList } from '@/components/GuideBlocks';
import { Disclosure } from '@/components/Disclosure';
import { WorkflowDiagram, type FlowNode } from '@/components/WorkflowDiagram';
import { Spec3DIcon } from '@/components/Spec3DIcons';
import { BETWEEN_PRINCIPLES, COACH_WORKFLOW, JOURNEY, OVERVIEW } from '@/lib/content';

export const metadata: Metadata = { title: '프로그램 개요' };

// 그림 1의 단계는 커리어 코칭 회차 화면으로 연결한다 (02.PRD-FS FN-003)
const journeyNodes: FlowNode[] = JOURNEY.steps.map((step) => ({
  label: step.label,
  href: step.stage ? `/coaching/career/${step.stage}` : `/coaching/career/${step.between}#between`,
  description: `${step.question} · ${step.outputs}`,
  question: step.question,
  outputs: step.outputs,
  dashed: Boolean(step.between),
}));

const workflowNodes: FlowNode[] = COACH_WORKFLOW.steps.map((step) => ({
  label: step.label,
  href: step.href,
  description: step.description,
}));

// 프로그램 개요 (SCR-004, DEC-035): 한눈에 보는 요약 → 눌러 보는 여정 그림 → 펼쳐 보는 원문 순서로 짧게 구성한다
export default function OverviewPage() {
  const { definition, philosophy, specs, commonQuestions } = OVERVIEW;
  const commonCount = commonQuestions.groups.reduce((sum, g) => sum + g.items.length, 0);
  return (
    <>
      <PageHeader
        title="프로그램 개요"
        description="회기 수는 프로그램마다 다릅니다. 아래 흐름은 가이드북의 5회기 기본 구조입니다."
      />

      <Card title="코칭 프로그램이란" source={definition.source}>
        <p className="break-keep text-lg leading-relaxed text-main">{definition.text}</p>

        {/* 운영 사양 3D 아이소메트릭 & 유리 질감 카드 (Glassmorphism + 3D Icons) */}
        <div className="mt-6 flex items-baseline justify-end gap-2">
          <span className="text-caption text-body">{specs.source}</span>
        </div>
        <dl className="mt-3 grid grid-cols-1 gap-3.5 sm:grid-cols-2 xl:grid-cols-4">
          {specs.rows.map(([item, standard, note]) => (
            <div
              key={item}
              className="glass-spec-card flex flex-col justify-between rounded-2xl p-4.5 sm:p-5"
            >
              <div>
                <div className="flex items-start justify-between gap-2">
                  <dt className="text-[0.975rem] font-bold tracking-tight text-primary">{item}</dt>
                  <div className="transition-transform duration-200 group-hover:scale-105">
                    <Spec3DIcon item={item} size={42} />
                  </div>
                </div>
                <dd className="mt-2.5 break-keep text-[0.908rem] font-bold text-main leading-snug">{standard}</dd>
              </div>
              <dd className="mt-3.5 break-keep border-t border-line/60 pt-2.5 text-caption text-muted">{note}</dd>
            </div>
          ))}
        </dl>
      </Card>

      <Card title="1. 코칭 여정" source={JOURNEY.source}>
        <WorkflowDiagram id="journey" title="코칭 여정" nodes={journeyNodes} nodeWidth={124} gap={30} />
      </Card>

      <Card title="2. 코치 업무 절차">
        <WorkflowDiagram id="coach-workflow" title="코치 업무 절차" nodes={workflowNodes} perRow={7} nodeWidth={116} gap={24} />
      </Card>

      {/* 가이드북 원문은 모두 남기되 접어 둔다 — 필요한 묶음만 펼쳐 읽는다 */}
      <Card title="더 읽어보기">
        <Disclosure title={definition.questionsIntro} meta={`${definition.questions.length}개 질문 · ${definition.source}`}>
          <QuestionList items={definition.questions} />
        </Disclosure>
        <Disclosure title="핵심 철학" meta={`${philosophy.items.length}가지 · ${philosophy.source}`}>
          <ol className="list-decimal space-y-2 pl-5 text-body">
            {philosophy.items.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ol>
        </Disclosure>
        <Disclosure id="between" title="Between Session 운영 원칙" meta={`${BETWEEN_PRINCIPLES.length}가지 · 가이드북 5.2`}>
          <QuestionList items={BETWEEN_PRINCIPLES} />
        </Disclosure>
        <Disclosure title="회기 공통 질문" meta={`${commonCount}개 질문 · ${commonQuestions.source}`}>
          <div className="grid gap-6 lg:grid-cols-2">
            {commonQuestions.groups.map((group) => (
              <div key={group.title}>
                <h3 className="mb-2 font-semibold text-main">{group.title}</h3>
                <QuestionList items={group.items} />
              </div>
            ))}
          </div>
        </Disclosure>
      </Card>
    </>
  );
}
