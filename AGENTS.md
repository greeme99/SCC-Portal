<!-- [ACTIVE_RULES_INDEX]
- Cost Engineering: Ponytail (Lazy coding), Caveman (Terse output), No-Fluff, Micro-Diffs
- Safety: Read-only first, destructive actions require explicit user approval
- Architecture: Next.js 16 App Router, Turbopack, Tailwind CSS v4, Token System
-->

## Cost Engineering & Output Rules
- **Terse Output (Caveman/No-Fluff)**: 불필요한 인사말, 서두, 마무리 문구, 코드 재설명을 전면 금지한다. 요점(문제/원인/조치)과 변경 Diff만 출력한다.
- **Lazy Implementation (Ponytail)**: YAGNI 원칙 준수. 요청받지 않은 추상화, 보일러플레이트, 불필요한 의존성 설치 금지. 최소 변경(Minimal Diff)으로 동작하는 코드를 최우선으로 작성한다.
- **Output Brevity**: 전체 파일 덤프를 금지하고 수정 대상 블록만 Micro-Diff로 제시한다.
- **Subagent Isolation**: 대량 로그, 장문 파일 읽기, 전체 테스트 실행은 Subagent에 위임하여 메인 컨텍스트의 오염과 토큰 누수를 방지한다.
- **Goal Skill Prohibition**: 단순 반복이나 일반 개발 작업에서 `/goal` 스킬 호출을 전면 금지(`DENY`)한다. 다단계 아키텍처 초기 설계 외에는 사용하지 않는다.
- **Ambiguity Gate (GRILL-ME)**: 요구사항이나 기술 사양이 모호할 경우 임의로 추측하여 코딩하지 말고 `/grill-me` 인터뷰를 선행하여 사양을 확정한 후 작성한다.

## Engineering & Quality
- UI 색상 및 스타일은 `styles/tokens.css`의 CSS 변수 토큰을 100% 사용하며 임의 hex/Tailwind 기본 색상 사용을 금지한다.
- 코드 수정 후 반드시 `npm run design:lint`, `npm run typecheck`, `npm test`를 통과해야 한다.

<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
