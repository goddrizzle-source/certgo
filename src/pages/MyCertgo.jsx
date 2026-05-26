import { useState } from 'react';
import { Shield, CreditCard, User, HelpCircle, ChevronDown, X, Menu } from 'lucide-react';
import NavBar from '../app/components/NavBar';

/* ── 사이드바 메뉴 구성 ── */
const MENU_GROUPS = [
  {
    title: '마이페이지',
    icon: Shield,
    items: ['마이페이지 홈'],
  },
  {
    title: '인증서 관리',
    icon: Shield,
    items: ['인증서 리스트/관리', 'CSR 생성/관리', '인증서 설치 가이드', '도메인 관리'],
  },
  {
    title: '주문/결제 관리',
    icon: CreditCard,
    items: ['인증서 신청내역', '결제/미입금 내역', '세금계산서/영수증 신청', '견적서 관리'],
  },
  {
    title: '나의 정보 관리',
    icon: User,
    items: ['회원정보 수정', '비밀번호 변경', '회사정보 관리', '알림 설정'],
  },
  {
    title: '고객센터',
    icon: HelpCircle,
    items: ['1:1 문의 내역', '나의 기술지원 요청'],
  },
];

const CERTS = [
  { id: 1, domain: 'www.example.com',      type: 'EV SSL',        issuer: 'DigiCert',   issued: '2025-01-15', expires: '2026-01-15', dday: 248,  status: 'active' },
  { id: 2, domain: '*.startup.co.kr',       type: 'Wildcard SSL',  issuer: 'Sectigo',    issued: '2024-11-01', expires: '2025-11-01', dday: 173,  status: 'active' },
  { id: 3, domain: 'api.myservice.io',      type: 'OV SSL',        issuer: 'GlobalSign', issued: '2024-06-20', expires: '2025-06-20', dday: 39,   status: 'warning' },
  { id: 4, domain: 'shop.brand.com',        type: 'DV SSL',        issuer: 'Sectigo',    issued: '2024-03-10', expires: '2025-03-10', dday: -63,  status: 'expired' },
  { id: 5, domain: 'myapp.exe (CodeSign)',  type: 'EV CodeSign',   issuer: 'Sectigo',    issued: '2025-02-01', expires: '2027-02-01', dday: 630,  status: 'active' },
  { id: 6, domain: 'portal.company.kr',     type: 'OV SSL',        issuer: 'GlobalSign', issued: '2025-03-01', expires: '2026-03-01', dday: 293,  status: 'active' },
];

const STATUS_STYLE = {
  active:  { bg: '#eafaf1', text: '#00a870', label: '정상' },
  warning: { bg: '#fff8e1', text: '#f59e0b', label: '만료 임박' },
  expired: { bg: '#fef2f2', text: '#ef4444', label: '만료됨' },
};

const STAT_CARDS = [
  { label: '전체 인증서',   value: 6, sub: '총 보유',        color: '#083691' },
  { label: '유효한 인증서', value: 4, sub: '정상 운영 중',   color: '#00a870' },
  { label: '만료 임박',     value: 1, sub: '30일 이내 만료', color: '#f59e0b' },
  { label: '만료된 인증서', value: 1, sub: '갱신 필요',      color: '#ef4444' },
];

export default function MyCertgo() {
  const [activeMenu, setActiveMenu]   = useState('마이페이지 홈');
  const [filter, setFilter]           = useState('all');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  // 모바일에서 열린 그룹 제목들
  const [openGroups, setOpenGroups]   = useState([MENU_GROUPS[0].title]);

  const filtered = filter === 'all' ? CERTS : CERTS.filter(c => c.status === filter);

  const toggleGroup = (title) => {
    setOpenGroups(prev =>
      prev.includes(title) ? prev.filter(t => t !== title) : [...prev, title]
    );
  };

  return (
    <div className="bg-white min-h-screen font-['Pretendard'] flex flex-col">
      <NavBar />
      <div className="w-full h-px bg-[#e5e7eb]" />

      {/* ── 본문: 사이드바 + 컨텐츠 ── */}
      <div className="flex flex-col lg:flex-row flex-1 w-full min-h-0">

        {/* ── 사이드바 ── */}
        <aside className={`lg:w-[256px] bg-[#111827] lg:shrink-0 lg:block self-stretch ${sidebarOpen ? 'block' : 'hidden'}`}>
          <div className="p-6">
            <div className="flex items-center justify-between mb-6 lg:mb-8">
              <h2 className="text-[18px] font-bold text-white">My certgo</h2>
              <button
                onClick={() => setSidebarOpen(false)}
                className="lg:hidden text-[#9ca3af] hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex flex-col gap-1 lg:gap-10">
              {MENU_GROUPS.map((group) => {
                const Icon = group.icon;
                const isOpen = openGroups.includes(group.title);

                return (
                  <div key={group.title}>
                    {/* 1뎁스: 그룹 헤더 — 모바일에서 클릭으로 토글 */}
                    <button
                      onClick={() => toggleGroup(group.title)}
                      className="w-full flex items-center justify-between gap-2 mb-0 lg:mb-3 py-[10px] lg:py-0 lg:cursor-default"
                    >
                      <div className="flex items-center gap-2">
                        <Icon className="w-4 h-4 text-[#9ca3af]" />
                        <h3 className="text-[12px] font-semibold text-[#9ca3af] uppercase tracking-[0.06em]">
                          {group.title}
                        </h3>
                      </div>
                      {/* 화살표: 모바일에서만 표시 */}
                      <ChevronDown
                        className={`w-4 h-4 text-[#9ca3af] transition-transform lg:hidden ${isOpen ? 'rotate-180' : ''}`}
                      />
                    </button>

                    {/* 2뎁스: 서브 메뉴 — 모바일에서 토글, 데스크탑에서 항상 표시 */}
                    <ul className={`flex flex-col gap-[2px] overflow-hidden transition-all lg:block ${isOpen ? 'block' : 'hidden'}`}>
                      {group.items.map((item) => (
                        <li key={item}>
                          <button
                            onClick={() => setActiveMenu(item)}
                            className={`w-full text-left pl-6 py-[10px] text-[14px] rounded-[8px] relative transition-all ${
                              activeMenu === item
                                ? 'text-[#60a5fa] font-bold bg-[rgba(37,99,235,0.1)]'
                                : 'text-[#d1d5db] hover:text-white hover:bg-[#1f2937]'
                            }`}
                          >
                            {activeMenu === item && (
                              <span className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-6 bg-[#3b82f6] rounded-r" />
                            )}
                            {item}
                          </button>
                        </li>
                      ))}
                    </ul>
                  </div>
                );
              })}
            </nav>
          </div>
        </aside>

        {/* ── 오른쪽 컨텐츠 ── */}
        <main className="flex-1 p-5 sm:p-8 lg:p-[48px] overflow-auto">

          {/* 모바일 메뉴 열기 버튼 */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex items-center gap-[8px] mb-[20px] text-[#566376] hover:text-[#1d2c49] transition-colors"
          >
            <Menu className="w-5 h-5" />
            <span className="text-[14px] font-medium">메뉴</span>
          </button>

          {/* 페이지 타이틀 */}
          <div className="mb-[28px] lg:mb-[40px]">
            <h1 className="text-[24px] lg:text-[32px] font-bold text-[#1d2c49] leading-[1.3] tracking-[-1px]">My certgo</h1>
            <p className="text-[14px] lg:text-[16px] text-[#7d8ba0] mt-[6px]">보유 중인 인증서를 한눈에 관리하세요.</p>
          </div>

          {/* 통계 카드 */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-[14px] lg:gap-[20px] mb-[28px] lg:mb-[40px]">
            {STAT_CARDS.map(({ label, value, sub, color }) => (
              <div key={label} className="bg-white rounded-[12px] p-[20px] lg:p-[28px] flex flex-col gap-[8px] shadow-sm border border-[#e5e7eb]">
                <div className="flex items-center justify-between">
                  <p className="text-[13px] lg:text-[14px] text-[#7d8ba0]">{label}</p>
                  <div className="w-[10px] h-[10px] rounded-full" style={{ backgroundColor: color }} />
                </div>
                <p className="text-[32px] lg:text-[40px] font-bold leading-[1] tracking-[-2px]" style={{ color }}>{value}</p>
                <p className="text-[12px] lg:text-[13px] text-[#9ca3af]">{sub}</p>
              </div>
            ))}
          </div>

          {/* 만료 임박 배너 */}
          <div className="bg-[#fff8e1] border border-[#fbbf24] rounded-[10px] px-[16px] lg:px-[24px] py-[14px] lg:py-[16px] flex items-center gap-[12px] lg:gap-[14px] mb-[24px] lg:mb-[32px]">
            <div className="w-[8px] h-[8px] rounded-full bg-[#f59e0b] shrink-0" />
            <p className="text-[13px] lg:text-[15px] text-[#92400e] font-medium flex-1">
              <span className="font-bold">api.myservice.io</span> 인증서가 <span className="font-bold">39일 후</span> 만료됩니다. 지금 갱신하세요.
            </p>
            <button className="shrink-0 bg-[#f59e0b] text-white text-[12px] lg:text-[13px] font-semibold px-[12px] lg:px-[16px] py-[7px] lg:py-[8px] rounded-[6px] hover:bg-[#d97706] transition-colors whitespace-nowrap">
              지금 갱신
            </button>
          </div>

          {/* 인증서 테이블 */}
          <div className="bg-white rounded-[12px] shadow-sm border border-[#e5e7eb] overflow-hidden">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-[12px] px-[20px] lg:px-[28px] py-[18px] lg:py-[22px] border-b border-[#f3f4f6]">
              <h2 className="text-[18px] lg:text-[20px] font-bold text-[#1d2c49]">인증서 목록</h2>
              <div className="flex flex-wrap gap-[6px] lg:gap-[8px]">
                {[
                  { key: 'all',     label: '전체' },
                  { key: 'active',  label: '정상' },
                  { key: 'warning', label: '만료 임박' },
                  { key: 'expired', label: '만료됨' },
                ].map(({ key, label }) => (
                  <button
                    key={key}
                    onClick={() => setFilter(key)}
                    className={`px-[12px] lg:px-[16px] py-[6px] lg:py-[7px] rounded-[6px] text-[13px] lg:text-[14px] font-medium transition-colors ${
                      filter === key
                        ? 'bg-[#083691] text-white'
                        : 'bg-[#f4f6f9] text-[#566376] hover:bg-[#e8ecf2]'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* 모바일: 카드형 / 데스크탑: 테이블 */}
            <div className="lg:hidden flex flex-col divide-y divide-[#f3f4f6]">
              {filtered.map((cert) => {
                const st = STATUS_STYLE[cert.status];
                const dStr = cert.dday < 0 ? `D+${Math.abs(cert.dday)}` : cert.dday === 0 ? 'D-day' : `D-${cert.dday}`;
                return (
                  <div key={cert.id} className="px-[20px] py-[16px] flex flex-col gap-[8px]">
                    <div className="flex items-start justify-between gap-[8px]">
                      <p className="font-semibold text-[15px] text-[#1d2c49]">{cert.domain}</p>
                      <span className="shrink-0 inline-block px-[10px] py-[3px] rounded-full text-[11px] font-semibold" style={{ backgroundColor: st.bg, color: st.text }}>
                        {st.label}
                      </span>
                    </div>
                    <div className="flex flex-wrap gap-x-[16px] gap-y-[4px] text-[13px] text-[#566376]">
                      <span>{cert.type}</span>
                      <span>{cert.issuer}</span>
                      <span>만료: {cert.expires}</span>
                      <span className="font-bold" style={{ color: cert.dday <= 30 && cert.dday >= 0 ? '#f59e0b' : cert.dday < 0 ? '#ef4444' : '#374151' }}>
                        {dStr}
                      </span>
                    </div>
                    <div className="flex gap-[8px] mt-[4px]">
                      <button className="text-[12px] text-[#566376] border border-[#d1d5dc] px-[12px] py-[6px] rounded-[6px] hover:border-[#083691] hover:text-[#083691] transition-colors">
                        상세보기
                      </button>
                      {cert.status !== 'active' && (
                        <button className="text-[12px] text-white bg-[#083691] px-[12px] py-[6px] rounded-[6px] hover:bg-[#0a2d7a] transition-colors">
                          갱신
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="hidden lg:block overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f9fafb] text-[13px] text-[#9ca3af] font-semibold uppercase tracking-[0.5px]">
                    <th className="text-left px-[28px] py-[14px]">도메인 / 제품</th>
                    <th className="text-left px-[16px] py-[14px]">유형</th>
                    <th className="text-left px-[16px] py-[14px]">발급기관</th>
                    <th className="text-left px-[16px] py-[14px]">발급일</th>
                    <th className="text-left px-[16px] py-[14px]">만료일</th>
                    <th className="text-left px-[16px] py-[14px]">D-day</th>
                    <th className="text-left px-[16px] py-[14px]">상태</th>
                    <th className="px-[16px] py-[14px]" />
                  </tr>
                </thead>
                <tbody>
                  {filtered.map((cert) => {
                    const st = STATUS_STYLE[cert.status];
                    const dStr = cert.dday < 0 ? `D+${Math.abs(cert.dday)}` : cert.dday === 0 ? 'D-day' : `D-${cert.dday}`;
                    return (
                      <tr key={cert.id} className="border-t border-[#f3f4f6] hover:bg-[#f9fafb] transition-colors">
                        <td className="px-[28px] py-[18px] text-[15px] font-semibold text-[#1d2c49]">{cert.domain}</td>
                        <td className="px-[16px] py-[18px] text-[14px] text-[#566376]">{cert.type}</td>
                        <td className="px-[16px] py-[18px] text-[14px] text-[#566376]">{cert.issuer}</td>
                        <td className="px-[16px] py-[18px] text-[14px] text-[#9ca3af]">{cert.issued}</td>
                        <td className="px-[16px] py-[18px] text-[14px] text-[#9ca3af]">{cert.expires}</td>
                        <td className="px-[16px] py-[18px]">
                          <span className="text-[13px] font-bold" style={{ color: cert.dday <= 30 && cert.dday >= 0 ? '#f59e0b' : cert.dday < 0 ? '#ef4444' : '#374151' }}>
                            {dStr}
                          </span>
                        </td>
                        <td className="px-[16px] py-[18px]">
                          <span className="inline-block px-[10px] py-[4px] rounded-full text-[12px] font-semibold" style={{ backgroundColor: st.bg, color: st.text }}>
                            {st.label}
                          </span>
                        </td>
                        <td className="px-[16px] py-[18px]">
                          <div className="flex gap-[8px] justify-end">
                            <button className="text-[13px] text-[#566376] border border-[#d1d5dc] px-[12px] py-[6px] rounded-[6px] hover:border-[#083691] hover:text-[#083691] transition-colors whitespace-nowrap">
                              상세보기
                            </button>
                            {cert.status !== 'active' && (
                              <button className="text-[13px] text-white bg-[#083691] px-[12px] py-[6px] rounded-[6px] hover:bg-[#0a2d7a] transition-colors whitespace-nowrap">
                                갱신
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {filtered.length === 0 && (
              <div className="py-[60px] text-center text-[#9ca3af] text-[15px]">해당하는 인증서가 없습니다.</div>
            )}
          </div>

        </main>
      </div>
    </div>
  );
}
