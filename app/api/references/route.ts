// API-003 GET /api/references — 드라이브 '참조자료' 폴더 파일 목록 (읽기 전용, 파일 내용은 읽지 않음)
import { connection } from 'next/server';
import {
  DEFAULT_REFERENCES_FOLDER_ID,
  getFallbackReferences,
  toReferences,
  type ReferenceFile,
} from '@/lib/data/references';
import { listFolder } from '@/lib/google/sheets';

const CACHE_MS = 300_000;

// RULE-006: 메모리 캐시(최대 5분)만. 파일을 올리면 5분 안에 보인다 (NFR-005)
let cache: { files: ReferenceFile[]; fetchedAt: string; storedAt: number } | null = null;

export async function GET() {
  await connection();
  if (cache && Date.now() - cache.storedAt < CACHE_MS) return Response.json({ files: cache.files, fetchedAt: cache.fetchedAt });

  const folderId = process.env.DRIVE_REFERENCES_FOLDER_ID || DEFAULT_REFERENCES_FOLDER_ID;
  try {
    const rawFiles = await listFolder(folderId);
    if (rawFiles.length > 0) {
      cache = { files: toReferences(rawFiles), fetchedAt: new Date().toISOString(), storedAt: Date.now() };
      return Response.json({ files: cache.files, fetchedAt: cache.fetchedAt });
    }
    // rawFiles가 비어있다면 fallback 반환
    const fallback = getFallbackReferences();
    cache = { files: fallback, fetchedAt: new Date().toISOString(), storedAt: Date.now() };
    return Response.json({ files: cache.files, fetchedAt: cache.fetchedAt });
  } catch (error) {
    console.warn('[API-003] 드라이브 조회 실패, fallback 자료 제공:', error);
    const fallback = getFallbackReferences();
    return Response.json({ files: fallback, fetchedAt: new Date().toISOString() });
  }
}
