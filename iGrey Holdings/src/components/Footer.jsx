import React from 'react';
import { ShieldCheck, Landmark } from 'lucide-react';

export default function Footer({ setLegalModal, onNavigate }) {
  const handleNavClick = (viewName, hashTarget) => {
    if (onNavigate) onNavigate(viewName);
    if (hashTarget) {
      setTimeout(() => {
        const elem = document.getElementById(hashTarget);
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top-grid">
          {/* Column 1: Brand & Bio */}
          <div className="footer-col footer-col-brand">
            <a 
              href="#" 
              className="footer-logo-link flex items-center gap-2"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              <div className="brand-icon-box">
                <Landmark size={24} className="brand-gold-icon" />
              </div>
              <span className="brand-name-text text-white">iGrey Holdings</span>
            </a>
            <p className="footer-bio">
              Premier real estate development and asset management group. Architecting Grade-A commercial towers, ultra-luxury residences, and strategic logistics parks.
            </p>
            <div className="footer-badge-trust">
              <ShieldCheck size={15} className="text-gold flex-shrink-0" />
              <span>Registered Real Estate Holding Entity</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNavClick('home', 'about')} className="footer-btn-link">About iGrey Holdings</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Capabilities & Asset Management</button></li>
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">Real Estate Portfolio</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'contact-form')} className="footer-btn-link">Investor Relations</button></li>
            </ul>
          </div>

          {/* Column 3: Capabilities */}
          <div className="footer-col">
            <h4 className="footer-heading">Holding Portfolios</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">Grade-A Commercial Skyscraper Towers</button></li>
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">Ultra-Luxury High-Rise Sky Residences</button></li>
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">Integrated Mixed-Use Tech & Retail Hubs</button></li>
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">Industrial Robotics & Logistics Parks</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copy" onDoubleClick={() => handleNavClick('admin')}>
            © {new Date().getFullYear()} iGrey Holdings. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <button type="button" onClick={() => setLegalModal('privacy')} className="footer-modal-link">Privacy Policy</button>
            <span className="dot-sep">•</span>
            <button type="button" onClick={() => setLegalModal('terms')} className="footer-modal-link">Terms & Governance</button>
            <span className="dot-sep">•</span>
            <button type="button" onClick={() => setLegalModal('trust')} className="footer-modal-link">ESG & Sustainability Commitment</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
