import React from 'react';
import { Monitor, Phone, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function MobileRestrictionModal() {
  return (
    <div className="mobile-restriction-overlay">
      <div className="mobile-restriction-card">
        {/* Brand Header */}
        <div className="mobile-brand-wrap">
          <img src="/assets/logo.png" alt="Secure Stay Private Limited" className="mobile-restriction-logo" />
        </div>

        <div className="mobile-badge-tag">
          <Monitor size={14} /> Desktop &amp; Webview Only
        </div>

        <h2>Desktop Access Required</h2>
        <p className="mobile-restriction-desc">
          The <strong>SecureStay Web Portal</strong> is optimized exclusively for desktop computer screens and webview browser windows.
        </p>

        {/* Info Box */}
        <div className="mobile-info-box">
          <div className="mobile-info-item">
            <ShieldCheck size={18} className="text-gold" />
            <span>Residential Property Services Portal</span>
          </div>
        </div>

        <p className="mobile-instruction-text">
          Please open this link on your desktop computer or laptop to explore properties and manage services.
        </p>

        {/* Mobile Contact CTAs */}
        <div className="mobile-cta-group">
          <a
            href="https://wa.me/917090902111?text=Hi%20SecureStay,%20I%20am%20opening%20your%20website%20from%20a%20mobile%20phone"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-mobile-card"
          >
            <WhatsAppIcon size={20} />
            <span>Chat on WhatsApp (+91 7090902111)</span>
          </a>

          <a href="tel:+917090902111" className="btn-call-mobile-card">
            <Phone size={18} />
            <span>Call Property Advisor</span>
          </a>
        </div>

        <p className="mobile-restriction-footer">
          © {new Date().getFullYear()} Secure Stay Private Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
