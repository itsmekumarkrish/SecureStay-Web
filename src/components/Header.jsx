import React from 'react';
import { Menu, X } from 'lucide-react';

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
          className="logo-brand"
          onClick={(e) => {
            e.preventDefault();
            handleNavClick('home');
          }}
        >
          <img src="/assets/logo_transparent.png?v=200" alt="SecureStay Private Limited" className="brand-logo-img" />
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
            onClick={() => handleNavClick('catalog')}
          >
            Properties
          </button>
          <button 
            type="button" 
            className="btn-nav"
            onClick={() => handleNavClick('home', 'contact-form')}
          >
            Contact Us
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
            About Us
          </button>
          <button 
            type="button" 
            className="nav-mobile-btn"
            onClick={() => handleNavClick('catalog')}
          >
            All Properties
          </button>
          <button 
            type="button" 
            className="btn-primary" 
            onClick={() => handleNavClick('home', 'contact-form')}
          >
            Contact Us
          </button>
        </div>
      )}
    </header>
  );
}
