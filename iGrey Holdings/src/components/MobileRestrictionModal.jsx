import React from 'react';
import { Monitor, Phone, ShieldCheck } from 'lucide-react';
import WhatsAppIcon from './WhatsAppIcon';

export default function MobileRestrictionModal({ onBypass }) {
  return (
    <div className="mobile-restriction-overlay">
      <div className="mobile-restriction-card">
        {/* Brand Logo Header */}
        <div className="mobile-brand-wrap mb-3">
          <img 
            src="/favicon.png" 
            alt="iGrey Holdings" 
            className="mobile-restriction-icon mx-auto" 
          />
        </div>

        <div className="mobile-badge-tag">
          <Monitor size={14} /> Desktop &amp; Laptop Required
        </div>

        <h2>Desktop Access Required</h2>
        <p className="mobile-restriction-desc">
          The <strong>iGrey Holdings Properties Portal</strong> is optimized exclusively for desktop &amp; laptop computer screens for 3D walkthroughs, listing management, and property verification.
        </p>

        {/* Info Box */}
        <div className="mobile-info-box">
          <div className="mobile-info-item">
            <ShieldCheck size={18} className="text-gold" />
            <span>Verified Residential Property Stays</span>
          </div>
        </div>

        <p className="mobile-instruction-text">
          Please open <strong>igreyholdings.com</strong> on your laptop or desktop browser.
        </p>

        {/* Mobile Contact CTAs */}
        <div className="mobile-cta-group">
          <a
            href="https://wa.me/917090902111?text=Hi%20iGrey%20Holdings,%20I%20am%20opening%20your%20website%20from%20a%20mobile%20phone"
            target="_blank"
            rel="noopener noreferrer"
            className="btn-whatsapp-mobile-card"
          >
            <WhatsAppIcon size={20} />
            <span>Chat on WhatsApp</span>
          </a>

          <a href="tel:+917090902111" className="btn-call-mobile-card">
            <Phone size={18} />
            <span>Call Property Advisor</span>
          </a>

          {onBypass && (
            <button 
              type="button" 
              className="btn-bypass-mobile mt-2" 
              onClick={onBypass}
            >
              Continue to Mobile Site Anyway →
            </button>
          )}
        </div>

        <p className="mobile-restriction-footer mt-3">
          © {new Date().getFullYear()} iGrey Holdings. All rights reserved.
        </p>
      </div>
    </div>
  );
}
