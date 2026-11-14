// 3D 클레이 스텝 & 배지 인포그래픽 (3D Clay Steps & Badges)
// 부드러운 3D 점토(Clay) 질감의 캡슐과 단계별 직관적인 미니 픽토그램,
// 마우스 호버 시 해당 메뉴로 이동된다는 인터랙티브 툴팁 안내를 제공합니다.
// 디자인 린트(scripts/design-lint.mjs)와 WCAG 2.5.3 규격을 준수합니다.

export type FlowNode = {
  label: string;
  href: string;
  description: string;
  question?: string;
  outputs?: string;
  dashed?: boolean;
};

const W = 124;
const H = 46;
const GAP_Y = 52;
const PAD_X = 24;
const PAD_Y = 34; // 호버 시 상단 툴팁이 여유 있게 표시되도록 상단 패딩 확보

function layout(count: number, perRow: number, nodeWidth: number, gapX: number) {
  const positions = Array.from({ length: count }, (_, i) => {
    const row = Math.floor(i / perRow);
    const col = row % 2 === 0 ? i % perRow : perRow - 1 - (i % perRow); // 지그재그 S자 흐름
    return { x: PAD_X + col * (nodeWidth + gapX), y: PAD_Y + row * (H + GAP_Y) };
  });
  const rows = Math.ceil(count / perRow);
  const columns = Math.min(perRow, count);
  const curveMargin = rows > 1 ? 40 : 0;
  return {
    positions,
    width: PAD_X * 2 + columns * nodeWidth + (columns - 1) * gapX + curveMargin,
    height: PAD_Y * 2 + rows * H + (rows - 1) * GAP_Y,
  };
}

type SvgProps = {
  nodes: FlowNode[];
  perRow: number;
  nodeWidth: number;
  gap?: number;
  title: string;
  markerId: string;
  numbered?: boolean;
};

function nodeName(node: FlowNode, i: number, numbered?: boolean) {
  return numbered ? `${i + 1}. ${node.label}` : node.label;
}

// 텍스트 너비 정밀 추정 (문구와 아이콘 사이 간격을 가깝게 배치하기 위함)
function estimateTextWidth(text: string): number {
  let width = 0;
  for (const ch of text) {
    if (ch === ' ' || ch === '-' || ch === '.') width += 4.5;
    else if (/[A-Za-z0-9]/.test(ch)) width += 7.5;
    else width += 12; // 한글 문자
  }
  return width;
}

// 각 단계별 직관적인 미니 픽토그램 (체크리스트, 대화, 펜, 리포트 등)
function MiniPictogram({ label, isDashed }: { label: string; isDashed?: boolean }) {
  const fill = isDashed ? 'var(--color-muted)' : 'var(--icon-3d-accent)';

  // 1. 체크리스트 / 세션 준비
  if (label.includes('세션 준비') || label.includes('기록')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <rect x="3" y="4" width="14" height="14" rx="3" fill="none" stroke={fill} strokeWidth="2" />
        <path d="M7 11L9.5 13.5L14 8.5" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  // 2. 대화 말풍선 / 세션 진행
  if (label.includes('세션 진행') || label.includes('본 세션')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <path
          d="M4 14V6C4 4.89543 4.89543 4 6 4H14C15.1046 4 16 4.89543 16 6V12C16 13.1046 15.1046 14 14 14H8L4 17V14Z"
          fill="none"
          stroke={fill}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <circle cx="8" cy="9" r="1" fill={fill} />
        <circle cx="12" cy="9" r="1" fill={fill} />
      </g>
    );
  }
  // 3. 펜 / 코칭일지
  if (label.includes('일지') || label.includes('소감')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <path
          d="M14.5 4.5L16.5 6.5L6.5 16.5H4.5V14.5L14.5 4.5Z"
          fill="none"
          stroke={fill}
          strokeWidth="2"
          strokeLinejoin="round"
        />
        <path d="M12.5 6.5L14.5 8.5" stroke={fill} strokeWidth="2" />
      </g>
    );
  }
  // 4. 나침반 / 관찰 / Between
  if (label.includes('Between') || label.includes('관찰')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <circle cx="10" cy="10" r="7" fill="none" stroke={fill} strokeWidth="2" />
        <path d="M13 7L11.5 11.5L7 13L8.5 8.5L13 7Z" fill={fill} />
      </g>
    );
  }
  // 5. 리포트 / 문서
  if (label.includes('리포트')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <path d="M5 4H12L15 7V16H5V4Z" fill="none" stroke={fill} strokeWidth="2" strokeLinejoin="round" />
        <path d="M8 10H12" stroke={fill} strokeWidth="1.8" strokeLinecap="round" />
        <path d="M8 13H12" stroke={fill} strokeWidth="1.8" strokeLinecap="round" />
      </g>
    );
  }
  // 6. 진행 확인 / 대시보드
  if (label.includes('확인') || label.includes('대시보드')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <circle cx="10" cy="10" r="7" fill="none" stroke={fill} strokeWidth="2" />
        <path d="M7 10L9 12L13 8" stroke={fill} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
      </g>
    );
  }
  // 7. 모래시계 / 프리 세션
  if (label.includes('프리') || label.includes('시작')) {
    return (
      <g transform="translate(-7, -7) scale(0.7)">
        <path d="M5 4H15M5 16H15M6 4C6 9 10 10 10 10C10 10 14 9 14 4M6 16C6 11 10 10 10 10C10 10 14 11 14 16" stroke={fill} strokeWidth="2" strokeLinecap="round" />
      </g>
    );
  }
  // 기본: 목표 깃발 / 핀
  return (
    <g transform="translate(-7, -7) scale(0.7)">
      <path d="M5 4V17M5 4H14L11 8.5L14 13H5" stroke={fill} strokeWidth="2" strokeLinejoin="round" />
    </g>
  );
}

type PathSegment = {
  d: string;
  dashed: boolean;
};

function buildSegments(
  positions: { x: number; y: number }[],
  nodes: FlowNode[],
  perRow: number,
  nodeWidth: number,
): PathSegment[] {
  const segments: PathSegment[] = [];
  const H_HALF = H / 2;

  for (let i = 0; i < positions.length - 1; i++) {
    const a = positions[i];
    const b = positions[i + 1];
    const isDashed = Boolean(nodes[i].dashed || nodes[i + 1].dashed);

    if (perRow === 1) {
      const x = a.x + nodeWidth / 2;
      const y1 = a.y + H;
      const y2 = b.y;
      segments.push({ d: `M ${x} ${y1} L ${x} ${y2}`, dashed: isDashed });
      continue;
    }

    if (a.y === b.y) {
      if (b.x > a.x) {
        const x1 = a.x + nodeWidth;
        const y1 = a.y + H_HALF;
        const x2 = b.x;
        const y2 = b.y + H_HALF;
        segments.push({ d: `M ${x1} ${y1} L ${x2} ${y2}`, dashed: isDashed });
      } else {
        const x1 = a.x;
        const y1 = a.y + H_HALF;
        const x2 = b.x + nodeWidth;
        const y2 = b.y + H_HALF;
        segments.push({ d: `M ${x1} ${y1} L ${x2} ${y2}`, dashed: isDashed });
      }
    } else {
      const y1 = a.y + H_HALF;
      const y2 = b.y + H_HALF;
      if (a.x >= b.x) {
        const x1 = a.x + nodeWidth;
        const x2 = b.x + nodeWidth;
        const cx = Math.max(x1, x2) + 36;
        segments.push({
          d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
          dashed: isDashed,
        });
      } else {
        const x1 = a.x;
        const x2 = b.x;
        const cx = Math.min(x1, x2) - 36;
        segments.push({
          d: `M ${x1} ${y1} C ${cx} ${y1}, ${cx} ${y2}, ${x2} ${y2}`,
          dashed: isDashed,
        });
      }
    }
  }

  return segments;
}

function FlowSvg({ nodes, perRow, nodeWidth, gap = 30, title, markerId, numbered }: SvgProps) {
  const { positions, width, height } = layout(nodes.length, perRow, nodeWidth, gap);
  const segments = buildSegments(positions, nodes, perRow, nodeWidth);
  const fontSize = nodeWidth < 125 ? 'text-[12px]' : 'text-[13px]';

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      role="group"
      aria-label={`${title}: ${nodes.map((n) => n.label).join(', ')}`}
      className="block h-auto w-full overflow-visible"
    >
      <defs>
        {/* 3D 클레이 캡슐 상단 그라데이션 (부드러운 점토 볼륨) */}
        <linearGradient id={`${markerId}-clay-capsule`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--icon-3d-surface)" />
          <stop offset="60%" stopColor="var(--clay-bg-subtle)" />
          <stop offset="100%" stopColor="var(--color-bg-subtle)" />
        </linearGradient>

        {/* 3D 클레이 Between 캡슐 (연한 회색 점토 질감) */}
        <linearGradient id={`${markerId}-clay-between`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--color-bg-base)" />
          <stop offset="100%" stopColor="var(--color-bg-subtle)" />
        </linearGradient>
      </defs>

      {/* 회색 연결선 */}
      {segments.map((seg, i) => (
        <path
          key={`line-${i}`}
          d={seg.d}
          fill="none"
          stroke="var(--color-text-muted)"
          strokeWidth={1.5}
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={seg.dashed ? '4 3' : undefined}
          opacity={0.7}
        />
      ))}

      {/* 4. 3D 클레이 캡슐 노드 */}
      {nodes.map((node, i) => {
        const pos = positions[i];
        const isDashed = Boolean(node.dashed);
        const radius = H / 2;
        const displayName = nodeName(node, i, numbered);

        // 문구와 아이콘 사이 간격을 7px로 좁히고 전체를 캡슐 중앙에 정렬
        const textW = estimateTextWidth(displayName);
        const GAP_ICON = 7;
        const iconSize = 14;
        const totalContentW = textW + GAP_ICON + iconSize;
        const startX = pos.x + (nodeWidth - totalContentW) / 2;

        const textX = startX;
        const textY = pos.y + H / 2 + 4.5;
        const iconX = startX + textW + GAP_ICON + 7;
        const iconY = pos.y + H / 2;

        return (
          <a
            key={node.label}
            href={node.href}
            aria-label={`${displayName} — ${node.description}`}
            className="group cursor-pointer outline-none focus-visible:[&_.clay-pill]:stroke-primary-strong focus-visible:[&_.clay-pill]:[stroke-width:2.5]"
          >
            <title>{`${node.label} — 클릭하여 해당 메뉴로 이동`}</title>

            {/* 캡슐 바닥 소프트 그림자 */}
            <rect
              x={pos.x + 2}
              y={pos.y + 4}
              width={nodeWidth}
              height={H}
              rx={radius}
              fill="var(--icon-3d-shadow)"
              opacity={0.3}
              className="transition-all duration-200 group-hover:opacity-45 group-hover:translate-y-1"
            />

            {/* 캡슐 클레이 하단 입체 두께 (Side Cushion Layer) */}
            <rect
              x={pos.x}
              y={pos.y + 3}
              width={nodeWidth}
              height={H}
              rx={radius}
              fill={isDashed ? 'var(--color-border-strong)' : 'var(--color-line)'}
            />

            {/* 캡슐 클레이 상단면 (Rounded Clay Pill) */}
            <rect
              x={pos.x}
              y={pos.y}
              width={nodeWidth}
              height={H}
              rx={radius}
              fill={isDashed ? `url(#${markerId}-clay-between)` : `url(#${markerId}-clay-capsule)`}
              stroke="var(--glass-border)"
              strokeWidth={1.5}
              strokeDasharray={isDashed ? '5 4' : undefined}
              className="clay-pill transition-transform duration-200 group-hover:-translate-y-1"
            />

            {/* 캡슐 상단 둥근 모서리 반사광 (Curvature Highlight) */}
            <path
              d={`M ${pos.x + radius} ${pos.y + 2} L ${pos.x + nodeWidth - radius} ${pos.y + 2}`}
              stroke="var(--icon-3d-highlight)"
              strokeWidth={1.8}
              strokeLinecap="round"
              className="pointer-events-none transition-transform duration-200 group-hover:-translate-y-1"
            />

            {/* 캡슐 하단 안쪽 그림자 아크 (Inner Shadow Cushion) */}
            <path
              d={`M ${pos.x + radius} ${pos.y + H - 2} L ${pos.x + nodeWidth - radius} ${pos.y + H - 2}`}
              stroke="var(--icon-3d-shadow)"
              strokeWidth={1.5}
              strokeLinecap="round"
              opacity={0.15}
              className="pointer-events-none transition-transform duration-200 group-hover:-translate-y-1"
            />

            {/* 5. 단계명 텍스트 (아이콘과 7px 간격으로 인접 정렬) */}
            <text
              x={textX}
              y={textY}
              textAnchor="start"
              className={`pointer-events-none ${fontSize} font-bold tracking-tight transition-transform duration-200 group-hover:-translate-y-1 ${
                isDashed ? 'fill-body' : 'fill-main'
              }`}
            >
              {displayName}
            </text>

            {/* 6. 직관적인 미니 픽토그램 (텍스트 바로 우측 배치) */}
            <g
              transform={`translate(${iconX}, ${iconY})`}
              className="pointer-events-none transition-transform duration-200 group-hover:-translate-y-1"
            >
              <MiniPictogram label={node.label} isDashed={isDashed} />
            </g>

            {/* 7. 인터랙티브 호버 시 상단에 떠오르는 가볍고 은은한 '이동 안내' 미니 툴팁 */}
            <g className="pointer-events-none opacity-0 transition-opacity duration-300 group-hover:opacity-75">
              {/* 연한 반투명 캡슐 배경 */}
              <rect
                x={pos.x + nodeWidth / 2 - 38}
                y={pos.y - 21}
                width={76}
                height={17}
                rx={8}
                fill="var(--color-bg-surface)"
                stroke="var(--color-line)"
                strokeWidth={0.8}
              />
              {/* 툴팁 미니 꼬리표 */}
              <polygon
                points={`${pos.x + nodeWidth / 2 - 3},${pos.y - 4} ${pos.x + nodeWidth / 2 + 3},${pos.y - 4} ${pos.x + nodeWidth / 2},${pos.y - 1}`}
                fill="var(--color-bg-surface)"
                stroke="var(--color-line)"
                strokeWidth={0.8}
              />
              {/* 가볍고 연한 텍스트 */}
              <text
                x={pos.x + nodeWidth / 2}
                y={pos.y - 9}
                textAnchor="middle"
                className="text-[9.5px] font-medium fill-muted"
              >
                메뉴로 이동 ↗
              </text>
            </g>
          </a>
        );
      })}
    </svg>
  );
}

// numbered: 그림의 단계에 순번을 붙인다
export function WorkflowDiagram({
  id,
  title,
  nodes,
  numbered,
  perRow = 6,
  nodeWidth = W,
  gap = 30,
}: {
  id: string;
  title: string;
  nodes: FlowNode[];
  numbered?: boolean;
  perRow?: number;
  nodeWidth?: number;
  gap?: number;
}) {
  const svgProps = { nodes, title, numbered };
  return (
    <figure className="py-2">
      <figcaption className="sr-only">{title}</figcaption>
      {/* 상단 시각적 안내문구 */}
      <p className="mb-3.5 flex items-center gap-1.5 text-caption text-muted">
        <span className="inline-block size-1.5 rounded-full bg-primary/60" aria-hidden="true" />
        박스를 클릭하면 해당 가이드 및 메뉴 화면으로 이동합니다.
      </p>
      <div className="hidden md:block">
        <FlowSvg {...svgProps} perRow={perRow} nodeWidth={nodeWidth} gap={gap} markerId={`${id}-h`} />
      </div>
      <div className="mx-auto max-w-[270px] md:hidden">
        <FlowSvg {...svgProps} perRow={1} nodeWidth={250} markerId={`${id}-v`} />
      </div>
    </figure>
  );
}
