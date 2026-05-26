import { useState } from 'react';
import { Search, ChevronDown } from 'lucide-react';
import { Link } from 'react-router';
import NavBar from '../app/components/NavBar';
import { Footer } from '../app/components/Footer';

const CATEGORIES = [
  { id: 'all',      label: 'ALL' },
  { id: 'install',  label: 'TLS/SSL 설치' },
  { id: 'codesign', label: 'CodeSign' },
  { id: 'csr',      label: 'CSR 생성' },
  { id: 'protocol', label: 'TLS 프로토콜' },
  { id: 'error',    label: '오류 해결' },
];

const FAQS = [
  {
    category: 'install',
    question: '[Apache] SSL 인증서 설치 방법',
    answer: 'Apache 웹서버에 SSL 인증서를 설치하려면 발급받은 인증서 파일(.crt, .ca-bundle, .key)을 서버에 업로드한 후, Apache 설정 파일(httpd.conf 또는 ssl.conf)에 SSLCertificateFile, SSLCertificateKeyFile, SSLCertificateChainFile 경로를 지정하고 Apache를 재시작합니다.',
  },
  {
    category: 'install',
    question: '[Nginx] SSL 인증서 설치 방법',
    answer: 'Nginx에서는 서버 인증서와 중간 인증서를 하나의 파일로 병합(cat your_domain.crt ca-bundle.crt > bundle.crt)한 후, nginx.conf에 ssl_certificate와 ssl_certificate_key 경로를 설정하고 재시작합니다.',
  },
  {
    category: 'install',
    question: '[IIS] Windows 서버에 SSL 인증서 설치',
    answer: 'IIS 관리자에서 서버 인증서를 선택하고 "인증서 가져오기"를 통해 .pfx 파일을 가져옵니다. 이후 웹사이트 바인딩에서 https / 443 포트를 추가하고 해당 인증서를 선택하면 됩니다.',
  },
  {
    category: 'install',
    question: '[Tomcat] SSL 인증서 설치 방법',
    answer: 'keytool 명령어로 JKS keystore 파일을 생성한 후, server.xml의 Connector 설정에 keystoreFile과 keystorePass를 지정하고 Tomcat을 재시작합니다.',
  },
  {
    category: 'codesign',
    question: '[CodeSign] 코드사인 인증서란 무엇인가요?',
    answer: '코드사인 인증서는 소프트웨어 개발자의 신원을 검증하고 코드의 무결성을 보장하는 디지털 인증서입니다. .exe, .dll 등 실행 파일에 서명하여 Windows SmartScreen 경고를 제거하고 사용자 신뢰도를 높입니다.',
  },
  {
    category: 'codesign',
    question: '[CodeSign] EV 코드사인과 일반 코드사인의 차이',
    answer: '일반 코드사인(OV)은 서류 검증 기반으로 발급되며 SmartScreen 평판을 축적해야 합니다. EV 코드사인은 엄격한 신원 검증과 USB 토큰 저장 방식으로 즉시 SmartScreen 평판을 획득하며, Windows 커널 모드 드라이버 서명도 가능합니다.',
  },
  {
    category: 'codesign',
    question: '[CodeSign] Windows 실행 파일 서명하기',
    answer: 'Windows SDK에 포함된 signtool을 사용합니다. 인증서 설치 후 signtool sign /f "cert.pfx" /p "password" /t http://timestamp.digicert.com /v "app.exe" 명령으로 서명하고, signtool verify /pa /v "app.exe"로 확인합니다.',
  },
  {
    category: 'csr',
    question: '[CSR] CSR 생성이란 무엇인가요?',
    answer: 'CSR(Certificate Signing Request)은 인증서를 발급받기 위해 생성하는 서명 요청 파일입니다. 국가, 조직명, 도메인(CN) 등의 정보와 공개키가 포함되며, 생성 시 함께 만들어지는 개인키(Private Key)는 절대 외부에 공개하지 않아야 합니다.',
  },
  {
    category: 'csr',
    question: '[CSR] Apache/Nginx에서 CSR 생성하기',
    answer: 'OpenSSL 명령어로 생성합니다: openssl req -new -newkey rsa:2048 -nodes -keyout your_domain.key -out your_domain.csr\n필요한 정보(국가, 조직, 도메인 등)를 입력한 후 생성된 CSR 내용을 인증서 신청 시 제출합니다.',
  },
  {
    category: 'csr',
    question: '[CSR] IIS에서 CSR 생성하기',
    answer: 'IIS 관리자 → 서버 인증서 → "인증서 요청 만들기"를 선택합니다. 도메인, 조직, 국가 정보를 입력하고 RSA 2048비트로 설정한 후 파일을 저장하면 CSR이 생성됩니다.',
  },
  {
    category: 'protocol',
    question: '[TLS] TLS 1.2와 TLS 1.3의 차이점',
    answer: 'TLS 1.3은 핸드셰이크 단계를 간소화(1-RTT)하여 연결 속도가 빠르고, RC4·3DES·SHA-1 등 취약한 알고리즘을 제거했으며 Forward Secrecy가 기본 적용됩니다. 현대 환경에서는 TLS 1.3을 우선 사용하고 레거시 지원이 필요한 경우 TLS 1.2를 병행 사용합니다.',
  },
  {
    category: 'protocol',
    question: '[TLS] SSL/TLS 포트 번호',
    answer: 'HTTPS: 443, SMTP(TLS): 587, SMTP(SSL): 465, POP3(SSL): 995, IMAP(SSL): 993, FTPS Control: 990, LDAPS: 636 입니다. HTTPS 사용 시 방화벽에서 443 포트를 반드시 허용해야 합니다.',
  },
  {
    category: 'error',
    question: '[오류] SSL 인증서 체인 오류 해결',
    answer: '중간 인증서(Intermediate Certificate)가 올바르게 설치되지 않았을 때 발생합니다. Apache는 SSLCertificateChainFile에 .ca-bundle을 지정하고, Nginx는 서버 인증서와 중간 인증서를 병합(cat)하여 ssl_certificate에 지정합니다.',
  },
  {
    category: 'error',
    question: '[오류] NET::ERR_CERT_COMMON_NAME_INVALID 해결',
    answer: '인증서의 CN(Common Name)과 실제 접속 도메인이 일치하지 않을 때 발생합니다. www 유무를 일치시키거나, www/non-www를 모두 지원하려면 SAN(Subject Alternative Name) 인증서 또는 와일드카드 인증서를 사용하세요.',
  },
  {
    category: 'error',
    question: '[오류] SSL Handshake Failed 해결',
    answer: '시스템 시간 불일치, 지원하지 않는 TLS 버전, 암호화 스위트 불일치, 방화벽 차단 등이 원인입니다. openssl s_client -connect 도메인:443 명령으로 디버깅하고 서버에서 TLS 1.2 이상을 활성화합니다.',
  },
  {
    category: 'error',
    question: '[오류] 인증서 만료 경고 해결',
    answer: 'My certgo 페이지에서 갱신 신청 후 새 인증서를 설치하고 웹서버를 재시작합니다. 만료 30일 전 갱신을 권장합니다.',
  },
];


function FaqItem({ faq, index, open, onToggle }) {
  const catLabel = CATEGORIES.find(c => c.id === faq.category)?.label ?? '';

  return (
    <div className="border-b border-[#e5e7eb] last:border-b-0">
      <button
        onClick={() => onToggle(index)}
        className="w-full flex items-center gap-[16px] sm:gap-[24px] px-0 py-[22px] text-left group"
      >
        {/* 카테고리 뱃지 */}
        <span className="hidden sm:inline-flex shrink-0 items-center whitespace-nowrap text-[16px] font-semibold text-[#6a7282] ml-[25px] mr-[25px]">
          {catLabel}
        </span>

        {/* 질문 */}
        <p className={`flex-1 text-[15px] sm:text-[16px] font-medium leading-[1.5] transition-colors ${
          open ? 'text-[#155dfc]' : 'text-[#101828] group-hover:text-[#155dfc]'
        }`}>
          {faq.question}
        </p>

        {/* 화살표 */}
        <ChevronDown
          className={`shrink-0 w-[20px] h-[20px] mr-[25px] transition-transform duration-200 ${
            open ? 'rotate-180 text-[#155dfc]' : 'text-[#9ca3af]'
          }`}
        />
      </button>

      {open && (
        <div className="px-[24px] py-[24px] bg-[#f8f9fb]">
          <div className="flex items-start gap-[12px]">
            <span className="shrink-0 inline-flex items-center justify-center w-[24px] h-[24px] rounded-full bg-[#155dfc] text-white text-[12px] font-bold mt-[1px]">
              A
            </span>
            <p className="text-[15px] text-[#4a5565] leading-[1.8] whitespace-pre-line">{faq.answer}</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [openFAQ, setOpenFAQ] = useState(null);
  const [search, setSearch] = useState('');

  const handleToggle = (i) => setOpenFAQ(openFAQ === i ? null : i);

  const filtered = FAQS.filter(faq => {
    const matchCat = activeCategory === 'all' || faq.category === activeCategory;
    const q = search.toLowerCase();
    const matchSearch = !q || faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q);
    return matchCat && matchSearch;
  });

  return (
    <div className="bg-white font-['Pretendard'] min-h-screen flex flex-col">
      <NavBar />

      {/* ── 콘텐츠 ── */}
      <div className="flex-1 max-w-[1200px] mx-auto w-full px-4 sm:px-8 xl:px-0 py-[80px]">

        {/* 타이틀 */}
        <h1 className="font-bold text-[#303336] text-[36px] sm:text-[44px] xl:text-[52px] leading-[1.3] tracking-[-1px] mb-[12px]">
          자주 묻는 질문
        </h1>
        <p className="font-medium text-[#7d8ba0] text-[15px] xl:text-[20px] leading-[1.5] mb-[40px]">
          고객님들이 자주 문의하시는 질문과 답변을 모았습니다.
        </p>

        {/* 카테고리 탭 */}
        <div className="flex justify-center mb-[36px]">
          <div className="flex items-center gap-[4px] bg-[#f1f3f5] rounded-full px-[10px] py-[10px]">
            {CATEGORIES.map(cat => (
              <button
                key={cat.id}
                onClick={() => { setActiveCategory(cat.id); setOpenFAQ(null); }}
                className={`h-[45px] px-[22px] rounded-full text-[14px] font-semibold whitespace-nowrap transition-all ${
                  activeCategory === cat.id
                    ? 'bg-[#0d1b3e] text-white'
                    : 'text-[#566376] hover:bg-[#0d1b3e] hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* 총 건수 + 검색바 */}
        <div className="flex items-center justify-between gap-[16px] mb-[8px] pb-[16px] border-b-2 border-[#101828]">
          <p className="text-[14px] text-[#566376] shrink-0">
            총 <span className="font-bold text-[#101828]">{filtered.length}</span>건
          </p>
          <div className="relative w-[260px] sm:w-[320px]">
            <Search className="absolute left-[12px] top-1/2 -translate-y-1/2 w-[16px] h-[16px] text-[#9ca3af]" />
            <input
              type="text"
              placeholder="검색어를 입력해 주세요."
              value={search}
              onChange={e => { setSearch(e.target.value); setOpenFAQ(null); }}
              className="w-full h-[40px] pl-[36px] pr-[12px] bg-white border border-[#d1d5dc] rounded-[4px] text-[14px] text-[#101828] placeholder:text-[#9ca3af] focus:outline-none focus:border-[#155dfc] transition-colors"
            />
          </div>
        </div>

        {/* FAQ 목록 */}
        {filtered.length === 0 ? (
          <div className="py-[80px] text-center">
            <p className="text-[#9ca3af] text-[16px]">검색 결과가 없습니다.</p>
          </div>
        ) : (
          <div className="mb-[64px]">
            {filtered.map((faq, i) => (
              <FaqItem
                key={i}
                faq={faq}
                index={i}
                open={openFAQ === i}
                onToggle={handleToggle}
              />
            ))}
          </div>
        )}

        {/* 하단 CTA */}
        <div className="bg-[#f8faff] border border-[#dce8ff] rounded-[8px] px-[28px] py-[36px] text-center">
          <p className="font-bold text-[#101828] text-[18px] sm:text-[20px] mb-[8px]">원하시는 답변을 찾지 못하셨나요?</p>
          <p className="text-[#6a7282] text-[15px] sm:text-[16px] mb-[24px]">1:1 문의를 남겨주시면 영업일 기준 24시간 이내 답변드리겠습니다.</p>
          <Link
            to="/support/inquiry"
            className="inline-flex items-center gap-[8px] h-[48px] px-[32px] bg-[#155dfc] text-white text-[15px] font-semibold rounded-[4px] hover:bg-[#1251e0] transition-colors"
          >
            1:1 문의하기
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M3 7h8M7 3l4 4-4 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>

      <Footer />
    </div>
  );
}
