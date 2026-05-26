import { useState, useEffect, useLayoutEffect, useRef } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronRight } from 'lucide-react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { CERTS, LOGO_MAP } from '../data/certs';
import { addToCart } from '../data/cart';
import imgCartIcon from '../assets/Icon.png';

const TABS = [
  { id: 'specs',   label: '주요스펙' },
  { id: 'tech',    label: '기술정보' },
  { id: 'process', label: '발급절차' },
  { id: 'faq',     label: 'FAQ' },
];

function SpecIcon({ icon, color }) {
  const s = { stroke: color, strokeWidth: '1.5', strokeLinecap: 'round', strokeLinejoin: 'round' };
  if (icon === 'check') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M4 10.5l4 4 8-8" {...s} />
    </svg>
  );
  if (icon === 'shield') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L17 5V10C17 14 13.5 17.5 10 18.5C6.5 17.5 3 14 3 10V5L10 2Z" {...s} />
      <path d="M7.5 10.5L9.5 12.5L12.5 8.5" {...s} />
    </svg>
  );
  if (icon === 'clock') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" {...s} />
      <path d="M10 6v4l3 2" {...s} />
    </svg>
  );
  if (icon === 'globe') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="7.5" {...s} />
      <path d="M10 2.5c0 0-3.5 3.5-3.5 7.5s3.5 7.5 3.5 7.5" {...s} />
      <path d="M10 2.5c0 0 3.5 3.5 3.5 7.5s-3.5 7.5-3.5 7.5" {...s} />
      <path d="M2.5 10h15" {...s} />
    </svg>
  );
  if (icon === 'server') return (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <rect x="2.5" y="3" width="15" height="5" rx="1.5" stroke={color} strokeWidth="1.5" />
      <rect x="2.5" y="12" width="15" height="5" rx="1.5" stroke={color} strokeWidth="1.5" />
      <circle cx="5.5" cy="5.5" r="1" fill={color} />
      <circle cx="5.5" cy="14.5" r="1" fill={color} />
    </svg>
  );
  return null;
}

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border border-[#e5e7eb] rounded-[12px] overflow-hidden">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between gap-[12px] px-[18px] xl:px-[20px] py-[16px] text-left"
      >
        <span className="font-medium text-[14px] xl:text-[15px] text-[#101828] leading-[1.4]">{q}</span>
        <svg
          width="16" height="16" viewBox="0 0 16 16" fill="none"
          className={`transition-transform duration-200 shrink-0 ${open ? 'rotate-180' : ''}`}
        >
          <path d="M4 6l4 4 4-4" stroke="#6a7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>
      {open && (
        <div className="px-[18px] xl:px-[20px] pb-[16px] text-[13px] xl:text-[14px] text-[#4a5565] leading-[1.7] border-t border-[#e5e7eb] pt-[14px]">
          {a}
        </div>
      )}
    </div>
  );
}

export default function CertDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const cert = CERTS.find(c => c.id === Number(id));

  const [activeTab, setActiveTab] = useState('specs');
  const [years, setYears] = useState(1);
  const [cartAdded, setCartAdded] = useState(false);

  const handleAddToCart = () => {
    addToCart({
      certId:    cert.id,
      brand:     cert.brand,
      name:      cert.name,
      period:    years,
      basePrice: cert.priceNum,
      price:     getPrice(),
    });
    setCartAdded(true);
    setTimeout(() => navigate('/cart'), 600);
  };

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [id]);

  const tabNavRef  = useRef(null);
  const specsRef   = useRef(null);
  const techRef    = useRef(null);
  const processRef = useRef(null);
  const faqRef     = useRef(null);

  const sectionMap = { specs: specsRef, tech: techRef, process: processRef, faq: faqRef };

  useEffect(() => {
    const sectionData = [
      { id: 'specs',   ref: specsRef },
      { id: 'tech',    ref: techRef },
      { id: 'process', ref: processRef },
      { id: 'faq',     ref: faqRef },
    ];

    const initializedRef = { current: false };
    const timer = setTimeout(() => { initializedRef.current = true; }, 300);

    const observer = new IntersectionObserver(
      (entries) => {
        if (!initializedRef.current) return;
        entries.forEach(entry => {
          const id = entry.target.dataset.sectionId;
          const idx = sectionData.findIndex(s => s.id === id);
          if (entry.isIntersecting) {
            setActiveTab(id);
          } else if (entry.boundingClientRect.top > 0) {
            if (idx > 0) setActiveTab(sectionData[idx - 1].id);
          }
        });
      },
      { rootMargin: '-50px 0px -85% 0px', threshold: 0 }
    );

    sectionData.forEach(({ id, ref }) => {
      if (ref.current) {
        ref.current.dataset.sectionId = id;
        observer.observe(ref.current);
      }
    });

    return () => { observer.disconnect(); clearTimeout(timer); };
  }, []);

  const scrollToSection = (tabId) => {
    sectionMap[tabId]?.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const getPrice = () => {
    if (!cert) return 0;
    if (years === 2) return Math.round(cert.priceNum * 1.9);
    if (years === 3) return Math.round(cert.priceNum * 2.7);
    return cert.priceNum;
  };

  const formatPrice = (n) => `₩${n.toLocaleString()}`;

  if (!cert) {
    return (
      <div className="bg-white font-['Pretendard'] min-h-screen">
        <NavBar />
        <div className="max-w-[1200px] mx-auto px-4 pt-[80px] text-center">
          <p className="text-[#6a7282] text-[18px] mb-[16px]">인증서를 찾을 수 없습니다.</p>
          <button onClick={() => navigate('/tls-ssl')} className="text-[#155dfc] text-[15px] hover:underline">
            목록으로 돌아가기
          </button>
        </div>
      </div>
    );
  }

  const logoInfo = LOGO_MAP[cert.brand];
  const domainLabel = cert.domainType === 'single' ? '단일 도메인' : cert.domainType === 'wildcard' ? '와일드카드' : '멀티 도메인';

  const specBg    = { blue: '#eff6ff', green: '#f0fdf4', purple: '#faf5ff', orange: '#fff7ed' };
  const specColor = { blue: '#3b82f6', green: '#22c55e', purple: '#a855f7', orange: '#f97316' };

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen">
      <NavBar />

      {/* ── Breadcrumb ── */}
      <div className="bg-[#f4f6f9] border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 h-[48px] flex items-center">
          <nav className="flex items-center gap-[4px] text-[13px]">
            <span
              className="text-[#6a7282] cursor-pointer hover:text-[#101828] transition-colors"
              onClick={() => navigate('/tls-ssl')}
            >
              TLS/SSL 인증서
            </span>
            <ChevronRight className="w-3.5 h-3.5 text-[#9ca3af]" />
            <span className="text-[#101828] font-medium">{cert.name}</span>
          </nav>
        </div>
      </div>

      {/* ── Main ── */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 pt-[32px] xl:pt-[40px] pb-[100px]">
        <div className="xl:grid xl:grid-cols-12 xl:gap-[40px] xl:items-start">

          {/* ════ Left column ════ */}
          <div className="xl:col-span-8">

            {/* Cert header */}
            <div
              className="rounded-[12px] overflow-hidden mb-[32px] xl:mb-[40px]"
              style={{ backgroundColor: cert.headerColor }}
            >
              <div className="px-[28px] xl:px-[40px] pt-[28px] xl:pt-[40px] pb-[32px] xl:pb-[44px]">
                <div
                  className="bg-white rounded-[8px] flex items-center justify-center mb-[20px] w-[130px] h-[40px]"
                >
                  {logoInfo ? (
                    <img src={logoInfo.src} alt={cert.brand} style={{ width: logoInfo.w * 0.88, height: logoInfo.h * 0.88 }} />
                  ) : (
                    <span className="font-bold text-[13px] text-[#303336]">{cert.brand}</span>
                  )}
                </div>
                <h1 className="font-bold text-white text-[24px] xl:text-[32px] leading-[1.3] mb-[10px]">
                  {cert.name}
                </h1>
                <p className="text-white/80 text-[14px] xl:text-[16px] leading-[1.6] mb-[20px]">
                  {cert.subtitle}
                </p>
                <div className="flex flex-wrap gap-[8px]">
                  <span className="bg-white/20 border border-white/30 rounded-full px-[12px] py-[4px] text-white text-[12px] xl:text-[13px] font-medium">
                    {cert.validationType} 인증
                  </span>
                  <span className="bg-white/20 border border-white/30 rounded-full px-[12px] py-[4px] text-white text-[12px] xl:text-[13px] font-medium">
                    {domainLabel}
                  </span>
                </div>
              </div>
            </div>

            {/* Sticky tab nav */}
            <div
              ref={tabNavRef}
              className="sticky top-0 z-40 bg-white pb-[20px] mb-[40px] xl:mb-[48px]"
            >
              <div className="flex gap-[8px]">
                {TABS.map(tab => (
                  <button
                    key={tab.id}
                    onClick={() => { setActiveTab(tab.id); scrollToSection(tab.id); }}
                    className={`flex-1 h-[44px] rounded-[4px] text-[16px] transition-all whitespace-nowrap ${
                      activeTab === tab.id
                        ? 'bg-[#303336] text-white font-medium shadow-[0px_10px_7.5px_rgba(0,0,0,0.1),0px_4px_3px_rgba(0,0,0,0.1)]'
                        : 'bg-[#F3F5F7] text-[#364153] font-normal hover:bg-[#e8eaed]'
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            </div>

            {/* ── 주요 스펙 ── */}
            <section ref={specsRef} className="mb-[60px] xl:mb-[72px] scroll-mt-16">
              <h2 className="font-bold text-[18px] xl:text-[22px] text-[#101828] mb-[20px] xl:mb-[24px]">주요 스펙</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-[14px] xl:gap-[16px] mb-[24px] xl:mb-[28px]">
                {cert.specs.map((spec, i) => (
                  <div key={i} className="border border-[#e5e7eb] rounded-[12px] p-[20px] xl:p-[24px] hover:border-[#93c5fd] transition-colors">
                    <div
                      className="w-[40px] h-[40px] rounded-[10px] flex items-center justify-center mb-[12px]"
                      style={{ backgroundColor: specBg[spec.color] || specBg.blue }}
                    >
                      <SpecIcon icon={spec.icon} color={specColor[spec.color] || specColor.blue} />
                    </div>
                    <p className="font-semibold text-[14px] xl:text-[15px] text-[#101828] mb-[6px]">{spec.title}</p>
                    <p className="text-[13px] xl:text-[14px] text-[#6a7282] leading-[1.5]">{spec.desc}</p>
                  </div>
                ))}
              </div>

              <div className="bg-[#f0f5ff] border border-[#c7d2fe] rounded-[12px] p-[20px] xl:p-[24px]">
                <p className="font-semibold text-[#1d4ed8] text-[14px] xl:text-[15px] mb-[14px]">이런 분께 추천합니다</p>
                <ul className="flex flex-col gap-[10px]">
                  {cert.recommendations.map((r, i) => (
                    <li key={i} className="flex items-start gap-[8px] text-[13px] xl:text-[14px] text-[#1e3a8a] leading-[1.5]">
                      <span className="text-[#3b82f6] shrink-0 font-bold mt-[1px]">→</span>
                      {r}
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* ── 기술 정보 ── */}
            <section ref={techRef} className="mb-[60px] xl:mb-[72px] scroll-mt-16">
              <h2 className="font-bold text-[18px] xl:text-[22px] text-[#101828] mb-[20px] xl:mb-[24px]">기술 정보</h2>
              <div className="border border-[#e5e7eb] rounded-[12px] overflow-hidden">
                {cert.techInfo.map((item, i) => (
                  <div
                    key={i}
                    className={`flex flex-col sm:flex-row ${i < cert.techInfo.length - 1 ? 'border-b border-[#e5e7eb]' : ''}`}
                  >
                    <div className="sm:w-[180px] xl:w-[210px] shrink-0 bg-[#f4f6f9] px-[16px] xl:px-[20px] py-[12px] xl:py-[14px] font-semibold text-[13px] xl:text-[14px] text-[#303336] flex items-center">
                      {item.label}
                    </div>
                    <div className="px-[16px] xl:px-[20px] py-[12px] xl:py-[14px] text-[13px] xl:text-[14px] text-[#4a5565] leading-[1.5] flex items-center">
                      {item.value}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* ── 발급 절차 ── */}
            <section ref={processRef} className="mb-[60px] xl:mb-[72px] scroll-mt-16">
              <h2 className="font-bold text-[18px] xl:text-[22px] text-[#101828] mb-[20px] xl:mb-[28px]">발급 절차</h2>

              <div className="relative">
                {/* connecting line on sm+ */}
                <div className="hidden sm:block absolute top-[23px] left-[calc(12.5%+4px)] right-[calc(12.5%+4px)] h-[2px] bg-[#e5e7eb] z-0" />
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-[20px] relative z-10">
                  {cert.processSteps.map((step, i) => (
                    <div key={i} className="flex flex-col items-center text-center">
                      <div className="w-[48px] h-[48px] rounded-full bg-[#083691] flex items-center justify-center font-bold text-white text-[17px] mb-[12px] ring-[3px] ring-white ring-offset-0 shadow-[0_0_0_2px_#083691]">
                        {i + 1}
                      </div>
                      <p className="font-semibold text-[13px] xl:text-[14px] text-[#101828] mb-[4px]">{step.step}</p>
                      <p className="text-[12px] xl:text-[13px] text-[#6a7282] leading-[1.4]">{step.desc}</p>
                    </div>
                  ))}
                </div>
              </div>

              {cert.processNote && (
                <div className="mt-[24px] flex items-start gap-[10px] bg-[#f4f6f9] rounded-[10px] px-[16px] py-[14px]">
                  <span className="text-[14px] shrink-0">💡</span>
                  <p className="text-[13px] text-[#6a7282] leading-[1.5]">{cert.processNote}</p>
                </div>
              )}
            </section>

            {/* ── FAQ ── */}
            <section ref={faqRef} className="mb-[60px] scroll-mt-16">
              <h2 className="font-bold text-[18px] xl:text-[22px] text-[#101828] mb-[20px] xl:mb-[24px]">FAQ</h2>
              <div className="flex flex-col gap-[10px]">
                {cert.faq.map((item, i) => (
                  <FaqItem key={i} q={item.q} a={item.a} />
                ))}
              </div>
            </section>
          </div>

          {/* ════ Right column: Purchase card ════ */}
          <div className="xl:col-span-4 xl:sticky xl:top-[24px] mt-[8px] xl:mt-0 self-start">
            <div className="border border-[#e5e7eb] rounded-[12px] p-[28px]">

                {/* Year toggle */}
                <p className="font-semibold text-[16px] text-[#566376] mb-[12px]">구매 기간 선택</p>
                <div className="flex gap-[8px] mb-[24px]">
                  {[
                    { y: 1, discount: null },
                    { y: 2, discount: '-10%' },
                    { y: 3, discount: '-20%' },
                  ].map(({ y, discount }) => (
                    <button
                      key={y}
                      onClick={() => setYears(y)}
                      className={`flex-1 h-[62px] rounded-[10px] flex flex-col items-center justify-center transition-all ${
                        years === y
                          ? 'bg-[#155dfc] text-white'
                          : 'bg-[#f3f4f6] text-[#303336] hover:bg-[#e8eaed]'
                      }`}
                    >
                      <span className="font-semibold text-[15px] leading-[1.2]">{y}년</span>
                      {discount && (
                        <span className={`text-[12px] font-medium leading-[1.2] ${years === y ? 'text-white/80' : 'text-[#155dfc]'}`}>
                          {discount}
                        </span>
                      )}
                    </button>
                  ))}
                </div>

                {/* Price */}
                <div className="pb-[20px] mb-[20px] border-b border-[#e5e7eb]">
                  <span className="text-[36px] font-bold text-[#303336] tracking-[-1px]">
                    {formatPrice(getPrice())}
                  </span>
                  <span className="text-[18px] text-[#6a7282] ml-[4px]">/1년</span>
                </div>

                {/* Features */}
                <ul className="flex flex-col gap-[8px] mb-[24px]">
                  {cert.features.map((f, i) => (
                    <li key={i} className="flex items-center gap-[8px] text-[16px] text-[#566376]">
                      <span className="text-[#155dfc] font-bold shrink-0">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* CTAs */}
                <div className="flex gap-[8px] mb-[12px]">
                  <button
                    onClick={handleAddToCart}
                    disabled={cartAdded}
                    className="flex-1 h-[50px] bg-white border border-[#54595e] rounded-[4px] font-medium text-[15px] text-[#303336] hover:bg-[#f4f6f9] transition-colors flex items-center justify-center gap-[6px] disabled:bg-[#f4f6f9] disabled:text-[#6a7282]"
                  >
                    <img src={imgCartIcon} alt="" className="w-[18px] h-[18px]" />
                    {cartAdded ? '담는 중...' : '장바구니'}
                  </button>
                  <button className="flex-1 h-[50px] bg-[#155dfc] rounded-[4px] font-semibold text-[15px] text-white hover:bg-[#1251e0] active:bg-[#0e44cc] transition-colors flex items-center justify-center gap-[6px]">
                    신청하기
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                      <path d="M3 8h10M9 4l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>
                </div>

                {/* VAT notice */}
                <p className="text-[14px] text-[#6a7282]">VAT 별도 · 신청 후 1-3 영업일 내 발급</p>
            </div>
          </div>

        </div>
      </div>

      <Footer />
    </div>
  );
}
