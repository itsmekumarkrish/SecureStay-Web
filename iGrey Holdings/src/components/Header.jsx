import React from 'react';
import { Menu, X, Landmark } from 'lucide-react';

export default function Header({ 
  mobileMenuOpen, 
  setMobileMenuOpen, 
  onNavigate 
}) {
  const handleNavClick = (viewName, hashTarget) => {
    if (onNavigate) onNavigate(viewName);
    setMobileMenuOpen(false);
    if (hashTarget) {
      setTimeout(() => {
        const elem = document.getElementById(hashTarget) || document.getElementById('contact-card') || document.getElementById('contact');
        if (elem) {
          const headerOffset = 100;
          const elementPosition = elem.getBoundingClientRect().top;
          const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
          window.scrollTo({
            top: offsetPosition,
            behavior: 'smooth'
          });
        }
      }, 120);
    }
  };

  return (
    <header className="header">
      <div className="container header-content">
        <a 
          href="#" 
          className="logo-brand flex items-center gap-2 text-decoration-none"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <div className="brand-icon-box">
            <Landmark size={24} className="brand-gold-icon" />
          </div>
          <span className="brand-name-text">iGrey Holdings</span>
        </a>

        <nav className="nav-desktop">
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('home', 'about')}
          >
            About
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('home', 'services')}
          >
            Capabilities
          </button>
          <button 
            type="button" 
            className="nav-link-btn"
            onClick={() => handleNavClick('catalog')}
          >
            Developments Portfolio
          </button>
          <button 
            type="button" 
            className="btn-nav"
            onClick={() => handleNavClick('home', 'contact-form')}
          >
            Investor & Leasing Contact
          </button>
        </nav>

        <button 
          className="mobile-btn" 
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label="Toggle Menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="nav-mobile">
          <button 
            type="button" 
            className="nav-mobile-btn"
            onClick={() => handleNavClick('home', 'about')}
          >
            About iGrey Holdings
          </button>
          <button 
            type="button" 
            className="nav-mobile-btn"
            onClick={() => handleNavClick('home', 'services')}
          >
            Capabilities
          </button>
          <button 
            type="button" 
            className="nav-mobile-btn"
            onClick={() => handleNavClick('catalog')}
          >
            Portfolio
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => handleNavClick('home', 'contact-form')}
          >
            Investor Contact
          </button>
        </div>
      )}
    </header>
  );
}
