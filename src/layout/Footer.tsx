import { Icon } from '../icons/Icon';

// GridStorm lives at this URL — all docs/demo links point here
const GS = 'https://gridstorm.tekivex.com';

const FOOTER_COLS = [
  {
    heading: 'Platform',
    links: [
      { label: 'All Products',       href: '#/products' },
      { label: 'GridStorm',          href: '#/product/gridstorm' },
      { label: 'Analytics Studio',   href: '#/product/analytics-studio' },
      { label: 'PDF Toolkit',        href: '#/product/pdf-toolkit' },
      { label: 'DataFlow',           href: '#/product/dataflow' },
      { label: 'Platform Repo',      href: 'https://github.com/007krcs/tekivex' },
    ],
  },
  {
    heading: 'GridStorm',
    links: [
      { label: 'Introduction',    href: `${GS}/#/docs/getting-started/introduction` },
      { label: 'Plugin System',   href: `${GS}/#/docs/plugins/plugin-system` },
      { label: 'PDF Toolkit',     href: `${GS}/#/docs/guides/pdf-toolkit` },
      { label: 'AI & MCP',        href: `${GS}/#/docs/core-concepts/architecture` },
      { label: 'Migration Guide', href: `${GS}/#/docs/guides/migration-from-ag-grid` },
    ],
  },
  {
    heading: 'Documentation',
    links: [
      { label: 'Quick Start',   href: `${GS}/#/docs/getting-started/quick-start` },
      { label: 'API Reference', href: `${GS}/#/docs/api/grid-api` },
      { label: 'Column Defs',   href: `${GS}/#/docs/api/column-definitions` },
      { label: 'Accessibility', href: `${GS}/#/docs/plugins/a11y` },
      { label: 'Contributing',  href: 'https://github.com/007krcs/grid-data/blob/main/CONTRIBUTING.md' },
    ],
  },
  {
    heading: 'Frameworks',
    links: [
      { label: 'React',   href: `${GS}/#/docs/frameworks/react` },
      { label: 'Vue',     href: `${GS}/#/docs/frameworks/vue` },
      { label: 'Angular', href: `${GS}/#/docs/frameworks/angular` },
      { label: 'Svelte',  href: `${GS}/#/docs/frameworks/svelte` },
      { label: 'Vanilla', href: `${GS}/#/docs/frameworks/vanilla` },
    ],
  },
  {
    heading: 'Demos',
    links: [
      { label: 'Feature Showcase',   href: `${GS}/feature-showcase/` },
      { label: 'Playground',         href: `${GS}/playground/` },
      { label: 'Financial Trading',  href: `${GS}/financial-trading/` },
      { label: 'Analytics Explorer', href: `${GS}/analytics-explorer/` },
      { label: 'PDF Viewer',         href: `${GS}/pdf-viewer/` },
    ],
  },
  {
    heading: 'Community',
    links: [
      { label: 'GitHub',          href: 'https://github.com/007krcs/grid-data' },
      { label: 'Issues',          href: 'https://github.com/007krcs/grid-data/issues' },
      { label: 'Discussions',     href: 'https://github.com/007krcs/grid-data/discussions' },
      { label: 'Security Policy', href: 'https://github.com/007krcs/grid-data/blob/main/SECURITY.md' },
      { label: 'Code of Conduct', href: 'https://github.com/007krcs/grid-data/blob/main/CODE_OF_CONDUCT.md' },
    ],
  },
];

export function Footer() {
  // Anything that's not a hash link (#/) is external
  const isExternal = (href: string) => !href.startsWith('#');

  return (
    <footer className="hub-footer-enterprise">
      {/* Top: brand + badges */}
      <div className="hub-footer-top">
        <div className="hub-footer-brand">
          <div className="hub-footer-logo">
            <img src="/favicon.svg" alt="Tekivex" width="36" height="36" style={{ display: 'block', borderRadius: 8 }} />
          </div>
          <div>
            <div className="hub-footer-brand-name">Tekivex</div>
            <div className="hub-footer-brand-tagline">Enterprise software, crafted with skill</div>
          </div>
        </div>
        <div className="hub-footer-badges">
          <span className="hub-footer-badge">6 products</span>
          <span className="hub-footer-badge">57 packages</span>
          <span className="hub-footer-badge">TypeScript-native</span>
          <span className="hub-footer-badge">MIT License</span>
        </div>
      </div>

      {/* Main link columns */}
      <div className="hub-footer-cols">
        {FOOTER_COLS.map((col) => (
          <div key={col.heading} className="hub-footer-col">
            <h4 className="hub-footer-col-heading">{col.heading}</h4>
            <ul className="hub-footer-col-list">
              {col.links.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="hub-footer-col-link"
                    {...(isExternal(link.href) ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div className="hub-footer-bottom">
        <div className="hub-footer-copy">
          &copy; {new Date().getFullYear()} Tekivex. All rights reserved.
        </div>
        <div className="hub-footer-bottom-links">
          <a href="#/products" className="hub-footer-bottom-link">Products</a>
          <a href={`${GS}/#/docs/getting-started/introduction`} className="hub-footer-bottom-link" target="_blank" rel="noopener noreferrer">Docs</a>
          <a href="https://github.com/007krcs/grid-data/blob/main/SECURITY.md" className="hub-footer-bottom-link" target="_blank" rel="noopener noreferrer">Security</a>
        </div>
        <div className="hub-footer-social">
          <a
            href="https://github.com/007krcs/grid-data"
            target="_blank"
            rel="noopener noreferrer"
            className="hub-footer-social-link"
            aria-label="GitHub"
          >
            <Icon name="github" size={18} />
          </a>
        </div>
      </div>
    </footer>
  );
}
