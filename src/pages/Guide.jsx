import { useState } from 'react';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';

// ── 데이터 ──────────────────────────────────────────────────────

const TABS = [
  { id: 'ev', label: 'EV 인증서', sub: 'Extended Validation' },
  { id: 'ov', label: 'OV 인증서', sub: 'Organization Validation' },
  { id: 'dv', label: 'DV 인증서', sub: 'Domain Validation' },
];

const CERT_META = {
  ev: {
    badge: 'EV',
    badgeColor: '#0553c7',
    badgeBg: '#dbeafe',
    level: 'LEVEL 03 — 최고 등급',
    title: 'Extended Validation\nSSL 인증서',
    desc: 'EV SSL은 단순 암호화를 넘어, CA(인증기관)가 기업의 법적 실재성을 보증하는 프리미엄 인증서입니다. 강화된 피싱·파밍 방어와 브랜드 신뢰도 확보가 필요한 기업에 최적화되어 있습니다.',
    tagColor: '#1d4ed8',
    accentColor: '#155dfc',
  },
  ov: {
    badge: 'OV',
    badgeColor: '#166534',
    badgeBg: '#dcfce7',
    level: 'LEVEL 02 — 기업 인증',
    title: 'Organization Validation\nSSL 인증서',
    desc: 'OV SSL은 도메인 소유권과 기업 실재성을 동시에 검증하는 표준 기업 인증서입니다. 합리적인 비용으로 DV보다 높은 신뢰도를 확보하며, 브랜드 도용·피싱 사이트로부터 고객을 보호합니다.',
    tagColor: '#166534',
    accentColor: '#16a34a',
  },
  dv: {
    badge: 'DV',
    badgeColor: '#6d28d9',
    badgeBg: '#ede9fe',
    level: 'LEVEL 01 — 도메인 인증',
    title: 'Domain Validation\nSSL 인증서',
    desc: 'DV SSL은 오직 도메인 소유권만 확인하여 수 분 안에 발급되는 가장 신속한 보안 표준입니다. 서류 제출·전화 인증 없이 즉시 HTTPS를 적용할 수 있어 스타트업·개인 사이트에 이상적입니다.',
    tagColor: '#6d28d9',
    accentColor: '#7c3aed',
  },
};

const ADVANTAGES = {
  ev: [
    { num: '01', title: '시각적 신뢰 지표 제공', desc: "브라우저 주소창 및 인증서 상세 정보에 검증된 기업 공식 명칭이 직접 노출되어 고객이 안심하고 서비스를 이용할 수 있습니다." },
    { num: '02', title: '강력한 피싱·파밍 원천 차단', desc: '엄격한 심사 과정 때문에 위조 사이트 개설이 불가능하며, 브랜드 도용 및 카피 사이트 피해를 방지합니다.' },
    { num: '03', title: '최상위 레벨 법적 신원 검증', desc: 'CA 가이드라인에 의거하여 기업의 법적 존재 여부, 물리적 위치, 실제 운영 여부를 철저하게 검증합니다.' },
    { num: '04', title: '전환율 상승 및 브랜드 보호', desc: '공인된 보안 표준 준수로 결제·회원가입 시 고객의 이탈률을 낮추고 대외 신인도를 향상시킵니다.' },
  ],
  ov: [
    { num: '01', title: '기업 실재성 인증', desc: '인증서 상세 정보에 검증된 기업명이 명시되어, 유령 회사나 위조 사이트가 아님을 대외적으로 증명합니다.' },
    { num: '02', title: '사이트 사칭·피싱 방지', desc: 'CA의 기업 신원 검증을 통과해야만 발급되므로, 브랜드 도용 및 카피 사이트 금융 사기를 예방합니다.' },
    { num: '03', title: '광범위한 호환성 및 신뢰', desc: '전 세계 주요 브라우저 및 모바일 기기와 99.9% 이상 완벽하게 호환되며 표준 보안 규격을 충족합니다.' },
    { num: '04', title: '합리적인 매니지먼트', desc: 'EV 등급의 까다로운 서류 심사 부담은 줄이면서, DV보다 높은 기업 차원의 신뢰도를 확보할 수 있어 효율적입니다.' },
  ],
  dv: [
    { num: '01', title: '초고속 자동 발급', desc: '소유권 인증이 완료되면 별도의 대기 시간 없이 시스템을 통해 실시간으로 즉시 발급됩니다.' },
    { num: '02', title: '서류 및 전화 인증 면제', desc: '사업자등록증 등의 증빙 서류 제출이나 번거로운 전화 확인 절차가 전혀 없어 프로세스가 간결합니다.' },
    { num: '03', title: '합리적인 도입 비용', desc: '핵심 기능인 데이터 암호화(SSL/TLS)에 집중하여, 비용 부담 없이 모든 웹사이트에 보안을 적용할 수 있습니다.' },
  ],
};

const REQUIREMENTS = {
  ev: [
    { label: '신청 대상', body: '법인 사업자, 개인 사업자 (순수 개인 및 미등록 단체 발급 불가)' },
    { label: '법인 설립 연혁', body: '설립일 기준 3년 이상 필수. 3년 미만 신생 기업은 대법원 등기부등본, 은행 거래 확인서, 변호사·회계사 확인서 등 기업 실재성 증명 추가 서류 제출 요구.' },
    { label: '제3자 공인 DB 등록', body: '사업자등록증 상의 기업명(영문/국문)과 대표 전화번호가 공인 기관(KT 114, Dun & Bradstreet, 정부 기관 DB)에 반드시 등록·일치해야 합니다.' },
    { label: '도메인 권한 및 운영', body: '신청 도메인의 Whois 소유주 정보가 신청 기업명과 일치하거나, 해당 도메인에 대한 행정적 권한 조절이 가능해야 합니다.' },
  ],
  ov: [
    { label: '신청 대상', body: '법인 사업자, 개인 사업자, 정부 기관, 비영리 단체 등 사업자등록 증빙이 가능한 모든 조직 (순수 개인 신청 불가)' },
    { label: '기업 검증 기준', body: '사업자등록증 상의 기업명, 주소, 대표자 정보가 국세청 및 공인 데이터베이스와 일치해야 합니다.' },
    { label: '제3자 공인 DB 등록', body: 'CA(인증기관)가 전화를 걸 수 있도록 기업의 공식 전화번호가 공인 기관(KT 114, Dun & Bradstreet 등)에 반드시 등록되어 있어야 합니다.' },
  ],
  dv: [
    { label: '신청 대상', body: '개인 사업자, 법인 사업자, 국가 기관은 물론 순수 개인 및 미등록 단체도 모두 신청 가능' },
    { label: '필수 조건', body: '신청하는 도메인의 Whois 메일 또는 웹서버·DNS 설정을 직접 제어할 수 있는 관리 권한 보유 필수' },
  ],
};

const STEPS = {
  ev: [
    { title: '신청서 작성 및 접수', desc: '온라인으로 EV SSL 인증서 신청서를 작성하고, 사업자등록증 등 기본 기업 정보를 제출합니다.' },
    { title: '기업 실재성 심사 및 서류 검증', desc: 'CA에서 국가 기관 및 공인 데이터베이스를 통해 기업의 법적 등록 상태, 유효성, 물리적 주소를 다각도로 심사합니다.' },
    {
      title: '공인 전화 인증 (1차 & 2차)',
      bullets: [
        '1차 검증 — 공인 DB(114 등)에 등록된 공식 대표번호로 CA 담당자가 직접 전화하여 신청 담당자의 재직 여부 확인',
        '2차 검증 — 인사 담당자 또는 서명 권한 임원과의 통화로 기업 대표 신청 사실 최종 승인',
      ],
    },
    {
      title: '도메인 소유권 인증',
      bullets: [
        '이메일 인증 — 도메인 소유자 메일 또는 지정 관리자 메일로 발송된 승인 링크 클릭',
        'DNS 인증 — 도메인 DNS 설정에 지정된 TXT 레코드 값 추가',
        'HTTP/HTTPS 인증 — 웹서버 특정 경로에 지정된 인증 파일 업로드',
      ],
    },
    { title: '최종 승인 및 인증서 발급', desc: '모든 검증이 완료되면 최고 등급의 EV SSL 인증서가 발급되며, 서버 설치 파일 및 가이드가 제공됩니다.' },
  ],
  ov: [
    { title: '신청서 작성 및 접수', desc: '온라인으로 신청서를 작성하고 사업자등록증 등 기업 증빙 서류를 제출합니다.' },
    { title: '기업 실재성 및 서류 검증', desc: 'CA에서 제출된 서류와 국가 등록 자료를 바탕으로 기업의 법적 존재 여부 및 주소지 일치 여부를 심사합니다.' },
    { title: '공인 대표번호 전화 인증', desc: '공인 제3자 DB(114 등)에 등재된 기업 대표번호로 CA 담당자가 직접 전화하여, 신청 담당자의 재직 여부 및 인증서 신청 의사를 최종 확인합니다.' },
    { title: '도메인 소유권 및 최종 발급', desc: '이메일 인증(Email), 네임서버 레코드 설정(DNS), 웹서버 파일 업로드(HTTP) 중 한 가지 방식으로 도메인 소유 권한을 인증하면 최종 발급됩니다.' },
  ],
  dv: [
    { title: '신청서 작성', desc: '온라인으로 DV 인증서를 신청하고 도메인 정보를 입력합니다. 아래 3가지 인증 방식 중 1가지를 선택합니다.' },
    {
      title: '도메인 소유권 인증',
      bullets: [
        '이메일 인증 — admin@, webmaster@, postmaster@ 등 지정 관리자 메일로 발송된 승인 링크 클릭',
        'DNS 인증 — 네임서버 설정에서 CA가 제공하는 CNAME 또는 TXT 레코드 값 입력',
        'HTTP/HTTPS 인증 — /.well-known/pki-validation/ 경로에 인증 파일 업로드',
      ],
    },
    { title: '실시간 발급', desc: '시스템 자동 매칭 완료 즉시 SSL 인증서가 발급됩니다. 다운로드 후 서버에 설치하면 즉시 HTTPS가 적용됩니다.' },
  ],
};

// ── 컴포넌트 ────────────────────────────────────────────────────

export default function Guide() {
  const [activeTab, setActiveTab] = useState('ev');
  const meta = CERT_META[activeTab];
  const advantages = ADVANTAGES[activeTab];
  const requirements = REQUIREMENTS[activeTab];
  const steps = STEPS[activeTab];

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen">
      <NavBar />

      {/* ── 히어로 ── */}
      <section className="bg-[#0d1b36] pt-[72px] pb-[80px] xl:pt-[96px] xl:pb-[100px]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <p className="text-[#8aadff] font-semibold text-[14px] tracking-[2px] uppercase mb-[16px]">
            SSL Certificate Guide
          </p>
          <h1 className="font-bold text-white text-[32px] xl:text-[52px] leading-[1.25] tracking-[-1px] mb-[20px]">
            인증서 종류별<br />발급 가이드
          </h1>
          <p className="text-[#8fa8c8] text-[16px] xl:text-[18px] leading-[1.7] max-w-[560px]">
            EV · OV · DV 각 인증서의 특징, 발급 조건, 절차를<br className="hidden xl:block" />
            단계별로 안내드립니다.
          </p>
        </div>
      </section>

      {/* ── 탭 ── */}
      <section className="bg-[#f4f6f9] border-b border-[#e5e7eb]">
        <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
          <div className="flex">
            {TABS.map((tab) => {
              const active = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`relative flex flex-col items-start px-[28px] xl:px-[40px] py-[20px] xl:py-[24px] transition-colors ${
                    active ? 'bg-white' : 'hover:bg-[#eaecef]'
                  }`}
                >
                  {active && (
                    <span className="absolute top-0 left-0 right-0 h-[3px] bg-[#155dfc]" />
                  )}
                  <span className={`font-bold text-[16px] xl:text-[17px] leading-[1.3] ${active ? 'text-[#101828]' : 'text-[#6a7282]'}`}>
                    {tab.label}
                  </span>
                  <span className={`text-[13px] mt-[2px] ${active ? 'text-[#155dfc]' : 'text-[#9ca3af]'}`}>
                    {tab.sub}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── 콘텐츠 ── */}
      <div>

        {/* 섹션 1: 소개 */}
        <section className="bg-white py-[64px] xl:py-[96px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">

            {/* 소개 텍스트 */}
            <div className="mb-[56px] xl:mb-[64px] max-w-[720px]">
              <div className="flex items-center gap-[10px] mb-[24px]">
                <span
                  className="inline-flex items-center px-[12px] py-[5px] rounded-[4px] text-[13px] font-bold tracking-[1px]"
                  style={{ color: meta.badgeColor, backgroundColor: meta.badgeBg }}
                >
                  {meta.badge}
                </span>
                <span className="text-[13px] font-semibold text-[#9ca3af] tracking-[1px] uppercase">
                  {meta.level}
                </span>
              </div>
              <h2 className="font-bold text-[#0d1b36] text-[28px] xl:text-[40px] leading-[1.25] tracking-[-1px] mb-[24px] whitespace-pre-line">
                {meta.title}
              </h2>
              <div className="w-[48px] h-[3px] mb-[24px]" style={{ backgroundColor: meta.accentColor }} />
              <p className="text-[16px] xl:text-[17px] text-[#4a5565] leading-[1.85]">
                {meta.desc}
              </p>
            </div>

            {/* 핵심 장점 */}
            <p className="text-[13px] font-bold text-[#9ca3af] tracking-[2px] uppercase mb-[24px]">
              핵심 장점
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-[1px] bg-white border border-[#e5e7eb] rounded-[12px] overflow-hidden">
              {advantages.map((a) => (
                <div key={a.num} className="bg-white p-[28px] xl:p-[36px]">
                  <p className="font-black text-[40px] xl:text-[48px] leading-[1] mb-[16px]" style={{ color: meta.accentColor }}>
                    {a.num}
                  </p>
                  <p className="font-bold text-[16px] xl:text-[17px] text-[#101828] mb-[10px] leading-[1.4]">
                    {a.title}
                  </p>
                  <p className="text-[15px] xl:text-[16px] text-[#6a7282] leading-[1.7]">
                    {a.desc}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </section>

        {/* 섹션 2: 발급 조건 */}
        <section className="bg-[#0d1b36] py-[64px] xl:py-[96px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex items-center gap-[12px] mb-[12px]">
              <span className="w-[32px] h-[2px] bg-[#8aadff]" />
              <p className="text-[#8aadff] text-[13px] font-semibold tracking-[2px] uppercase">Requirements</p>
            </div>
            <h3 className="font-bold text-white text-[26px] xl:text-[34px] leading-[1.3] tracking-[-0.5px] mb-[48px]">
              발급 조건 및 사전 확인 사항
            </h3>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-[20px]">
              {requirements.map((r, i) => (
                <div key={i} className="border border-[#1e3a6a] rounded-[12px] p-[28px] xl:p-[32px] bg-[#0a1628]">
                  <div className="flex items-start gap-[16px]">
                    <span className="shrink-0 w-[32px] h-[32px] rounded-full border border-[#2d5a9e] flex items-center justify-center text-[13px] font-bold text-[#8aadff]">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <p className="font-bold text-white text-[15px] xl:text-[16px] mb-[10px]">{r.label}</p>
                      <p className="text-[14px] xl:text-[15px] text-[#8fa8c8] leading-[1.75]">{r.body}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* 섹션 3: 발급 프로세스 */}
        <section className="bg-[#f4f6f9] py-[64px] xl:py-[96px]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0">
            <div className="flex items-center gap-[12px] mb-[12px]">
              <span className="w-[32px] h-[2px]" style={{ backgroundColor: meta.accentColor }} />
              <p className="text-[13px] font-semibold tracking-[2px] uppercase" style={{ color: meta.accentColor }}>
                Process
              </p>
            </div>
            <h3 className="font-bold text-[#0d1b36] text-[26px] xl:text-[34px] leading-[1.3] tracking-[-0.5px] mb-[56px]">
              단계별 발급 프로세스
            </h3>

            <div className="relative">
              {/* 연결선 */}
              <div className="absolute left-[27px] top-[56px] bottom-[56px] w-[2px] bg-[#e5e7eb] hidden xl:block" />

              <div className="flex flex-col gap-[12px]">
                {steps.map((step, i) => (
                  <div key={i} className="flex gap-[24px] xl:gap-[40px] items-start">
                    {/* 번호 원 */}
                    <div
                      className="shrink-0 w-[56px] h-[56px] rounded-full flex items-center justify-center font-black text-[18px] text-white relative z-10"
                      style={{ backgroundColor: meta.accentColor }}
                    >
                      {String(i + 1).padStart(2, '0')}
                    </div>

                    {/* 내용 카드 */}
                    <div className="flex-1 bg-white rounded-[12px] border border-[#e5e7eb] p-[24px] xl:p-[28px] mb-0">
                      <p
                        className="text-[13px] font-bold tracking-[2px] uppercase mb-[8px]"
                        style={{ color: meta.accentColor }}
                      >
                        STEP {String(i + 1).padStart(2, '0')}
                      </p>
                      <p className="font-bold text-[16px] xl:text-[17px] text-[#101828] mb-[10px]">
                        {step.title}
                      </p>
                      {step.desc && (
                        <p className="text-[15px] xl:text-[16px] text-[#6a7282] leading-[1.75]">{step.desc}</p>
                      )}
                      {step.bullets && (
                        <ul className="flex flex-col gap-[8px] mt-[4px]">
                          {step.bullets.map((b, j) => (
                            <li key={j} className="flex items-start gap-[10px]">
                              <span className="shrink-0 w-[20px] h-[20px] rounded-full flex items-center justify-center text-[11px] font-bold text-white mt-[2px]" style={{ backgroundColor: meta.accentColor }}>
                                {j + 1}
                              </span>
                              <span className="text-[14px] xl:text-[15px] text-[#4a5565] leading-[1.7]">{b}</span>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* 섹션 4: CTA */}
        <section className="bg-white py-[64px] xl:py-[80px] border-t border-[#e5e7eb]">
          <div className="max-w-[1200px] mx-auto px-4 sm:px-8 xl:px-0 text-center">
            <p className="text-[13px] font-semibold text-[#9ca3af] tracking-[2px] uppercase mb-[16px]">
              Need Help?
            </p>
            <h3 className="font-bold text-[#0d1b36] text-[26px] xl:text-[34px] leading-[1.3] tracking-[-0.5px] mb-[12px]">
              어떤 인증서가 맞는지 모르겠으신가요?
            </h3>
            <p className="text-[#6a7282] text-[16px] xl:text-[17px] leading-[1.7] mb-[36px]">
              전문 엔지니어가 비즈니스 환경에 맞는 인증서를 직접 추천해드립니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-[12px] justify-center">
              <a
                href="/cert-finder"
                className="inline-flex items-center justify-center px-[32px] py-[14px] bg-[#155dfc] text-white font-semibold text-[16px] rounded-[8px] hover:bg-[#0e44cc] transition-colors"
              >
                맞춤 인증서 찾기 →
              </a>
              <a
                href="/support/inquiry"
                className="inline-flex items-center justify-center px-[32px] py-[14px] bg-white border border-[#d1d5dc] text-[#364153] font-semibold text-[16px] rounded-[8px] hover:bg-[#f4f6f9] transition-colors"
              >
                1:1 기술 상담
              </a>
            </div>
          </div>
        </section>

      </div>

      <Footer />
    </div>
  );
}
