import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { LOGO_MAP } from '../data/certs';
import { getCart, saveCart } from '../data/cart';

const fmt = n => `₩${n.toLocaleString()}`;

/* ── 커스텀 체크박스 ── */
function Checkbox({ checked, onChange }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      className={`shrink-0 w-[20px] h-[20px] border flex items-center justify-center transition-colors cursor-pointer ${
        checked
          ? 'bg-[#9db8e8] border-[#9db8e8]'
          : 'bg-white border-[#d1d5dc]'
      }`}
    >
      {checked && (
        <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
          <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      )}
    </button>
  );
}

function calcPrice(basePrice, period) {
  const rate = period === 1 ? 1 : period === 2 ? 0.9 : 0.8;
  return Math.round(basePrice * period * rate);
}

/* ── 빈 장바구니 ── */
function EmptyState({ onBrowse }) {
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[12px] py-[80px] flex flex-col items-center text-center">
      <div className="w-[72px] h-[72px] bg-[#f4f6f9] rounded-full flex items-center justify-center mb-[24px]">
        <svg width="36" height="36" viewBox="0 0 36 36" fill="none">
          <path d="M3 4h4.5L12 22h16.5L32 10H9" stroke="#9ca3af" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
          <circle cx="14" cy="29" r="2" fill="#9ca3af" />
          <circle cx="26" cy="29" r="2" fill="#9ca3af" />
        </svg>
      </div>
      <h2 className="font-semibold text-[#101828] text-[22px] mb-[10px]">장바구니가 비어있습니다</h2>
      <p className="text-[#6a7282] text-[16px] mb-[28px]">인증서를 장바구니에 담아보세요</p>
      <button
        onClick={onBrowse}
        className="bg-[#155dfc] text-white text-[16px] font-medium px-[28px] py-[11px] rounded-[8px] hover:bg-[#1251e0] transition-colors"
      >
        인증서 둘러보기 →
      </button>
    </div>
  );
}

/* ── YearSelect ── */
function YearSelect({ value, onChange }) {
  return (
    <div className="relative inline-flex items-center">
      <select
        value={value}
        onChange={e => onChange(Number(e.target.value))}
        className="appearance-none bg-white border border-[#d0d6df] rounded-[2px] h-[30px] pl-[12px] pr-[28px] text-[#222] text-[16px] font-medium focus:outline-none cursor-pointer min-w-[110px]"
      >
        <option value={1}>1년</option>
        <option value={2}>2년</option>
        <option value={3}>3년</option>
      </select>
      <svg className="absolute right-[8px] pointer-events-none" width="8" height="5" viewBox="0 0 8 5" fill="none">
        <path d="M1 1l3 3 3-3" stroke="#555" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

/* ── 모바일 카드 ── */
function MobileCard({ item, onToggle, onPeriod }) {
  const logo = LOGO_MAP[item.brand];
  return (
    <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[18px]">
      <div className="flex items-start gap-[12px]">
        <div className="mt-[4px]">
          <Checkbox checked={item.selected} onChange={() => onToggle(item.id)} />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-[10px]">
            {logo
              ? <img src={logo.src} alt={item.brand} style={{ width: logo.w * 0.65, height: logo.h * 0.65 }} />
              : <span className="font-medium text-[#101828] text-[13px]">{item.brand}</span>
            }
            <button className="bg-[#155dfc] text-white text-[13px] font-medium rounded-[4px] h-[30px] px-[14px] hover:bg-[#1251e0] transition-colors">
              신청하기
            </button>
          </div>
          <p className="font-medium text-[#101828] text-[15px] mb-[14px] leading-[1.4]">{item.name}</p>
          <div className="flex items-center justify-between">
            <div className="relative inline-flex items-center">
              <select
                value={item.period}
                onChange={e => onPeriod(item.id, Number(e.target.value))}
                className="appearance-none bg-white border border-[#d0d6df] rounded-[4px] h-[30px] pl-[10px] pr-[24px] text-[#222] text-[14px] font-medium focus:outline-none cursor-pointer"
              >
                <option value={1}>1년</option>
                <option value={2}>2년</option>
                <option value={3}>3년</option>
              </select>
              <svg className="absolute right-[7px] pointer-events-none" width="7" height="5" viewBox="0 0 7 5" fill="none">
                <path d="M0.5 1l3 3 3-3" stroke="#555" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <span className="font-semibold text-[#101828] text-[17px]">{fmt(item.price)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 컴포넌트
══════════════════════════════════════════ */
export default function Cart() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => { setItems(getCart()); }, []);

  const save = updated => { setItems(updated); saveCart(updated); };

  const toggleAll  = () => {
    const all = items.every(i => i.selected);
    save(items.map(i => ({ ...i, selected: !all })));
  };
  const toggleItem  = id => save(items.map(i => i.id === id ? { ...i, selected: !i.selected } : i));
  const updatePeriod = (id, period) =>
    save(items.map(i => i.id === id ? { ...i, period, price: calcPrice(i.basePrice, period) } : i));
  const deleteSelected = () => save(items.filter(i => !i.selected));

  const allSelected   = items.length > 0 && items.every(i => i.selected);
  const selected      = items.filter(i => i.selected);
  const totalSelected = selected.reduce((s, i) => s + i.price, 0);
  const totalAll      = items.reduce((s, i) => s + i.price, 0);

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ══ Hero ══ */}
      <section className="py-[60px] xl:pt-[120px] xl:pb-[100px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col gap-[12px] tracking-[-1px] max-w-[737px]">
            <h1 className="font-bold text-[#303336] text-[36px] sm:text-[44px] xl:text-[52px] leading-[1.3]">
              장바구니
            </h1>
            <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5]">
              검토 중인 인증서를 담아두고, 결정되면 바로 신청하세요.
            </p>
          </div>
        </div>
      </section>

      {/* ══ Content ══ */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 pb-[120px]">
        {items.length === 0 ? (
          <EmptyState onBrowse={() => navigate('/tls-ssl')} />
        ) : (
          <>
            {/* ── Actions bar ── */}
            <div className="flex items-center justify-between h-[24px] mb-[12px]">
              <div className="flex items-center gap-[16px]">
                <div className="flex items-center gap-[8px]">
                  <Checkbox checked={allSelected} onChange={toggleAll} />
                  <span className="font-medium text-[#364153] text-[15px] leading-[20px]">전체선택</span>
                </div>
                <span className="text-[#d1d5dc] text-[16px] leading-[24px]">|</span>
                <button
                  onClick={deleteSelected}
                  disabled={selected.length === 0}
                  className="flex items-center gap-[6px] font-medium text-[#364153] text-[15px] leading-[20px] disabled:opacity-50 hover:text-[#e53e3e] transition-colors"
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 4h12" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                    <path d="M5 4V2.5h6V4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M3.5 4l.9 9h7.2l.9-9" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M6.5 7v4M9.5 7v4" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                  선택 삭제하기
                </button>
              </div>
              <p className="text-[#4a5565] text-[15px] leading-[20px]">
                총 <span className="font-semibold text-[#101828]">{items.length}</span>개 상품
              </p>
            </div>

            {/* ── Desktop Table ── */}
            <div className="hidden xl:block border-t border-b border-[#e5e7eb] overflow-hidden">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-[#f9fafb] border-b border-[#e5e7eb] h-[49px]">
                    {/* checkbox col */}
                    <th className="w-[72px]" />
                    <th className="text-left text-[#4a5565] text-[16px] font-semibold uppercase tracking-[0.6px] w-[217px]">
                      브랜드
                    </th>
                    <th className="text-left text-[#4a5565] text-[16px] font-semibold uppercase tracking-[0.6px]">
                      상품명
                    </th>
                    <th className="text-center text-[#4a5565] text-[16px] font-semibold uppercase tracking-[0.6px] w-[223px]">
                      년수
                    </th>
                    <th className="text-right text-[#4a5565] text-[16px] font-semibold uppercase tracking-[0.6px] w-[218px] pr-[59px]">
                      가격
                    </th>
                    <th className="text-center text-[#4a5565] text-[16px] font-semibold uppercase tracking-[0.6px] w-[139px]">
                      신청하기
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {items.map(item => {
                    const logo = LOGO_MAP[item.brand];
                    return (
                      <tr key={item.id} className="border-b border-[#f3f4f6] h-[85px]">
                        {/* Checkbox */}
                        <td className="pl-[32px] w-[72px]">
                          <Checkbox checked={item.selected} onChange={() => toggleItem(item.id)} />
                        </td>
                        {/* Brand logo */}
                        <td>
                          {logo
                            ? <img src={logo.src} alt={item.brand} style={{ width: logo.w, height: logo.h }} />
                            : <span className="font-medium text-[#101828] text-[14px]">{item.brand}</span>
                          }
                        </td>
                        {/* Product name */}
                        <td className="pr-[16px]">
                          <span className="font-medium text-[#101828] text-[16px] leading-[24px]">{item.name}</span>
                        </td>
                        {/* Year select */}
                        <td className="text-center">
                          <YearSelect value={item.period} onChange={v => updatePeriod(item.id, v)} />
                        </td>
                        {/* Price */}
                        <td className="text-right pr-[59px]">
                          <span className="font-semibold text-[#101828] text-[18px] leading-[28px]">
                            {fmt(item.price)}
                          </span>
                        </td>
                        {/* Apply */}
                        <td className="text-center">
                          <button className="bg-[#155dfc] text-white text-[14px] font-medium rounded-[4px] h-[36px] w-[79px] hover:bg-[#1251e0] transition-colors">
                            신청하기
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* ── Mobile Cards ── */}
            <div className="xl:hidden flex flex-col gap-[10px] border-t border-[#e5e7eb] pt-[14px]">
              {items.map(item => (
                <MobileCard key={item.id} item={item} onToggle={toggleItem} onPeriod={updatePeriod} />
              ))}
            </div>

            {/* ── Summary ── */}
            <div className="pt-[24px]">
              {/* Price row */}
              <div className="flex items-center justify-between pb-[25px] border-b border-[#e5e7eb]">
                {/* Selected price (left) */}
                <div className="flex flex-col gap-[8px]">
                  <p className="text-[#4a5565] text-[14px] leading-[20px]">선택한 상품 ({selected.length}개)</p>
                  <p className="font-bold text-[#101828] text-[24px] xl:text-[30px] leading-[36px]">
                    {fmt(totalSelected)}
                  </p>
                </div>
                {/* Total price (right) */}
                <div className="flex flex-col gap-[8px] items-end">
                  <p className="text-[#4a5565] text-[14px] leading-[20px]">전체 상품 ({items.length}개)</p>
                  <p className="font-semibold text-[#364153] text-[20px] xl:text-[24px] leading-[32px]">
                    {fmt(totalAll)}
                  </p>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-[8px] sm:justify-end pt-[24px]">
                <button
                  onClick={() => navigate('/tls-ssl')}
                  className="h-[50px] w-full sm:w-[154px] bg-white border border-[#54595e] rounded-[4px] font-medium text-[#303336] text-[16px] xl:text-[18px] leading-[28px] hover:bg-[#f4f6f9] transition-colors whitespace-nowrap"
                >
                  쇼핑 계속하기
                </button>
                <button
                  disabled={selected.length === 0}
                  onClick={() => navigate('/apply', { state: { items: selected } })}
                  className="h-[50px] w-full sm:w-auto sm:px-[16px] bg-[#f3f3f3] border border-[#54595e] rounded-[4px] font-medium text-[#303336] text-[16px] xl:text-[18px] leading-[28px] disabled:opacity-50 transition-colors whitespace-nowrap"
                >
                  선택한 상품 신청하기 ({selected.length})
                </button>
                <button
                  onClick={() => navigate('/apply', { state: { items } })}
                  className="h-[50px] w-full sm:w-[219px] bg-[#155dfc] rounded-[4px] font-medium text-white text-[16px] xl:text-[18px] leading-[28px] hover:bg-[#1251e0] transition-colors whitespace-nowrap"
                >
                  전체 신청하기 →
                </button>
              </div>
            </div>

            {/* ── Info Notice ── */}
            <div className="mt-[28px] bg-white border border-[#e5e7eb] rounded-[12px] shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]">
              <div className="px-[27px] pt-[20px] pb-[28px]">
                <p className="font-semibold text-[#222] text-[16px] leading-[20px] mb-[14px]">안내사항</p>
                <ul className="list-disc pl-[20px] flex flex-col gap-[4px] text-[#566376] text-[14px] xl:text-[16px] leading-[1.55]">
                  <li>장바구니에 담긴 상품은 30일간 보관됩니다.</li>
                  <li>가격은 상품 선택 시점의 가격이며, 변동될 수 있습니다.</li>
                  <li>VAT는 별도이며, 결제 시 추가됩니다.</li>
                </ul>
              </div>
            </div>
          </>
        )}
      </div>

      <Footer />
    </div>
  );
}
