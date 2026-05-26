import { useState, useRef, useEffect } from 'react';
import { Link } from 'react-router';
import './Main.css';
import NavBar from './app/components/NavBar';
import { Footer } from './app/components/Footer';
import images1 from './assets/images1.png';
import images2 from './assets/images2.png';
import images3 from './assets/images3.png';
import images4 from './assets/images4.png';
import medal from './assets/medal.svg';
import logoDigiCert from './assets/DigiCertLogo.svg';
import logoSectigo from './assets/sectigo-logo.svg';
import logoGlobalSign from './assets/globalsign.svg';
import bgHero from './assets/BG.png';
import imgBullet from './assets/bullet.png';
import imgCartIcon from './assets/Icon.png';
import imgArrow from './assets/arrow.svg';
import imgSupportIcon from './assets/Vector.svg';

const LOGO_MAP = {
  DigiCert:   { src: logoDigiCert,   w: 89.684,  h: 26.526, l: 49.16, t: 34.32 },
  Sectigo:    { src: logoSectigo,    w: 103.579, h: 18.947, l: 42.11, t: 38.11 },
  GlobalSign: { src: logoGlobalSign, w: 102.316, h: 22.737, l: 40.84, t: 35.58 },
};

const PRODUCTS = {
  bestseller: [
    { provider: 'Sectigo',    name: 'PositiveSSL Multi-Domain', features: ['최대 100개 도메인', 'DV 인증', '5분 내 발급'],          price: '₩180,000',   headerColor: '#00a870', certId: 1 },
    { provider: 'DigiCert',   name: 'Secure Site Pro',          features: ['최대 보상 한도 $175만', 'EV 인증', '암호화 강도 256-bit'], price: '₩850,000',   headerColor: '#0586c7', certId: 2 },
    { provider: 'GlobalSign', name: 'OrganizationSSL',          features: ['OV 인증', '99.9% 브라우저 호환', '무료 재발급'],         price: '₩420,000',   headerColor: '#285abd', certId: 3 },
  ],
  value: [
    { provider: 'Sectigo',  name: 'PositiveSSL',  features: ['단일 도메인', 'DV 인증', '빠른 발급'],              price: '₩45,000',  headerColor: '#00a870', certId: 6 },
    { provider: 'RapidSSL', name: 'Standard SSL', features: ['기본 암호화', '신뢰할 수 있는 CA', '자동 갱신 가능'], price: '₩68,000',  headerColor: '#e05a1b' },
    { provider: 'Thawte',   name: 'SSL123',        features: ['소규모 비즈니스 최적', 'DV 인증', '합리적 가격'],    price: '₩92,000',  headerColor: '#7c3aed' },
  ],
  public: [
    { provider: 'DigiCert',   name: 'Secure Site EV',        features: ['최고 보안 등급', 'EV 인증', '공공기관 추천'],     price: '₩1,200,000', headerColor: '#0586c7', certId: 4 },
    { provider: 'GlobalSign', name: 'Extended Validation',   features: ['EV 인증', '금융권 적합', '법적 보호'],           price: '₩980,000',   headerColor: '#285abd', certId: 5 },
    { provider: 'Entrust',    name: 'Certificate Authority', features: ['정부 기관 신뢰', 'EV/OV 지원', '완벽한 감사 추적'], price: '₩1,450,000', headerColor: '#cc3a1a' },
  ],
  codesign: [
    { provider: 'DigiCert',   name: 'Code Signing Standard',   features: ['소프트웨어 서명', 'EV 가능', 'Windows 호환'],              price: '₩520,000', headerColor: '#0586c7' },
    { provider: 'Sectigo',    name: 'EV Code Signing',         features: ['즉시 신뢰 획득', 'USB 토큰 제공', 'Smart Screen 필터 우회'], price: '₩680,000', headerColor: '#00a870' },
    { provider: 'GlobalSign', name: 'CodeSigning Certificate', features: ['다중 플랫폼 지원', 'Java/Office 매크로', '3년 유효기간'],   price: '₩590,000', headerColor: '#285abd' },
  ],
};

const FAQ_ITEMS = [
  { q: "certgo의 인증서는 다른 대행사와 무엇이 다른가요?",           a: "대한민국 보안의 기준, 지란데이터의 전문가들이 검증한 글로벌 Root CA 인증서만을 취급합니다. 단순 판매를 넘어 고객님의 인프라 환경에 최적화된 설치 컨설팅을 함께 제공합니다." },
  { q: "SSL과 CodeSign 인증서 중 무엇을 선택해야 하나요?",           a: "웹사이트 보안과 데이터 암호화가 목적이라면 SSL을, 소프트웨어 배포 시 '알 수 없는 게시자' 경고를 제거하고 신뢰도를 높이고 싶다면 CodeSign을 선택하세요." },
  { q: "인증서 설치가 너무 어려운데, 기술 지원이 가능한가요?",        a: "물론입니다. 지란데이터의 전문 엔지니어팀이 평일 9시부터 18시까지 원격 지원 및 유선 상담을 통해 설치 전 과정을 밀착 지원해 드립니다." },
  { q: "결제 후 발급까지 시간이 얼마나 걸리나요?",                    a: "도메인 인증(DV) 상품은 자동화 시스템을 통해 평균 5분 이내에 즉시 발급됩니다. 기업 심사가 필요한 상품(OV/EV)은 서류 확인 절차에 따라 약 1~3영업일이 소요됩니다." },
  { q: "타사에서 이용 중인 인증서를 certgo로 이전할 수 있나요?",      a: "네, 가능합니다. 기존 인증서의 남은 기간을 안전하게 승계하면서 certgo의 스마트 대시보드와 밀착 기술 지원 혜택을 즉시 누리실 수 있습니다. 이전 절차는 전담 엔지니어가 매끄럽게 도와드립니다." },
];

export default function Main() {
  const [selectedPurpose, setSelectedPurpose] = useState(null);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedDomain, setSelectedDomain] = useState(null);
  const [activeTab, setActiveTab] = useState('bestseller');

  const allSelected = selectedPurpose && selectedCompany && selectedDomain;

  const [whyTitleRef, whyTitleInView] = useInView();
  const [whyImg1Ref, whyImg1InView] = useInView();
  const [whyText1Ref, whyText1InView] = useInView();
  const [whyImg2Ref, whyImg2InView] = useInView();
  const [whyText2Ref, whyText2InView] = useInView();

  return (
    <div className="bg-white">
      <NavBar />

      {/* ══════════════ HERO ══════════════ */}
      <section className="relative overflow-hidden h-auto xl:h-[760px]">
        {/* BG 이미지 */}
        <div className="absolute inset-0">
          <img src={bgHero} alt="" className="w-full h-full object-cover" />
        </div>

        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row items-start xl:items-start gap-10 xl:gap-[178px] py-12 xl:pt-[142px] xl:pb-[180px]">

            {/* 헤드카피 */}
            <div className="flex flex-col gap-[5px] xl:gap-[21px] w-full xl:w-[406px] shrink-0">
              <p className="hero-fade-up d1 font-['Pretendard'] font-semibold text-[16px] xl:text-[20px] text-white tracking-[1.6px] uppercase leading-[1.4]">
                GLOBAL CERTIFICATE PLATFORM
              </p>
              <div className="hero-fade-up d2 font-['Pretendard'] font-bold text-[28px] min-[531px]:text-[40px] sm:text-[44px] min-[1024px]:text-[56px] xl:text-[72px] text-white tracking-[-2px] leading-[1.2]">
                <p className="xl:hidden whitespace-nowrap">글로벌 보안 인증서의 새로운 기준.</p>
                <div className="hidden xl:block">
                  <p>글로벌 </p>
                  <p>보안 인증서의 </p>
                  <p>새로운 기준.</p>
                </div>
              </div>
              <div className="hero-fade-up d3 font-['Pretendard'] font-medium text-[#8aadff] text-[18px] xl:text-[24px] tracking-[-1px] leading-[1.5]">
                <p>검증된 글로벌 인증서와 전문가 지원. </p>
                <p>복잡함 없이 즉시 최적의 인증서를 찾아보세요.</p>
              </div>
            </div>

            {/* 위젯 + 장식 박스 + 버튼 영역 */}
            <div className="relative w-full xl:w-[608px] shrink-0 pb-[60px]">

              {/* 장식 박스 1 — 그린-블루 (우상단, 데스크탑만) — 대부분 카드 뒤에 숨고 상단 18px만 노출 */}
              <div className="hidden xl:block absolute h-[150px] rounded-tr-[40px] w-[188px] z-0 deco-box-green" />

              {/* 장식 박스 2 — 퍼플-블루 (좌하단, 데스크탑만) — 카드 하단 왼쪽에 살짝 노출 */}
              <div className="hidden xl:block absolute h-[150px] rounded-bl-[40px] rounded-tr-[40px] w-[188px] z-0 deco-box-purple" />

              {/* 위젯 카드 */}
              <div className="relative z-10 backdrop-blur-[25px] bg-white rounded-[20px] w-full h-auto sm:h-[412px]">
                {/* 회색 헤더 — 원본과 동일하게 h-[130px] 고정 */}
                <div className="relative bg-[#f9fafb] h-auto sm:h-[130px] rounded-tl-[20px] rounded-tr-[20px] px-[35px] sm:px-[50px] pt-[32px] pb-[24px] sm:p-0">
                  <p className="sm:absolute font-['Pretendard'] font-bold text-[18px] sm:text-[28px] text-[#1d2c49] sm:left-[50px] sm:top-[40px] leading-[1.4]">
                    어떤 인증서가 필요하신가요?
                  </p>
                  <p className="sm:absolute font-['Pretendard'] text-[12px] sm:text-[16px] text-[#6c7c93] tracking-[-1px] sm:whitespace-nowrap sm:left-[50px] sm:top-[85px] leading-[1.5] mt-[6px] sm:mt-0">
                    어떤 것을 골라야 할지 고민되시나요? 딱 맞는 인증서를 찾아드릴게요.
                  </p>
                </div>
                <div className="border-t border-[#e5e7eb]" />

                {/* 선택지 */}
                <div className="px-[35px] sm:px-[50px] py-[28px] pb-[28px] flex flex-col gap-[12px]">
                  {/* 용도 선택 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-[12px] shrink-0 sm:w-[146px]">
                      <img alt="" className="size-[8px] shrink-0" src={imgBullet} />
                      <p className="font-['Pretendard'] font-semibold text-[16px] xl:text-[18px] text-[#364153] tracking-[-1px] whitespace-nowrap">
                        용도 선택
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-[4px]">
                      {["웹사이트 보안", "소프트웨어 서명"].map((label) => (
                        <button key={label} onClick={() => setSelectedPurpose(label)}
                          className={`rounded-full px-[20px] py-[12px] font-['Pretendard'] font-medium text-[14px] h-[44px] border transition-colors whitespace-nowrap ${
                            selectedPurpose === label ? "border-[#155dfc] text-[#155dfc]" : "border-[#d1d5dc] text-[#364153]"
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 기업 유형 선택 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-[12px] shrink-0 sm:w-[146px]">
                      <img alt="" className="size-[8px] shrink-0" src={imgBullet} />
                      <p className="font-['Pretendard'] font-semibold text-[16px] xl:text-[18px] text-[#364153] tracking-[-1px] whitespace-nowrap">
                        기업 유형 선택
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-[4px]">
                      {["스타트업/중소기업", "일반 기업", "공공기관/금융"].map((label) => (
                        <button key={label} onClick={() => setSelectedCompany(label)}
                          className={`rounded-full px-[14px] py-[12px] font-['Pretendard'] font-medium text-[14px] h-[44px] border transition-colors whitespace-nowrap ${
                            selectedCompany === label ? "border-[#155dfc] text-[#155dfc]" : "border-[#d1d5dc] text-[#364153]"
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 도메인 범위 선택 */}
                  <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-0">
                    <div className="flex items-center gap-[12px] shrink-0 sm:w-[146px]">
                      <img alt="" className="size-[8px] shrink-0" src={imgBullet} />
                      <p className="font-['Pretendard'] font-semibold text-[16px] xl:text-[18px] text-[#364153] tracking-[-1px] whitespace-nowrap">
                        도메인 범위 선택
                      </p>
                    </div>
                    <div className="flex flex-wrap gap-[4px]">
                      {["단일 도메인", "와일드카드", "멀티 도메인"].map((label) => (
                        <button key={label} onClick={() => setSelectedDomain(label)}
                          className={`rounded-full px-[20px] py-[12px] font-['Pretendard'] font-medium text-[14px] h-[44px] border transition-colors whitespace-nowrap ${
                            selectedDomain === label ? "border-[#155dfc] text-[#155dfc]" : "border-[#d1d5dc] text-[#364153]"
                          }`}>
                          {label}
                        </button>
                      ))}
                    </div>
                  </div>

                </div>
              </div>

              {/* 모바일 CTA 버튼 */}
              <button
                className={`xl:hidden w-full mt-4 flex items-center justify-center rounded-[12px] h-[52px] transition-colors cta-btn${allSelected ? ' selected' : ''}`}
              >
                <p className="font-['Pretendard'] font-bold text-[18px] text-white text-center tracking-[-1px] leading-[1.4]">
                  인증서 찾기
                </p>
              </button>

              {/* 원형 CTA 버튼 (데스크탑 전용) */}
              <button
                className={`hidden xl:flex absolute z-20 items-center justify-center rounded-[80px] size-[120px] transition-colors cta-btn cta-btn-desktop${allSelected ? ' selected' : ''}`}
              >
                <p className="font-['Pretendard'] font-bold text-[20px] text-white text-center tracking-[-1px] leading-[1.4]">
                  인증서 찾기
                </p>
              </button>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════ 추천 상품 ══════════════ */}
      <section className="py-[80px] xl:py-[125px] bg-[#f4f6f9]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <p className="font-['Pretendard'] font-bold text-[28px] xl:text-[40px] text-[#303336] text-center tracking-[-1px] leading-[40px] mb-5">
            Certgo 추천 상품
          </p>
          <p className="font-['Pretendard'] font-medium text-[16px] xl:text-[20px] text-[#7d8ba0] text-center leading-[1.5] mb-10">
            복잡한 절차 없이 빠르게. 비즈니스 환경에 최적화된 맞춤형 보안 인증 라인업입니다.
          </p>

          {/* 탭 — 원본과 동일하게 중앙 정렬 */}
          <div className="grid grid-cols-2 min-[581px]:flex min-[581px]:flex-nowrap justify-center gap-[8px] pb-1 mb-8">
            {[
              { key: 'bestseller', label: '베스트셀러' },
              { key: 'value',      label: '가성비 추천' },
              { key: 'public',     label: '공공기관/금융' },
              { key: 'codesign',   label: 'CodeSign' },
            ].map(({ key, label }) => (
              <button
                key={key}
                onClick={() => setActiveTab(key)}
                className={`shrink-0 flex items-center justify-center h-[52px] xl:h-[60px] px-[28px] xl:px-[40px] py-[14px] rounded-[8px] font-['Pretendard'] font-medium text-[16px] xl:text-[20px] whitespace-nowrap transition-colors ${
                  activeTab === key
                    ? "bg-[#303336] text-white shadow-[0px_10px_7.5px_rgba(0,0,0,0.1)]"
                    : "bg-white text-[#364153]"
                }`}
              >
                {label}
              </button>
            ))}
          </div>

          {/* 카드 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6 pt-4">
            {PRODUCTS[activeTab].map((product, i) => (
              <ProductCard
                key={`${activeTab}-${i}`}
                provider={product.provider}
                title={product.name}
                features={product.features}
                price={product.price}
                headerColor={product.headerColor}
                certId={product.certId}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════ WHY CERTGO ══════════════ */}
      <section className="py-[80px] xl:py-[120px] bg-white">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <p ref={whyTitleRef} className={`fade-up${whyTitleInView ? ' visible' : ''} font-['Pretendard'] font-bold text-[28px] xl:text-[40px] text-[#303336] text-center tracking-[-1px] leading-[40px] mb-12 xl:mb-16`}>
            보안 전문가들이 Certgo를 선택하는 이유
          </p>

          {/* 상단 이미지 2장 */}
          <div ref={whyImg1Ref} className={`fade-up${whyImg1InView ? ' visible' : ''} grid grid-cols-1 md:grid-cols-2 gap-5 mb-6`}>
            <div className="relative h-[220px] xl:h-[320px] rounded-[12px] overflow-hidden">
              <img alt="" className="absolute inset-0 w-full h-full object-cover object-top" src={images1} />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.7)] from-[12%] to-transparent rounded-[12px]" />
              <p className="absolute font-['Pretendard'] font-bold text-[24px] xl:text-[32px] text-white text-center leading-[1.4] whitespace-nowrap left-1/2 -translate-x-1/2 top-[28px]">
                보안 전문성
              </p>
            </div>
            <div className="relative h-[220px] xl:h-[320px] rounded-[12px] overflow-hidden">
              <img alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" src={images2} />
              <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.8)] from-[17%] to-[39%] to-transparent rounded-[12px]" />
              <p className="absolute font-['Pretendard'] font-bold text-[24px] xl:text-[32px] text-white text-center leading-[1.4] whitespace-nowrap left-1/2 -translate-x-1/2 top-[28px]">
                통합 관리
              </p>
            </div>
          </div>

          {/* 상단 특징 텍스트 */}
          <div ref={whyText1Ref} className={`fade-up${whyText1InView ? ' visible' : ''} grid grid-cols-1 md:grid-cols-2 gap-5 mb-10 xl:mb-14`}>
            <div className="flex flex-col gap-[8px] items-center text-center">
              <p className="font-['Pretendard'] font-bold text-[20px] xl:text-[28px] text-[#3c4043] tracking-[-1px] leading-[1.4]">지란지교 패밀리의 신뢰</p>
              <p className="font-['Pretendard'] text-[16px] xl:text-[20px] text-[#566376] leading-[1.5]">대한민국 1세대 보안 그룹의 노하우가 집약된 안전한 서비스.</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center text-center">
              <p className="font-['Pretendard'] font-bold text-[20px] xl:text-[28px] text-[#3c4043] tracking-[-1px] leading-[1.4]">스마트한 인증서 라이프 사이클</p>
              <p className="font-['Pretendard'] text-[16px] xl:text-[20px] text-[#566376] leading-[1.5]">발급부터 갱신 알림까지, 누락 없는 완벽한 대시보드 제공.</p>
            </div>
          </div>

          {/* 하단 이미지 2장 */}
          <div ref={whyImg2Ref} className={`fade-up${whyImg2InView ? ' visible' : ''} grid grid-cols-1 md:grid-cols-2 gap-5 mb-6`}>
            <div className="relative h-[220px] xl:h-[344px] rounded-[12px] overflow-hidden">
              <img alt="" className="absolute inset-0 w-full h-full object-cover object-bottom" src={images3} />
              <p className="absolute font-['Pretendard'] font-bold text-[24px] xl:text-[32px] text-white text-center leading-[1.4] whitespace-nowrap left-1/2 -translate-x-1/2 top-[28px]">
                기술 지원
              </p>
            </div>
            <div className="relative h-[220px] xl:h-[344px] rounded-[12px] overflow-hidden">
              <img alt="" className="absolute inset-0 w-full h-full object-cover" src={images4} />
              <p className="absolute font-['Pretendard'] font-bold text-[24px] xl:text-[32px] text-white text-center leading-[1.4] whitespace-nowrap left-1/2 -translate-x-1/2 top-[28px]">
                간편 발급
              </p>
            </div>
          </div>

          {/* 하단 특징 텍스트 */}
          <div ref={whyText2Ref} className={`fade-up${whyText2InView ? ' visible' : ''} grid grid-cols-1 md:grid-cols-2 gap-5`}>
            <div className="flex flex-col gap-[8px] items-center text-center">
              <p className="font-['Pretendard'] font-bold text-[20px] xl:text-[28px] text-[#3c4043] tracking-[-1px] leading-[1.4]">인프라 전문가의 밀착 지원</p>
              <p className="font-['Pretendard'] text-[16px] xl:text-[20px] text-[#566376] leading-[1.5]">서버 환경을 이해하는 엔지니어의 정확한 트러블슈팅.</p>
            </div>
            <div className="flex flex-col gap-[8px] items-center text-center">
              <p className="font-['Pretendard'] font-bold text-[20px] xl:text-[28px] text-[#3c4043] tracking-[-1px] leading-[1.4]">압도적으로 빠른 발급 프로세스</p>
              <p className="font-['Pretendard'] text-[16px] xl:text-[20px] text-[#566376] leading-[1.5]">복잡한 서류 절차는 줄이고, 자동화 시스템으로 발급 시간 극대화.</p>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FAQ ══════════════ */}
      <section className="bg-[#224791] py-[80px] xl:py-[136px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row gap-10 xl:gap-[100px]">
            {/* 좌측 */}
            <div className="xl:w-[340px] shrink-0">
              <p className="font-['Pretendard'] font-bold text-[32px] xl:text-[44px] text-white tracking-[-1px] leading-[48px] mb-4">
                자주 묻는 질문
              </p>
              <div className="font-['Pretendard'] font-medium text-[16px] xl:text-[18px] text-white leading-[1.5] mb-8">
                <p>원하는 답변이 없다면 1:1 기술 지원 서비스를 </p>
                <p>통해 상담을 도와드리겠습니다.</p>
              </div>
              <button className="bg-[#2554b1] font-['Pretendard'] font-medium text-[18px] xl:text-[22px] text-white leading-[1.5] px-[40px] xl:px-[50px] py-[14px] xl:py-[16px] rounded-[8px] whitespace-nowrap hover:bg-[#1d43a0] transition-colors">
                기술지원 상담하기
              </button>
            </div>

            {/* 아코디언 */}
            <div className="flex-1 min-w-0">
              <FAQAccordion />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════ FOOTER ══════════════ */}
      <Footer />
    </div>
  );
}

/* ─── 스크롤 애니메이션 훅 ─── */
function useInView() {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.15 });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);
  return [ref, inView];
}

/* ─── 상품 카드 ─── */
function ProductCard({ provider, title, features, price, headerColor, certId }) {
  const logoInfo = LOGO_MAP[provider];
  return (
    <div className="relative bg-white rounded-[12px] overflow-visible flex flex-col product-card">
      {/* 컬러 헤더 */}
      <div className="relative h-[200px] rounded-t-[12px] product-header" style={{ '--header-color': headerColor }}>
        {/* 로고 배지 */}
        <div className="absolute bg-white h-[38px] left-[32px] rounded-[6px] top-[28px] w-[120px] flex items-center justify-center overflow-hidden px-2">
          {logoInfo
            ? <img alt={provider} src={logoInfo.src} className="product-logo-img" />
            : <span className="font-['Pretendard'] font-bold text-[13px] text-[#303336]">{provider}</span>
          }
        </div>

        {/* 메달 배지 */}
        <img alt="Best" src={medal} className="absolute product-medal" />

        {/* 상품명 */}
        {certId ? (
          <Link
            to={`/tls-ssl/${certId}`}
            className="absolute font-['Pretendard'] font-semibold text-[22px] xl:text-[26px] text-white leading-[28px] left-[28px] bottom-[20px] hover:underline"
          >
            {title}
          </Link>
        ) : (
          <p className="absolute font-['Pretendard'] font-semibold text-[22px] xl:text-[26px] text-white leading-[28px] left-[28px] bottom-[20px]">
            {title}
          </p>
        )}
      </div>

      {/* 본문 */}
      <div className="flex flex-col flex-1 px-[25px] pt-[20px] pb-[24px]">
        {/* 특징 */}
        <div className="flex flex-col gap-[8px] flex-1 mb-[16px]">
          {features.map((feat) => (
            <div key={feat} className="flex items-center gap-[8px] h-[20px]">
              <span className="font-['Pretendard'] text-[14px] text-[#00b277] leading-[20px] shrink-0">✓</span>
              <span className="font-['Pretendard'] font-medium text-[16px] xl:text-[18px] text-[#566376] leading-[20px] whitespace-nowrap">{feat}</span>
            </div>
          ))}
        </div>

        {/* 가격 */}
        <p className="font-['Pretendard'] font-bold text-[24px] xl:text-[28px] text-[#303336] leading-[1.4] mb-[16px]">
          {price}
        </p>

        {/* 버튼 */}
        <div className="flex gap-[8px]">
          <Link
            to="/cart"
            className="flex-1 flex items-center justify-center gap-[6px] bg-white border border-[#54595e] shadow-[0px_2px_0px_rgba(0,0,0,0.08)] py-[12px] rounded-[4px] font-['Pretendard'] font-medium text-[14px] text-[#303336] whitespace-nowrap"
          >
            <img alt="" className="size-[16px]" src={imgCartIcon} />
            장바구니
          </Link>
          <Link
            to="/apply"
            className="flex-1 flex items-center justify-center bg-white border border-[#54595e] shadow-[0px_2px_0px_rgba(0,0,0,0.08)] py-[12px] rounded-[4px] font-['Pretendard'] font-medium text-[14px] text-[#303336] whitespace-nowrap"
          >
            신청하기
          </Link>
        </div>
      </div>
    </div>
  );
}

/* ─── FAQ 아코디언 ─── */
function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <div>
      {FAQ_ITEMS.map((item, i) => {
        const isOpen = openIndex === i;
        return (
          <div key={i}>
            <div className="border-t border-[#3a5faa]" />
            <button
              className="w-full flex gap-[12px] items-center py-[22px] xl:py-[26px] text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <img alt="" className="shrink-0 size-[20px]" src={imgSupportIcon} />
              <p className="font-['Pretendard'] font-medium text-[15px] xl:text-[20px] text-[#d6e0f5] leading-[1.4] flex-1">
                {item.q}
              </p>
              <img
                alt=""
                src={imgArrow}
                className={`faq-arrow${isOpen ? ' open' : ''}`}
              />
            </button>
            <div className={`faq-body${isOpen ? ' open' : ''}`}>
              <div className="faq-body-inner">
                <p className="font-['Pretendard'] text-[14px] xl:text-[18px] text-[#c2c9d6] leading-[1.6] pb-[26px] pl-[32px] pr-[40px]">
                  {item.a}
                </p>
              </div>
            </div>
          </div>
        );
      })}
      <div className="border-t border-[#3a5faa]" />
    </div>
  );
}
