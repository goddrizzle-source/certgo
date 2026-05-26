import { useState } from 'react';
import { Search, Pin, PenLine } from 'lucide-react';
import { useNavigate } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { useNotices } from '../context/useNotices';

const PAGE_SIZE = 10;

const TABS = [
  { id: 'all',      label: '전체 공지' },
  { id: 'security', label: '보안공지' },
  { id: 'service',  label: '서비스 소식' },
  { id: 'event',    label: '이벤트' },
];

export default function Notice() {
  const navigate = useNavigate();
  const { notices, loading } = useNotices();
  const [activeTab, setActiveTab] = useState('all');
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const filtered = notices.filter(n => {
    const matchTab = activeTab === 'all'
      || (activeTab === 'security' && n.category === '보안공지')
      || (activeTab === 'service'  && n.category === '서비스 소식')
      || (activeTab === 'event'    && n.category === '이벤트');
    const q = search.toLowerCase();
    const matchSearch = !q || n.title.toLowerCase().includes(q) || n.content.toLowerCase().includes(q);
    return matchTab && matchSearch;
  }).sort((a, b) => {
    if (a.isImportant !== b.isImportant) return a.isImportant ? -1 : 1;
    return b.number - a.number;
  });

  const totalPages = Math.max(1, Math.ceil(filtered.filter(n => !n.isImportant).length / PAGE_SIZE));
  const important = filtered.filter(n => n.isImportant);
  const regular = filtered.filter(n => !n.isImportant).slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const switchTab = (tab) => { setActiveTab(tab); setSearch(''); setPage(1); };

  const CategoryBadge = ({ category, isImportant }) => (
    <span className={`inline-block px-[10px] py-[3px] rounded-full text-[13px] font-semibold whitespace-nowrap ${
      category === '보안공지'
        ? 'bg-[#fef2f2] text-[#ef4444]'
        : 'bg-[#f1f3f5] text-[#6a7282]'
    }`}>
      {category}
    </span>
  );

  const NoticeRow = ({ notice }) => (
    <tr
      className={`cursor-pointer hover:bg-[#f9fafb] transition-colors border-b border-[#e5e7eb] last:border-b-0 ${notice.isImportant ? 'bg-[#fafbff]' : ''}`}
      onClick={() => navigate(`/support/notice/${notice.id}`)}
    >
      <td className="px-[16px] py-[18px] text-center w-[60px]">
        {notice.isImportant
          ? <Pin className="w-[15px] h-[15px] text-[#155dfc] mx-auto" />
          : <span className="text-[14px] text-[#9ca3af]">{notice.number}</span>
        }
      </td>
      <td className="px-[12px] py-[18px] text-center w-[110px]">
        <CategoryBadge category={notice.category} isImportant={notice.isImportant} />
      </td>
      <td className="px-[12px] py-[18px]">
        <div className="flex items-center gap-[8px]">
          {notice.isImportant && (
            <span className="shrink-0 inline-flex items-center gap-[3px] px-[6px] py-[2px] rounded-[3px] bg-[#eff6ff] text-[#155dfc] text-[13px] font-semibold">
              <Pin className="w-[9px] h-[9px]" />
              고정
            </span>
          )}
          <p className={`text-[15px] leading-[1.5] ${notice.isImportant ? 'font-bold text-[#101828]' : 'font-medium text-[#303336]'}`}>
            {notice.title}
          </p>
        </div>
      </td>
      <td className="px-[16px] py-[18px] text-center w-[110px]">
        <span className="text-[14px] text-[#6a7282] whitespace-nowrap">{notice.date}</span>
      </td>
    </tr>
  );

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">

        {/* 타이틀 */}
        <h1 className="font-bold text-[#303336] text-[36px] sm:text-[44px] xl:text-[52px] leading-[1.3] tracking-[-1px] mb-[12px]">
          공지사항
        </h1>
        <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5] mb-[40px]">
          Certgo의 새로운 소식과 공지사항을 안내드립니다.
        </p>

        {/* 카테고리 탭 */}
        <div className="flex justify-center mb-[36px]">
          <div className="flex items-center gap-[4px] bg-[#f1f3f5] rounded-full px-[10px] py-[10px]">
            {TABS.map(tab => (
              <button
                key={tab.id}
                onClick={() => switchTab(tab.id)}
                className={`h-[45px] px-[22px] rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ${
                  activeTab === tab.id
                    ? 'bg-[#0d1b3e] text-white'
                    : 'text-[#566376] hover:bg-[#0d1b3e] hover:text-white'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* 총 건수 + 검색 + 글쓰기 */}
        <div className="flex items-center justify-between gap-[12px] pb-[16px] border-b-2 border-[#101828]">
          <p className="text-[14px] text-[#566376] shrink-0">
            총 <span className="font-bold text-[#101828]">{filtered.length}</span>건
          </p>
          <div className="flex items-center gap-[8px]">
            <div className="relative w-[220px] sm:w-[280px]">
              <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#9ca3af]" />
              <input
                type="text"
                placeholder="검색어를 입력해 주세요."
                value={search}
                onChange={e => { setSearch(e.target.value); setPage(1); }}
                className="w-full h-[40px] pl-[36px] pr-[12px] bg-white border border-[#d1d5dc] rounded-[4px] text-[14px] text-[#101828] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#155dfc] transition-colors"
              />
            </div>
            <button
              onClick={() => navigate('/support/notice/write')}
              className="shrink-0 flex items-center gap-[6px] h-[40px] px-[14px] bg-[#155dfc] rounded-[4px] text-[14px] font-semibold text-white hover:bg-[#1147c8] transition-colors"
            >
              <PenLine className="w-[13px] h-[13px]" />
              글쓰기
            </button>
          </div>
        </div>

        {/* 테이블 */}
        <table className="w-full">
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={4} className="py-[60px] text-center text-[15px] text-[#9ca3af]">
                  불러오는 중...
                </td>
              </tr>
            ) : filtered.length === 0 ? (
              <tr>
                <td colSpan={4} className="py-[60px] text-center text-[15px] text-[#9ca3af]">
                  검색 결과가 없습니다.
                </td>
              </tr>
            ) : (
              <>
                {important.map(n => <NoticeRow key={n.id} notice={n} />)}
                {regular.map(n => <NoticeRow key={n.id} notice={n} />)}
              </>
            )}
          </tbody>
        </table>

        {/* 페이지네이션 */}
        <div className="flex justify-center items-center gap-[6px] mt-[40px]">
          <button onClick={() => setPage(1)} disabled={page === 1}
            className="w-[42px] h-[42px] flex items-center justify-center rounded-[6px] bg-[#f1f3f5] text-[#1d2c49] hover:bg-[#0d1b3e] hover:text-white disabled:opacity-30 transition-all text-[16px]">«</button>
          <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1}
            className="w-[42px] h-[42px] flex items-center justify-center rounded-[6px] bg-[#f1f3f5] text-[#1d2c49] hover:bg-[#0d1b3e] hover:text-white disabled:opacity-30 transition-all text-[16px]">‹</button>
          {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
            <button key={p} onClick={() => setPage(p)}
              className={`w-[42px] h-[42px] flex items-center justify-center rounded-[6px] text-[15px] font-semibold transition-all ${
                page === p ? 'bg-[#0d1b3e] text-white' : 'bg-[#f1f3f5] text-[#566376] hover:bg-[#0d1b3e] hover:text-white'
              }`}>{p}</button>
          ))}
          <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages}
            className="w-[42px] h-[42px] flex items-center justify-center rounded-[6px] bg-[#f1f3f5] text-[#1d2c49] hover:bg-[#0d1b3e] hover:text-white disabled:opacity-30 transition-all text-[16px]">›</button>
          <button onClick={() => setPage(totalPages)} disabled={page === totalPages}
            className="w-[42px] h-[42px] flex items-center justify-center rounded-[6px] bg-[#f1f3f5] text-[#1d2c49] hover:bg-[#0d1b3e] hover:text-white disabled:opacity-30 transition-all text-[16px]">»</button>
        </div>

      </div>

      <Footer />
    </div>
  );
}
