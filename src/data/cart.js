// v2: 키 변경으로 기존 캐시 무효화
const CART_KEY = 'certgo_cart_v2';

// 피그마 디자인 기준 기본 3개 항목
// OrganizationSSL 3년 × 0.8 = 1,008,000 / PositiveSSL 2년 = 360,000 / SecureSitePro 1년 = 850,000
const DEFAULT_ITEMS = [
  { id: 'd1', certId: 3, brand: 'GlobalSign', name: 'OrganizationSSL',         period: 3, basePrice: 420000, price: 1008000, selected: false },
  { id: 'd2', certId: 1, brand: 'Sectigo',    name: 'PositiveSSL Multi-Domain', period: 2, basePrice: 180000, price: 360000,  selected: false },
  { id: 'd3', certId: 2, brand: 'DigiCert',   name: 'Secure Site Pro',          period: 1, basePrice: 850000, price: 850000,  selected: false },
];

export function getCart() {
  try {
    const stored = JSON.parse(localStorage.getItem(CART_KEY) || 'null');
    if (stored && stored.length > 0) return stored;
    localStorage.setItem(CART_KEY, JSON.stringify(DEFAULT_ITEMS));
    return DEFAULT_ITEMS;
  } catch {
    return DEFAULT_ITEMS;
  }
}

export function saveCart(items) {
  localStorage.setItem(CART_KEY, JSON.stringify(items));
}

/** 장바구니에 추가. 이미 있으면 false 반환 */
export function addToCart(item) {
  const cart = getCart();
  if (cart.find(c => c.certId === item.certId)) return false;
  cart.push({ ...item, id: String(Date.now()), selected: false });
  saveCart(cart);
  return true;
}
