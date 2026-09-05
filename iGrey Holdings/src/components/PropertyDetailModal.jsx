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
        <div className="sheet-grab-handle"></div>
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
              <MapPin size={16} className="text-green" /> {property.location} {property.propertyId && <span className="property-id-tag">• ID: {property.propertyId}</span>}
            </p>

            <div className="detail-pricing-box">
              {property.rentPrice && (
                <div className="price-item">
                  <span className="price-label">Monthly Rent</span>
                  <span className="price-value-highlight">
                    {property.rentPrice.replace(/\s*\/\s*month/gi, '')}
                  </span>
                </div>
              )}
              {property.leasePrice && (
                <div className="price-item">
                  <span className="price-label">Long-Term Lease</span>
                  <span className="price-value">{property.leasePrice}</span>
                </div>
              )}
              {property.salePrice && (
                <div className="price-item">
                  <span className="price-label">Outright Sale</span>
                  <span className="price-value-highlight" style={{ color: '#2563eb' }}>{property.salePrice}</span>
                </div>
              )}
            </div>

            {/* About This Property Text Block */}
            <div className="detail-description-section">
              <h4 className="detail-description-title">About This Property</h4>
              <p className="detail-description-text">
                {property.description || 'Beautiful sun-lit studio apartment located right next to key commercial hubs and public transport. Features modern furnishing, 24/7 security, high-speed Wi-Fi, and premium living amenities.'}
              </p>
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

            {property.customFields && property.customFields.length > 0 && (
              <div className="detail-amenities-section" style={{ marginTop: '16px' }}>
                <h4>Additional Property Details</h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '10px' }}>
                  {property.customFields.map((cf, idx) => (
                    cf.label && cf.value ? (
                      <div key={idx} style={{ background: '#f8fafc', padding: '8px 12px', borderRadius: '8px', border: '1px solid #e2e8f0', fontSize: '0.85rem' }}>
                        <span style={{ fontWeight: 700, color: '#0c2340', marginRight: '6px' }}>{cf.label}:</span>
                        <span style={{ color: '#475569' }}>{cf.value}</span>
                      </div>
                    ) : null
                  ))}
                </div>
              </div>
            )}

            <div className="detail-cta-row">
              <button 
                type="button" 
                className="btn-primary w-full"
                onClick={() => {
                  onClose();
                  onInquire(property);
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
