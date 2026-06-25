import { useRef, useState, useEffect } from 'react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import './WhyCertgo.css';

function useInView(threshold = 0.2) {
  const ref = useRef(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold, rootMargin: '0px 0px -100px 0px' });
    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold]);
  return [ref, inView];
}

import imgBanner from '../assets/visual.png';
import imgCert1 from '../assets/images1.png';
import imgCert2 from '../assets/images2.png';
import imgCert3 from '../assets/images3.png';
import imgCert4 from '../assets/images4.png';
import imgServiceBg from '../assets/visual3.png';
import imgC1 from '../assets/icon-manager.svg';
import imgC2 from '../assets/icon-dashboard.svg';
import imgC3 from '../assets/icon-alert.svg';
import imgC4 from '../assets/icon-verified.svg';
import imgC5 from '../assets/icon-settings.svg';
import imgC6 from '../assets/icon-refresh.svg';
import imgSafety from '../assets/icon-shield.svg';
import imgTeamwork from '../assets/icon-teamwork.svg';
import imgMap from '../assets/icon-map.svg';
import imgStatistics from '../assets/icon-statistics.svg';

const CERT_TYPES = [
  {
    num: '1',
    title: '싱글 인증서',
    sub: 'Single Domain Certificate',
    desc: '단일 도메인 환경에 적합한 기본 SSL/TLS 인증서. 빠른 발급과 합리적인 가격으로 소규모 서비스에 최적화',
    img: imgCert1,
  },
  {
    num: '2',
    title: '와일드카드 인증서',
    sub: 'Wildcard Certificate',
    desc: '*.example.com 형태로 모든 서브도메인을 커버. 개발/스테이징 환경 분리 시 관리 효율 극대화',
    img: imgCert2,
  },
  {
    num: '3',
    title: '멀티 도메인 인증서',
    sub: 'Multi-Domain Certificate',
    desc: '하나의 인증서로 최대 250개 도메인 보호. 여러 브랜드/서비스를 운영하는 엔터프라이즈 환경에 필수',
    img: imgCert3,
  },
  {
    num: '4',
    title: '발급 전 설계 제안',
    sub: 'Pre-Issuance Design Proposal',
    desc: '인프라 구조 분석 후 최적의 인증서 타입과 수량을 제안. 과도한 구매 방지 및 TCO 최소화',
    img: imgCert4,
  },
];

const TRUST_CARDS = [
  {
    icon: imgSafety,
    size: 70,
    title: '신뢰의 certgo',
    desc: 'DigiCert, Sectigo, GlobalSign 등 글로벌 CA와의 공식 파트너십. 국내 금융권, 공공기관, 대기업 50,000+ 고객이 선택한 대한민국 1위 인증서 플랫폼',
  },
  {
    icon: imgMap,
    size: 80,
    title: '현장에서 다져진 기술',
    desc: 'Apache, Nginx, IIS, Tomcat, AWS ELB/ALB, Azure App Service, GCP Load Balancer. 모든 주요 플랫폼의 설치 가이드와 트러블슈팅 지원',
  },
  {
    icon: imgTeamwork,
    size: 70,
    title: '구매 후가 진짜 시작',
    desc: '발급 후 방치가 아닌, 전담 매니저의 생애주기 관리. 만료 30일 전 자동 알림, 갱신 프로세스 가이드, 긴급 재발급 지원까지',
  },
  {
    icon: imgStatistics,
    size: 70,
    title: '인증서 자동갱신',
    desc: 'ACME 프로토콜 기반 자동 갱신으로 유효기간 단축 리스크 제로화. 47일마다 갱신해야 하는 미래에도 무중단 보호',
  },
];

const SERVICE_CARDS = [
  { icon: imgC1, title: '전문 담당자 지정', desc: 'CSR 생성부터 발급, 설치까지 1:1 전담 매니저가 전 과정을 케어합니다' },
  { icon: imgC2, title: '만료일 통합 관리', desc: '여러 도메인의 인증서를 한 눈에. My certgo 대시보드에서 실시간 현황 확인' },
  { icon: imgC3, title: '만료 알림 서비스', desc: '이메일/SMS/Slack 웹훅 연동으로 만료 3일/7일/1일 전 자동 알림' },
  { icon: imgC4, title: '테스트 인증서 제공', desc: '프로덕션 적용 전 스테이징 환경에서 검증할 수 있는 테스트 인증서 무료 제공' },
  { icon: imgC5, title: '인프라 구조 최적화', desc: '현재 인프라 분석 후 와일드카드/멀티도메인 전환으로 비용 절감 컨설팅' },
  { icon: imgC6, title: '자동갱신 구축 지원', desc: "Let's Encrypt, ACME 프로토콜 기반 자동 갱신 파이프라인 구축 가이드" },
];

const CHART_POINTS = [
  { year: '2026', days: '최대 200일' },
  { year: '2027', days: '최대 100일' },
  { year: '2029', days: '최대 47일' },
];

export default function WhyCertgo() {
  const [certRef, certInView]       = useInView();
  const [trustRef, trustInView]     = useInView();
  const [serviceRef, serviceInView] = useInView();
  const [ctaRef, ctaInView]         = useInView();

  return (
    <div className="bg-white font-['Pretendard']">
      <NavBar />

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="pt-[80px] sm:pt-[100px] xl:pt-[140px] pb-0 overflow-hidden">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          {/* Badge - mobile only */}
          <p className="wc-hero-fade-up d1 xl:hidden font-semibold text-[#083691] text-[15px] mb-[10px]">
            인증서 유효기간 단축으로 관리 복잡도 급증
          </p>

          {/* ─── Desktop ─── */}
          <div className="hidden xl:block">

            {/* Title + bars: top-aligned so bars start at badge level */}
            <div className="wc-hero-fade-up d1 flex items-start">
              {/* Badge + Title + desc */}
              <div className="flex-1 flex flex-col gap-[40px]">
                <div>
                  <p className="font-semibold text-[#083691] text-[23px] mb-[10px]">
                    인증서 유효기간 단축으로 관리 복잡도 급증
                  </p>
                  <div className="font-bold text-[#303336] text-[54px] tracking-[-1px] leading-[1.3]">
                    <p>왜 보안전문가들은</p>
                    <p>Certgo와 함께할까요?</p>
                  </div>
                </div>
                <div className="text-[#4a5565] text-[20px] leading-[1.5]">
                  <p>멀티 클라우드, 하이브리드 인프라, 마이크로서비스 아키텍처까지.</p>
                  <p>인증서 관리는 이제 단순한 구매 문제가 아닙니다.</p>
                </div>
              </div>

              {/* 2 bars: 140px each, gap-[40px], 216px from text */}
              <div className="flex gap-[40px] shrink-0 ml-[216px] mr-[150px]">
                {/* 2027 bar */}
                <div className="flex flex-col items-center w-[140px]">
                  <div className="relative bg-[#f3f5f7] h-[200px] w-full">
                    <div
                      className="absolute bottom-0 inset-x-0 h-[20px]"
                      style={{ background: 'linear-gradient(to bottom, #00b277, #0080ff)' }}
                    />
                  </div>
                  <div className="mt-[20px] text-center">
                    <p className="font-bold text-[#101828] text-[30px] leading-[1.2]">연 1회</p>
                    <p className="text-[#566376] text-[18px] leading-[1.55]">이전 갱신 빈도</p>
                  </div>
                </div>
                {/* 2029 bar */}
                <div className="flex flex-col items-center w-[140px]">
                  <div className="relative bg-[#f3f5f7] h-[200px] w-full">
                    <div
                      className="absolute bottom-0 inset-x-0 h-[160px]"
                      style={{ background: 'linear-gradient(197.82deg, #00b277 10.976%, #0080ff 100%)' }}
                    />
                  </div>
                  <div className="mt-[20px] text-center">
                    <p className="font-bold text-[#e7000b] text-[30px] leading-[1.2]">연 8회</p>
                    <p className="text-[#566376] text-[18px] leading-[1.55]">2029년 예상 빈도</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Timeline: 874px wide, dots at Figma proportions */}
            <div className="wc-hero-fade-up d2 w-[874px] mt-[80px] ml-[80px]">
              <div className="relative h-[20px]">
                <div className="absolute top-1/2 h-px bg-[#155dfc] -translate-y-1/2 right-0" style={{ left: '15%' }} />
                {['15%', '58%', '100%'].map((left, i) => (
                  <div
                    key={i}
                    className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[20px] h-[20px] rounded-full bg-[#155dfc]"
                    style={{ left }}
                  />
                ))}
              </div>

              {/* Year + days labels absolutely positioned to match dots */}
              <div className="relative mt-3 h-[80px]">
                {CHART_POINTS.map(({ year, days }, i) => (
                  <div
                    key={year}
                    className="absolute -translate-x-1/2 flex flex-col gap-[12px] items-center"
                    style={{ left: ['15%', '58%', '100%'][i] }}
                  >
                    <p className="font-medium text-[#909eb2] text-[28px] uppercase leading-none">{year}</p>
                    <p className="font-extrabold text-[#083691] text-[36px] leading-none whitespace-nowrap">{days}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ─── Mobile ─── */}
          <div className="xl:hidden flex flex-col gap-6">
            <div className="font-bold text-[#303336] text-[28px] sm:text-[38px] tracking-[-1px] leading-[1.3]">
              <p>왜 보안전문가들은</p>
              <p>Certgo와 함께할까요?</p>
            </div>
            <div className="text-[#4a5565] text-[14px] sm:text-[16px] leading-[1.5]">
              <p>멀티 클라우드, 하이브리드 인프라, 마이크로서비스 아키텍처까지.</p>
              <p>인증서 관리는 이제 단순한 구매 문제가 아닙니다.</p>
            </div>

            {/* Mobile: 2 bars only, centered */}
            <div className="flex justify-center gap-4">
              {/* 2027 bar */}
              <div className="flex flex-col items-center w-[140px]">
                <div className="relative bg-[#f3f5f7] h-[120px] w-full">
                  <div className="absolute bottom-0 inset-x-0 h-[12px]"
                    style={{ background: 'linear-gradient(to bottom, #00b277, #0080ff)' }} />
                </div>
                <div className="mt-2 text-center">
                  <p className="font-bold text-[#101828] text-[18px] leading-[1.2]">연 1회</p>
                  <p className="text-[#566376] text-[12px] leading-[1.55]">이전 갱신 빈도</p>
                </div>
              </div>
              {/* 2029 bar */}
              <div className="flex flex-col items-center w-[140px]">
                <div className="relative bg-[#f3f5f7] h-[120px] w-full">
                  <div className="absolute bottom-0 inset-x-0 h-[96px]"
                    style={{ background: 'linear-gradient(197.82deg, #00b277 10.976%, #0080ff 100%)' }} />
                </div>
                <div className="mt-2 text-center">
                  <p className="font-bold text-[#e7000b] text-[18px] leading-[1.2]">연 8회</p>
                  <p className="text-[#566376] text-[12px] leading-[1.55]">2029년 예상 빈도</p>
                </div>
              </div>
            </div>

            {/* Mobile timeline */}
            <div className="relative h-[14px]">
              <div className="absolute top-1/2 left-0 right-0 h-px bg-[#c2c9d6] -translate-y-1/2" />
              {['0%', '50%', '100%'].map((left, i) => (
                <div key={i}
                  className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-[14px] h-[14px] rounded-full bg-[#155dfc]"
                  style={{ left }} />
              ))}
            </div>

            {/* Mobile year labels */}
            <div className="flex justify-between">
              {CHART_POINTS.map(({ year, days }) => (
                <div key={year} className="flex flex-col gap-[4px] items-center text-center">
                  <p className="font-medium text-[#909eb2] text-[12px] uppercase leading-none">{year}</p>
                  <p className="font-extrabold text-[#083691] text-[14px] sm:text-[16px] leading-none whitespace-nowrap">{days}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      </section>

      {/* Banner image */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 mt-6 xl:mt-[90px]">
        <img
          alt=""
          src={imgBanner}
          className="w-full h-[60px] sm:h-[100px] xl:h-[160px] object-cover object-bottom pointer-events-none"
        />
      </div>

      {/* ══════════════════ CERT TYPES ══════════════════ */}
      <section className="bg-[#f3f5f7] py-[60px] xl:pt-[140px] xl:pb-[140px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          {/* Heading */}
          <div ref={certRef} className={`wc-fade-up${certInView ? ' visible' : ''} flex flex-col gap-[20px] items-center text-center mb-6 xl:mb-[60px]`}>
            <p className="font-bold text-[#303336] text-[17px] min-[400px]:text-[22px] xl:text-[40px] tracking-[-1px] leading-[1.3]">
              복잡한 환경일수록 certgo가 더 잘 맞습니다
            </p>
            <p className="font-medium text-[#7d8ba0] text-[12px] min-[400px]:text-[14px] xl:text-[20px] leading-[1.5]">
              다양한 인증서 타입과 발급 전 컨설팅으로 최적의 구성을 제안합니다
            </p>
          </div>

          {/* Cards */}
          <div className="flex flex-col gap-3">
            {CERT_TYPES.map((cert, idx) => (
              <div key={cert.num} className={`wc-fade-up d${idx + 1}${certInView ? ' visible' : ''} bg-white border border-[#e5e7eb] rounded-[12px] shadow-sm`}>

                {/* Mobile */}
                <div className="xl:hidden flex flex-col p-5 gap-4">
                  <div className="flex items-start gap-3">
                    <p className="font-['Roboto_Serif',serif] font-medium text-[#a3afc2] text-[48px] leading-none shrink-0">
                      {cert.num}
                    </p>
                    <div className="flex flex-col gap-1 pt-1">
                      <p className="font-bold text-[#303336] text-[20px] leading-[1.4]">{cert.title}</p>
                      <p className="font-medium text-[#0657f9] text-[13px] leading-[1.4]">{cert.sub}</p>
                    </div>
                  </div>
                  <p className="text-[#566376] text-[14px] leading-[1.55]">{cert.desc}</p>
                  <div className="w-[100px] h-[100px] rounded-[16px] overflow-hidden">
                    <img alt={cert.title} src={cert.img} className="w-full h-full object-cover" />
                  </div>
                </div>

                {/* Desktop */}
                <div className="hidden xl:flex items-start h-[240px] pl-[99px] pr-[50px] gap-[40px] pt-[40px]">
                  <p className="font-['Roboto_Serif',serif] font-medium text-[#a3afc2] text-[76px] leading-none shrink-0 w-[50px]">
                    {cert.num}
                  </p>
                  <div className="flex flex-col gap-[12px] flex-1">
                    <div className="flex flex-col leading-[1.4] w-[294px]">
                      <p className="font-bold text-[#303336] text-[32px]">{cert.title}</p>
                      <p className="font-medium text-[#0657f9] text-[20px]">{cert.sub}</p>
                    </div>
                    <p className="text-[#566376] text-[18px] leading-[1.55] max-w-[504px]">{cert.desc}</p>
                  </div>
                  <div className="w-[220px] h-[160px] rounded-[20px] overflow-hidden shrink-0">
                    <img alt={cert.title} src={cert.img} className="w-full h-full object-cover" />
                  </div>
                </div>

              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ TRUST ══════════════════ */}
      <section className="bg-[#224791] py-[60px] xl:pt-[140px] xl:pb-[140px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          {/* Heading */}
          <div ref={trustRef} className={`wc-fade-up${trustInView ? ' visible' : ''} flex flex-col gap-[20px] items-center text-center mb-10 xl:mb-[150px]`}>
            <p className="font-bold text-white text-[17px] min-[400px]:text-[22px] xl:text-[40px] tracking-[-1px] leading-[1.3]">
              같은 인증서라도, Certgo와 함께하면 다릅니다
            </p>
            <p className="font-medium text-white text-[14px] xl:text-[20px] leading-[1.5]">
              세계 최고 수준의 인증기관 및 국내 주요 기업과 함께합니다
            </p>
          </div>

          {/* 2×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {TRUST_CARDS.map((card, idx) => (
              <div
                key={card.title}
                className={`wc-fade-up d${idx + 1}${trustInView ? ' visible' : ''} bg-white rounded-[12px] shadow-sm p-[40px] flex gap-[28px] items-start min-h-[208px]`}
              >
                <img
                  alt=""
                  src={card.icon}
                  className="shrink-0"
                  style={{ width: card.size, height: card.size }}
                />
                <div className="flex flex-col gap-[8px]">
                  <p className="font-bold text-[#303336] text-[20px] xl:text-[28px] leading-[1.4]">{card.title}</p>
                  <p className="text-[#566376] text-[14px] xl:text-[18px] leading-[1.5]">{card.desc}</p>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════ SERVICE ══════════════════ */}
      <section className="relative py-[60px] xl:pt-[140px] xl:pb-[140px] overflow-hidden">
        <div className="absolute inset-0">
          <img alt="" src={imgServiceBg} className="w-full h-full object-cover" />
        </div>
        <div className="relative z-10 max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          {/* Heading */}
          <div ref={serviceRef} className={`wc-fade-up${serviceInView ? ' visible' : ''} flex flex-col gap-[20px] items-center text-center mb-6 xl:mb-[60px]`}>
            <p className="font-bold text-white text-[22px] xl:text-[40px] tracking-[-1px] leading-[1.3]">
              인증서 하나를 사도, certgo답게
            </p>
            <p className="font-medium text-white text-[14px] xl:text-[20px] leading-[1.5]">
              단순히 인증서를 파는 게 아니라, 당신의 인프라를 이해합니다
            </p>
          </div>

          {/* 3×2 grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
            {SERVICE_CARDS.map((card, idx) => (
              <div
                key={card.title}
                className={`wc-fade-up d${idx + 1}${serviceInView ? ' visible' : ''} rounded-[14px] p-[24px] flex flex-col min-h-[210px]`}
                style={{
                  background: 'rgba(255,255,255,0.15)',
                  backdropFilter: 'blur(4px)',
                  WebkitBackdropFilter: 'blur(4px)',
                  border: '1px solid rgba(255,255,255,0.2)',
                }}
              >
                <div className="bg-[#155dfc] rounded-full w-[48px] h-[48px] flex items-center justify-center shrink-0">
                  <img alt="" src={card.icon} className="w-[48px] h-[48px]" />
                </div>
                <p className="font-bold text-white text-[20px] xl:text-[26px] leading-[28px] mt-[16px]">
                  {card.title}
                </p>
                <p className="text-white text-[14px] xl:text-[18px] leading-[1.4] mt-[12px]">
                  {card.desc}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ══════════════════ CTA ══════════════════ */}
      <section className="py-[80px] xl:py-[120px]">
        <div ref={ctaRef} className="max-w-[648px] mx-auto px-4 flex flex-col gap-[40px] xl:gap-[60px] items-center">
          <div className={`wc-fade-up${ctaInView ? ' visible' : ''} text-center flex flex-col gap-[24px] xl:gap-[32px]`}>
            <p className="font-bold text-[#303336] text-[30px] xl:text-[52px] tracking-[-1px] leading-[1.3]">
              인증서, 이제 certgo로 GO!
            </p>
            <div className="font-medium text-[#7d8ba0] text-[14px] xl:text-[20px] leading-[1.5]">
              <p>복잡해진 인증서 관리, 혼자 고민하지 마세요.</p>
              <p>지란지교 보안 그룹의 15년 노하우가 당신의 인프라를 지킵니다.</p>
            </div>
          </div>
          <div className={`wc-fade-up d2${ctaInView ? ' visible' : ''} flex flex-col sm:flex-row gap-2 w-full`}>
            <button className="bg-[#155dfc] hover:bg-[#1251e0] flex-1 min-h-[64px] sm:min-h-[80px] rounded-[10px] font-bold text-white text-[16px] xl:text-[20px] leading-[24px] transition-colors">
              서비스 도입 문의하기
            </button>
            <button className="border-2 border-[#083691] hover:bg-[#083691] flex-1 min-h-[64px] sm:min-h-[80px] rounded-[10px] font-bold text-[#083691] hover:text-white text-[16px] xl:text-[20px] leading-[24px] transition-colors">
              제품 견적 문의
            </button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
