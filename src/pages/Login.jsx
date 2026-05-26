import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';

/* ── 인라인 아이콘 SVG ── */
const EyeIcon = ({ open }) => open ? (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"/>
    <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
  </svg>
) : (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#9ca3af" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"/>
  </svg>
);

const PhoneIcon = ({ color = 'currentColor' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="4" y="1.5" width="8" height="13" rx="1.5" stroke={color} strokeWidth="1.3"/>
    <circle cx="8" cy="12" r="0.8" fill={color}/>
    <path d="M6.5 3.5h3" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const EmailIcon = ({ color = 'currentColor' }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
    <rect x="1.5" y="3" width="13" height="10" rx="1.5" stroke={color} strokeWidth="1.3"/>
    <path d="M1.5 5.5L8 9.5l6.5-4" stroke={color} strokeWidth="1.3" strokeLinecap="round"/>
  </svg>
);

const GoogleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 20 20">
    <path d="M19.6 10.23c0-.68-.06-1.36-.18-2H10v3.79h5.4a4.6 4.6 0 01-2 3.02v2.52h3.22C18.48 15.52 19.6 13 19.6 10.23z" fill="#4285F4"/>
    <path d="M10 20c2.7 0 4.96-.9 6.62-2.44l-3.22-2.52c-.9.6-2.04.96-3.4.96-2.61 0-4.82-1.76-5.61-4.13H1.1v2.6A9.99 9.99 0 0010 20z" fill="#34A853"/>
    <path d="M4.39 11.87A6.01 6.01 0 014.1 10c0-.65.11-1.28.29-1.87V5.53H1.1A9.99 9.99 0 000 10c0 1.62.38 3.15 1.1 4.47l3.29-2.6z" fill="#FBBC05"/>
    <path d="M10 3.96c1.47 0 2.79.5 3.83 1.5l2.86-2.86C14.96.9 12.7 0 10 0A9.99 9.99 0 001.1 5.53l3.29 2.6C5.18 5.72 7.39 3.96 10 3.96z" fill="#EA4335"/>
  </svg>
);

const AppleIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="#101828">
    <path d="M12.152 6.896c-.948 0-2.415-1.078-3.96-1.04-2.04.027-3.91 1.183-4.961 3.014-2.117 3.675-.546 9.103 1.519 12.09 1.013 1.454 2.208 3.09 3.792 3.029 1.52-.065 2.09-.987 3.935-.987 1.831 0 2.35.987 3.96.948 1.637-.026 2.676-1.48 3.676-2.948 1.156-1.688 1.636-3.325 1.662-3.415-.039-.013-3.182-1.221-3.22-4.857-.026-3.04 2.48-4.494 2.597-4.559-1.429-2.09-3.623-2.324-4.402-2.376zM11 3.475c.799-1.006 1.35-2.38 1.208-3.475-1.195.052-2.611.773-3.435 1.766-.753.899-1.427 2.312-1.247 3.64 1.325.098 2.687-.676 3.474-1.93z"/>
  </svg>
);

/* ══════════════════════════════════════════
   로그인 페이지
══════════════════════════════════════════ */
export default function Login() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [pw, setPw] = useState('');
  const [showPw, setShowPw] = useState(false);
  const [authMethod, setAuthMethod] = useState('phone'); // 'phone' | 'email'

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ══ Main ══ */}
      <main className="flex-1 flex items-center py-[60px] xl:py-[80px]">
        <div className="max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0">
          <div className="xl:grid xl:grid-cols-[1fr_448px] xl:gap-[80px] xl:items-center">

            {/* ── Left: 소개 텍스트 (데스크탑만) ── */}
            <div className="hidden xl:flex flex-col gap-[24px]">
              <div className="flex flex-col gap-0">
                <p className="font-bold text-[#101828] text-[48px] leading-[60px]">빠르고, 효율적이며</p>
                <p className="font-bold text-[#101828] text-[48px] leading-[60px]">안전한 인증서 관리</p>
              </div>
              <div className="flex flex-col gap-0">
                <p className="text-[#4a5565] text-[20px] leading-[28px]">지란지교 보안 그룹의 15년 노하우로</p>
                <p className="text-[#4a5565] text-[20px] leading-[28px]">대한민국 디지털 보안의 표준을 만들어갑니다</p>
              </div>
            </div>

            {/* ── Right: 로그인 카드 ── */}
            <div
              className="bg-white border border-[#e5e7eb] rounded-[4px] w-full max-w-[448px] mx-auto xl:mx-0 shadow-[0px_8px_24px_rgba(0,0,0,0.06)]"
            >
              <div className="px-[40px] pt-[40px] pb-[40px]">

                {/* 카드 헤더 */}
                <div className="flex flex-col gap-[8px] mb-[32px]">
                  <p className="font-bold text-[#101828] text-[30px] leading-[36px] text-center">로그인</p>
                  <p className="text-[#6a7282] text-[14px] leading-[20px] text-center">안전한 인증서 관리 플랫폼</p>
                </div>

                {/* 폼 */}
                <div className="flex flex-col gap-0">

                  {/* 아이디 */}
                  <div className="flex flex-col gap-[8px] mb-[20px]">
                    <label className="font-semibold text-[#101828] text-[14px] leading-[20px]">아이디</label>
                    <input
                      type="text"
                      value={id}
                      onChange={e => setId(e.target.value)}
                      placeholder="아이디를 입력하세요"
                      className="w-full h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] py-[12px] text-[14px] text-[#101828] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#155dfc] focus:bg-white transition-colors"
                    />
                  </div>

                  {/* 비밀번호 */}
                  <div className="flex flex-col gap-[8px] mb-[20px]">
                    <label className="font-semibold text-[#101828] text-[14px] leading-[20px]">비밀번호</label>
                    <div className="relative">
                      <input
                        type={showPw ? 'text' : 'password'}
                        value={pw}
                        onChange={e => setPw(e.target.value)}
                        placeholder="비밀번호를 입력하세요"
                        className="w-full h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] pl-[16px] pr-[48px] py-[12px] text-[14px] text-[#101828] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#155dfc] focus:bg-white transition-colors"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPw(v => !v)}
                        className="absolute right-[14px] top-[13px] flex items-center justify-center"
                      >
                        <EyeIcon open={showPw} />
                      </button>
                    </div>
                  </div>

                  {/* 2차 인증 방법 */}
                  <div className="flex flex-col gap-[12px] mb-[24px]">
                    <label className="font-semibold text-[#101828] text-[14px] leading-[20px]">2차 인증 방법</label>
                    <div className="grid grid-cols-2 gap-[5px]">
                      {/* 휴대폰 */}
                      <button
                        type="button"
                        onClick={() => setAuthMethod('phone')}
                        className={`flex items-center justify-center gap-[8px] h-[48px] rounded-[4px] border text-[15px] font-medium transition-colors ${
                          authMethod === 'phone'
                            ? 'bg-[#eff6ff] border-[#155dfc] text-[#155dfc]'
                            : 'bg-white border-[#e5e7eb] text-[#364153]'
                        }`}
                      >
                        <PhoneIcon color={authMethod === 'phone' ? '#155dfc' : '#364153'} />
                        휴대폰
                      </button>
                      {/* 이메일 */}
                      <button
                        type="button"
                        onClick={() => setAuthMethod('email')}
                        className={`flex items-center justify-center gap-[8px] h-[48px] rounded-[4px] border text-[15px] font-medium transition-colors ${
                          authMethod === 'email'
                            ? 'bg-[#eff6ff] border-[#155dfc] text-[#155dfc]'
                            : 'bg-white border-[#e5e7eb] text-[#364153]'
                        }`}
                      >
                        <EmailIcon color={authMethod === 'email' ? '#155dfc' : '#364153'} />
                        이메일
                      </button>
                    </div>
                  </div>

                  {/* 구분선 "또는" */}
                  <div className="relative flex items-center mb-[16px]">
                    <div className="flex-1 h-px bg-[#e5e7eb]" />
                    <span className="bg-white px-[16px] text-[#6a7282] text-[14px] leading-[20px]">또는</span>
                    <div className="flex-1 h-px bg-[#e5e7eb]" />
                  </div>

                  {/* 소셜 로그인 */}
                  <div className="grid grid-cols-2 gap-[5px] mb-[24px]">
                    <button
                      type="button"
                      className="flex items-center justify-center gap-[8px] h-[50px] bg-white border border-[#e5e7eb] rounded-[4px] text-[#364153] text-[15px] font-medium hover:bg-[#f9fafb] transition-colors"
                    >
                      <GoogleIcon />
                      Google
                    </button>
                    <button
                      type="button"
                      className="flex items-center justify-center gap-[8px] h-[50px] bg-white border border-[#e5e7eb] rounded-[4px] text-[#364153] text-[15px] font-medium hover:bg-[#f9fafb] transition-colors"
                    >
                      <AppleIcon />
                      Apple
                    </button>
                  </div>

                  {/* 로그인 버튼 */}
                  <button
                    type="button"
                    className="w-full h-[50px] bg-[#155dfc] rounded-[4px] font-semibold text-[18px] text-white leading-[28px] hover:bg-[#1251e0] transition-colors shadow-[0px_10px_7.5px_rgba(21,93,252,0.3),_0px_4px_3px_rgba(21,93,252,0.3)]"
                    onClick={() => navigate('/')}
                  >
                    로그인
                  </button>
                </div>

                {/* 회원가입 링크 */}
                <div className="flex items-center justify-center gap-[4px] mt-[24px]">
                  <span className="text-[#4a5565] text-[14px] leading-[20px]">계정이 없으신가요?</span>
                  <Link
                    to="/signup"
                    className="font-semibold text-[#155dfc] text-[16px] leading-[24px] hover:underline"
                  >
                    회원가입
                  </Link>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
