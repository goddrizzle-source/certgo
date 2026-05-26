import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { LOGO_MAP } from '../data/certs';

const fmt = n => `₩${n.toLocaleString()}`;

/* ── 텍스트 인풋 ── */
function TextInput({ placeholder, value, onChange, className = '' }) {
  return (
    <input
      type="text"
      placeholder={placeholder}
      value={value}
      onChange={e => onChange(e.target.value)}
      className={`w-full h-[50px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] text-[16px] text-[#101828] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:border-[#155dfc] transition-colors ${className}`}
    />
  );
}

/* ── 라벨 ── */
function Label({ text, required, note }) {
  return (
    <p className="font-semibold text-[#101828] text-[16px] leading-[24px]">
      {text}
      {required && <span className="text-[#fb2c36] ml-[2px]">*</span>}
      {note && <span className="font-normal text-[#6a7282] text-[14px] ml-[6px]">{note}</span>}
    </p>
  );
}

/* ── 커스텀 체크박스 ── */
function Checkbox({ checked, onChange, label }) {
  return (
    <label className="flex items-center gap-[8px] cursor-pointer select-none">
      <button
        type="button"
        role="checkbox"
        aria-checked={checked}
        onClick={onChange}
        className={`shrink-0 w-[16px] h-[16px] border flex items-center justify-center transition-colors cursor-pointer rounded-[2px] ${
          checked ? 'bg-[#155dfc] border-[#155dfc]' : 'bg-white border-[#d1d5dc]'
        }`}
      >
        {checked && (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        )}
      </button>
      {label && <span className="font-medium text-[#364153] text-[14px] leading-[20px]">{label}</span>}
    </label>
  );
}

/* ── 라디오 버튼 ── */
function RadioOption({ selected, onSelect, label }) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex items-center gap-[12px] h-[50px] px-[13px] rounded-[4px] border w-full transition-colors ${
        selected ? 'bg-[#eff6ff] border-[#155dfc]' : 'bg-white border-[#e5e7eb]'
      }`}
    >
      <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center shrink-0 ${
        selected ? 'border-[#155dfc]' : 'border-[#d1d5dc]'
      }`}>
        {selected && <div className="w-[7px] h-[7px] rounded-full bg-[#155dfc]" />}
      </div>
      <span className="font-medium text-[#101828] text-[16px] leading-[24px]">{label}</span>
    </button>
  );
}

/* ══════════════════════════════════════════
   메인 컴포넌트
══════════════════════════════════════════ */
export default function Apply() {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [items, setItems] = useState(state?.items ?? []);

  /* 폼 상태 */
  const [dcv, setDcv]           = useState('EMAIL');
  const [payMethod, setPayMethod] = useState('card');
  const [autoGenCsr, setAutoGenCsr]   = useState(false);
  const [cashReceipt, setCashReceipt] = useState(false);
  const [form, setForm] = useState({
    company: '', server: '', csr: '', domain: '',
    name: '', position: '', email: '', dept: '', phone: '', mobile: '', fax: '',
  });

  const update = (key, val) => setForm(f => ({ ...f, [key]: val }));
  const removeItem = id => setItems(prev => prev.filter(i => i.id !== id));

  const subtotal = items.reduce((s, i) => s + i.price, 0);
  const vat      = Math.round(subtotal * 0.1);
  const total    = subtotal + vat;

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ══ Hero ══ */}
      <section className="py-[60px] xl:pt-[120px] xl:pb-[100px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col gap-[12px] tracking-[-1px] max-w-[737px]">
            <h1 className="font-bold text-[#303336] text-[36px] sm:text-[44px] xl:text-[52px] leading-[1.3]">
              인증서 신청하기
            </h1>
            <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5]">
              주문하신 인증서의 상세 정보를 입력하고 결제를 진행하세요.
            </p>
          </div>
        </div>
      </section>

      {/* ══ Content ══ */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 pb-[120px]">

        {/* ── 신청 상품 정보 ── */}
        <div className="flex flex-col gap-[16px] mb-[32px]">
          <p className="font-bold text-[#101828] text-[20px] leading-[28px]">신청 상품 정보</p>

          {/* Desktop table */}
          <div className="hidden xl:block border-t border-b border-[#e5e7eb] overflow-hidden">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[#f9fafb] border-b border-[#e5e7eb] h-[49px]">
                  <th className="text-left text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] pl-[24px] w-[168px]">브랜드</th>
                  <th className="text-left text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[200px]">제품명</th>
                  <th className="text-center text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[100px]">DCV</th>
                  <th className="text-left text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[180px]">도메인</th>
                  <th className="text-center text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[100px]">도메인개수</th>
                  <th className="text-center text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[80px]">년수</th>
                  <th className="text-right text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[140px] pr-[24px]">가격</th>
                  <th className="text-center text-[#4a5565] text-[14px] font-semibold uppercase tracking-[0.6px] w-[48px]">삭제</th>
                </tr>
              </thead>
              <tbody>
                {items.map(item => {
                  const logo = LOGO_MAP[item.brand];
                  return (
                    <tr key={item.id} className="border-b border-[#f3f4f6] h-[57px]">
                      <td className="pl-[24px]">
                        {logo
                          ? <img src={logo.src} alt={item.brand} style={{ width: logo.w * 0.8, height: logo.h * 0.8 }} />
                          : <span className="font-medium text-[#101828] text-[14px]">{item.brand}</span>
                        }
                      </td>
                      <td>
                        <span className="font-medium text-[#101828] text-[16px]">{item.name}</span>
                      </td>
                      <td className="text-center">
                        <span className="text-[#4a5565] text-[16px]">HTTP</span>
                      </td>
                      <td>
                        <span className="text-[#101828] text-[16px]">example.com</span>
                      </td>
                      <td className="text-center">
                        <span className="text-[#4a5565] text-[16px]">1</span>
                      </td>
                      <td className="text-center">
                        <span className="text-[#4a5565] text-[16px]">{item.period}년</span>
                      </td>
                      <td className="text-right pr-[24px]">
                        <span className="font-semibold text-[#101828] text-[16px]">{fmt(item.price)}</span>
                      </td>
                      <td className="text-center">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-[#9ca3af] hover:text-[#e53e3e] transition-colors"
                        >
                          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                            <path d="M2 4h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                            <path d="M5 4V2.5h6V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M3.5 4l.9 9h7.2l.9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M6.5 7v4M9.5 7v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {/* Mobile cards */}
          <div className="xl:hidden flex flex-col gap-[10px]">
            {items.map(item => {
              const logo = LOGO_MAP[item.brand];
              return (
                <div key={item.id} className="border border-[#e5e7eb] rounded-[8px] p-[16px] flex items-start justify-between gap-[12px]">
                  <div className="flex flex-col gap-[6px]">
                    {logo
                      ? <img src={logo.src} alt={item.brand} style={{ width: logo.w * 0.65, height: logo.h * 0.65 }} />
                      : <span className="font-medium text-[#101828] text-[13px]">{item.brand}</span>
                    }
                    <p className="font-medium text-[#101828] text-[15px]">{item.name}</p>
                    <p className="text-[#6a7282] text-[13px]">{item.period}년 · HTTP · example.com</p>
                  </div>
                  <div className="flex flex-col items-end gap-[8px]">
                    <span className="font-semibold text-[#101828] text-[16px]">{fmt(item.price)}</span>
                    <button onClick={() => removeItem(item.id)} className="text-[#9ca3af] hover:text-[#e53e3e] transition-colors">
                      <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M2 4h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M5 4V2.5h6V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M3.5 4l.9 9h7.2l.9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* ── 2-column layout ── */}
        <div className="xl:grid xl:grid-cols-12 xl:gap-[40px] xl:items-start flex flex-col gap-[32px]">

          {/* ── Left: forms ── */}
          <div className="xl:col-span-8 flex flex-col gap-[32px]">

            {/* 인증서 정보 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[33px] pt-[33px] pb-[33px] flex flex-col gap-[24px]">
              <div className="border-b border-[#e5e7eb] pb-[13px]">
                <p className="font-bold text-[#101828] text-[20px] leading-[28px]">인증서 정보</p>
              </div>

              {/* 신청회사 */}
              <div className="flex flex-col gap-[8px]">
                <Label text="신청회사" required />
                <TextInput
                  placeholder="회사명을 입력하세요"
                  value={form.company}
                  onChange={v => update('company', v)}
                />
              </div>

              {/* 인증방법 (DCV) */}
              <div className="flex flex-col gap-[12px]">
                <Label text="인증방법 (DCV)" required note="미기재 시 선택 안 함 가능" />
                <div className="grid grid-cols-3 gap-[12px]">
                  {['EMAIL', 'HTTP', 'DNS'].map(method => (
                    <button
                      key={method}
                      type="button"
                      onClick={() => setDcv(method)}
                      className={`h-[50px] rounded-[4px] border font-medium text-[16px] transition-colors ${
                        dcv === method
                          ? 'bg-[#eff6ff] border-[#155dfc] text-[#155dfc]'
                          : 'bg-white border-[#e5e7eb] text-[#364153]'
                      }`}
                    >
                      {method}
                    </button>
                  ))}
                </div>
              </div>

              {/* 서버정보 */}
              <div className="flex flex-col gap-[8px]">
                <Label text="서버정보" required />
                <TextInput
                  placeholder="예: Apache, Nginx, IIS 등"
                  value={form.server}
                  onChange={v => update('server', v)}
                />
              </div>

              {/* CSR */}
              <div className="flex flex-col gap-[8px]">
                <div className="flex items-center justify-between">
                  <Label text="CSR (Certificate Signing Request)" required />
                  <Checkbox
                    checked={autoGenCsr}
                    onChange={() => setAutoGenCsr(v => !v)}
                    label="기본생성 요청"
                  />
                </div>
                <textarea
                  placeholder={`-----BEGIN CERTIFICATE REQUEST-----\nCSR 코드를 붙여넣으세요\n-----END CERTIFICATE REQUEST-----`}
                  value={form.csr}
                  onChange={e => update('csr', e.target.value)}
                  disabled={autoGenCsr}
                  rows={7}
                  className="w-full bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] py-[12px] text-[14px] font-mono text-[#101828] placeholder:text-[rgba(10,10,10,0.4)] focus:outline-none focus:border-[#155dfc] transition-colors resize-none disabled:opacity-50"
                />
              </div>

              {/* 도메인 주소 */}
              <div className="flex flex-col gap-[8px]">
                <Label text="도메인 주소" required />
                <TextInput
                  placeholder="예: example.com"
                  value={form.domain}
                  onChange={v => update('domain', v)}
                />
              </div>
            </div>

            {/* 발급 정보 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[4px] px-[33px] pt-[33px] pb-[33px] flex flex-col gap-[24px]">
              <div className="border-b border-[#e5e7eb] pb-[13px] flex items-center justify-between">
                <p className="font-bold text-[#101828] text-[20px] leading-[28px]">발급 정보</p>
                <Checkbox
                  checked={false}
                  onChange={() => {}}
                  label="회원 정보 불러오기"
                />
              </div>

              {/* 담당자명 + 직급 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <Label text="담당자명" required />
                  <TextInput placeholder="이름" value={form.name} onChange={v => update('name', v)} />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label text="직급" />
                  <TextInput placeholder="직급" value={form.position} onChange={v => update('position', v)} />
                </div>
              </div>

              {/* 이메일 */}
              <div className="flex flex-col gap-[8px]">
                <Label text="이메일" required />
                <TextInput
                  placeholder="example@company.com"
                  value={form.email}
                  onChange={v => update('email', v)}
                />
                <p className="text-[#f54900] text-[14px] leading-[20px]">
                  ⚠ 인증서는 이 이메일 주소로 발송됩니다. 정확히 입력해주세요.
                </p>
              </div>

              {/* 부서 + 전화 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <Label text="부서" />
                  <TextInput placeholder="부서명" value={form.dept} onChange={v => update('dept', v)} />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label text="전화" required />
                  <TextInput placeholder="02-1234-5678" value={form.phone} onChange={v => update('phone', v)} />
                </div>
              </div>

              {/* 휴대폰 + 팩스 */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[16px]">
                <div className="flex flex-col gap-[8px]">
                  <Label text="휴대폰" />
                  <TextInput placeholder="010-1234-5678" value={form.mobile} onChange={v => update('mobile', v)} />
                </div>
                <div className="flex flex-col gap-[8px]">
                  <Label text="팩스" />
                  <TextInput placeholder="02-1234-5679" value={form.fax} onChange={v => update('fax', v)} />
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: sticky payment ── */}
          <div className="xl:col-span-4 xl:sticky xl:top-[24px] self-start bg-white border border-[#e5e7eb] rounded-[4px] p-[24px] flex flex-col gap-[24px]">
              <div className="border-b border-[#e5e7eb] pb-[13px]">
                <p className="font-bold text-[#101828] text-[20px] leading-[28px]">결제 정보</p>
              </div>

              {/* 금액 요약 */}
              <div className="flex flex-col gap-[12px] border-b border-[#e5e7eb] pb-[12px]">
                <div className="flex items-center justify-between">
                  <span className="text-[#4a5565] text-[16px] leading-[24px]">상품 금액</span>
                  <span className="text-[#101828] text-[16px] leading-[24px]">{fmt(subtotal)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[#4a5565] text-[16px] leading-[24px]">VAT (10%)</span>
                  <span className="text-[#101828] text-[16px] leading-[24px]">{fmt(vat)}</span>
                </div>
                <div className="flex items-center justify-between border-t border-[#e5e7eb] pt-[13px]">
                  <span className="font-bold text-[#101828] text-[18px] leading-[28px]">최종 결제 금액</span>
                  <span className="font-bold text-[#155dfc] text-[18px] leading-[28px]">{fmt(total)}</span>
                </div>
              </div>

              {/* 결제 방법 */}
              <div className="flex flex-col gap-[12px]">
                <p className="font-semibold text-[#101828] text-[16px] leading-[24px]">결제 방법</p>
                <div className="flex flex-col gap-[8px]">
                  <RadioOption selected={payMethod === 'card'}   onSelect={() => setPayMethod('card')}   label="신용카드" />
                  <RadioOption selected={payMethod === 'bank'}   onSelect={() => setPayMethod('bank')}   label="무통장입금" />
                  <RadioOption selected={payMethod === 'vacct'}  onSelect={() => setPayMethod('vacct')}  label="가상계좌" />
                </div>
              </div>

              {/* 현금영수증 */}
              <Checkbox
                checked={cashReceipt}
                onChange={() => setCashReceipt(v => !v)}
                label="현금영수증 발급"
              />

              {/* 결제하기 */}
              <button className="w-full h-[50px] bg-[#155dfc] hover:bg-[#1251e0] text-white font-semibold text-[18px] leading-[28px] rounded-[4px] transition-colors shadow-[0px_10px_7.5px_rgba(21,93,252,0.3),0px_4px_3px_rgba(21,93,252,0.3)]">
                결제하기 →
              </button>

              <p className="text-center text-[#6a7282] text-[14px] leading-[20px]">
                결제 시 개인정보 수집·이용에 동의하게 됩니다.
              </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
