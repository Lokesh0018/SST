import { Routes, Route, useLocation } from 'react-router-dom';
import { lazy, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import MainLayout from './layouts/MainLayout';
import PageLoader from './components/common/PageLoader';

// Lazy-loaded pages for code splitting
const Home = lazy(() => import('./pages/Home'));
const Services = lazy(() => import('./pages/Services'));
const ServiceDetail = lazy(() => import('./pages/ServiceDetail'));

const Industries = lazy(() => import('./pages/Industries'));
const About = lazy(() => import('./pages/About'));
const Clients = lazy(() => import('./pages/Clients'));
const Contact = lazy(() => import('./pages/Contact'));
const NotFound = lazy(() => import('./pages/NotFound'));
import UnderDevelopment from './underdev/UnderDevelopment';

function App() {
  const location = useLocation();

  // If we want to block the entire site with the under development screen:
  const isUnderDevelopment = false;

  if (isUnderDevelopment) {
    return <UnderDevelopment />;
  }

  return (
    <MainLayout>
      <AnimatePresence mode="wait">
        <Suspense fallback={<PageLoader />} key={location.pathname}>
          <Routes location={location}>
            <Route path="/" element={<Home />} />
            <Route path="/services" element={<Services />} />
            <Route path="/services/:slug" element={<ServiceDetail />} />

            <Route path="/industries" element={<Industries />} />
            <Route path="/about" element={<About />} />
            <Route path="/clients" element={<Clients />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </AnimatePresence>
    </MainLayout>
  );
}

export default App;
