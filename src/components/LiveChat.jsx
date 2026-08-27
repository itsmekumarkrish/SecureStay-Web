import React from 'react';
import WhatsAppIcon from './WhatsAppIcon';

export default function LiveChat() {
  return (
    <div className="floating-chat-container">
      <a
        href="https://wa.me/917090902111?text=Hi%20SecureStay,%20I%20am%20interested%20in%20residential%20property%20services"
        target="_blank"
        rel="noopener noreferrer"
        className="whatsapp-floating-circle-btn"
        title="Chat with us on WhatsApp (+91 7090902111)"
        aria-label="Chat on WhatsApp (+91 7090902111)"
      >
        <WhatsAppIcon size={30} />
      </a>
    </div>
  );
}
