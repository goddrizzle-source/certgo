import { useState } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronRight, Pencil, Trash2, Pin } from 'lucide-react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { useNotices } from '../context/useNotices';

// ── 삭제 확인 다이얼로그 ──────────────────────────────────────
function DeleteDialog({ title, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* 백드롭 */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onCancel}
      />
      {/* 다이얼로그 */}
      <div className="relative bg-white rounded-[8px] shadow-2xl w-full max-w-[420px] mx-[16px] overflow-hidden">
        {/* 헤더 */}
        <div className="px-[28px] pt-[28px] pb-[20px]">
          <div className="flex items-center gap-[12px] mb-[16px]">
            <div className="w-[40px] h-[40px] rounded-full bg-[#fef2f2] flex items-center justify-center shrink-0">
              <Trash2 className="w-[18px] h-[18px] text-[#ef4444]" />
            </div>
            <h2 className="font-bold text-[#101828] text-[18px]">공지사항 삭제</h2>
          </div>
          <p className="text-[14px] text-[#6a7282] leading-[1.6] mb-[12px]">
            아래 공지사항을 삭제하시겠습니까?<br />
            삭제된 데이터는 복구할 수 없습니다.
          </p>
          <div className="bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[14px] py-[10px]">
            <p className="text-[14px] font-medium text-[#303336] line-clamp-2">{title}</p>
          </div>
        </div>
        {/* 버튼 */}
        <div className="flex gap-[8px] px-[28px] pb-[28px]">
          <button
            onClick={onCancel}
            className="flex-1 h-[44px] bg-[#f4f6f9] border border-[#d1d5dc] rounded-[4px] font-medium text-[14px] text-[#364153] hover:bg-[#e8eaed] transition-colors"
          >
            취소
          </button>
          <button
            onClick={onConfirm}
            className="flex-1 h-[44px] bg-[#ef4444] rounded-[4px] font-semibold text-[14px] text-white hover:bg-[#dc2626] transition-colors"
          >
            삭제
          </button>
        </div>
      </div>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function NoticeDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { notices, loading, deleteNotice } = useNotices();
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const notice = notices.find((n) => n.id === Number(id));
  const sorted = [...notices].sort((a, b) => {
    if (a.isImportant !== b.isImportant) return a.isImportant ? -1 : 1;
    return b.number - a.number;
  });
  const idx = sorted.findIndex((n) => n.id === Number(id));
  const prev = sorted[idx + 1] ?? null;
  const next = sorted[idx - 1] ?? null;

  if (loading) {
    return (
      <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#9ca3af] text-[15px]">불러오는 중...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (!notice) {
    return (
      <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
        <NavBar />
        <div className="flex-1 flex items-center justify-center">
          <p className="text-[#6a7282] text-[16px]">공지사항을 찾을 수 없습니다.</p>
        </div>
        <Footer />
      </div>
    );
  }

  const handleDelete = async () => {
    await deleteNotice(Number(id));
    navigate('/support/notice');
  };

  // TipTap HTML 콘텐츠 vs 기존 plain-text 구분
  const isHtmlContent = notice.content?.trimStart().startsWith('<');

  const CategoryBadge = () => (
    <span className={`inline-block px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold ${
      notice.category === '보안공지'
        ? 'bg-[#fef2f2] text-[#ef4444]'
        : notice.isImportant ? 'bg-[#eff6ff] text-[#155dfc]' : 'bg-[#f4f6f9] text-[#6a7282]'
    }`}>
      {notice.category}
    </span>
  );

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">

        {/* 브레드크럼 */}
        <nav className="flex items-center gap-[6px] text-[15px] text-[#9ca3af] mb-[40px]">
          <span
            className="cursor-pointer hover:text-[#101828] transition-colors"
            onClick={() => navigate('/support/notice')}
          >
            공지사항
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          <span className="text-[#101828]">{notice.category}</span>
        </nav>

        {/* 본문 카드 */}
        <div className="border-y border-[#e5e7eb] overflow-hidden mb-[24px]">

          {/* 헤더 */}
          <div className="px-[28px] xl:px-[40px] py-[28px] xl:py-[32px] border-b border-[#e5e7eb] bg-[#f9fafb]">
            <div className="flex items-start justify-between gap-[16px]">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-[8px] mb-[12px]">
                  <CategoryBadge />
                  {notice.isImportant && (
                    <span className="inline-flex items-center gap-[4px] px-[10px] py-[4px] rounded-[4px] text-[12px] font-semibold bg-[#fff8e1] text-[#d97706]">
                      <Pin className="w-[10px] h-[10px]" />
                      고정
                    </span>
                  )}
                </div>
                <h1 className="font-bold text-[#101828] text-[20px] xl:text-[24px] leading-[1.4] mb-[12px]">
                  {notice.title}
                </h1>
                <p className="text-[15px] text-[#9ca3af]">등록일: {notice.date}</p>
              </div>

            </div>
          </div>

          {/* 본문 */}
          <div className="px-[28px] xl:px-[40px] py-[32px] xl:py-[40px]">
            {isHtmlContent ? (
              <div
                className="notice-content text-[16px] text-[#4a5565] leading-[1.9]"
                dangerouslySetInnerHTML={{ __html: notice.content }}
              />
            ) : (
              <p className="text-[16px] text-[#4a5565] leading-[1.9] whitespace-pre-line">
                {notice.content}
              </p>
            )}
          </div>
        </div>

        {/* 이전 / 다음 */}
        <div className="mb-[32px] divide-y divide-[#e5e7eb]">
          {next && (
            <div
              className="flex items-center gap-[16px] py-[14px] cursor-pointer hover:bg-[#f9fafb] transition-colors"
              onClick={() => navigate(`/support/notice/${next.id}`)}
            >
              <span className="shrink-0 text-[12px] font-semibold text-[#9ca3af] w-[32px]">다음</span>
              <p className="text-[14px] text-[#303336] truncate">{next.title}</p>
              <span className="shrink-0 text-[12px] text-[#9ca3af] ml-auto">{next.date}</span>
            </div>
          )}
          {prev && (
            <div
              className="flex items-center gap-[16px] py-[14px] cursor-pointer hover:bg-[#f9fafb] transition-colors"
              onClick={() => navigate(`/support/notice/${prev.id}`)}
            >
              <span className="shrink-0 text-[12px] font-semibold text-[#9ca3af] w-[32px]">이전</span>
              <p className="text-[14px] text-[#303336] truncate">{prev.title}</p>
              <span className="shrink-0 text-[12px] text-[#9ca3af] ml-auto">{prev.date}</span>
            </div>
          )}
        </div>

        {/* 하단 버튼 */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-[6px]">
            <button
              onClick={() => navigate(`/support/notice/${id}/edit`)}
              className="flex items-center gap-[6px] h-[44px] px-[16px] bg-white border border-[#d1d5dc] rounded-[4px] text-[14px] font-medium text-[#364153] hover:bg-[#f4f6f9] transition-colors"
            >
              <Pencil className="w-[14px] h-[14px]" />
              수정
            </button>
            <button
              onClick={() => setShowDeleteDialog(true)}
              className="flex items-center gap-[6px] h-[44px] px-[16px] bg-white border border-[#fca5a5] rounded-[4px] text-[14px] font-medium text-[#ef4444] hover:bg-[#fef2f2] transition-colors"
            >
              <Trash2 className="w-[14px] h-[14px]" />
              삭제
            </button>
          </div>
          <button
            onClick={() => navigate('/support/notice')}
            className="h-[44px] px-[32px] bg-[#f4f6f9] border border-[#d1d5dc] rounded-[4px] font-medium text-[14px] text-[#364153] hover:bg-[#e8eaed] transition-colors"
          >
            목록으로
          </button>
        </div>

      </div>

      <Footer />

      {/* 삭제 확인 다이얼로그 */}
      {showDeleteDialog && (
        <DeleteDialog
          title={notice.title}
          onConfirm={handleDelete}
          onCancel={() => setShowDeleteDialog(false)}
        />
      )}
    </div>
  );
}
