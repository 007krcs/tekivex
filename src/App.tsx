import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { PlatformProvider } from './platform/PlatformProvider';
import { PlatformPage } from './pages/PlatformPage';
import { ProductHomePage } from './pages/ProductHomePage';
import { AboutPage } from './pages/AboutPage';
import { TopNav } from './layout/TopNav';
import { Footer } from './layout/Footer';
import { getActiveProductId } from './platform/registry';
import { useSeo } from './platform/useSeo';
import { getSeoForRoute } from './platform/seoConfig';

import { TutorialLanding } from './tutorials/TutorialLanding';
import { TutorialLayout } from './tutorials/TutorialLayout';
import { PrivacyPolicyPage } from './pages/PrivacyPolicyPage';

function useHashRoute(): string {
  const [hash, setHash] = React.useState(window.location.hash.slice(1) || '/');
  React.useEffect(() => {
    const handler = () => setHash(window.location.hash.slice(1) || '/');
    window.addEventListener('hashchange', handler);
    return () => window.removeEventListener('hashchange', handler);
  }, []);
  return hash;
}

export function navigate(path: string) {
  window.location.hash = path;
}

export function App() {
  const route = useHashRoute();
  const activeProductId = getActiveProductId(route);

  // Scroll to top on every route change
  React.useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [route]);

  useSeo(getSeoForRoute(route));

  let page: React.ReactNode;

  if (route === '/tutorials') {
    page = <TutorialLanding />;
  } else if (route.startsWith('/tutorials/')) {
    const parts = route.slice('/tutorials/'.length).split('/');
    const categoryId = parts[0];
    const topicSlug = parts[1] ?? null;
    page = <TutorialLayout categoryId={categoryId} topicSlug={topicSlug} />;
  } else if (route.startsWith('/product/')) {
    const productId = route.slice('/product/'.length).split('/')[0];
    page = <ProductHomePage productId={productId ?? ''} />;
  } else if (route === '/about') {
    page = <AboutPage />;
  } else if (route === '/privacy-policy') {
    page = <PrivacyPolicyPage />;
  } else {
    // Default: platform product launcher
    page = <PlatformPage />;
  }

  return (
    <ThemeProvider>
      <PlatformProvider activeProductId={activeProductId}>
        <div className="bg-pattern" />
        <div className="bg-glow" />
        <div className="hub-container">
          <TopNav route={route} />
          {page}
          <Footer />
        </div>
        {/* AI Support Chat — temporarily disabled */}
      </PlatformProvider>
    </ThemeProvider>
  );
}
