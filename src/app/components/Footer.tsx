export function Footer() {
  return (
    <footer className="bg-[#101828] pt-[80px] xl:pt-[100px] pb-[60px]">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
        <div className="flex flex-col min-[1000px]:flex-row gap-12 min-[1000px]:gap-[60px] xl:gap-[100px]">

          {/* 고객지원 */}
          <div className="min-[1000px]:w-[274px] shrink-0">
            <p className="font-['Pretendard'] font-semibold text-[26px] xl:text-[32px] text-white leading-[1.4] mb-2">
              무엇을 도와드릴까요?
            </p>
            <p className="font-['Pretendard'] text-[14px] xl:text-[16px] text-[#99a1af] leading-[24px] mb-6 xl:mb-8">
              평일 09:00 - 18:00 (주말 및 공휴일 제외)
            </p>
            <div className="flex flex-col gap-[12px]">
              {[
                { label: "인증서 신청/갱신",        number: "070-2580-3560" },
                { label: "기술 지원",               number: "070-5530-6802" },
                { label: "긴급 핫라인 (야간/주말)", number: "070-3698-2500" },
              ].map(({ label, number }) => (
                <div key={label} className="flex flex-col items-start">
                  <p className="font-['Pretendard'] text-[14px] text-[#51a2ff] leading-[1.4]">{label}</p>
                  <p className="font-['Pretendard'] font-medium text-[20px] xl:text-[24px] text-[#c2c9d6] leading-[1.4]">{number}</p>
                </div>
              ))}
            </div>
          </div>

          {/* 링크 메뉴 */}
          <div className="hidden sm:grid grid-cols-2 sm:grid-cols-4 gap-6 xl:gap-[30px] flex-1 leading-[1.4] text-[#c2c9d6]">
            {[
              { title: "회사정보", links: ["회사 소개", "오시는 길", "파트너십", "채용 정보"] },
              { title: "제품소개", links: ["TLS/SSL 인증서", "CodeSign 인증서", "EV 인증서", "와일드카드 인증서"] },
              { title: "고객지원", links: ["자주 묻는 질문", "설치 가이드", "기술 문서", "문의하기"] },
              { title: "법적고지", links: ["이용약관", "개인정보처리방침", "환불 정책", "면책 조항"] },
            ].map(({ title, links }) => (
              <div key={title} className="flex flex-col gap-[20px] xl:gap-[28px] items-start">
                <p className="font-['Pretendard'] font-bold text-[16px] xl:text-[20px]">{title}</p>
                <div className="flex flex-col gap-[10px] xl:gap-[11px] font-['Pretendard'] text-[14px] xl:text-[18px] tracking-[-1px]">
                  {links.map((link) => (
                    <a key={link} href="#" className="hover:text-white transition-colors">{link}</a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-[50px] min-[1000px]:mt-0">
          <div className="flex flex-col min-[1000px]:flex-row gap-4 min-[1000px]:gap-[60px] xl:gap-[100px]">
            <div className="hidden min-[1000px]:block min-[1000px]:w-[274px] shrink-0" />
            <div className="flex-1">
              <div className="flex gap-[40px] font-['Pretendard'] font-medium text-[15px] xl:text-[18px] text-[#c2c9d6] leading-[1.4] mb-[28px]">
                <span className="cursor-pointer hover:text-white transition-colors">개인정보보호정책</span>
                <span className="cursor-pointer hover:text-white transition-colors">이메일무단수집거부</span>
              </div>
              <div className="flex flex-col gap-[4px] font-['Pretendard'] text-[13px] xl:text-[18px] text-[#8f96a3] leading-[1.4]">
                <p>㈜퍼스트알앤디 | 대표이사: 이우선</p>
                <p>34037 대전광역시 유성구 갑천로 361-17, 윕스퀘어 202-203호</p>
                <p>사업자등록번호: 223-81-01234 | 통신판매업신고: 제2026-대전유성-034935</p>
                <p>© 2026 FRD. All rights reserved.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
