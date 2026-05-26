import { Routes, Route, useLocation } from 'react-router';
import { useLayoutEffect } from 'react';

if ('scrollRestoration' in history) history.scrollRestoration = 'manual';

function ScrollToTop() {
  const { pathname } = useLocation();
  useLayoutEffect(() => {
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  }, [pathname]);
  return null;
}
import Main from '../Main.jsx';
import MyCertgo from '../pages/MyCertgo.jsx';
import WhyCertgo from '../pages/WhyCertgo.jsx';
import CertList from '../pages/CertList.jsx';
import CertDetail from '../pages/CertDetail.jsx';
import Cart from '../pages/Cart.jsx';
import Apply from '../pages/Apply.jsx';
import CertFinder from '../pages/CertFinder.jsx';
import Inquiry from '../pages/Inquiry.jsx';
import FAQ from '../pages/FAQ.jsx';
import Notice from '../pages/Notice.jsx';
import NoticeDetail from '../pages/NoticeDetail.jsx';
import NoticeWrite from '../pages/NoticeWrite.jsx';
import Login from '../pages/Login.jsx';
import Signup from '../pages/Signup.jsx';
import Guide from '../pages/Guide.jsx';
import { NoticesProvider } from '../context/NoticesContext';

export default function App() {
  return (
    <NoticesProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/my-certgo" element={<MyCertgo />} />
        <Route path="/why-certgo" element={<WhyCertgo />} />
        <Route path="/tls-ssl" element={<CertList />} />
        <Route path="/tls-ssl/:id" element={<CertDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/apply" element={<Apply />} />
        <Route path="/cert-finder" element={<CertFinder />} />
        <Route path="/support/inquiry" element={<Inquiry />} />
        <Route path="/support/faq" element={<FAQ />} />
        <Route path="/support/guide" element={<Guide />} />
        <Route path="/support/notice" element={<Notice />} />
        <Route path="/support/notice/write" element={<NoticeWrite />} />
        <Route path="/support/notice/:id/edit" element={<NoticeWrite />} />
        <Route path="/support/notice/:id" element={<NoticeDetail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </NoticesProvider>
  );
}
