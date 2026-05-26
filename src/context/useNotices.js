import { useContext } from 'react';
import { NoticesContext } from './NoticesContext';

export function useNotices() {
  const ctx = useContext(NoticesContext);
  if (!ctx) throw new Error('useNotices must be used within NoticesProvider');
  return ctx;
}
