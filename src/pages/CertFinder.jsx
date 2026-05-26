import { useState } from 'react';
import { useNavigate } from 'react-router';
import { ChevronDown, ArrowRight, X } from 'lucide-react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';
import { CERTS, LOGO_MAP } from '../data/certs';

const fmt = n => `₩${n.toLocaleString()}`;

/* ── 키워드 → 인증서 필터 ── */
const KEYWORD_MAP = {
  'Best상품':     c => c.priceNum <= 200000,
  '최저가':       c => c.priceNum <= 100000,
  '싱글':         c => c.domainType === 'single',
  '쇼핑몰':       c => c.validationType === 'OV' || c.validationType === 'EV',
  '할인':         c => true,
  '공공기관':     c => c.validationType === 'EV',
  '프로모션':     c => c.priceNum <= 200000,
  '높은보안등급': c => c.validationType === 'EV',
  '간편인증':     c => c.validationType === 'DV',
  '높은안전배상금': c => c.id === 2 || c.id === 4 || c.id === 5,
  '패키지상품':   c => c.domainType === 'multi',
  '그린바(EV)':   c => c.validationType === 'EV',
  '와일드카드':   c => c.domainType === 'wildcard',
  '멀티':         c => c.domainType === 'multi',
  '유서트랭킹순': c => true,
};

const KEYWORDS = [
  'Best상품', '최저가', '싱글', '쇼핑몰', '할인', '공공기관',
  '프로모션', '높은보안등급', '간편인증', '높은안전배상금',
  '패키지상품', '그린바(EV)', '와일드카드', '멀티', '유서트랭킹순',
];

/* ── 상세 필터 섹션 ── */
const FILTER_SECTIONS = [
  {
    title: '발급 대상', key: 'target',
    options: ['대기업', '중소/스타트업', '공공기관', '개인/프리랜서'],
  },
  {
    title: '서비스 유형', key: 'serviceType',
    options: ['IT/플랫폼', '이커머스/쇼핑몰', '의료/금융', '기타 일반'],
  },
  {
    title: '개인정보 취급', key: 'privacy',
    options: ['로그인/회원가입', '결제/금융정보', '민감정보', '수집 안 함'],
  },
  {
    title: '도메인 개수', key: 'domainCount',
    options: ['1개', '2~4개', '5개 이상'],
  },
  {
    title: '도메인 형태', key: 'domainType',
    options: ['단일(Single)', '와일드카드(*)', '멀티(Multi)'],
  },
  {
    title: '서버 환경', key: 'serverEnv',
    options: ['단일 서버', '다중 서버/로드밸런서'],
  },
];

/* ── 상세 필터 → 인증서 필터링 ── */
function applyFilters(certs, filters) {
  return certs.filter(cert => {
    if (filters.target.length > 0) {
      const ok = filters.target.some(t => {
        if (t === '대기업')       return cert.validationType === 'EV';
        if (t === '공공기관')     return cert.validationType === 'EV';
        if (t === '중소/스타트업') return cert.priceNum <= 600000;
        if (t === '개인/프리랜서') return cert.validationType === 'DV';
        return true;
      });
      if (!ok) return false;
    }
    if (filters.serviceType.length > 0) {
      const ok = filters.serviceType.some(t => {
        if (t === '이커머스/쇼핑몰') return cert.validationType === 'OV' || cert.validationType === 'EV';
        if (t === '의료/금융')       return cert.validationType === 'EV';
        return true;
      });
      if (!ok) return false;
    }
    if (filters.privacy.length > 0) {
      const ok = filters.privacy.some(t => {
        if (t === '결제/금융정보') return cert.validationType === 'EV';
        if (t === '민감정보')      return cert.validationType === 'EV';
        if (t === '로그인/회원가입') return cert.validationType === 'OV' || cert.validationType === 'EV';
        if (t === '수집 안 함')    return cert.validationType === 'DV';
        return true;
      });
      if (!ok) return false;
    }
    if (filters.domainCount.length > 0) {
      const ok = filters.domainCount.some(t => {
        if (t === '1개')    return cert.domainType === 'single';
        if (t === '2~4개')  return cert.domainType === 'multi' || cert.domainType === 'wildcard';
        if (t === '5개 이상') return cert.domainType === 'multi' || cert.domainType === 'wildcard';
        return true;
      });
      if (!ok) return false;
    }
    if (filters.domainType.length > 0) {
      const ok = filters.domainType.some(t => {
        if (t === '단일(Single)')  return cert.domainType === 'single';
        if (t === '와일드카드(*)') return cert.domainType === 'wildcard';
        if (t === '멀티(Multi)')   return cert.domainType === 'multi';
        return true;
      });
      if (!ok) return false;
    }
    return true;
  });
}

/* ── 인증서 카드 ── */
function CertCard({ cert }) {
  const navigate = useNavigate();
  const logo = LOGO_MAP[cert.brand];
  return (
    <div className="bg-white rounded-[12px] border border-[#e5e7eb] p-6 hover:shadow-lg hover:border-[#c7d2fe] transition-all flex flex-col">
      <div className="inline-flex px-3 py-1.5 bg-[#f4f6f9] rounded-[6px] mb-4 self-start">
        {logo
          ? <img src={logo.src} alt={cert.brand} style={{ width: logo.w * 0.6, height: logo.h * 0.6 }} />
          : <span className="text-[13px] font-medium text-[#374151]">{cert.brand}</span>
        }
      </div>
      <h3 className="text-[16px] font-semibold text-[#101828] mb-3 flex-1">{cert.name}</h3>
      <div className="mb-5">
        <span className="text-[28px] font-bold text-[#101828]">{fmt(cert.priceNum)}</span>
        <span className="text-[14px] text-[#6a7282] ml-1">/1년</span>
      </div>
      <button
        onClick={() => navigate(`/tls-ssl/${cert.id}`)}
        className="w-full h-[44px] bg-[#155dfc] hover:bg-[#1251e0] text-white text-[14px] font-medium rounded-[8px] transition-colors"
      >
        신청하기
      </button>
    </div>
  );
}

/* ══════════════════════════════════════════
   메인 컴포넌트
══════════════════════════════════════════ */
export default function CertFinder() {
  const [activeKeyword, setActiveKeyword] = useState('공공기관');
  const [showMore, setShowMore]           = useState(false);
  const [filterResults, setFilterResults] = useState(null);
  const [selectedFilters, setSelectedFilters] = useState({
    target: [], serviceType: [], privacy: [], domainCount: [], domainType: [], serverEnv: [],
  });

  /* 키워드 클릭 */
  const handleKeyword = (kw) => {
    if (activeKeyword === kw) {
      setActiveKeyword(null);
    } else {
      setActiveKeyword(kw);
      setShowMore(false);
      setFilterResults(null);
    }
  };

  /* 상세 필터 토글 */
  const toggleFilter = (key, option) => {
    setSelectedFilters(prev => {
      const cur = prev[key];
      return { ...prev, [key]: cur.includes(option) ? cur.filter(o => o !== option) : [...cur, option] };
    });
    setFilterResults(null);
  };

  const totalSelected = Object.values(selectedFilters).flat().length;

  /* 검색 실행 */
  const handleSearch = () => {
    const results = applyFilters(CERTS, selectedFilters);
    setFilterResults(results);
    setActiveKeyword(null);
  };

  /* 키워드 결과 */
  const keywordResults = activeKeyword && KEYWORD_MAP[activeKeyword]
    ? CERTS.filter(KEYWORD_MAP[activeKeyword])
    : [];

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ══ Part 1: 키워드 검색 ══ */}
      <section className="bg-white py-[60px] xl:py-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          <h1 className="text-[32px] sm:text-[40px] xl:text-[48px] font-bold text-[#101828] mb-[48px] text-center tracking-[-1px]">
            어떤 인증서를 찾으시나요?
          </h1>

          <h2 className="text-[20px] xl:text-[22px] font-semibold text-[#101828] mb-[20px]">
            인기 키워드로 빠르게 찾기
          </h2>

          {/* 키워드 Pills */}
          <div className="flex flex-wrap gap-[10px] mb-[8px]">
            {KEYWORDS.map(kw => (
              <button
                key={kw}
                onClick={() => handleKeyword(kw)}
                className={`px-[18px] py-[9px] rounded-full text-[14px] font-medium transition-all flex items-center gap-[6px] ${
                  activeKeyword === kw
                    ? 'bg-[#155dfc] text-white shadow-[0_4px_14px_rgba(21,93,252,0.3)]'
                    : 'bg-white text-[#374151] border border-[#e5e7eb] hover:border-[#9ca3af] hover:shadow-sm'
                }`}
              >
                {kw}
                {activeKeyword === kw && <X className="w-[14px] h-[14px]" />}
              </button>
            ))}
          </div>

          {/* ══ Part 2: 키워드 결과 ══ */}
          {activeKeyword && (
            <div className="mt-[24px] relative">
              {/* 말풍선 꼭짓점 */}
              <div className="absolute left-1/2 -translate-x-1/2 -top-[12px] w-0 h-0
                border-l-[12px] border-l-transparent
                border-r-[12px] border-r-transparent
                border-b-[12px] border-b-[#eff6ff]" />

              <div className="bg-[#eff6ff] rounded-[12px] p-6 xl:p-8 border border-[#dbeafe]">
                <h3 className="text-[16px] font-semibold text-[#155dfc] mb-6">
                  {activeKeyword} 추천상품
                </h3>

                {keywordResults.length > 0 ? (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px] mb-6">
                      {keywordResults.slice(0, showMore ? 99 : 3).map(cert => (
                        <CertCard key={cert.id} cert={cert} />
                      ))}
                    </div>

                    {keywordResults.length > 3 && (
                      <div className="flex items-center gap-4">
                        <div className="flex-1 h-px bg-[#bfdbfe]" />
                        <button
                          onClick={() => setShowMore(v => !v)}
                          className="inline-flex items-center gap-2 px-5 py-2 text-[14px] text-[#155dfc] hover:text-[#1251e0] font-medium transition-colors"
                        >
                          <ChevronDown className={`w-4 h-4 transition-transform ${showMore ? 'rotate-180' : ''}`} />
                          {showMore ? '접기' : `${activeKeyword} 상품 ${keywordResults.length - 3}개 더보기`}
                        </button>
                        <div className="flex-1 h-px bg-[#bfdbfe]" />
                      </div>
                    )}
                  </>
                ) : (
                  <p className="text-[#6a7282] text-[15px] py-8 text-center">
                    해당 조건에 맞는 인증서가 현재 준비 중입니다.
                  </p>
                )}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ══ Part 3: 상세 조건 필터 ══ */}
      <section className="bg-[#f4f6f9] py-[60px] xl:py-[80px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

          <h2 className="text-[20px] xl:text-[22px] font-semibold text-[#101828] mb-[24px]">
            상세 조건으로 정확하게 찾기
          </h2>

          {/* 6-섹션 필터 그리드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px] mb-[24px]">
            {FILTER_SECTIONS.map(section => (
              <div key={section.key} className="bg-white rounded-[12px] p-6 border border-[#e5e7eb]">
                <h3 className="text-[15px] font-semibold text-[#101828] mb-4">{section.title}</h3>
                <div className="flex flex-col gap-[8px]">
                  {section.options.map(option => {
                    const isSelected = selectedFilters[section.key].includes(option);
                    return (
                      <button
                        key={option}
                        onClick={() => toggleFilter(section.key, option)}
                        className={`w-full text-left px-4 py-[10px] rounded-[8px] text-[14px] transition-all border ${
                          isSelected
                            ? 'bg-[#eff6ff] text-[#155dfc] border-[#bfdbfe] font-medium'
                            : 'bg-[#f9fafb] text-[#374151] border-[#f3f4f6] hover:bg-[#f3f4f6]'
                        }`}
                      >
                        {option}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>

          {/* 검색 버튼 */}
          <div className="flex justify-end">
            <button
              onClick={handleSearch}
              disabled={totalSelected === 0}
              className="inline-flex items-center gap-2 bg-[#155dfc] hover:bg-[#1251e0] disabled:opacity-40 disabled:cursor-not-allowed text-white px-8 py-4 rounded-[12px] text-[16px] font-semibold shadow-[0_8px_20px_rgba(21,93,252,0.3)] transition-all"
            >
              <span>{totalSelected > 0 ? `${totalSelected}개의 조건으로 검색하기` : '조건을 선택해주세요'}</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          {/* ── 필터 검색 결과 ── */}
          {filterResults !== null && (
            <div className="mt-[40px]">
              <div className="flex items-center gap-[12px] mb-[20px]">
                <h3 className="text-[18px] font-bold text-[#101828]">
                  검색 결과
                </h3>
                <span className="bg-[#155dfc] text-white text-[13px] font-semibold px-[10px] py-[3px] rounded-full">
                  {filterResults.length}개
                </span>
              </div>

              {filterResults.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-[16px]">
                  {filterResults.map(cert => (
                    <CertCard key={cert.id} cert={cert} />
                  ))}
                </div>
              ) : (
                <div className="bg-white rounded-[12px] border border-[#e5e7eb] py-[60px] text-center">
                  <p className="text-[#6a7282] text-[16px] mb-[8px]">조건에 맞는 인증서가 없습니다.</p>
                  <p className="text-[#9ca3af] text-[14px]">조건을 조금 더 넓혀보세요.</p>
                </div>
              )}
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
