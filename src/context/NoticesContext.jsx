import { createContext, useState, useEffect } from 'react';
import { noticeService } from '../services/noticeService';

export const NoticesContext = createContext(null);

export function NoticesProvider({ children }) {
  const [notices, setNotices] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    noticeService.getAll().then((data) => {
      setNotices(data);
      setLoading(false);
    });
  }, []);

  async function addNotice(payload) {
    const entry = await noticeService.create(payload);
    setNotices((prev) => [entry, ...prev]);
    return entry;
  }

  async function updateNotice(id, payload) {
    const updated = await noticeService.update(id, payload);
    setNotices((prev) => prev.map((n) => (n.id === id ? updated : n)));
    return updated;
  }

  async function deleteNotice(id) {
    await noticeService.remove(id);
    setNotices((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <NoticesContext.Provider value={{ notices, loading, addNotice, updateNotice, deleteNotice }}>
      {children}
    </NoticesContext.Provider>
  );
}
