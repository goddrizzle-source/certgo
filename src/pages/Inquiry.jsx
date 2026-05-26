import { useState } from 'react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';

const inputCls = "w-full h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] text-[14px] text-[#101828] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:border-[#155dfc] focus:bg-white transition-colors";
const labelCls = "block font-semibold text-[#101828] text-[14px] leading-[20px] mb-[8px]";
const sectionTitleCls = "font-bold text-[#101828] text-[18px] leading-[28px] mb-[20px] pb-[12px] border-b border-[#e5e7eb]";

export default function Inquiry() {
  const [form, setForm] = useState({
    type: '', name: '', company: '', email: '', phone: '', subject: '', message: '', agreed: false,
  });
  const [fileName, setFileName] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const set = (k) => (e) => setForm(f => ({ ...f, [k]: e.target.type === 'checkbox' ? e.target.checked : e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ── 본문 ── */}
      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">
        <h1 className="font-bold text-[#303336] text-[36px] sm:text-[44px] xl:text-[52px] leading-[1.3] tracking-[-1px] mb-[12px]">
          1:1 문의
        </h1>
        <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5] mb-[48px]">
          궁금하신 사항을 남겨주시면 영업일 기준 24시간 이내에 답변드리겠습니다.
        </p>
        <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[32px] xl:p-[48px]">

          {submitted ? (
            /* ── 완료 메시지 ── */
            <div className="bg-[#f0f9ff] border border-[#bae6fd] rounded-[12px] p-[40px] text-center">
              <div className="w-[56px] h-[56px] bg-[#155dfc] rounded-full flex items-center justify-center mx-auto mb-[16px]">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M5 13l4 4L19 7" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <p className="font-bold text-[#101828] text-[20px] mb-[8px]">문의가 접수되었습니다</p>
              <p className="text-[#6a7282] text-[15px] leading-[1.6]">
                영업일 기준 24시간 이내에 입력하신 이메일로 답변드리겠습니다.<br />
                긴급 문의는 고객센터 <span className="font-semibold text-[#101828]">02-514-7786</span>으로 연락 주세요.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="flex flex-col gap-[40px]">

              {/* ── 문의 유형 ── */}
              <div>
                <p className={sectionTitleCls}>문의 유형</p>
                <div>
                  <label className={labelCls}>
                    문의 유형 <span className="text-[#ef4444]">*</span>
                  </label>
                  <select
                    required
                    value={form.type}
                    onChange={set('type')}
                    className={`${inputCls} appearance-none cursor-pointer`}
                  >
                    <option value="">선택하세요</option>
                    <option>인증서 발급 문의</option>
                    <option>인증서 갱신 문의</option>
                    <option>인증서 재발급 문의</option>
                    <option>인증서 설치 지원</option>
                    <option>기술 지원</option>
                    <option>CSR 생성 문의</option>
                    <option>코드사인 인증서 문의</option>
                    <option>결제 문의</option>
                    <option>환불 문의</option>
                    <option>견적 요청</option>
                    <option>제휴/파트너십 문의</option>
                    <option>기타 문의</option>
                  </select>
                </div>
              </div>

              {/* ── 기본 정보 ── */}
              <div>
                <p className={sectionTitleCls}>기본 정보</p>
                <div className="flex flex-col gap-[16px]">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label className={labelCls}>
                        이름 <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="text" required
                        value={form.name} onChange={set('name')}
                        placeholder="이름을 입력하세요"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>회사명</label>
                      <input
                        type="text"
                        value={form.company} onChange={set('company')}
                        placeholder="회사명을 입력하세요 (선택)"
                        className={inputCls}
                      />
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                    <div>
                      <label className={labelCls}>
                        이메일 <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="email" required
                        value={form.email} onChange={set('email')}
                        placeholder="email@example.com"
                        className={inputCls}
                      />
                    </div>
                    <div>
                      <label className={labelCls}>
                        연락처 <span className="text-[#ef4444]">*</span>
                      </label>
                      <input
                        type="tel" required
                        value={form.phone} onChange={set('phone')}
                        placeholder="010-0000-0000"
                        className={inputCls}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* ── 문의 내용 ── */}
              <div>
                <p className={sectionTitleCls}>문의 내용</p>
                <div className="flex flex-col gap-[16px]">
                  <div>
                    <label className={labelCls}>
                      제목 <span className="text-[#ef4444]">*</span>
                    </label>
                    <input
                      type="text" required
                      value={form.subject} onChange={set('subject')}
                      placeholder="문의 제목을 입력하세요"
                      className={inputCls}
                    />
                  </div>
                  <div>
                    <label className={labelCls}>
                      상세 내용 <span className="text-[#ef4444]">*</span>
                    </label>
                    <textarea
                      required rows={8}
                      value={form.message} onChange={set('message')}
                      placeholder="문의 내용을 자세히 입력해주세요"
                      className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] py-[12px] text-[14px] text-[#101828] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:border-[#155dfc] focus:bg-white transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className={labelCls}>파일 첨부</label>
                    <label className="flex items-center gap-[12px] h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] cursor-pointer hover:border-[#155dfc] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M13.5 10v1.5A2 2 0 0111.5 13.5h-7A2 2 0 012.5 11.5V10M8 2.5v7M5 5.5l3-3 3 3" stroke="#6a7282" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                      <span className="text-[14px] text-[#6a7282] truncate">
                        {fileName || '파일을 선택하세요'}
                      </span>
                      <input
                        type="file"
                        accept=".jpg,.jpeg,.png,.pdf"
                        className="hidden"
                        onChange={e => setFileName(e.target.files?.[0]?.name || '')}
                      />
                    </label>
                    <p className="text-[12px] text-[#9ca3af] mt-[6px]">최대 10MB · jpg, png, pdf만 가능합니다</p>
                  </div>
                </div>
              </div>

              {/* ── 개인정보 수집 동의 ── */}
              <div className="bg-[#eff6ff] border border-[#bedbff] rounded-[4px] p-[20px] xl:p-[24px]">
                <label className="flex items-start gap-[12px] cursor-pointer">
                  <div
                    onClick={() => setForm(f => ({ ...f, agreed: !f.agreed }))}
                    className={`shrink-0 w-[18px] h-[18px] mt-[1px] border-2 rounded-[3px] flex items-center justify-center transition-colors ${
                      form.agreed ? 'bg-[#155dfc] border-[#155dfc]' : 'bg-white border-[#d1d5dc]'
                    }`}
                  >
                    {form.agreed && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className="font-semibold text-[#101828] text-[14px] leading-[20px]">
                      개인정보 수집 및 이용에 동의합니다 <span className="text-[#ef4444]">*</span>
                    </p>
                    <p className="text-[13px] text-[#6a7282] leading-[1.6] mt-[6px]">
                      문의 답변을 위해 이름, 이메일, 연락처가 수집되며, 답변 완료 후 30일 이내에 파기됩니다.
                    </p>
                  </div>
                </label>
              </div>

              {/* ── 버튼 ── */}
              <div className="flex gap-[8px]">
                <button
                  type="button"
                  className="flex-1 h-[50px] bg-white border border-[#d1d5dc] rounded-[4px] font-medium text-[16px] text-[#364153] hover:bg-[#f4f6f9] transition-colors"
                >
                  취소
                </button>
                <button
                  type="submit"
                  disabled={!form.agreed}
                  className="flex-1 h-[50px] bg-[#155dfc] rounded-[4px] font-semibold text-[16px] text-white hover:bg-[#1251e0] transition-colors shadow-[0px_10px_7.5px_rgba(21,93,252,0.3),_0px_4px_3px_rgba(21,93,252,0.3)] disabled:opacity-40 disabled:cursor-not-allowed disabled:shadow-none"
                >
                  문의하기
                </button>
              </div>

              {/* ── 안내 ── */}
              <div className="text-center pt-[8px] pb-[8px]">
                <p className="text-[13px] text-[#9ca3af]">영업일 기준 24시간 이내 답변 드립니다</p>
                <p className="text-[13px] text-[#9ca3af] mt-[2px]">
                  긴급 문의는 고객센터 <span className="font-semibold text-[#566376]">02-514-7786</span>으로 연락 주세요
                </p>
              </div>

            </form>
          )}
        </div>
      </main>

      <Footer />

    </div>
  );
}
