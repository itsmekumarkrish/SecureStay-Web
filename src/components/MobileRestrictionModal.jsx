import React from 'react';
import { Monitor, Phone, ArrowRight, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function MobileRestrictionModal({ onBypass }) {
  return (
    <div className="mobile-restriction-overlay">
      <div className="mobile-restriction-card">
        {/* Brand Header */}
        <div className="mobile-brand-wrap">
          <img src="/assets/logo.png" alt="Secure Stay Private Limited" className="mobile-restriction-logo" />
        </div>

        <div className="mobile-badge-tag">
          <Monitor size={14} /> Desktop Portal Only
        </div>

        <h2>Desktop Screen Required</h2>
        <p className="mobile-restriction-desc">
          To deliver the highest security and seamless residential property services experience, <strong>SecureStay Web</strong> is exclusively designed for desktop screens and webview windows.
        </p>

        {/* Info Grid */}
        <div className="mobile-info-box">
          <div className="mobile-info-item">
            <ShieldCheck size={18} className="text-gold" />
            <span>Guaranteed Rent &amp; Verified Stays</span>
          </div>
        </div>

        {/* Mobile Contact CTAs */}
        <div className="mobile-cta-group">
          <a
            href="https://wa.me/917090902111?text=Hi%20SecureStay,%20I%20am%20visiting%20from%20a%20mobile%20device%20and%20need%20property%20assistance"
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

          <button type="button" className="btn-bypass-mobile" onClick={onBypass}>
            <span>Continue to Desktop View</span>
            <ArrowRight size={14} />
          </button>
        </div>

        <p className="mobile-restriction-footer">
          © {new Date().getFullYear()} Secure Stay Private Limited. All rights reserved.
        </p>
      </div>
    </div>
  );
}
