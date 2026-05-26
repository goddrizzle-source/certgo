/**
 * Notice Service — localStorage adapter
 *
 * Supabase 교체 시:
 *   1. 이 파일만 수정 (각 메서드를 supabase.from('notices').xxx() 호출로 교체)
 *   2. Context·컴포넌트는 변경 없음 (인터페이스 동일)
 *
 * Supabase 예시:
 *   async getAll()        → supabase.from('notices').select('*').order('created_at', { ascending: false })
 *   async create(payload) → supabase.from('notices').insert(payload).select().single()
 *   async update(id, payload) → supabase.from('notices').update(payload).eq('id', id).select().single()
 *   async remove(id)      → supabase.from('notices').delete().eq('id', id)
 */

import { NOTICES } from '../data/notices';

const STORAGE_KEY = 'certgo_notices';

function read() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
}

function write(data) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

/** localStorage가 비어있으면 mock 데이터로 초기화 */
function loadOrSeed() {
  const existing = read();
  if (existing) return existing;
  write(NOTICES);
  return NOTICES;
}

function formatDate(date) {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}.${pad(date.getMonth() + 1)}.${pad(date.getDate())}`;
}

export const noticeService = {
  /** 전체 목록 조회 */
  async getAll() {
    return loadOrSeed();
  },

  /** 공지 등록 */
  async create(payload) {
    const all = loadOrSeed();
    const now = new Date();
    const maxNumber = all.reduce((m, n) => Math.max(m, n.number ?? 0), 0);

    const entry = {
      id: Date.now(),
      number: maxNumber + 1,
      category: '일반공지',
      isImportant: payload.is_pinned,
      is_pinned: payload.is_pinned,
      title: payload.title,
      content: payload.content,
      date: formatDate(now),
      created_at: now.toISOString(),
      updated_at: now.toISOString(),
    };

    write([entry, ...all]);
    return entry;
  },

  /** 공지 수정 */
  async update(id, payload) {
    const all = loadOrSeed();
    const now = new Date();

    const next = all.map((n) =>
      n.id === id
        ? {
            ...n,
            title: payload.title,
            content: payload.content,
            isImportant: payload.is_pinned,
            is_pinned: payload.is_pinned,
            updated_at: now.toISOString(),
          }
        : n
    );

    write(next);
    return next.find((n) => n.id === id);
  },

  /** 공지 삭제 */
  async remove(id) {
    const all = loadOrSeed();
    write(all.filter((n) => n.id !== id));
  },
};
