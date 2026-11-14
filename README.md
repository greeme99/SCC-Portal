# SCC Coaching Portal (삼코동 코칭 포털)

<p align="center">
  <img src="public/brand/scc-logo.png" alt="삼코동 로고" width="160" onerror="this.style.display='none'"/>
</p>

<p align="center">
  <strong>삼코동 코치의 다회기 코칭 Journey 전 과정을 지원하는 통합 반응형 웹 포털</strong>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/Next.js-16.4.1-black?style=flat&logo=next.js" alt="Next.js" />
  <img src="https://img.shields.io/badge/React-19.3.0-blue?style=flat&logo=react" alt="React" />
  <img src="https://img.shields.io/badge/TypeScript-5.x-blue?style=flat&logo=typescript" alt="TypeScript" />
  <img src="https://img.shields.io/badge/TailwindCSS-v4-38B2AC?style=flat&logo=tailwind-css" alt="Tailwind CSS" />
  <img src="https://img.shields.io/badge/Vercel-icn1%20(Seoul)-black?style=flat&logo=vercel" alt="Vercel" />
</p>

---

## 📌 프로젝트 소개 (Overview)

**SCC Coaching Portal**은 삼코동 코치들이 커리어·멘토링·라이프 코칭 등 다양한 코칭 프로그램을 운영할 때, **코칭 전 준비부터 회기별 일지 작성, 성찰 도구 활용, 과정 종료 소감까지**의 모든 흐름을 단절 없이 수행할 수 있도록 설계된 반응형 웹 애플리케이션입니다.

- **원래 저장소 (GitHub):** [https://github.com/greeme99/SCC-Portal](https://github.com/greeme99/SCC-Portal)
- **주요 대상:** 삼코동 코치 및 코칭 참여자(피코치/멘티)
- **핵심 목표:**
  1. 코칭 전 준비와 코칭 후 행동·성찰의 끊김 없는 연계
  2. 다회기 간의 맥락 및 기록을 한곳에서 체계적으로 보존
  3. 모바일·태블릿·데스크톱 환경에 최적화된 직관적인 UX 제공

---

## 🧭 코칭 철학 (Philosophy)

본 포털의 모든 UI와 기능은 삼코동의 핵심 코칭 철학을 바탕으로 구현되었습니다.

| 원칙 | 포털 기능 및 UI 설계 반영 |
|---|---|
| **코치는 답을 주지 않는다** | 정답을 일방적으로 제시하는 대신, 스스로 가치와 강점을 탐색하도록 돕는 질문·성찰 중심 인터랙션 |
| **Action은 숙제가 아닌 '실험'** | 미실행된 액션 플랜도 비난이나 패널티 없이 "귀중한 학습 자산"으로 기록 및 회고 |
| **도구보다 고객의 발견이 우선** | 복잡한 워크시트 작성을 강요하지 않으며, 필수 항목 최소화 및 유연한 기록 지원 |
| **SHARE 프로토콜 기반 멘토링** | 멘토 경험 공유 시 5단계(허락 → 맥락 → 통찰 → 선택권 반환 → 행동 연결) 구조 가이드 제공 |

---

## 🚀 주요 기능 (Key Features)

### 1. 프로그램별 다회기 코칭 가이드
- **유형별 맞춤 가이드:** 커리어 코칭(`career`), 멘토링 코칭(`mentoring`), 라이프 코칭(`life`)
- **단계별 회차 상세 로드맵:** 각 코칭 회차별 핵심 목표, 진행 순서, 강력한 질문(Powerful Questions), 추천 도구 수록 (총 21개 세부 화면)

### 2. 구글폼 기반 실시간 일지 및 소감 작성 (4종 폼 연동)
- **코칭 일지 / 코칭 완료 보고서 / 코치 종료 소감 / 피코치 종료 소감**
- 세션 및 코칭 정보를 자동으로 질의 파라미터(prefill)로 전달하여 입력 편의성 극대화

### 3. 실시간 대시보드 & 참조 자료실
- **코칭 현황 대시보드:** Google Sheets API 연동을 통한 실시간 진행 상황 및 통계 조회
- **참조 자료실:** Google Drive 폴더 연동을 통해 필요한 서식, 참고 자료, 가이드북 열람 지원

### 4. 안전한 보안 및 접근 제어
- 공용 사이트 접근 비밀번호(Site Password) 기반 인증 체계
- 서버 사이드 프록시 및 쿠키 세션을 통한 안전한 접근 관리

---

## 🛠 기술 스택 (Tech Stack)

### Frontend & Framework
- **Next.js 16.4.1** (App Router, Turbopack)
- **React 19.3.0**
- **TypeScript 5**
- **Tailwind CSS v4**
- **Pretendard** (한글 최적화 타이포그래피) & **Lucide React** (아이콘 세트)

### Backend & Cloud Services
- **Next.js Route Handlers** (Serverless API)
- **Google Workspace API 연동:**
  - Google Sheets API v4 (대시보드 통계 및 응답 조회)
  - Google Drive API v3 (참조 자료실 연동)
  - Google Apps Script (구글폼 자동 생성 및 동기화)
- **배포 인프라:** Vercel (한국 서울 리전 `icn1`)

### Testing & Code Quality
- **Vitest**: 단위(Unit) 및 콘텐츠 무결성 테스트
- **Playwright**: End-to-End(E2E) 및 웹 접근성(a11y - Axe-core) 테스트
- **ESLint & Custom Design Linter**: 디자인 토큰 및 코드 스타일 준수 검증

---

## 📂 프로젝트 구조 (Directory Structure)

```text
SCC-Portal/
├── app/                  # Next.js App Router (페이지 및 API 라우트)
│   ├── (auth)/           # 입장 인증 관련 화면
│   ├── api/              # Google Sheets, Drive 연동 API 라우트
│   ├── coaching/         # 코칭 프로그램 및 회차별 화면
│   ├── dashboard/        # 코칭 현황 대시보드
│   └── references/       # 참조 자료실 화면
├── components/           # 재사용 가능한 UI 컴포넌트 (사이드바, 헤더, 카드 등)
├── content/              # 코칭 가이드북 원문 및 폼 정의 데이터 (JSON)
│   ├── career.json
│   ├── mentoring.json
│   ├── life.json
│   └── forms.json
├── docs/                 # 프로젝트 설계 및 개발 산출물
│   ├── development/      # SRS, PRD, IA, 와이어프레임, UI설계, 개발·테스트 계획서
│   ├── forms/            # 구글폼 원문 양식
│   └── reference/        # 참고 가이드북 문서
├── lib/                  # 유틸리티 함수, Google API 클라이언트, 콘텐츠 로더
├── public/               # 정적 애셋 (브랜드 로고, 파비콘 등)
├── scripts/              # 디자인 린트 스크립트 및 Google Apps Script
├── styles/               # 전역 스타일 및 Tailwind CSS 설정
└── tests/                # Vitest 단위 테스트 및 Playwright E2E 테스트
```

---

## 💻 로컬 개발 환경 설정 (Getting Started)

### 요구 사양
- **Node.js**: `v22.0.0` 이상
- **npm**: `v10.0.0` 이상

### 1. 저장소 클론 및 패키지 설치
```bash
git clone https://github.com/greeme99/SCC-Portal.git
cd SCC-Portal
npm install
```

### 2. 환경 변수 설정
프로젝트 루트에 `.env.local` 파일을 생성하고 필요한 값을 설정합니다. (자세한 항목은 `.env.example` 참고)

```env
# 사이트 접근 비밀번호 (필수)
SITE_PASSWORD=your_password_here

# Google Cloud 서비스 계정 연동 (Phase 3~4 기능 사용 시)
GOOGLE_SERVICE_ACCOUNT_JSON={"type":"service_account",...}
SHEET_PROGRAMS_ID=your_sheet_id
SHEET_ROSTER_ID=your_sheet_id
SHEET_RESPONSES_ID=your_sheet_id
DRIVE_REFERENCES_FOLDER_ID=your_drive_folder_id
```

### 3. 개발 서버 실행
```bash
npm run dev
```
브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 포털을 확인합니다.

---

## 📜 주요 실행 명령어 (Scripts)

| 명령어 | 설명 |
|---|---|
| `npm run dev` | Turbopack 기반의 로컬 개발 서버 실행 |
| `npm run build` | 프로덕션 빌드 생성 |
| `npm run start` | 프로덕션 빌드 로컬 실행 |
| `npm run check` | Lint + Typecheck + Design Lint + Unit Test 통합 실행 (권장) |
| `npm run lint` | ESLint를 통한 코드 스타일 및 오류 검사 |
| `npm run typecheck` | TypeScript 타입 무결성 검증 |
| `npm run design:lint`| 디자인 토큰 및 UI 규격 검사 |
| `npm test` | Vitest 단위 테스트 실행 |
| `npm run test:e2e` | Playwright 기반 E2E 및 웹 접근성 테스트 실행 |

---

## 📚 개발 문서 (Specifications)

상세 설계 및 명세 문서는 `docs/development/` 디렉터리에 정리되어 있습니다.

- [00. 문서 인덱스 및 결정 기록 (Document Index)](docs/development/00.document-index.md)
- [01. 요구사항 명세서 (SRS)](docs/development/01.SRS-requirements.md)
- [02. 제품 및 기능 명세서 (PRD/FS)](docs/development/02.PRD-FS-functional-spec.md)
- [03. 정보 구조 설계서 (IA)](docs/development/03.IA-information-architecture.md)
- [04. 와이어프레임 (Wireframes)](docs/development/04.wireframes.md)
- [05. UI 설계서 (UI Design Spec)](docs/development/05.UI-design-spec.md)
- [06. 개발 계획서 (Development Plan)](docs/development/06.development-plan.md)
- [07. 테스트 계획서 (Test Plan)](docs/development/07.test-plan.md)

---

## 🤝 지속적인 협업 및 원격 연동 (Repository Management)

본 프로젝트는 공식 원격 저장소 [SCC-Portal](https://github.com/greeme99/SCC-Portal)과 동기화되어 개발이 진행됩니다.

```bash
# 원격 저장소 확인
git remote -v
# origin  https://github.com/greeme99/SCC-Portal.git (fetch)
# origin  https://github.com/greeme99/SCC-Portal.git (push)

# 최신 변경사항 동기화
git fetch origin
git pull origin main
```

---

<p align="center">
  © 2026 삼코동. All rights reserved.
</p>

