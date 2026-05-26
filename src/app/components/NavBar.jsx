import { useState, useRef } from 'react';
import { Link, useLocation } from 'react-router';
import { Menu, X } from 'lucide-react';
import certgoLogo from '../../assets/Certgo.svg';

export default function NavBar() {
  const location = useLocation();
  const [tlsOpen, setTlsOpen]         = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [mobileOpen, setMobileOpen]   = useState(false);
  const timerRef    = useRef(null);
  const supportTimer = useRef(null);

  const handleTlsEnter = () => { clearTimeout(timerRef.current); setTlsOpen(true); };
  const handleTlsLeave = () => { timerRef.current = setTimeout(() => setTlsOpen(false), 150); };

  const handleSupportEnter = () => { clearTimeout(supportTimer.current); setSupportOpen(true); };
  const handleSupportLeave = () => { supportTimer.current = setTimeout(() => setSupportOpen(false), 150); };

  const isActive = (path) => location.pathname === path;

  return (
    <header className="relative z-50 bg-white">
      <div className="flex items-center justify-between h-[80px] xl:h-[120px] px-4 sm:px-8 xl:px-0 max-w-[1200px] mx-auto">

        {/* 로고 */}
        <Link to="/">
          <img src={certgoLogo} alt="Certgo" className="h-6 xl:h-8 w-auto" />
        </Link>

        {/* 데스크탑 GNB */}
        <nav className="hidden min-[1740px]:flex items-center gap-10 font-['Pretendard'] font-semibold text-[18px] text-[#303336]">
          <Link
            to="/my-certgo"
            className={`hover:text-[#155dfc] transition-colors ${isActive('/my-certgo') ? 'text-[#083691]' : ''}`}
          >
            My certgo
          </Link>
          <Link
            to="/why-certgo"
            className={`hover:text-[#155dfc] transition-colors ${isActive('/why-certgo') ? 'text-[#083691]' : ''}`}
          >
            Why certgo
          </Link>

          {/* TLS/SSL 드롭다운 */}
          <div className="relative" onMouseEnter={handleTlsEnter} onMouseLeave={handleTlsLeave}>
            <Link
              to="/tls-ssl"
              className={`hover:text-[#155dfc] transition-colors flex items-center gap-1 ${isActive('/tls-ssl') ? 'text-[#155dfc]' : ''}`}
            >
              TLS/SSL
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className={`transition-transform duration-200 ${tlsOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {tlsOpen && (
              <div
                className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-[12px] py-[8px] z-50 w-[200px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#e5e7eb]"
              >
                <div
                  className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rotate-45 border border-[#e5e7eb] border-b-0 border-r-0"
                />
                <Link
                  to="/tls-ssl"
                  className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors"
                  onClick={() => setTlsOpen(false)}
                >
                  인증서 전체보기
                </Link>
                <Link
                  to="/cert-finder"
                  className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors"
                  onClick={() => setTlsOpen(false)}
                >
                  맞춤 인증서 찾기
                </Link>
                <Link
                  to="/support/guide"
                  className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors"
                  onClick={() => setTlsOpen(false)}
                >
                  이용가이드
                </Link>
              </div>
            )}
          </div>

          <span className="cursor-pointer hover:text-[#155dfc] transition-colors">CodeSign</span>

          {/* Support 드롭다운 */}
          <div className="relative" onMouseEnter={handleSupportEnter} onMouseLeave={handleSupportLeave}>
            <Link
              to="/support/inquiry"
              className={`hover:text-[#155dfc] transition-colors flex items-center gap-1 ${location.pathname.startsWith('/support') ? 'text-[#155dfc]' : ''}`}
            >
              Support
              <svg
                width="14" height="14" viewBox="0 0 14 14" fill="none"
                className={`transition-transform duration-200 ${supportOpen ? 'rotate-180' : 'rotate-0'}`}
              >
                <path d="M3 5l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            {supportOpen && (
              <div
                className="absolute top-[calc(100%+12px)] left-1/2 -translate-x-1/2 bg-white rounded-[12px] py-[8px] z-50 w-[180px] shadow-[0px_8px_24px_rgba(0,0,0,0.12)] border border-[#e5e7eb]"
              >
                <div
                  className="absolute -top-[6px] left-1/2 -translate-x-1/2 w-[12px] h-[12px] bg-white rotate-45 border border-[#e5e7eb] border-b-0 border-r-0"
                />
                <Link to="/support/inquiry" className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors" onClick={() => setSupportOpen(false)}>
                  1:1 문의
                </Link>
                <Link to="/support/faq" className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors" onClick={() => setSupportOpen(false)}>
                  자주 묻는 질문
                </Link>
                <Link to="/support/notice" className="block px-[20px] py-[12px] text-[15px] font-medium text-[#1d2c49] hover:bg-[#f4f6f9] transition-colors" onClick={() => setSupportOpen(false)}>
                  공지사항
                </Link>
              </div>
            )}
          </div>
        </nav>

        {/* 데스크탑 우측 버튼 */}
        <div className="hidden md:flex gap-[20px] h-[36px] items-center">
          <Link to="/login" className="font-['Pretendard'] text-[16px] text-[#566376] whitespace-nowrap">로그인</Link>
          <Link to="/signup" className="font-['Pretendard'] text-[16px] text-[#566376] whitespace-nowrap">회원가입</Link>
          <Link to="/tls-ssl" className="bg-[#083691] rounded-[4px] px-[16px] py-[8px] font-['Pretendard'] font-medium text-[14px] text-white whitespace-nowrap">
            인증서 발급하기
          </Link>
          <button
            className="min-[1740px]:hidden flex items-center gap-[6px] text-[#566376]"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            <span className="font-['Pretendard'] text-[16px] whitespace-nowrap">전체메뉴</span>
          </button>
        </div>

        {/* 모바일 햄버거 */}
        <button className="md:hidden text-[#303336]" onClick={() => setMobileOpen(!mobileOpen)}>
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* 모바일 드롭다운 메뉴 */}
      {mobileOpen && (
        <div className="min-[1740px]:hidden absolute top-full left-0 right-0 bg-white border-t border-gray-100 px-4 py-4 flex flex-col gap-2 font-['Pretendard'] font-semibold text-[17px] text-[#303336] shadow-lg z-50">
          <Link to="/my-certgo" className="py-3 hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>
            My certgo
          </Link>
          <Link to="/why-certgo" className="py-3 hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>
            Why certgo
          </Link>
          <Link to="/tls-ssl" className="py-3 hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>
            TLS/SSL
          </Link>
          <Link to="/support/guide" className="py-3 hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>
            이용가이드
          </Link>
          <span className="py-3 hover:text-[#155dfc] transition-colors cursor-pointer">CodeSign</span>
          <div className="flex flex-col">
            <span className="py-3 text-[#9ca3af] text-[14px] font-normal">Support</span>
            <Link to="/support/inquiry" className="pl-3 py-2 text-[15px] hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>1:1 문의</Link>
            <Link to="/support/faq"     className="pl-3 py-2 text-[15px] hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>자주 묻는 질문</Link>
            <Link to="/support/notice"  className="pl-3 py-2 text-[15px] hover:text-[#155dfc] transition-colors" onClick={() => setMobileOpen(false)}>공지사항</Link>
          </div>
          <div className="flex items-center gap-5 pt-4 border-t border-gray-100 mt-2">
            <Link to="/login" className="font-['Pretendard'] text-[15px] text-[#566376]" onClick={() => setMobileOpen(false)}>로그인</Link>
            <Link to="/signup" className="font-['Pretendard'] text-[15px] text-[#566376]" onClick={() => setMobileOpen(false)}>회원가입</Link>
            <Link to="/tls-ssl" className="ml-auto bg-[#083691] rounded-[4px] px-[14px] py-[8px] font-['Pretendard'] font-medium text-[13px] text-white whitespace-nowrap" onClick={() => setMobileOpen(false)}>
              인증서 발급하기
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
