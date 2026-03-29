import React from 'react';
import { ThemeProvider } from './theme/ThemeProvider';
import { PlatformProvider } from './platform/PlatformProvider';
import { PlatformPage } from './pages/PlatformPage';
import { ProductHomePage } from './pages/ProductHomePage';
import { TopNav } from './layout/TopNav';
import { Footer } from './layout/Footer';
import { getActiveProductId } from './platform/registry';
import { useSeo } from './platform/useSeo';
import { getSeoForRoute } from './platform/seoConfig';

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

  useSeo(getSeoForRoute(route));

  let page: React.ReactNode;

  if (route.startsWith('/product/')) {
    const productId = route.slice('/product/'.length).split('/')[0];
    page = <ProductHomePage productId={productId ?? ''} />;
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
      </PlatformProvider>
    </ThemeProvider>
  );
}
