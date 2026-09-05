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
              <img src="/assets/logo_light.png?v=300" alt="SecureStay Properties" className="footer-logo-img" />
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

            {/* Mobile-Only Social Media Row */}
            <div className="footer-social-row">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Facebook">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="Instagram">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                  <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
                </svg>
              </a>
              <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-icon" aria-label="LinkedIn">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
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
