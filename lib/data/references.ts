// 드라이브 '참조자료' 폴더 파일 → 참조 자료실 목록 (API-003, FN-009). 순수 함수
import type { DriveFile } from '@/lib/google/sheets';
import { parseDate } from '@/lib/data/programs';

export type ReferenceFile = { id: string; name: string; kind: string; modifiedDate: string; url: string };

// 형식 표시 — 구글 문서 형식과 자주 쓰는 파일 형식만 이름을 붙이고 나머지는 "파일"
const KIND_BY_MIME: Record<string, string> = {
  'application/vnd.google-apps.document': '구글 문서',
  'application/vnd.google-apps.spreadsheet': '구글 시트',
  'application/vnd.google-apps.presentation': '구글 슬라이드',
  'application/vnd.google-apps.form': '구글폼',
  'application/pdf': 'PDF',
  'application/msword': 'Word',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'Word',
  'application/vnd.ms-excel': 'Excel',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'Excel',
  'application/vnd.ms-powerpoint': 'PPT',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'PPT',
  'text/plain': '텍스트',
  'text/html': 'HTML',
};

export const DEFAULT_REFERENCES_FOLDER_ID = '1YfRW1ytkDiQ5KEC_E_vRi6PmedEyfQd2';
export const DEFAULT_REFERENCES_FOLDER_URL = 'https://drive.google.com/drive/folders/1YfRW1ytkDiQ5KEC_E_vRi6PmedEyfQd2?usp=sharing';

// 구글 드라이브 지정 폴더(1YfRW1ytkDiQ5KEC_E_vRi6PmedEyfQd2) 실제 보유 자료 스냅샷
export const FALLBACK_REFERENCES: ReferenceFile[] = [
  {
    id: '1mt1wbYX97SduRK42zdD8I-jnHWFH1FGC',
    name: 'KCA코칭역량모델_해설집_V10.pdf',
    kind: 'PDF',
    modifiedDate: '2026-07-25',
    url: 'https://drive.google.com/file/d/1mt1wbYX97SduRK42zdD8I-jnHWFH1FGC/view?usp=sharing',
  },
  {
    id: '1TbAeU0cS6Q9SQpjfY7zigaXjAFMxSvbB',
    name: 'KPC_스크립트_v1.0_261101.xlsx',
    kind: 'Excel',
    modifiedDate: '2026-11-01',
    url: 'https://drive.google.com/file/d/1TbAeU0cS6Q9SQpjfY7zigaXjAFMxSvbB/view?usp=sharing',
  },
  {
    id: '1-Je4CIpZ-t3mPMQ58Q0UCaCN6RiOULR8',
    name: 'KPC_응시서류_점검_v1.0_2026.11.02.html',
    kind: 'HTML',
    modifiedDate: '2026-11-02',
    url: 'https://drive.google.com/file/d/1-Je4CIpZ-t3mPMQ58Q0UCaCN6RiOULR8/view?usp=sharing',
  },
  {
    id: '1QxywAdcaL3y6i9QDhdJlsz1sMJdxmLZa',
    name: 'KAC_응시서류_점검_v1.0_2026.11.02.html',
    kind: 'HTML',
    modifiedDate: '2026-11-02',
    url: 'https://drive.google.com/file/d/1QxywAdcaL3y6i9QDhdJlsz1sMJdxmLZa/view?usp=sharing',
  },
  {
    id: '11AtXtmvhd778_DcquLJLwCkF_BD8ftF-',
    name: 'KCA코칭역량모델_20220520_게시용.pdf',
    kind: 'PDF',
    modifiedDate: '2026-05-20',
    url: 'https://drive.google.com/file/d/11AtXtmvhd778_DcquLJLwCkF_BD8ftF-/view?usp=sharing',
  },
  {
    id: '17ulHEZ_rXnoqAcPmkRoa98A_3GPEe1E-',
    name: '초록우산-코칭GPS13.pdf',
    kind: 'PDF',
    modifiedDate: '2026-10-15',
    url: 'https://drive.google.com/file/d/17ulHEZ_rXnoqAcPmkRoa98A_3GPEe1E-/view?usp=sharing',
  },
  {
    id: '17qsUppnsD2ooibtjPcqvmBMDUZlS16US',
    name: '서울대_대학원생_커리어코칭_Dream_Milestone_Full_Guide.docx',
    kind: 'Word',
    modifiedDate: '2026-10-20',
    url: 'https://drive.google.com/file/d/17qsUppnsD2ooibtjPcqvmBMDUZlS16US/view?usp=sharing',
  },
];

export function getFallbackReferences(): ReferenceFile[] {
  return [...FALLBACK_REFERENCES];
}

export function fileKind(mimeType: string): string {
  if (KIND_BY_MIME[mimeType]) return KIND_BY_MIME[mimeType];
  if (mimeType.startsWith('image/')) return '이미지';
  if (mimeType.startsWith('video/')) return '동영상';
  if (mimeType.startsWith('audio/')) return '오디오';
  return '파일';
}

export function toReferences(files: DriveFile[]): ReferenceFile[] {
  return files.map((f) => ({ id: f.id, name: f.name, kind: fileKind(f.mimeType), modifiedDate: parseDate(f.modifiedTime), url: f.webViewLink }));
}

// 이름 검색 — 공백·대소문자 무시, 여러 단어는 모두 포함해야 한다
export function searchReferences(files: ReferenceFile[], query: string): ReferenceFile[] {
  const words = query.toLowerCase().split(/\s+/).filter(Boolean);
  return files.filter((f) => words.every((w) => f.name.toLowerCase().includes(w)));
}
