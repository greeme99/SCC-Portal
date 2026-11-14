// 3D 아이소메트릭 & 유리 질감 아이콘 (Glassmorphism + 3D Icons)
// 토큰 파일의 CSS 변수만 사용하여 디자인 린트(scripts/design-lint.mjs)를 준수합니다.

type IconProps = {
  size?: number;
  className?: string;
};

// 1. 전체 여정: 3D 아이소메트릭 나침반 & 여정 로드맵
export function Journey3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="journey-base-grad" x1="8" y1="18" x2="40" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-base)" />
          <stop offset="100%" stopColor="var(--icon-3d-surface)" />
        </linearGradient>
        <linearGradient id="journey-pin-grad" x1="24" y1="10" x2="32" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-accent-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-accent)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="40" rx="16" ry="5" fill="var(--icon-3d-shadow)" opacity="0.35" />
      {/* 3D 아이소메트릭 베이스 플랫폼 */}
      <path
        d="M24 16L39 23.5V29.5L24 37L9 29.5V23.5L24 16Z"
        fill="var(--icon-3d-shadow)"
        opacity="0.2"
      />
      <path
        d="M24 14L39 21.5V26.5L24 34L9 26.5V21.5L24 14Z"
        fill="var(--color-line)"
      />
      <path
        d="M24 13L39 20.5L24 28L9 20.5L24 13Z"
        fill="url(#journey-base-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />
      {/* S자 여정 경로 라인 */}
      <path
        d="M15 22C18 20 22 25 26 23C29 21.5 32 23 33 22"
        stroke="var(--icon-3d-accent)"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeDasharray="1 2.5"
      />
      {/* 3D 로드맵 깃발 / 핀 */}
      <g transform="translate(4, -2)">
        <path d="M22 13V25" stroke="var(--color-main)" strokeWidth="2" strokeLinecap="round" />
        <path
          d="M23 11L33 15.5L23 20V11Z"
          fill="url(#journey-pin-grad)"
          stroke="var(--icon-3d-highlight)"
          strokeWidth="0.8"
        />
        <circle cx="22" cy="11" r="2.5" fill="var(--icon-3d-warm)" stroke="var(--icon-3d-surface)" strokeWidth="1" />
      </g>
    </svg>
  );
}

// 2. 프리 세션: 3D 모래시계 (Hourglass)
export function Hourglass3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="hg-glass-grad" x1="16" y1="10" x2="32" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-base)" stopOpacity="0.85" />
          <stop offset="50%" stopColor="var(--icon-3d-surface)" stopOpacity="0.4" />
          <stop offset="100%" stopColor="var(--icon-3d-base)" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="hg-sand-grad" x1="20" y1="20" x2="28" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-warm-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-warm)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="41" rx="14" ry="4" fill="var(--icon-3d-shadow)" opacity="0.4" />
      {/* 상단 3D 캡 원반 */}
      <ellipse cx="24" cy="13.5" rx="13" ry="4.5" fill="var(--icon-3d-shadow)" opacity="0.3" />
      <path d="M11 11C11 9 37 9 37 11V13C37 15 11 15 11 13V11Z" fill="var(--color-primary-strong)" />
      <ellipse cx="24" cy="10.5" rx="13" ry="4" fill="var(--icon-3d-accent)" stroke="var(--icon-3d-highlight)" strokeWidth="0.8" />

      {/* 모래시계 유리 몸체 */}
      <path
        d="M14 13C14 20 21 23 23 24C21 25 14 28 14 35H34C34 28 27 25 25 24C27 23 34 20 34 13H14Z"
        fill="url(#hg-glass-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1.2"
      />
      {/* 내부 모래 - 상단 잔여 모래 */}
      <path d="M17 15C17 19 21 21 24 22C27 21 31 19 31 15H17Z" fill="url(#hg-sand-grad)" opacity="0.8" />
      {/* 떨어지는 모래 줄기 */}
      <line x1="24" y1="22" x2="24" y2="33" stroke="var(--icon-3d-warm)" strokeWidth="1.8" strokeLinecap="round" />
      {/* 하단 쌓인 모래 */}
      <path d="M17 35C18 30 22 29 24 29C26 29 30 30 31 35H17Z" fill="url(#hg-sand-grad)" />

      {/* 유리 빛 반사 하이라이트 라인 */}
      <path d="M16 16C16 19 19 22 21 23" stroke="var(--icon-3d-surface)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />
      <path d="M16 32C16 29 19 26 21 25" stroke="var(--icon-3d-surface)" strokeWidth="1.2" strokeLinecap="round" opacity="0.9" />

      {/* 하단 3D 캡 원반 */}
      <ellipse cx="24" cy="38" rx="13" ry="4" fill="var(--color-primary-strong)" />
      <ellipse cx="24" cy="36" rx="13" ry="4" fill="var(--icon-3d-accent)" stroke="var(--icon-3d-highlight)" strokeWidth="0.8" />
    </svg>
  );
}

// 3. 본 세션: 3D 대화 말풍선 (Chat Bubbles)
export function Chat3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="chat-main-grad" x1="12" y1="14" x2="34" y2="36" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-accent-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-accent)" />
        </linearGradient>
        <linearGradient id="chat-sub-grad" x1="24" y1="8" x2="42" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-surface)" />
          <stop offset="100%" stopColor="var(--icon-3d-base)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="25" cy="41" rx="15" ry="4" fill="var(--icon-3d-shadow)" opacity="0.35" />

      {/* 뒤쪽 보조 말풍선 */}
      <g opacity="0.9">
        <path
          d="M26 12C26 8.5 32 8.5 35 9C39 10 42 13 42 17C42 20 40 23 37 24.5V28L33 25.5C31 26 28 26 26 24.5C24.5 23 24 21 24 19C24 15 25 13 26 12Z"
          fill="var(--icon-3d-shadow)"
          opacity="0.3"
        />
        <path
          d="M26 10C26 6.5 32 6.5 35 7C39 8 42 11 42 15C42 18 40 21 37 22.5V26L33 23.5C31 24 28 24 26 22.5C24 21 23 18 23 15C23 11 25 10 26 10Z"
          fill="url(#chat-sub-grad)"
          stroke="var(--icon-3d-highlight)"
          strokeWidth="1"
        />
      </g>

      {/* 앞쪽 주 3D 말풍선 */}
      <path
        d="M10 20C10 13.5 16 12 23 12C30 12 36 14.5 36 21C36 27.5 30 30 23 30C20.5 30 18 29.5 16 28.5L10 32L11.5 26.5C10.5 24.5 10 22.5 10 20Z"
        fill="var(--icon-3d-shadow)"
        opacity="0.25"
      />
      <path
        d="M10 18C10 11.5 16 10 23 10C30 10 36 12.5 36 19C36 25.5 30 28 23 28C20.5 28 18 27.5 16 26.5L10 30L11.5 24.5C10.5 22.5 10 20.5 10 18Z"
        fill="url(#chat-main-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />
      {/* 말풍선 안의 대화 점 3개 (3D 노드) */}
      <circle cx="17" cy="18.5" r="2" fill="var(--icon-3d-surface)" />
      <circle cx="23" cy="18.5" r="2" fill="var(--icon-3d-surface)" />
      <circle cx="29" cy="18.5" r="2" fill="var(--icon-3d-surface)" />
      {/* 상단 3D 하이라이트 광택 타원 */}
      <ellipse cx="23" cy="13.5" rx="8" ry="2" fill="var(--icon-3d-surface)" opacity="0.45" />
    </svg>
  );
}

// 4. 회기 간격: 3D 달력 (Calendar)
export function Calendar3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="cal-base-grad" x1="10" y1="14" x2="38" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-surface)" />
          <stop offset="100%" stopColor="var(--icon-3d-base)" />
        </linearGradient>
        <linearGradient id="cal-top-grad" x1="10" y1="12" x2="38" y2="20" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-accent-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-accent)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="41" rx="16" ry="4" fill="var(--icon-3d-shadow)" opacity="0.35" />

      {/* 3D 달력 바디 (뒤판 두께) */}
      <rect x="9" y="14" width="30" height="25" rx="5" fill="var(--color-line)" />
      {/* 3D 달력 앞판 */}
      <rect
        x="9"
        y="12"
        width="30"
        height="25"
        rx="5"
        fill="url(#cal-base-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />
      {/* 상단 컬러 띠 */}
      <path
        d="M9 17C9 14.2386 11.2386 12 14 12H34C36.7614 12 39 14.2386 39 17V20H9V17Z"
        fill="url(#cal-top-grad)"
      />

      {/* 바인더 링 2개 (3D 메탈릭) */}
      <rect x="15" y="8" width="4" height="7" rx="2" fill="var(--color-main)" opacity="0.8" />
      <rect x="15" y="7" width="4" height="7" rx="2" fill="var(--icon-3d-surface)" stroke="var(--color-border-strong)" strokeWidth="0.8" />
      <rect x="29" y="8" width="4" height="7" rx="2" fill="var(--color-main)" opacity="0.8" />
      <rect x="29" y="7" width="4" height="7" rx="2" fill="var(--icon-3d-surface)" stroke="var(--color-border-strong)" strokeWidth="0.8" />

      {/* 달력 날짜 그리드 노드 */}
      <circle cx="15" cy="25" r="1.8" fill="var(--color-muted)" opacity="0.6" />
      <circle cx="21" cy="25" r="1.8" fill="var(--color-muted)" opacity="0.6" />
      <circle cx="27" cy="25" r="1.8" fill="var(--color-muted)" opacity="0.6" />
      <circle cx="33" cy="25" r="1.8" fill="var(--color-muted)" opacity="0.6" />

      <circle cx="15" cy="31" r="1.8" fill="var(--color-muted)" opacity="0.6" />
      {/* 1~2주 강조 체크 뱃지 */}
      <rect x="19.5" y="29.5" width="15" height="4" rx="2" fill="var(--icon-3d-warm-light)" />
      <rect x="19.5" y="29.5" width="9" height="4" rx="2" fill="var(--icon-3d-warm)" />
    </svg>
  );
}

// 5. Between Session: 3D 관찰/탐구 전구 & 반짝임 (Lightbulb & Insight)
export function Between3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <radialGradient id="bulb-glow-grad" cx="24" cy="19" r="14" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-warm-light)" />
          <stop offset="60%" stopColor="var(--icon-3d-warm)" stopOpacity="0.8" />
          <stop offset="100%" stopColor="var(--icon-3d-surface)" stopOpacity="0.2" />
        </radialGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="41" rx="14" ry="4" fill="var(--icon-3d-shadow)" opacity="0.35" />

      {/* 외부 은은한 빛 반사 오라 */}
      <circle cx="24" cy="19" r="14" fill="var(--icon-3d-warm-light)" opacity="0.45" />

      {/* 전구 3D 몸체 */}
      <path
        d="M16 19C16 14.5817 19.5817 11 24 11C28.4183 11 32 14.5817 32 19C32 22.3 30 25.2 27.5 26.8V31H20.5V26.8C18 25.2 16 22.3 16 19Z"
        fill="url(#bulb-glow-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1.2"
      />
      {/* 3D 필라멘트 코어 */}
      <path
        d="M21 21C21 18 23 16 24 16C25 16 27 18 27 21"
        stroke="var(--icon-3d-warm)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      {/* 전구 표면 빛 반사 하이라이트 */}
      <path
        d="M18 16C19 13.5 21.5 12.5 23 12.2"
        stroke="var(--icon-3d-surface)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* 소켓 나선 베이스 */}
      <rect x="20.5" y="31" width="7" height="3" rx="1" fill="var(--color-border-strong)" />
      <rect x="21" y="34" width="6" height="2.5" rx="1" fill="var(--color-border-strong)" />
      <ellipse cx="24" cy="37.5" rx="2" ry="1" fill="var(--color-main)" />

      {/* 주변 호기심 별 반짝임 (Sparkle) */}
      <path d="M35 12L36 14L38 15L36 16L35 18L34 16L32 15L34 14L35 12Z" fill="var(--icon-3d-warm)" />
      <path d="M12 24L13 25L14 26L13 27L12 28L11 27L10 26L11 25L12 24Z" fill="var(--icon-3d-accent)" opacity="0.8" />
    </svg>
  );
}

// 6. Follow-up: 3D 타깃 & 깃발 / 성장 지표 (Target & Direction)
export function Followup3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="fu-base-grad" x1="10" y1="20" x2="38" y2="38" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-base)" />
          <stop offset="100%" stopColor="var(--icon-3d-surface)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="40" rx="16" ry="4.5" fill="var(--icon-3d-shadow)" opacity="0.35" />

      {/* 3D 아이소메트릭 타깃 원반 (외곽 링) */}
      <ellipse cx="24" cy="31" rx="15" ry="7" fill="var(--color-line)" />
      <ellipse cx="24" cy="29" rx="15" ry="7" fill="url(#fu-base-grad)" stroke="var(--icon-3d-highlight)" strokeWidth="1" />

      {/* 중간 링 */}
      <ellipse cx="24" cy="29" rx="10" ry="4.5" fill="var(--icon-3d-accent-light)" opacity="0.4" stroke="var(--icon-3d-accent)" strokeWidth="1" />
      {/* 센터 불스아이 */}
      <ellipse cx="24" cy="29" rx="5" ry="2.5" fill="var(--icon-3d-accent)" />

      {/* 중앙에 꽂힌 3D 깃발 / 핀 */}
      <path d="M24 12V29" stroke="var(--color-main)" strokeWidth="2" strokeLinecap="round" />
      <path
        d="M25 10L35 14L25 18V10Z"
        fill="var(--icon-3d-green)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="0.8"
      />
      <circle cx="24" cy="9.5" r="2.5" fill="var(--icon-3d-warm)" stroke="var(--icon-3d-surface)" strokeWidth="1" />
    </svg>
  );
}

// 7. 운영 형식: 3D 1:1 대화 아바타 (Two Interactive Nodes)
export function Coaching1on1Icon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="c1-grad" x1="12" y1="14" x2="24" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-accent-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-accent)" />
        </linearGradient>
        <linearGradient id="c2-grad" x1="24" y1="14" x2="36" y2="34" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-warm-light)" />
          <stop offset="100%" stopColor="var(--icon-3d-warm)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="17" cy="40" rx="9" ry="3.5" fill="var(--icon-3d-shadow)" opacity="0.3" />
      <ellipse cx="31" cy="40" rx="9" ry="3.5" fill="var(--icon-3d-shadow)" opacity="0.3" />

      {/* 두 아바타 간의 3D 연결 상호작용 아치 */}
      <path
        d="M17 26C21 21 27 21 31 26"
        stroke="var(--icon-3d-accent)"
        strokeWidth="2"
        strokeLinecap="round"
        strokeDasharray="2 3"
      />

      {/* 왼쪽 코치 3D 아바타 */}
      <circle cx="17" cy="16" r="5" fill="url(#c1-grad)" stroke="var(--icon-3d-highlight)" strokeWidth="1" />
      <ellipse cx="15.5" cy="14" rx="2" ry="1" fill="var(--icon-3d-surface)" opacity="0.6" />
      <path
        d="M10 34C10 29 13 26 17 26C21 26 24 29 24 34V36H10V34Z"
        fill="url(#c1-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />

      {/* 오른쪽 피코치 3D 아바타 */}
      <circle cx="31" cy="16" r="5" fill="url(#c2-grad)" stroke="var(--icon-3d-highlight)" strokeWidth="1" />
      <ellipse cx="29.5" cy="14" rx="2" ry="1" fill="var(--icon-3d-surface)" opacity="0.6" />
      <path
        d="M24 34C24 29 27 26 31 26C35 26 38 29 38 34V36H24V34Z"
        fill="url(#c2-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />
    </svg>
  );
}

// 8. 기록: 3D 체크리스트 클립보드 (Checklist & Shield)
export function Checklist3DIcon({ size = 44, className = '' }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 drop-shadow-sm ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id="clip-base-grad" x1="12" y1="12" x2="36" y2="40" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="var(--icon-3d-surface)" />
          <stop offset="100%" stopColor="var(--icon-3d-base)" />
        </linearGradient>
      </defs>
      {/* 바닥 그림자 */}
      <ellipse cx="24" cy="41" rx="15" ry="4" fill="var(--icon-3d-shadow)" opacity="0.35" />

      {/* 3D 클립보드 판 (두께 레이어) */}
      <rect x="11" y="12" width="26" height="28" rx="4" fill="var(--color-line)" />
      <rect
        x="11"
        y="10"
        width="26"
        height="28"
        rx="4"
        fill="url(#clip-base-grad)"
        stroke="var(--icon-3d-highlight)"
        strokeWidth="1"
      />

      {/* 상단 3D 메탈릭 클립 */}
      <rect x="18" y="7" width="12" height="6" rx="2" fill="var(--color-main)" opacity="0.8" />
      <rect x="18" y="6" width="12" height="6" rx="2" fill="var(--icon-3d-surface)" stroke="var(--color-border-strong)" strokeWidth="0.8" />
      <circle cx="24" cy="9" r="1.5" fill="var(--icon-3d-accent)" />

      {/* 체크리스트 항목 1 */}
      <circle cx="17" cy="18" r="2.5" fill="var(--icon-3d-green)" />
      <path d="M16 18L16.8 19L18.2 17" stroke="var(--icon-3d-surface)" strokeWidth="1" strokeLinecap="round" />
      <rect x="22" y="16.5" width="11" height="3" rx="1.5" fill="var(--color-muted)" opacity="0.4" />

      {/* 체크리스트 항목 2 */}
      <circle cx="17" cy="24" r="2.5" fill="var(--icon-3d-green)" />
      <path d="M16 24L16.8 25L18.2 23" stroke="var(--icon-3d-surface)" strokeWidth="1" strokeLinecap="round" />
      <rect x="22" y="22.5" width="11" height="3" rx="1.5" fill="var(--color-muted)" opacity="0.4" />

      {/* 체크리스트 항목 3 */}
      <circle cx="17" cy="30" r="2.5" fill="var(--icon-3d-accent)" />
      <path d="M16 30L16.8 31L18.2 29" stroke="var(--icon-3d-surface)" strokeWidth="1" strokeLinecap="round" />
      <rect x="22" y="28.5" width="8" height="3" rx="1.5" fill="var(--color-muted)" opacity="0.4" />
    </svg>
  );
}

// 항목 이름에 따른 3D 아이콘 매핑 함수
export function Spec3DIcon({ item, size = 44 }: { item: string; size?: number }) {
  switch (item) {
    case '전체 여정':
      return <Journey3DIcon size={size} />;
    case '프리 세션':
    case '시작 세션':
      return <Hourglass3DIcon size={size} />;
    case '본 세션':
      return <Chat3DIcon size={size} />;
    case '회기 간격':
      return <Calendar3DIcon size={size} />;
    case 'Between Session':
      return <Between3DIcon size={size} />;
    case 'Follow-up':
      return <Followup3DIcon size={size} />;
    case '운영 형식':
      return <Coaching1on1Icon size={size} />;
    case '기록':
      return <Checklist3DIcon size={size} />;
    default:
      return <Journey3DIcon size={size} />;
  }
}
