import React, { useState } from 'react';
import { X, MapPin, CheckCircle, ShieldCheck, ChevronLeft, ChevronRight, Calendar, Home, ArrowRight } from 'lucide-react';

export default function PropertyDetailModal({ property, onClose, onInquire }) {
  const [activeImgIndex, setActiveImgIndex] = useState(0);

  if (!property) return null;

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image || '/assets/hero_stay.jpg'];

  const amenities = property.amenities || [
    'Biometric Smart Lock',
    'High-Speed Wi-Fi',
    '24/7 Security & CCTV',
    'Power Backup',
    'Professional Housekeeping',
    'Fully Furnished Kitchen',
    'Washing Machine & Fridge',
    'Dedicated Property Manager'
  ];

  return (
    <div className="legal-modal-backdrop" onClick={onClose}>
      <div className="property-detail-modal-card" onClick={(e) => e.stopPropagation()}>
        <button type="button" className="property-modal-close-btn" onClick={onClose} aria-label="Close modal">
          <X size={20} />
        </button>

        <div className="detail-modal-grid">
          {/* Left Column: Image Gallery */}
          <div className="detail-gallery">
            <div className="detail-main-img-wrap">
              <img 
                src={images[activeImgIndex]} 
                alt={`${property.title} - View ${activeImgIndex + 1}`} 
                className="detail-main-img"
              />
              {images.length > 1 && (
                <>
                  <button 
                    type="button" 
                    className="detail-gallery-arrow gallery-arrow-left" 
                    onClick={() => setActiveImgIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1))}
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button 
                    type="button" 
                    className="detail-gallery-arrow gallery-arrow-right" 
                    onClick={() => setActiveImgIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1))}
                  >
                    <ChevronRight size={20} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails Strip */}
            {images.length > 1 && (
              <div className="detail-thumbnails-row">
                {images.map((img, idx) => (
                  <button
                    key={idx}
                    type="button"
                    className={`detail-thumb-btn ${idx === activeImgIndex ? 'active' : ''}`}
                    onClick={() => setActiveImgIndex(idx)}
                  >
                    <img src={img} alt={`Thumbnail ${idx + 1}`} />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Column: Property Info & Features */}
          <div className="detail-info-col">
            <span className="property-type">{property.type}</span>
            <h2 className="detail-property-title">{property.title}</h2>
            <p className="detail-property-loc">
              <MapPin size={16} className="text-green" /> {property.location}
            </p>

            <div className="detail-pricing-box" style={{ flexWrap: 'wrap', gap: '12px' }}>
              {property.rentPrice && (
                <div className="price-item">
                  <span className="price-label">Monthly Rent</span>
                  <span className="price-value-highlight">{property.rentPrice}</span>
                </div>
              )}
              {property.leasePrice && (
                <>
                  {property.rentPrice && <div className="price-divider"></div>}
                  <div className="price-item">
                    <span className="price-label">Long-Term Lease</span>
                    <span className="price-value">{property.leasePrice}</span>
                  </div>
                </>
              )}
              {property.salePrice && (
                <>
                  {(property.rentPrice || property.leasePrice) && <div className="price-divider"></div>}
                  <div className="price-item">
                    <span className="price-label">Outright Sale</span>
                    <span className="price-value-highlight" style={{ color: '#2563eb' }}>{property.salePrice}</span>
                  </div>
                </>
              )}
            </div>

            <div className="detail-highlights">
              <div className="highlight-badge">
                <ShieldCheck size={16} className="text-green" />
                <span>100% Zero Brokerage</span>
              </div>
              <div className="highlight-badge">
                <Home size={16} className="text-green" />
                <span>Ready to Move In</span>
              </div>
              <div className="highlight-badge">
                <Calendar size={16} className="text-green" />
                <span>Verified KYC Tenant Stay</span>
              </div>
            </div>

            <div className="detail-amenities-section">
              <h4>Included Amenities & Features</h4>
              <div className="amenities-grid">
                {amenities.map((item, idx) => (
                  <div key={idx} className="amenity-chip">
                    <CheckCircle size={14} className="text-green" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="detail-cta-row">
              <button 
                type="button" 
                className="btn-primary w-full"
                onClick={() => {
                  onClose();
                  onInquire(property.title);
                }}
              >
                Inquire About This Home <ArrowRight size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
