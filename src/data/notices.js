export const NOTICES = [
  {
    id: 1, number: 225, category: '보안공지', isImportant: true,
    title: 'SSL/TLS 인증서 클라이언트 인증(ClientAuth) EKU 제거 안내',
    date: '2026.03.31',
    content: '안녕하세요. certgo입니다.\n\nCA/Browser Forum의 정책 변경에 따라 SSL/TLS 인증서에서 클라이언트 인증(ClientAuth) EKU가 제거됩니다.\n\n적용 일시: 2026년 4월 15일부터\n영향 범위: 모든 공인 SSL/TLS 인증서\n\n클라이언트 인증이 필요한 경우 별도의 클라이언트 인증서를 발급받으시기 바랍니다.\n\n자세한 내용은 기술 지원팀으로 문의해주세요.\n감사합니다.',
  },
  {
    id: 2, number: 224, category: '일반공지', isImportant: true,
    title: '[중요] 2026년 5월 정기 시스템 점검 안내',
    date: '2026.05.15',
    content: '안녕하세요. certgo입니다.\n\n보다 안정적인 서비스 제공을 위해 정기 시스템 점검을 진행합니다.\n\n점검 일시: 2026년 5월 20일(화) 02:00 ~ 06:00 (4시간)\n점검 내용: 서버 안정화 작업 및 보안 패치\n\n점검 시간 동안 서비스 이용이 일시 중단될 수 있습니다.\n양해 부탁드립니다.\n\n감사합니다.',
  },
  {
    id: 3, number: 223, category: '일반공지', isImportant: false,
    title: 'GlobalSign EV 인증서 특별 할인 이벤트 (~ 5/31)',
    date: '2026.05.10',
    content: 'GlobalSign EV SSL 인증서 구매 시 특별 할인 이벤트를 진행합니다.\n\n할인 내용:\n- 1년 구매: 15% 할인\n- 2년 구매: 25% 할인\n- 3년 구매: 30% 할인\n\n이벤트 기간: 2026년 5월 31일까지\n\n이번 기회를 놓치지 마세요!',
  },
  {
    id: 4, number: 222, category: '일반공지', isImportant: false,
    title: '신규 Sectigo 제품 라인업 추가',
    date: '2026.05.05',
    content: 'Sectigo의 신규 제품이 certgo에 추가되었습니다.\n\n추가 제품:\n- Sectigo Positive SSL Wildcard\n- Sectigo Multi-Domain SSL\n- Sectigo EV Multi-Domain SSL\n\n인증서 전체보기 페이지에서 확인하실 수 있습니다.',
  },
  {
    id: 5, number: 221, category: '일반공지', isImportant: false,
    title: '코드사인 인증서 발급 프로세스 개선',
    date: '2026.04.28',
    content: '코드사인 인증서 발급 절차가 더욱 간편해졌습니다.\n\n개선 내용:\n- 서류 제출 온라인 자동화\n- 발급 기간 단축 (평균 3일 → 2일)\n- USB 토큰 배송 추적 서비스 제공\n\n더욱 편리해진 certgo를 이용해보세요.',
  },
  {
    id: 6, number: 220, category: '일반공지', isImportant: false,
    title: 'My certgo 대시보드 업데이트',
    date: '2026.04.20',
    content: 'My certgo 페이지가 새롭게 업데이트되었습니다.\n\n주요 변경사항:\n- 인증서 만료 알림 강화\n- 갱신 프로세스 간소화\n- 사용 통계 대시보드 추가\n- UI/UX 개선\n\n로그인 후 확인해보세요.',
  },
  {
    id: 7, number: 219, category: '일반공지', isImportant: false,
    title: '신규 결제 수단 추가: 카카오페이, 네이버페이',
    date: '2026.04.15',
    content: '간편 결제 서비스가 추가되었습니다.\n\n이제 카카오페이와 네이버페이로도 결제하실 수 있습니다.\n\n더욱 편리한 결제 환경을 제공하겠습니다.\n감사합니다.',
  },
  {
    id: 8, number: 218, category: '보안공지', isImportant: false,
    title: '[보안] Chrome 루트 인증서 프로그램 전환 안내',
    date: '2026.04.10',
    content: 'Google Chrome이 자체 루트 인증서 프로그램으로 전환됩니다.\n\n적용 시기: 2026년 하반기 예정\n영향: Chrome 브라우저에서의 인증서 신뢰 체인 변경\n\n당사에서 발급하는 모든 인증서는 Chrome 루트 프로그램과 호환되므로 별도 조치가 필요하지 않습니다.\n\n궁금하신 사항은 기술지원팀으로 문의해주세요.',
  },
  {
    id: 9, number: 217, category: '일반공지', isImportant: false,
    title: '2026년 1분기 고객 만족도 조사 결과',
    date: '2026.04.05',
    content: '2026년 1분기 고객 만족도 조사 결과를 공유합니다.\n\n전체 만족도: 4.7/5.0\n재구매 의향: 95%\n추천 의향: 92%\n\n소중한 의견 감사드리며, 더 나은 서비스로 보답하겠습니다.',
  },
  {
    id: 10, number: 216, category: '보안공지', isImportant: false,
    title: '[보안] TLS 1.0/1.1 지원 종료 안내',
    date: '2026.03.20',
    content: '보안 강화를 위해 TLS 1.0 및 1.1 프로토콜 지원이 종료됩니다.\n\n종료 일시: 2026년 6월 30일\n권장 사항: TLS 1.2 이상으로 업그레이드\n\n서버 설정 변경이 필요하신 경우 기술 지원팀으로 연락주시기 바랍니다.',
  },
];
