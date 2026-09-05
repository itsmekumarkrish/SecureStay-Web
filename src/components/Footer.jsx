import React from 'react';
import { ShieldCheck } from 'lucide-react';

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
              className="footer-logo-link"
              onClick={(e) => {
                e.preventDefault();
                handleNavClick('home');
              }}
            >
              <img src="/assets/logo_light.png" alt="SecureStay Properties" className="footer-logo-img" />
            </a>
            <p className="footer-bio">
              India's premier end-to-end residential property services company. Providing guaranteed on-time rent, 100% verified background checks, and seamless property care.
            </p>
            <div className="footer-badge-trust">
              <ShieldCheck size={15} className="text-gold flex-shrink-0" />
              <span>Registered Corporate Entity</span>
            </div>
          </div>

          {/* Column 2: Quick Links */}
          <div className="footer-col">
            <h4 className="footer-heading">Quick Links</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNavClick('home', 'about')} className="footer-btn-link">About SecureStay</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Our Services</button></li>
              <li><button type="button" onClick={() => handleNavClick('catalog')} className="footer-btn-link">All Properties</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'contact-form')} className="footer-btn-link">List Your Property</button></li>
            </ul>
          </div>

          {/* Column 3: Management Services */}
          <div className="footer-col">
            <h4 className="footer-heading">Our Services</h4>
            <ul className="footer-links">
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Guaranteed Rent Payouts</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Tenant KYC Verification</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Property Inspections & Repairs</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Legal Rental Agreements</button></li>
              <li><button type="button" onClick={() => handleNavClick('home', 'services')} className="footer-btn-link">Zero Brokerage Stays</button></li>
            </ul>
          </div>
        </div>

        <div className="footer-divider"></div>

        <div className="footer-bottom-row">
          <p className="footer-copy" onDoubleClick={() => handleNavClick('admin')}>
            © {new Date().getFullYear()} SecureStay Properties. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <button type="button" onClick={() => setLegalModal('privacy')} className="footer-modal-link">Privacy Policy</button>
            <span className="dot-sep">•</span>
            <button type="button" onClick={() => setLegalModal('terms')} className="footer-modal-link">Terms of Service</button>
            <span className="dot-sep">•</span>
            <button type="button" onClick={() => setLegalModal('trust')} className="footer-modal-link">Trust & Safety</button>
          </div>
        </div>
      </div>
    </footer>
  );
}
