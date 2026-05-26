import { useState } from 'react';
import { Link, useNavigate } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';

/* ── 아이콘 ── */
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

/* ── 체크박스 ── */
function Checkbox({ checked, onChange, size = 20 }) {
  return (
    <button
      type="button"
      role="checkbox"
      aria-checked={checked}
      onClick={onChange}
      style={{ width: size, height: size, minWidth: size }}
      className={`border flex items-center justify-center transition-colors cursor-pointer shrink-0 ${
        checked ? 'bg-[#9db8e8] border-[#9db8e8]' : 'bg-white border-[#d1d5dc]'
      }`}
    >
      {checked && (
        size >= 18 ? (
          <svg width="11" height="8" viewBox="0 0 11 8" fill="none">
            <path d="M1 4l3 3 6-6" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        ) : (
          <svg width="9" height="7" viewBox="0 0 9 7" fill="none">
            <path d="M1 3.5l2.5 2.5 5-5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        )
      )}
    </button>
  );
}

/* ── 라디오 버튼 ── */
function RadioOption({ label, checked, onChange }) {
  return (
    <button
      type="button"
      onClick={onChange}
      className="flex items-center gap-[8px] h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[17px] py-[13px] w-full transition-colors hover:border-[#155dfc]"
    >
      <div className={`w-[16px] h-[16px] rounded-full border-2 flex items-center justify-center shrink-0 transition-colors ${
        checked ? 'border-[#155dfc]' : 'border-[#d1d5dc]'
      }`}>
        {checked && <div className="w-[7px] h-[7px] rounded-full bg-[#155dfc]" />}
      </div>
      <span className="font-medium text-[14px] text-[#364153]">{label}</span>
    </button>
  );
}

/* ── 섹션 헤딩 ── */
function SectionHeading({ title, badge, badgeColor }) {
  return (
    <div className="border-b border-[#e5e7eb] pb-[13px] mb-[24px]">
      <span className="font-bold text-[#101828] text-[20px] leading-[28px]">{title} </span>
      <span className={`text-[14px] leading-[20px] ${badgeColor}`}>{badge}</span>
    </div>
  );
}

/* ── 인풋 라벨 ── */
function FieldLabel({ label, required }) {
  return (
    <label className="font-semibold text-[#101828] text-[14px] leading-[20px] block mb-[8px]">
      {label} {required && <span className="text-[#fb2c36]">*</span>}
    </label>
  );
}

/* ── 텍스트 인풋 공통 스타일 ── */
const inputCls = "w-full h-[46px] bg-[#f9fafb] border border-[#e5e7eb] rounded-[4px] px-[16px] py-[12px] text-[14px] text-[#101828] placeholder:text-[rgba(10,10,10,0.5)] focus:outline-none focus:border-[#155dfc] focus:bg-white transition-colors";

/* ── 사이드 버튼 공통 스타일 ── */
const sideBtnCls = "shrink-0 h-[36px] bg-white border border-[#d1d5dc] rounded-[8px] px-[20px] font-medium text-[14px] text-[#364153] whitespace-nowrap hover:bg-[#f9fafb] transition-colors";

/* ══════════════════════════════════════════
   회원가입 페이지
══════════════════════════════════════════ */
export default function Signup() {
  const navigate = useNavigate();

  // 기본 정보
  const [userId, setUserId]       = useState('');
  const [pw, setPw]               = useState('');
  const [pwConfirm, setPwConfirm] = useState('');
  const [name, setName]           = useState('');
  const [email, setEmail]         = useState('');
  const [phone, setPhone]         = useState('');
  const [authCode, setAuthCode]   = useState('');
  const [showPw, setShowPw]       = useState(false);
  const [showPwC, setShowPwC]     = useState(false);

  // 회사 정보
  const [bizNo, setBizNo]         = useState('');
  const [company, setCompany]     = useState('');
  const [route, setRoute]         = useState('');

  // 약관 동의
  const [agreeAll, setAgreeAll]   = useState(false);
  const [agreeTerms, setAgreeTerms]     = useState(false);
  const [agreePrivacy, setAgreePrivacy] = useState(false);
  const [agreeMarketing, setAgreeMarketing] = useState(false);
  const [agreeAge, setAgreeAge]   = useState(false);

  const routeOptions = ['인터넷검색', 'KISA홈페이지', '지인 추천', '네이버 카페', '컨퍼런스', '기타'];

  const handleAgreeAll = () => {
    const next = !agreeAll;
    setAgreeAll(next);
    setAgreeTerms(next);
    setAgreePrivacy(next);
    setAgreeMarketing(next);
    setAgreeAge(next);
  };

  const syncAll = (t, p, m, a) => {
    setAgreeAll(t && p && m && a);
  };

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      <main className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">

          {/* 히어로 */}
          <div className="flex flex-col gap-[12px] tracking-[-1px] mb-[40px] xl:mb-[48px]">
            <p className="font-bold text-[#303336] text-[36px] xl:text-[52px] leading-[1.3]">회원가입</p>
            <p className="font-medium text-[#7d8ba0] text-[16px] xl:text-[20px] leading-[1.5]">지금 가입하고 인증서 관리를 경험하세요.</p>
          </div>

          {/* 폼 컨테이너 */}
          <div className="bg-white border border-[#e5e7eb] rounded-[12px] p-[32px] xl:p-[48px]">
          <div className="flex flex-col gap-[32px]">

            {/* ── 기본 정보 ── */}
            <section>
              <SectionHeading title="기본 정보" badge="*필수" badgeColor="text-[#fb2c36] text-[14px]" />

              <div className="flex flex-col gap-[20px]">

                {/* 아이디 */}
                <div>
                  <FieldLabel label="아이디" required />
                  <div className="flex gap-[8px] items-center">
                    <input
                      type="text"
                      value={userId}
                      onChange={e => setUserId(e.target.value)}
                      placeholder="아이디를 입력하세요"
                      className={inputCls}
                    />
                    <button type="button" className={sideBtnCls}>중복확인</button>
                  </div>
                </div>

                {/* 비밀번호 */}
                <div>
                  <FieldLabel label="비밀번호" required />
                  <div className="relative">
                    <input
                      type={showPw ? 'text' : 'password'}
                      value={pw}
                      onChange={e => setPw(e.target.value)}
                      placeholder="비밀번호를 입력하세요"
                      className={`${inputCls} pr-[48px]`}
                    />
                    <button type="button" onClick={() => setShowPw(v => !v)} className="absolute right-[14px] top-[13px]">
                      <EyeIcon open={showPw} />
                    </button>
                  </div>
                  <p className="mt-[8px] text-[#6a7282] text-[12px] leading-[16px]">8자 이상, 영문/숫자/특수문자 조합</p>
                </div>

                {/* 비밀번호 확인 */}
                <div>
                  <FieldLabel label="비밀번호 확인" required />
                  <div className="relative">
                    <input
                      type={showPwC ? 'text' : 'password'}
                      value={pwConfirm}
                      onChange={e => setPwConfirm(e.target.value)}
                      placeholder="비밀번호를 다시 입력하세요"
                      className={`${inputCls} pr-[48px]`}
                    />
                    <button type="button" onClick={() => setShowPwC(v => !v)} className="absolute right-[14px] top-[13px]">
                      <EyeIcon open={showPwC} />
                    </button>
                  </div>
                </div>

                {/* 이름 */}
                <div>
                  <FieldLabel label="이름" required />
                  <input
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="이름을 입력하세요"
                    className={inputCls}
                  />
                </div>

                {/* 이메일 */}
                <div>
                  <FieldLabel label="이메일" required />
                  <input
                    type="email"
                    value={email}
                    onChange={e => setEmail(e.target.value)}
                    placeholder="email@example.com"
                    className={inputCls}
                  />
                </div>

                {/* 휴대폰번호 */}
                <div>
                  <FieldLabel label="휴대폰번호" required />
                  <div className="flex gap-[8px] items-center">
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="01012345678"
                      className={inputCls}
                    />
                    <button type="button" className={sideBtnCls}>인증번호 받기</button>
                  </div>
                </div>

                {/* 인증번호 */}
                <div>
                  <FieldLabel label="인증번호" required={false} />
                  <div className="flex gap-[8px] items-center">
                    <input
                      type="text"
                      value={authCode}
                      onChange={e => setAuthCode(e.target.value)}
                      placeholder="인증번호 6자리"
                      className={inputCls}
                    />
                    <button type="button" className={sideBtnCls}>확인</button>
                  </div>
                </div>

              </div>
            </section>

            {/* ── 회사 정보 ── */}
            <section>
              <SectionHeading title="회사 정보" badge="선택" badgeColor="text-[#6a7282] text-[14px]" />

              <div className="flex flex-col gap-[20px]">

                {/* 사업자등록번호 */}
                <div>
                  <FieldLabel label="사업자등록번호" required={false} />
                  <div className="flex gap-[8px] items-center">
                    <input
                      type="text"
                      value={bizNo}
                      onChange={e => setBizNo(e.target.value)}
                      placeholder="000-00-00000"
                      className={inputCls}
                    />
                    <button type="button" className={sideBtnCls}>확인</button>
                  </div>
                </div>

                {/* 회사명 */}
                <div>
                  <FieldLabel label="회사명" required={false} />
                  <input
                    type="text"
                    value={company}
                    onChange={e => setCompany(e.target.value)}
                    placeholder="회사명을 입력하세요"
                    className={inputCls}
                  />
                </div>

                {/* 가입경로 */}
                <div>
                  <FieldLabel label="가입경로" required={false} />
                  <div className="grid grid-cols-2 gap-[12px]">
                    {routeOptions.map(opt => (
                      <RadioOption
                        key={opt}
                        label={opt}
                        checked={route === opt}
                        onChange={() => setRoute(opt)}
                      />
                    ))}
                  </div>
                </div>

              </div>
            </section>

            {/* ── 약관 동의 ── */}
            <section>
              <SectionHeading title="약관 동의" badge="" badgeColor="" />

              <div className="flex flex-col gap-[16px]">

                {/* 전체 동의 */}
                <button
                  type="button"
                  onClick={handleAgreeAll}
                  className="flex items-center gap-[12px] bg-[#eff6ff] border border-[#bedbff] rounded-[4px] p-[17px] w-full text-left"
                >
                  <Checkbox checked={agreeAll} onChange={handleAgreeAll} size={20} />
                  <span className="font-bold text-[#101828] text-[16px] leading-[24px]">전체 동의</span>
                </button>

                {/* 개별 약관 */}
                <div className="flex flex-col gap-[12px] pl-[8px]">

                  {/* 이용약관 */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { const v = !agreeTerms; setAgreeTerms(v); syncAll(v, agreePrivacy, agreeMarketing, agreeAge); }}
                      className="flex items-center gap-[12px]"
                    >
                      <Checkbox
                        checked={agreeTerms}
                        onChange={() => { const v = !agreeTerms; setAgreeTerms(v); syncAll(v, agreePrivacy, agreeMarketing, agreeAge); }}
                        size={16}
                      />
                      <span className="font-medium text-[#101828] text-[14px] leading-[20px]">
                        이용약관에 동의합니다 <span className="text-[#fb2c36]">*</span>
                      </span>
                    </button>
                    <button type="button" className="text-[#6a7282] text-[12px] underline whitespace-nowrap">내용보기</button>
                  </div>

                  {/* 개인정보 */}
                  <div className="flex items-center justify-between">
                    <button
                      type="button"
                      onClick={() => { const v = !agreePrivacy; setAgreePrivacy(v); syncAll(agreeTerms, v, agreeMarketing, agreeAge); }}
                      className="flex items-center gap-[12px]"
                    >
                      <Checkbox
                        checked={agreePrivacy}
                        onChange={() => { const v = !agreePrivacy; setAgreePrivacy(v); syncAll(agreeTerms, v, agreeMarketing, agreeAge); }}
                        size={16}
                      />
                      <span className="font-medium text-[#101828] text-[14px] leading-[20px]">
                        개인정보 수집 및 이용에 동의합니다 <span className="text-[#fb2c36]">*</span>
                      </span>
                    </button>
                    <button type="button" className="text-[#6a7282] text-[12px] underline whitespace-nowrap">내용보기</button>
                  </div>

                  {/* 마케팅 */}
                  <button
                    type="button"
                    onClick={() => { const v = !agreeMarketing; setAgreeMarketing(v); syncAll(agreeTerms, agreePrivacy, v, agreeAge); }}
                    className="flex items-center gap-[12px] text-left"
                  >
                    <Checkbox
                      checked={agreeMarketing}
                      onChange={() => { const v = !agreeMarketing; setAgreeMarketing(v); syncAll(agreeTerms, agreePrivacy, v, agreeAge); }}
                      size={16}
                    />
                    <span className="font-medium text-[#364153] text-[14px] leading-[20px]">마케팅 활용에 동의합니다 (선택)</span>
                  </button>

                  {/* 만 14세 */}
                  <button
                    type="button"
                    onClick={() => { const v = !agreeAge; setAgreeAge(v); syncAll(agreeTerms, agreePrivacy, agreeMarketing, v); }}
                    className="flex items-center gap-[12px] text-left"
                  >
                    <Checkbox
                      checked={agreeAge}
                      onChange={() => { const v = !agreeAge; setAgreeAge(v); syncAll(agreeTerms, agreePrivacy, agreeMarketing, v); }}
                      size={16}
                    />
                    <span className="font-medium text-[#101828] text-[14px] leading-[20px]">
                      만 14세 이상입니다 <span className="text-[#fb2c36]">*</span>
                    </span>
                  </button>

                </div>
              </div>
            </section>

            {/* ── 버튼 ── */}
            <div className="flex gap-[12px] pt-[16px]">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="flex-1 h-[50px] bg-white border border-[#d1d5dc] rounded-[4px] font-medium text-[15px] text-[#364153] hover:bg-[#f9fafb] transition-colors"
              >
                취소
              </button>
              <button
                type="button"
                className="flex-1 h-[50px] bg-[#155dfc] rounded-[4px] font-semibold text-[18px] text-white hover:bg-[#1251e0] transition-colors"
              >
                가입완료
              </button>
            </div>

            {/* ── 로그인 링크 ── */}
            <div className="flex items-center justify-center gap-[4px] pb-[8px]">
              <span className="text-[#4a5565] text-[14px] leading-[20px]">이미 계정이 있으신가요?</span>
              <Link to="/login" className="font-semibold text-[#155dfc] text-[16px] leading-[24px] hover:underline">
                로그인
              </Link>
            </div>

          </div>
          </div>
      </main>

      <Footer />
    </div>
  );
}
