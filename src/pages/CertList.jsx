// Figma: Certgo - "list" frame (node 52:2535)
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import { useNavigate } from 'react-router';
import { X } from 'lucide-react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import logoSectigo from '../assets/sectigo-logo.svg';
import logoDigiCert from '../assets/DigiCertLogo.svg';
import logoGlobalSign from '../assets/globalsign.svg';
import logoGeoTrust from '../assets/GeoTrustLogo 1.svg';
import logoThawte from '../assets/thawte.svg';
import imgCartIcon from '../assets/Icon.png';
import iconRefresh from '../assets/Icon_Refresh.svg';

const LOGO_MAP = {
  Sectigo:    { src: logoSectigo,    w: 103.6, h: 18.9 },
  DigiCert:   { src: logoDigiCert,   w: 89.7,  h: 26.5 },
  GlobalSign: { src: logoGlobalSign, w: 102.3, h: 22.7 },
  GeoTrust:   { src: logoGeoTrust,   w: 90,    h: 24   },
  Thawte:     { src: logoThawte,     w: 86,    h: 27   },
};

const CERTS = [
  {
    id: 1, brand: 'Sectigo',    name: 'PositiveSSL Multi-Domain',
    features: ['최대 100개 도메인', 'DV 인증', '5분 내 발급'],
    price: '₩180,000', headerColor: '#00a870',
  },
  {
    id: 2, brand: 'DigiCert',   name: 'Secure Site Pro',
    features: ['최대 보상 한도 $175만', 'EV 인증', '암호화 강도 256-bit'],
    price: '₩850,000', headerColor: '#0586c7',
  },
  {
    id: 3, brand: 'GlobalSign', name: 'OrganizationSSL',
    features: ['OV 인증', '99.9% 브라우저 호환', '무료 재발급'],
    price: '₩420,000', headerColor: '#285abd',
  },
  {
    id: 4, brand: 'DigiCert',   name: 'Secure Site EV',
    features: ['최고 보안 등급', 'EV 인증', '공공기관 추천'],
    price: '₩1,200,000', headerColor: '#00a870',
  },
  {
    id: 5, brand: 'GlobalSign', name: 'Extended Validation',
    features: ['EV 인증', '금융권 적합', '법적 보호'],
    price: '₩980,000', headerColor: '#0586c7',
  },
  {
    id: 6, brand: 'Sectigo',    name: 'PositiveSSL',
    features: ['단일 도메인', 'DV 인증', '빠른 발급'],
    price: '₩45,000', headerColor: '#285abd',
  },
  {
    id: 7, brand: 'Sectigo',    name: 'PositiveSSL Wildcard',
    features: ['무제한 서브도메인', 'DV 인증', '자동 갱신 지원'],
    price: '₩320,000', headerColor: '#00a870',
  },
  {
    id: 8, brand: 'GeoTrust',   name: 'QuickSSL Premium',
    features: ['단일/와일드카드 선택', 'DV 인증', '10분 내 발급'],
    price: '₩130,000', headerColor: '#0586c7',
  },
  {
    id: 9, brand: 'Thawte',     name: 'SSL Web Server',
    features: ['OV 인증', '멀티 도메인 지원', '무료 재발급'],
    price: '₩360,000', headerColor: '#285abd',
  },
  {
    id: 10, brand: 'DigiCert',  name: 'Basic OV',
    features: ['기업 실사 인증', 'OV 인증', '최대 2년 유효'],
    price: '₩480,000', headerColor: '#00a870',
  },
  {
    id: 11, brand: 'GlobalSign', name: 'DomainSSL',
    features: ['단일 도메인', 'DV 인증', '99.9% 브라우저 호환'],
    price: '₩68,000', headerColor: '#0586c7',
  },
  {
    id: 12, brand: 'Thawte',    name: 'Wildcard SSL',
    features: ['무제한 서브도메인', 'DV 인증', '강력한 암호화'],
    price: '₩550,000', headerColor: '#285abd',
  },
];

const BRAND_OPTIONS = ['GlobalSign', 'DigiCert', 'Thawte', 'GeoTrust', 'Sectigo'];
const VALIDATION_OPTIONS = ['DV (도메인 인증)', 'OV (기업 인증)', 'EV (확장 인증)'];
const SCOPE_OPTIONS = ['단일 도메인 (Single)', '와일드카드 (Wildcard)', '멀티 도메인 (Multi)'];

function matchesValidation(cert, v) {
  if (!v) return true;
  if (v.startsWith('DV')) return cert.features.includes('DV 인증');
  if (v.startsWith('OV')) return cert.features.includes('OV 인증');
  if (v.startsWith('EV')) return cert.features.includes('EV 인증');
  return true;
}

function matchesScope(cert, s) {
  if (!s) return true;
  if (s.startsWith('단일')) return cert.features.includes('단일 도메인');
  if (s.startsWith('와일드')) return cert.features.includes('무제한 서브도메인');
  if (s.startsWith('멀티')) return cert.features.some(f => f.includes('최대') && f.includes('도메인')) || cert.features.includes('멀티 도메인 지원');
  return true;
}

export default function CertList() {
  const navigate = useNavigate();
  const [viewMode, setViewMode] = useState('grid');
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [selectedValidation, setSelectedValidation] = useState(null);
  const [selectedScope, setSelectedScope] = useState(null);
  const [showBrandDrop, setShowBrandDrop] = useState(false);
  const [showValidationDrop, setShowValidationDrop] = useState(false);
  const [showScopeDrop, setShowScopeDrop] = useState(false);

  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, []);

  const brandRef = useRef(null);
  const validationRef = useRef(null);
  const scopeRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (brandRef.current && !brandRef.current.contains(e.target)) setShowBrandDrop(false);
      if (validationRef.current && !validationRef.current.contains(e.target)) setShowValidationDrop(false);
      if (scopeRef.current && !scopeRef.current.contains(e.target)) setShowScopeDrop(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const filteredCerts = CERTS.filter(c =>
    (!selectedBrand || c.brand === selectedBrand) &&
    matchesValidation(c, selectedValidation) &&
    matchesScope(c, selectedScope)
  );

  const resetFilters = () => {
    setSelectedBrand(null);
    setSelectedValidation(null);
    setSelectedScope(null);
  };

  const sectionTitle = selectedBrand || selectedValidation || selectedScope || '추천 인증서';

  return (
    <div className="bg-white font-['Pretendard']">
      <NavBar />

      {/* ════════════ HERO ════════════ */}
      <section className="pt-[100px] xl:pt-[120px] pb-[40px] xl:pb-[60px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex flex-col gap-[12px] items-start xl:max-w-[737px]">
            <h1 className="font-bold text-[#101828] text-[32px] xl:text-[54px] leading-[1.3] tracking-[-1px]">
              인증서 전체 보기
            </h1>
            <p className="font-medium text-[#566376] text-[16px] xl:text-[20px] leading-[1.5]">
              비즈니스 규모와 용도에 최적화된 글로벌 브랜드 인증서를 한눈에 비교해 보세요.
            </p>
          </div>
        </div>
      </section>

      {/* ════════════ 필터 바 ════════════ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 mb-[22px] xl:mb-[40px]">
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-[8px] flex-wrap">

            {/* 브랜드 */}
            <div className="relative" ref={brandRef}>
              {selectedBrand ? (
                <button
                  onClick={() => setSelectedBrand(null)}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-[#101828] text-white rounded-full text-[14px] font-medium whitespace-nowrap"
                >
                  브랜드: {selectedBrand}
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => { setShowBrandDrop(v => !v); setShowValidationDrop(false); setShowScopeDrop(false); }}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-white border border-[#d1d5dc] rounded-full text-[14px] font-medium text-[#364153] hover:border-[#9ca3af] transition-colors whitespace-nowrap"
                >
                  브랜드
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-150 ${showBrandDrop ? 'rotate-180' : ''}`}>
                    <path d="M4 6l4 4 4-4" stroke="#6a7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showBrandDrop && !selectedBrand && (
                <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] py-[8px] min-w-[160px] z-50">
                  {BRAND_OPTIONS.map(b => (
                    <button key={b} onClick={() => { setSelectedBrand(b); setShowBrandDrop(false); }}
                      className="block w-full text-left px-[16px] py-[10px] text-[14px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors">
                      {b}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 인증등급 */}
            <div className="relative" ref={validationRef}>
              {selectedValidation ? (
                <button
                  onClick={() => setSelectedValidation(null)}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-[#101828] text-white rounded-full text-[14px] font-medium whitespace-nowrap"
                >
                  인증등급: {selectedValidation}
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => { setShowValidationDrop(v => !v); setShowBrandDrop(false); setShowScopeDrop(false); }}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-white border border-[#d1d5dc] rounded-full text-[14px] font-medium text-[#364153] hover:border-[#9ca3af] transition-colors whitespace-nowrap"
                >
                  인증등급
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-150 ${showValidationDrop ? 'rotate-180' : ''}`}>
                    <path d="M4 6l4 4 4-4" stroke="#6a7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showValidationDrop && !selectedValidation && (
                <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] py-[8px] min-w-[200px] z-50">
                  {VALIDATION_OPTIONS.map(v => (
                    <button key={v} onClick={() => { setSelectedValidation(v); setShowValidationDrop(false); }}
                      className="block w-full text-left px-[16px] py-[10px] text-[14px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors">
                      {v}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* 도메인 범위 */}
            <div className="relative" ref={scopeRef}>
              {selectedScope ? (
                <button
                  onClick={() => setSelectedScope(null)}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-[#101828] text-white rounded-full text-[14px] font-medium whitespace-nowrap"
                >
                  도메인 범위: {selectedScope}
                  <X className="w-4 h-4" />
                </button>
              ) : (
                <button
                  onClick={() => { setShowScopeDrop(v => !v); setShowBrandDrop(false); setShowValidationDrop(false); }}
                  className="flex items-center gap-[6px] h-[42px] px-[20px] bg-white border border-[#d1d5dc] rounded-full text-[14px] font-medium text-[#364153] hover:border-[#9ca3af] transition-colors whitespace-nowrap"
                >
                  도메인 범위
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" className={`transition-transform duration-150 ${showScopeDrop ? 'rotate-180' : ''}`}>
                    <path d="M4 6l4 4 4-4" stroke="#6a7282" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              )}
              {showScopeDrop && !selectedScope && (
                <div className="absolute top-[calc(100%+8px)] left-0 bg-white rounded-[12px] border border-[#e5e7eb] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] py-[8px] min-w-[220px] z-50">
                  {SCOPE_OPTIONS.map(s => (
                    <button key={s} onClick={() => { setSelectedScope(s); setShowScopeDrop(false); }}
                      className="block w-full text-left px-[16px] py-[10px] text-[14px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors">
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

          </div>

          <div className="flex items-center gap-[16px]">
            <button onClick={resetFilters} className="flex items-center gap-[6px] text-[14px] font-medium text-[#6a7282] hover:text-[#101828] transition-colors whitespace-nowrap">
              <img src={iconRefresh} alt="" className="size-[16px]" />
              필터 초기화
            </button>
            <div className="flex border border-[#d1d5dc] rounded-[10px] overflow-hidden h-[38px]">
              <button
                onClick={() => setViewMode('grid')}
                className={`w-[42px] flex items-center justify-center transition-colors ${viewMode === 'grid' ? 'bg-[#101828]' : 'bg-white hover:bg-[#f3f4f6]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <rect x="2" y="2" width="5" height="5" rx="1" fill={viewMode === 'grid' ? 'white' : '#6a7282'}/>
                  <rect x="9" y="2" width="5" height="5" rx="1" fill={viewMode === 'grid' ? 'white' : '#6a7282'}/>
                  <rect x="2" y="9" width="5" height="5" rx="1" fill={viewMode === 'grid' ? 'white' : '#6a7282'}/>
                  <rect x="9" y="9" width="5" height="5" rx="1" fill={viewMode === 'grid' ? 'white' : '#6a7282'}/>
                </svg>
              </button>
              <button
                onClick={() => setViewMode('list')}
                className={`w-[39px] flex items-center justify-center transition-colors ${viewMode === 'list' ? 'bg-[#101828]' : 'bg-white hover:bg-[#f3f4f6]'}`}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M2 4h12M2 8h12M2 12h12" stroke={viewMode === 'list' ? 'white' : '#6a7282'} strokeWidth="1.5" strokeLinecap="round"/>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ════════════ 섹션 헤더 ════════════ */}
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 mb-[20px] xl:mb-[40px]">
        <div className="bg-[#f4f6f9] rounded-[12px] flex items-center justify-between px-[40px] h-[80px]">
          <p className="font-semibold text-[#101828] text-[20px] xl:text-[24px]">{sectionTitle}</p>
          <p className="text-[#6a7282] text-[16px] xl:text-[18px]">{filteredCerts.length}개 상품</p>
        </div>
      </div>

      {/* ════════════ 카드 그리드 ════════════ */}
      {viewMode === 'grid' && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 mb-[80px] xl:mb-[100px]">
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[20px]">
            {filteredCerts.map((cert) => {
              const logoInfo = LOGO_MAP[cert.brand];
              return (
                <div
                  key={cert.id}
                  className="bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden shadow-[0px_1px_1.5px_rgba(0,0,0,0.1),0px_1px_1px_rgba(0,0,0,0.1)]"
                >
                  {/* 컬러 헤더 */}
                  <div className="relative h-[200px]" style={{ backgroundColor: cert.headerColor }}>
                    <div className="absolute bg-white rounded-[6px] flex items-center justify-center left-[32px] top-[28px] w-[120px] h-[38px]">
                      {logoInfo ? (
                        <img src={logoInfo.src} alt={cert.brand} style={{ width: logoInfo.w, height: logoInfo.h }} />
                      ) : (
                        <span className="text-[13px] font-bold text-[#303336]">{cert.brand}</span>
                      )}
                    </div>
                    <p
                      className="absolute font-medium text-white text-[22px] leading-[1.3] cursor-pointer hover:underline left-[28px] top-[140px]"
                      onClick={() => navigate(`/tls-ssl/${cert.id}`)}
                    >
                      {cert.name}
                    </p>
                  </div>

                  {/* 카드 본문 */}
                  <div className="px-[28px] pt-[20px] pb-[24px]">
                    <ul className="flex flex-col gap-[8px] mb-[20px]">
                      {cert.features.map((f) => (
                        <li key={f} className="flex items-center gap-[8px] text-[14px] text-[#4a5565] leading-[20px]">
                          <span className="text-[#00b277] font-bold shrink-0">✓</span>
                          {f}
                        </li>
                      ))}
                    </ul>
                    <p className="mb-[16px]">
                      <span className="text-[28px] font-semibold text-[#101828] tracking-[-1px]">{cert.price}</span>
                      <span className="text-[15px] text-[#6a7282] ml-[2px]">/년</span>
                    </p>
                    <div className="flex gap-[8px]">
                      <button
                        onClick={() => alert(`${cert.name} 장바구니에 추가되었습니다.`)}
                        className="flex-1 flex items-center justify-center gap-[6px] bg-white border border-[#54595e] shadow-[0px_2px_0px_rgba(0,0,0,0.08)] py-[10px] rounded-[4px] font-medium text-[14px] text-[#303336] whitespace-nowrap h-[44px]"
                      >
                        <img alt="" className="size-[16px]" src={imgCartIcon} />
                        장바구니
                      </button>
                      <button
                        onClick={() => navigate(`/tls-ssl/${cert.id}`)}
                        className="flex-1 flex items-center justify-center bg-white border border-[#54595e] shadow-[0px_2px_0px_rgba(0,0,0,0.08)] py-[10px] rounded-[4px] font-medium text-[14px] text-[#303336] whitespace-nowrap h-[44px]"
                      >
                        신청하기
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* ════════════ 리스트 뷰 ════════════ */}
      {viewMode === 'list' && (
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 mb-[80px] xl:mb-[100px]">
          <div className="flex flex-col gap-[8px]">
            {filteredCerts.map((cert) => {
              const logoInfo = LOGO_MAP[cert.brand];
              return (
                <div
                  key={cert.id}
                  className="bg-white border border-[#e5e7eb] rounded-[10px] px-[16px] sm:px-[20px] xl:px-[25px] py-[14px] xl:py-0 xl:h-[70px] flex flex-col sm:flex-row sm:items-center gap-[10px] sm:gap-[20px] xl:gap-[32px]"
                >
                  {/* 로고 + 상품명 (모바일: 한 행) */}
                  <div className="flex items-center gap-[12px] sm:gap-[20px] xl:gap-[32px] min-w-0">
                    <div className="bg-[#f4f6f9] rounded-[6px] flex items-center justify-center shrink-0 w-[90px] h-[32px]">
                      {logoInfo ? (
                        <img src={logoInfo.src} alt={cert.brand} style={{ width: logoInfo.w * 0.65, height: logoInfo.h * 0.65 }} />
                      ) : (
                        <span className="text-[11px] font-bold text-[#303336]">{cert.brand}</span>
                      )}
                    </div>
                    <p className="font-semibold text-[14px] xl:text-[16px] text-[#101828] sm:w-[180px] xl:w-[240px] sm:shrink-0 truncate">{cert.name}</p>
                  </div>

                  {/* 특징 (sm 이상에서만 표시) */}
                  <p className="hidden sm:block text-[13px] xl:text-[14px] text-[#6a7282] flex-1 overflow-hidden text-ellipsis whitespace-nowrap">
                    {cert.features.join(' | ')}
                  </p>

                  {/* 모바일 특징 (sm 미만) */}
                  <p className="sm:hidden text-[12px] text-[#6a7282] leading-[1.4]">
                    {cert.features.join(' · ')}
                  </p>

                  {/* 가격 + 버튼 */}
                  <div className="flex items-center gap-[12px] xl:gap-[20px] shrink-0 sm:ml-auto">
                    <p className="font-semibold text-[15px] xl:text-[18px] text-[#101828] whitespace-nowrap">
                      {cert.price}<span className="text-[12px] xl:text-[13px] font-normal text-[#6a7282] ml-[2px]">/년</span>
                    </p>
                    <button
                      onClick={() => navigate(`/tls-ssl/${cert.id}`)}
                      className="flex items-center gap-[4px] bg-[#155dfc] rounded-[4px] px-[14px] xl:px-[16px] h-[34px] xl:h-[36px] font-medium text-[13px] xl:text-[14px] text-white whitespace-nowrap hover:bg-[#083691] transition-colors"
                    >
                      신청하기 →
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
