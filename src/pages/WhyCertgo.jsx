// Figma: Certgo - "why" frame (node 48:1333)
import { useEffect, useRef, useState } from 'react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import imgVisual from '../assets/visual.png';
import imgVisual2 from '../assets/visual2.png';
import imgUnion from '../assets/Union.png';
import imgUnion2 from '../assets/Union2.png';
import logoDigiCert from '../assets/DigiCertLogo.svg';
import logoSectigo from '../assets/sectigo-logo.svg';
import logoGlobalSign from '../assets/globalsign.svg';
import logoGeoTrust from '../assets/GeoTrustLogo 1.svg';
import logoThawte from '../assets/thawte.svg';
import imgCard1 from '../assets/images1.png';
import imgCard2 from '../assets/images2.png';
import imgCard3 from '../assets/images3.png';
import imgCard4 from '../assets/images4.png';

const REASONS = [
  {
    num: '1',
    title: '보안 전문성',
    sub: '지란지교의 노하우가 담긴 독보적 안전성',
    desc: '지란지교의 오랜 보안 노하우를 바탕으로 업계 최고 수준의 안정성을 제공합니다. 글로벌 표준 보안 규격과 최신 암호화 알고리즘을 적용하여 데이터 유출 위협을 완벽히 차단합니다. 수많은 기업이 선택한 검증된 기술력으로 귀사의 디지털 자산을 가장 안전하게 보호해 드립니다.',
    img: imgCard1,
  },
  {
    num: '2',
    title: '통합 관리',
    sub: '지란지교의 노하우가 담긴 독보적 안전성',
    desc: '인증서의 신청부터 발급, 갱신 주기까지 모든 과정을 하나의 스마트 대시보드에서 관리하세요. 복잡하게 흩어져 있던 여러 인증서 현황을 직관적인 UI를 통해 한눈에 파악하고 제어할 수 있습니다. 갱신 시점을 놓치지 않도록 제공되는 자동 알림 시스템으로 서비스 중단 없는 안정적인 운영이 가능합니다.',
    img: imgCard2,
  },
  {
    num: '3',
    title: '기술 지원',
    sub: '지란지교의 노하우가 담긴 독보적 안전성',
    desc: '단순한 발급을 넘어 서버 환경과 인프라를 정확히 이해하는 보안 전문가가 1:1 밀착 케어를 제공합니다. 설치 과정에서 발생하는 까다로운 기술적 변수에도 막힘없는 해결책을 제시하여 사용자의 부담을 덜어드립니다. 운영 중 발생하는 긴급 상황이나 궁금증에 대해 실시간 전문 엔지니어 상담으로 신속하게 대응합니다.',
    img: imgCard3,
  },
  {
    num: '4',
    title: '신속 발급',
    sub: '지란지교의 노하우가 담긴 독보적 안전성',
    desc: '고도화된 자동화 시스템을 통해 대기 시간 없이 신청 즉시 발급이 가능한 압도적인 속도를 경험하세요. 불필요한 서류 절차와 복잡한 검증 단계를 간소화하여 비즈니스에 필요한 보안을 적시에 구축할 수 있습니다. 가장 빠른 발급 프로세스로 긴급한 프로젝트 오픈이나 인증서 교체 상황에서도 지연 없는 업무 처리를 보장합니다.',
    img: imgCard4,
  },
];

/**
 * 요소가 뷰포트에 진입하면 한 번 트리거되는 훅
 * immediate=true 이면 마운트 직후 실행 (히어로용)
 */
function useReveal(delay = 0, immediate = false) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (immediate) {
      const t = setTimeout(() => setVisible(true), 60);
      return () => clearTimeout(t);
    }
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); obs.disconnect(); } },
      { rootMargin: '0px 0px -50px 0px', threshold: 0 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return [ref, {
    opacity: visible ? 1 : 0,
    transform: visible ? 'translateY(0)' : 'translateY(26px)',
    transition: `opacity 0.72s ease-out ${delay}ms, transform 0.72s cubic-bezier(0.25, 0.46, 0.45, 0.94) ${delay}ms`,
  }];
}

/** 스크롤 시 개별 애니메이션이 필요한 이유 카드 */
function ReasonCard({ num, title, sub, desc, img }) {
  const [ref, style] = useReveal(0);
  return (
    <div
      ref={ref}
      style={style}
      className="bg-white border border-[#e5e7eb] rounded-[12px] shadow-sm xl:relative xl:h-[293px]"
    >
      {/* 모바일 레이아웃 */}
      <div className="xl:hidden flex flex-col p-6 gap-4">
        <div className="flex items-start gap-3">
          <p
            className="font-medium text-[#a3afc2] text-[40px] leading-none shrink-0 font-['Roboto_Serif',serif]"
          >{num}</p>
          <div className="flex flex-col gap-[4px] pt-2">
            <p className="font-bold text-[#303336] text-[20px] leading-[1.4]">{title}</p>
            <p className="font-medium text-[#0657f9] text-[14px] tracking-[-1px] leading-[1.4]">{sub}</p>
          </div>
        </div>
        <p className="text-[#566376] text-[14px] leading-[1.55]">{desc}</p>
        <div className="w-[100px] h-[100px] rounded-[24px] overflow-hidden self-start">
          <img alt={title} src={img} className="w-full h-full object-cover" />
        </div>
      </div>

      {/* 데스크탑 레이아웃 */}
      <p
        className="hidden xl:block absolute font-medium leading-none text-[#a3afc2] text-[76px] whitespace-nowrap left-[59px] top-[51px] font-['Roboto_Serif',serif]"
      >{num}</p>
      <div className="hidden xl:flex absolute flex-col gap-[20px] items-start left-[142px] top-[51px]">
        <div className="flex flex-col gap-[4px] w-[294px]">
          <p className="font-bold text-[#303336] text-[32px] leading-[1.4] whitespace-nowrap">{title}</p>
          <p className="font-medium text-[#0657f9] text-[20px] tracking-[-1px] leading-[1.4]">{sub}</p>
        </div>
        <p className="text-[#566376] text-[18px] leading-[1.55] max-w-[700px]">{desc}</p>
      </div>
      <div
        className="hidden xl:block absolute rounded-[40px] overflow-hidden left-[967px] top-1/2 -translate-y-1/2 w-[160px] h-[160px]"
      >
        <img alt={title} src={img} className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

/** 파트너 로고 개별 애니메이션 */
function LogoReveal({ alt, src, h, delay }) {
  const [ref, style] = useReveal(delay);
  return <img ref={ref} style={style} alt={alt} src={src} className={`${h} w-auto`} />;
}

export default function WhyCertgo() {
  // 히어로: 마운트 직후
  const [heroTitleRef, heroTitleStyle] = useReveal(0, true);
  const [heroStatsRef,  heroStatsStyle]  = useReveal(180, true);
  const [visualRef,    visualStyle]    = useReveal(320, true);

  // 스크롤 트리거
  const [reasonHeadRef,  reasonHeadStyle]  = useReveal(0);
  const [codesignHeadRef, codesignHeadStyle] = useReveal(0);
  const [leftCardRef,    leftCardStyle]    = useReveal(0);
  const [rightCardRef,   rightCardStyle]   = useReveal(120);
  const [partnerHeadRef, partnerHeadStyle] = useReveal(0);

  return (
    <div className="bg-white font-['Pretendard']">
      <NavBar />

      {/* ════════════════ HERO ════════════════ */}
      <section className="py-[60px] xl:pt-[120px] xl:pb-[140px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col xl:flex-row xl:justify-between gap-10 xl:gap-0">

            {/* 타이틀 */}
            <div
              ref={heroTitleRef}
              style={heroTitleStyle}
              className="flex flex-col gap-[24px] xl:gap-[40px] xl:w-[737px]"
            >
              <div className="font-bold text-[#303336] text-[28px] sm:text-[40px] xl:text-[54px] tracking-[-1px] leading-[1.3]">
                <p>왜 보안 전문가들은</p>
                <p>결국 certgo로 모일까요?</p>
              </div>
              <div className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5]">
                <p>지란지교 보안 그룹의 15년 역사와 함께,</p>
                <p>대한민국 디지털 보안의 표준을 만들어온 신뢰의 여정</p>
              </div>
            </div>

            {/* 통계 */}
            <div
              ref={heroStatsRef}
              style={heroStatsStyle}
              className="flex xl:flex-col gap-[30px] xl:gap-[40px] xl:items-end xl:text-right shrink-0"
            >
              <div className="flex flex-col gap-[8px]">
                <p className="font-extrabold text-[#083691] text-[44px] xl:text-[64px] leading-none">15+</p>
                <p className="font-medium text-[#4a5565] text-[13px] xl:text-[20px] uppercase">Years of Excellence</p>
              </div>
              <div className="flex flex-col gap-[8px]">
                <p className="font-extrabold text-[#083691] text-[44px] xl:text-[64px] leading-none">50,000+</p>
                <p className="font-medium text-[#4a5565] text-[13px] xl:text-[20px] uppercase">Trusted Clients</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 비주얼 배너 */}
      <div ref={visualRef} style={visualStyle} className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
        <img
          alt=""
          src={imgVisual}
          className="w-full h-[80px] sm:h-[120px] xl:h-[160px] object-cover object-bottom pointer-events-none"
        />
      </div>

      {/* ════════════════ 4가지 이유 ════════════════ */}
      <section className="bg-[#f4f6f9] py-[60px] xl:pt-[160px] xl:pb-[160px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <p
            ref={reasonHeadRef}
            style={reasonHeadStyle}
            className="font-bold text-[#303336] text-[26px] xl:text-[40px] tracking-[-1px] leading-[40px] text-center mb-8 xl:mb-[100px]"
          >
            전문가가 선택하는 4가지 이유
          </p>

          <div className="flex flex-col gap-4 xl:gap-[12px]">
            {REASONS.map((r) => <ReasonCard key={r.num} {...r} />)}
          </div>
        </div>
      </section>

      {/* ════════════════ CODESIGN 비교 ════════════════ */}
      <section className="relative py-[60px] xl:pt-[140px] xl:pb-[140px] bg-[#3d64b2] overflow-hidden">
        <img
          alt=""
          src={imgVisual2}
          className="absolute inset-0 w-full h-full object-cover pointer-events-none mix-blend-multiply"
        />
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          {/* 섹션 타이틀 */}
          <div
            ref={codesignHeadRef}
            style={codesignHeadStyle}
            className="text-center mb-12 xl:mb-[95px]"
          >
            <p className="font-bold text-white text-[22px] sm:text-[30px] xl:text-[40px] tracking-[-1px] leading-[1.3] mb-3">
              당신의 소프트웨어는 어떤 얼굴로 고객을 만납니까?
            </p>
            <p className="font-medium text-white text-[14px] xl:text-[20px] leading-[1.5]">
              코드사인 인증서로 달라지는 사용자 경험
            </p>
          </div>

          {/* 카드 2열 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[52px] sm:gap-6 xl:gap-[40px]">

            {/* 왼쪽 카드 */}
            <div ref={leftCardRef} style={leftCardStyle} className="relative pt-[44px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[170px] h-[88px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={imgUnion} />
                <p className="absolute font-bold text-white text-[20px] leading-[1.4] tracking-[-1px] text-center whitespace-nowrap w-full top-[19px]">
                  사용자 이탈 발생
                </p>
              </div>
              <div className="bg-white rounded-[20px] overflow-hidden">
                <div className="bg-[#ffd400] rounded-tl-[20px] rounded-tr-[20px] h-[69px] flex items-center px-8">
                  <p className="font-semibold text-[#303336] text-[16px] xl:text-[20px] leading-[1.4]">Windows에서 PC 보호</p>
                </div>
                <div className="p-6 xl:py-[40px] flex justify-center">
                  <div className="flex flex-col gap-[16px] xl:w-[371px]">
                    <p className="font-bold text-[#303336] text-[20px] xl:text-[24px] leading-none">알 수 없는 게시자</p>
                    <div className="text-[#566376] text-[13px] xl:text-[16px] leading-[1.55]">
                      <p>이 앱의 게시자를 확인할 수 없습니다.</p>
                      <p>실행하면 PC가 손상되거나 개인 정보가 노출될 수 있습니다.</p>
                    </div>
                    <div className="flex gap-[8px] xl:justify-center">
                      <button className="bg-[#e5e7eb] flex items-center justify-center py-[10px] rounded-[4px] font-medium text-[#364153] text-[14px] xl:text-[18px] flex-1 xl:flex-none xl:w-[160px]">실행 안 함</button>
                      <button className="bg-[#e5e7eb] flex items-center justify-center py-[10px] rounded-[4px] font-medium text-[#364153] text-[14px] xl:text-[18px] flex-1 xl:flex-none xl:w-[160px]">추가정보</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* 오른쪽 카드 */}
            <div ref={rightCardRef} style={rightCardStyle} className="relative pt-[44px]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 z-10 w-[170px] h-[88px]">
                <img alt="" className="absolute inset-0 w-full h-full" src={imgUnion2} />
                <p className="absolute font-bold text-white text-[20px] leading-[1.4] tracking-[-1px] text-center whitespace-nowrap w-full top-[19px]">
                  신뢰 기반 실행
                </p>
              </div>
              <div className="bg-white rounded-[20px] overflow-hidden">
                <div className="bg-[#e8e8e8] rounded-tl-[20px] rounded-tr-[20px] h-[69px] flex items-center px-8">
                  <p className="font-semibold text-[#303336] text-[16px] xl:text-[20px] leading-[1.4]">사용자 계정 컨트롤</p>
                </div>
                <div className="p-6 xl:py-[40px] flex justify-center">
                  <div className="flex flex-col gap-[16px] xl:w-[371px]">
                    <div className="flex items-baseline gap-3 flex-wrap">
                      <p className="font-bold text-[#303336] text-[20px] xl:text-[24px] leading-none">확인된 게시자</p>
                      <p className="font-semibold text-[#0657f9] text-[20px] xl:text-[24px] leading-none">SECURE Inc.</p>
                    </div>
                    <div className="text-[#566376] text-[13px] xl:text-[16px] leading-[1.55]">
                      <p>이 앱의 게시자를 확인할 수 없습니다.</p>
                      <p>실행하면 PC가 손상되거나 개인 정보가 노출될 수 있습니다.</p>
                    </div>
                    <div className="flex gap-[8px] xl:justify-center">
                      <button className="bg-[#155dfc] flex items-center justify-center py-[10px] rounded-[4px] font-medium text-white text-[14px] xl:text-[18px] flex-1 xl:flex-none xl:w-[160px]">예</button>
                      <button className="bg-[#e5e7eb] flex items-center justify-center py-[10px] rounded-[4px] font-medium text-[#364153] text-[14px] xl:text-[18px] flex-1 xl:flex-none xl:w-[160px]">아니요</button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ════════════════ 파트너 로고 ════════════════ */}
      <section className="py-[60px] xl:py-[100px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div
            ref={partnerHeadRef}
            style={partnerHeadStyle}
            className="flex flex-col gap-[20px] items-center text-center mb-10 xl:mb-[100px]"
          >
            <p className="font-bold text-[#303336] text-[26px] xl:text-[40px] tracking-[-1px] leading-[40px]">글로벌 기술력, 로컬의 신뢰</p>
            <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5]">
              세계 최고 수준의 인증기관 및 국내 주요 기업과 함께합니다
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-8 xl:gap-[60px]">
            <LogoReveal alt="Sectigo"    src={logoSectigo}    h="h-[20px] xl:h-[32px]" delay={0}   />
            <LogoReveal alt="GeoTrust"   src={logoGeoTrust}   h="h-[32px] xl:h-[56px]" delay={80}  />
            <LogoReveal alt="GlobalSign" src={logoGlobalSign} h="h-[26px] xl:h-[47px]" delay={160} />
            <LogoReveal alt="Thawte"     src={logoThawte}     h="h-[32px] xl:h-[62px]" delay={240} />
            <LogoReveal alt="DigiCert"   src={logoDigiCert}   h="h-[26px] xl:h-[45px]" delay={320} />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
