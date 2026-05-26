import { useParams, useNavigate } from 'react-router';
import { useForm, Controller } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import {
  Bold, Italic, List, ListOrdered, Minus, RotateCcw, RotateCw,
  Pin, ChevronRight,
} from 'lucide-react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { useNotices } from '../context/useNotices';

// ── 유효성 스키마 ──────────────────────────────────────────────
const schema = z.object({
  title: z
    .string()
    .min(1, '제목을 입력해주세요.')
    .min(2, '제목은 2자 이상 입력해주세요.')
    .max(200, '제목은 200자 이하로 입력해주세요.'),
  content: z.string().min(1, '내용을 입력해주세요.'),
  is_pinned: z.boolean(),
});

// ── 툴바 버튼 ─────────────────────────────────────────────────
function ToolbarButton({ onClick, active, disabled, title, children }) {
  return (
    <button
      type="button"
      title={title}
      onClick={onClick}
      disabled={disabled}
      className={`w-[30px] h-[30px] flex items-center justify-center rounded-[4px] transition-colors
        ${active
          ? 'bg-[#303336] text-white'
          : 'text-[#6a7282] hover:bg-[#f4f6f9] hover:text-[#303336]'
        }
        disabled:opacity-30 disabled:cursor-not-allowed`}
    >
      {children}
    </button>
  );
}

// ── 에디터 툴바 ───────────────────────────────────────────────
function EditorToolbar({ editor }) {
  if (!editor) return null;
  return (
    <div className="flex items-center gap-[2px] px-[12px] py-[8px] border-b border-[#e5e7eb] bg-[#f9fafb] flex-wrap">
      <ToolbarButton title="굵게 (Ctrl+B)" onClick={() => editor.chain().focus().toggleBold().run()} active={editor.isActive('bold')}>
        <Bold className="w-[14px] h-[14px]" />
      </ToolbarButton>
      <ToolbarButton title="기울임 (Ctrl+I)" onClick={() => editor.chain().focus().toggleItalic().run()} active={editor.isActive('italic')}>
        <Italic className="w-[14px] h-[14px]" />
      </ToolbarButton>

      <div className="w-px h-[18px] bg-[#e5e7eb] mx-[4px]" />

      <ToolbarButton title="제목 1" onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()} active={editor.isActive('heading', { level: 1 })}>
        <span className="text-[11px] font-bold">H1</span>
      </ToolbarButton>
      <ToolbarButton title="제목 2" onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()} active={editor.isActive('heading', { level: 2 })}>
        <span className="text-[11px] font-bold">H2</span>
      </ToolbarButton>
      <ToolbarButton title="제목 3" onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()} active={editor.isActive('heading', { level: 3 })}>
        <span className="text-[11px] font-bold">H3</span>
      </ToolbarButton>

      <div className="w-px h-[18px] bg-[#e5e7eb] mx-[4px]" />

      <ToolbarButton title="글머리 기호" onClick={() => editor.chain().focus().toggleBulletList().run()} active={editor.isActive('bulletList')}>
        <List className="w-[14px] h-[14px]" />
      </ToolbarButton>
      <ToolbarButton title="번호 목록" onClick={() => editor.chain().focus().toggleOrderedList().run()} active={editor.isActive('orderedList')}>
        <ListOrdered className="w-[14px] h-[14px]" />
      </ToolbarButton>

      <div className="w-px h-[18px] bg-[#e5e7eb] mx-[4px]" />

      <ToolbarButton title="인용구" onClick={() => editor.chain().focus().toggleBlockquote().run()} active={editor.isActive('blockquote')}>
        <span className="text-[14px] font-bold leading-none">&ldquo;</span>
      </ToolbarButton>
      <ToolbarButton title="구분선" onClick={() => editor.chain().focus().setHorizontalRule().run()}>
        <Minus className="w-[14px] h-[14px]" />
      </ToolbarButton>

      <div className="w-px h-[18px] bg-[#e5e7eb] mx-[4px]" />

      <ToolbarButton title="실행 취소 (Ctrl+Z)" onClick={() => editor.chain().focus().undo().run()} disabled={!editor.can().undo()}>
        <RotateCcw className="w-[13px] h-[13px]" />
      </ToolbarButton>
      <ToolbarButton title="다시 실행 (Ctrl+Y)" onClick={() => editor.chain().focus().redo().run()} disabled={!editor.can().redo()}>
        <RotateCw className="w-[13px] h-[13px]" />
      </ToolbarButton>
    </div>
  );
}

// ── 메인 컴포넌트 ─────────────────────────────────────────────
export default function NoticeWrite() {
  const { id } = useParams();
  const isEdit = !!id;
  const navigate = useNavigate();
  const { notices, loading, addNotice, updateNotice } = useNotices();

  const notice = isEdit ? notices.find((n) => n.id === Number(id)) : null;

  const { handleSubmit, control, setValue, formState: { errors, isSubmitting } } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      title: notice?.title ?? '',
      content: notice?.content ?? '',
      is_pinned: notice?.isImportant ?? false,
    },
  });

  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: '내용을 입력해주세요.' }),
    ],
    content: notice?.content ?? '',
    editorProps: {
      attributes: {
        class: 'prose max-w-none outline-none min-h-[320px] px-[28px] xl:px-[40px] py-[28px] text-[16px] text-[#303336] leading-[1.9]',
      },
    },
    onUpdate({ editor }) {
      const text = editor.getText().trim();
      setValue('content', text ? editor.getHTML() : '', { shouldValidate: true });
    },
  });

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

  if (isEdit && !notice) {
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

  const onSubmit = async (data) => {
    if (isEdit) {
      await updateNotice(Number(id), data);
    } else {
      await addNotice(data);
    }
    navigate('/support/notice');
  };

  const handleCancel = () =>
    isEdit ? navigate(`/support/notice/${id}`) : navigate('/support/notice');

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">

        {/* 브레드크럼 */}
        <nav className="flex items-center gap-[6px] text-[13px] text-[#9ca3af] mb-[40px]">
          <span
            className="cursor-pointer hover:text-[#101828] transition-colors"
            onClick={() => navigate('/support/notice')}
          >
            공지사항
          </span>
          <ChevronRight className="w-3.5 h-3.5" />
          {isEdit && (
            <>
              <span
                className="cursor-pointer hover:text-[#101828] transition-colors max-w-[200px] truncate"
                onClick={() => navigate(`/support/notice/${id}`)}
              >
                {notice.title}
              </span>
              <ChevronRight className="w-3.5 h-3.5" />
            </>
          )}
          <span className="text-[#101828]">{isEdit ? '수정' : '글쓰기'}</span>
        </nav>

        {/* 페이지 제목 */}
        <h1 className="font-bold text-[#303336] text-[28px] sm:text-[32px] leading-[1.3] tracking-[-0.5px] mb-[32px]">
          {isEdit ? '공지사항 수정' : '공지사항 작성'}
        </h1>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>

          {/* 제목 */}
          <div className="mb-[20px]">
            <label className="block text-[13px] font-semibold text-[#364153] mb-[8px]">
              제목 <span className="text-[#ef4444]">*</span>
            </label>
            <Controller
              name="title"
              control={control}
              render={({ field }) => (
                <input
                  type="text"
                  placeholder="제목을 입력해주세요."
                  {...field}
                  className={`w-full h-[48px] px-[16px] border rounded-[4px] text-[15px] text-[#101828] placeholder:text-[#9ca3af]
                    focus:outline-none transition-colors
                    ${errors.title
                      ? 'border-[#ef4444] bg-[#fff8f8] focus:border-[#ef4444]'
                      : 'border-[#d1d5dc] bg-white focus:border-[#155dfc]'
                    }`}
                />
              )}
            />
            {errors.title && (
              <p className="mt-[6px] text-[12px] text-[#ef4444]">{errors.title.message}</p>
            )}
          </div>

          {/* 내용 (TipTap) */}
          <div className="mb-[20px]">
            <label className="block text-[13px] font-semibold text-[#364153] mb-[8px]">
              내용 <span className="text-[#ef4444]">*</span>
            </label>
            <Controller
              name="content"
              control={control}
              render={() => (
                <div
                  className={`border rounded-[4px] overflow-hidden transition-colors
                    ${errors.content ? 'border-[#ef4444]' : 'border-[#d1d5dc] focus-within:border-[#155dfc]'}`}
                >
                  <EditorToolbar editor={editor} />
                  <EditorContent editor={editor} />
                </div>
              )}
            />
            {errors.content && (
              <p className="mt-[6px] text-[12px] text-[#ef4444]">{errors.content.message}</p>
            )}
          </div>

          {/* 고정 여부 */}
          <div className="mb-[32px]">
            <Controller
              name="is_pinned"
              control={control}
              render={({ field }) => (
                <label className="flex items-center gap-[10px] cursor-pointer w-fit">
                  <button
                    type="button"
                    role="checkbox"
                    aria-checked={field.value}
                    onClick={() => field.onChange(!field.value)}
                    className={`w-[20px] h-[20px] rounded-[4px] border-2 flex items-center justify-center transition-colors shrink-0
                      ${field.value
                        ? 'bg-[#155dfc] border-[#155dfc]'
                        : 'bg-white border-[#d1d5dc] hover:border-[#9ca3af]'
                      }`}
                  >
                    {field.value && (
                      <svg className="w-[11px] h-[11px] text-white" fill="none" viewBox="0 0 12 12">
                        <path d="M2 6l3 3 5-5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </button>
                  <span className="flex items-center gap-[6px] text-[14px] font-medium text-[#364153]">
                    <Pin className="w-[14px] h-[14px] text-[#6a7282]" />
                    공지 상단 고정
                  </span>
                </label>
              )}
            />
            <p className="mt-[6px] ml-[30px] text-[12px] text-[#9ca3af]">
              체크 시 공지사항 목록 상단에 고정됩니다.
            </p>
          </div>

          {/* 버튼 */}
          <div className="flex items-center justify-end gap-[8px] pt-[20px] border-t border-[#e5e7eb]">
            <button
              type="button"
              onClick={handleCancel}
              className="h-[44px] px-[24px] bg-[#f4f6f9] border border-[#d1d5dc] rounded-[4px] font-medium text-[14px] text-[#364153] hover:bg-[#e8eaed] transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="h-[44px] px-[32px] bg-[#155dfc] rounded-[4px] font-semibold text-[14px] text-white hover:bg-[#1147c8] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {isSubmitting ? '저장 중...' : isEdit ? '수정 완료' : '등록'}
            </button>
          </div>

        </form>
      </div>

      <Footer />
    </div>
  );
}
