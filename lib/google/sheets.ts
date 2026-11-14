// 구글 시트·드라이브 읽기 전용 조회 — 서비스 계정 JWT로 토큰을 받아 REST API 호출
// 범위는 spreadsheets.readonly, drive.metadata.readonly(파일 목록만)만 요청한다 (06.development-plan.md §6 최소 권한)
// ponytail: googleapis SDK 대신 node:crypto + fetch로 직접 서명. 드라이브 등 API가 늘어나면 SDK 도입 검토
import { createSign } from 'node:crypto';

const TOKEN_URL = 'https://oauth2.googleapis.com/token';
const SCOPE = ['https://www.googleapis.com/auth/spreadsheets.readonly', 'https://www.googleapis.com/auth/drive.metadata.readonly'].join(' ');

type ServiceAccount = { client_email: string; private_key: string };

export class GoogleConfigError extends Error {}

function readServiceAccount(): ServiceAccount {
  const raw = process.env.GOOGLE_SERVICE_ACCOUNT_JSON;
  if (!raw) throw new GoogleConfigError('GOOGLE_SERVICE_ACCOUNT_JSON 미설정');
  try {
    const parsed = JSON.parse(raw) as Partial<ServiceAccount>;
    if (!parsed.client_email || !parsed.private_key) throw new Error();
    return { client_email: parsed.client_email, private_key: parsed.private_key };
  } catch {
    throw new GoogleConfigError('GOOGLE_SERVICE_ACCOUNT_JSON 형식 오류');
  }
}

const base64url = (input: string | Buffer) => Buffer.from(input).toString('base64url');

let token: { value: string; expiresAt: number } | null = null;

async function accessToken(): Promise<string> {
  if (token && token.expiresAt > Date.now() + 60_000) return token.value;
  const account = readServiceAccount();
  const now = Math.floor(Date.now() / 1000);
  const unsigned = `${base64url(JSON.stringify({ alg: 'RS256', typ: 'JWT' }))}.${base64url(
    JSON.stringify({ iss: account.client_email, scope: SCOPE, aud: TOKEN_URL, iat: now, exp: now + 3600 }),
  )}`;
  const signature = createSign('RSA-SHA256').update(unsigned).sign(account.private_key);
  const res = await fetch(TOKEN_URL, {
    method: 'POST',
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({
      grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
      assertion: `${unsigned}.${base64url(signature)}`,
    }),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`토큰 발급 실패 (${res.status})`);
  const body = (await res.json()) as { access_token: string; expires_in: number };
  token = { value: body.access_token, expiresAt: Date.now() + body.expires_in * 1000 };
  return token.value;
}

// 읽기 전용 GET 요청 (토큰 자동 첨부)
export async function googleGet<T>(url: string): Promise<T> {
  const res = await fetch(url, { headers: { authorization: `Bearer ${await accessToken()}` }, cache: 'no-store' });
  if (!res.ok) throw new Error(`구글 API 조회 실패 (${res.status})`);
  return (await res.json()) as T;
}

// 시트 탭 전체를 행 배열로 읽는다. 첫 행이 열 이름
export async function readSheet(spreadsheetId: string, range: string): Promise<string[][]> {
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${encodeURIComponent(spreadsheetId)}/values/${encodeURIComponent(range)}`;
  return (await googleGet<{ values?: string[][] }>(url)).values ?? [];
}

export type DriveFile = { id: string; name: string; mimeType: string; modifiedTime: string; webViewLink: string };

// 공개 공유 폴더(링크가 있는 사용자에게 공개된 구글 드라이브 폴더)에서 파일 목록 추출
export async function listPublicFolder(folderId: string): Promise<DriveFile[]> {
  const url = `https://drive.google.com/drive/folders/${encodeURIComponent(folderId)}?usp=sharing`;
  const res = await fetch(url, {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'ko-KR,ko;q=0.9,en-US;q=0.8,en;q=0.7',
    },
    cache: 'no-store',
  });
  if (!res.ok) throw new Error(`공개 폴더 조회 실패 (${res.status})`);
  const html = await res.text();

  const files: DriveFile[] = [];
  const seen = new Set<string>();

  // 패턴 1: [[null,"ID"] ... "MIME" ... [[["FILENAME",null,1]]]
  const pattern = /\[\[null,"([a-zA-Z0-9_-]{25,})"\](?:,[^,[\]]*){3,4},"([a-zA-Z0-9_./-]+)"[^]*?\[\[\["([^"]+)",null,1\]\]\]/g;
  let m: RegExpExecArray | null;
  while ((m = pattern.exec(html)) !== null) {
    const [, id, mimeType, name] = m;
    if (!seen.has(id)) {
      seen.add(id);
      files.push({
        id,
        name,
        mimeType,
        modifiedTime: new Date().toISOString(),
        webViewLink: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
      });
    }
  }

  // 패턴 2: aria-label 및 ssk 패턴 (보조 추출)
  if (files.length === 0) {
    const ariaRegex = /aria-label="([^"]+?)(?:\s+(?:Microsoft [A-Za-z]+|PDF|HTML|Text|Shared))*\s+Shared"[^>]*?ssk='[^']*?:([a-zA-Z0-9_-]{25,})-/g;
    while ((m = ariaRegex.exec(html)) !== null) {
      const [, name, rawId] = m;
      const id = rawId.replace(/-\d+$/, '');
      if (!seen.has(id)) {
        seen.add(id);
        const ext = name.split('.').pop()?.toLowerCase();
        const mimeType =
          ext === 'pdf'
            ? 'application/pdf'
            : ext === 'xlsx' || ext === 'xls'
              ? 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
              : ext === 'docx' || ext === 'doc'
                ? 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'
                : ext === 'html'
                  ? 'text/html'
                  : 'application/octet-stream';
        files.push({
          id,
          name,
          mimeType,
          modifiedTime: new Date().toISOString(),
          webViewLink: `https://drive.google.com/file/d/${id}/view?usp=sharing`,
        });
      }
    }
  }

  return files;
}

// 폴더 바로 아래 파일 목록 (하위 폴더·휴지통 제외). 파일 내용은 읽지 않는다
// 서비스 계정이 있으면 API 호출, 없거나 실패 시 공개 폴더 파싱으로 fallback
export async function listFolder(folderId: string): Promise<DriveFile[]> {
  if (process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
    try {
      const params = new URLSearchParams({
        q: `'${folderId.replace(/'/g, "\\'")}' in parents and trashed = false and mimeType != 'application/vnd.google-apps.folder'`,
        fields: 'files(id,name,mimeType,modifiedTime,webViewLink)',
        orderBy: 'name',
        pageSize: '200',
      });
      const files = (await googleGet<{ files?: DriveFile[] }>(`https://www.googleapis.com/drive/v3/files?${params}`)).files;
      if (files && files.length > 0) return files;
    } catch (e) {
      console.warn('[listFolder] 서비스 계정 조회 실패, 공개 폴더 파싱으로 전환:', e);
    }
  }

  // 서비스 계정 미설정이거나 결과가 비어있는 경우 공개 폴더 조회 시도
  return await listPublicFolder(folderId);
}
