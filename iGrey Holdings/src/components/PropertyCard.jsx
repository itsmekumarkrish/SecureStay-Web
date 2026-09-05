import React, { useState } from 'react';
import { MapPin, ChevronLeft, ChevronRight } from 'lucide-react';

export default function PropertyCard({ property, onInquire }) {
  const [activePhotoIndex, setActivePhotoIndex] = useState(0);
  const [touchStartX, setTouchStartX] = useState(null);

  const images = property.images && property.images.length > 0
    ? property.images
    : [property.image || '/assets/hero_stay.jpg'];

  const handlePrev = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleDotClick = (e, index) => {
    e.preventDefault();
    e.stopPropagation();
    setActivePhotoIndex(index);
  };

  const handleTouchStart = (e) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStartX === null) return;
    const diff = touchStartX - e.changedTouches[0].clientX;
    if (diff > 35) {
      setActivePhotoIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    } else if (diff < -35) {
      setActivePhotoIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    }
    setTouchStartX(null);
  };

  const isOccupied = property.availability === 'Occupied';
  const isFeatured = !!property.isFeatured;
  const isForSale = property.purpose === 'sale' || property.purpose === 'rent_sale' || !!property.salePrice;

  return (
    <div className="property-card">
      <div 
        className="property-img-container"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        <div 
          className="property-slider-track"
          style={{ transform: `translateX(-${activePhotoIndex * 100}%)` }}
        >
          {images.map((imgUrl, idx) => (
            <div key={idx} className="property-slide">
              <img 
                src={imgUrl} 
                alt={`${property.title} - View ${idx + 1}`} 
                className="property-img" 
                loading={idx === 0 ? "eager" : "lazy"}
              />
            </div>
          ))}
        </div>

        {/* Status Badges Overlay */}
        <div style={{ position: 'absolute', top: '12px', left: '12px', zIndex: 10, display: 'flex', gap: '6px', flexWrap: 'wrap' }}>
          {isFeatured && (
            <span style={{ background: '#ca8a04', color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
              ★ Featured
            </span>
          )}
          {isForSale && (
            <span style={{ background: '#2563eb', color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
              🏷️ For Sale
            </span>
          )}
          {isOccupied && (
            <span style={{ background: '#dc2626', color: '#ffffff', fontSize: '0.72rem', fontWeight: 700, padding: '3px 8px', borderRadius: '6px', boxShadow: '0 2px 6px rgba(0,0,0,0.2)' }}>
              Occupied
            </span>
          )}
        </div>

        {/* Counter Badge */}
        {images.length > 1 && (
          <span className="property-photo-counter">
            {activePhotoIndex + 1} / {images.length}
          </span>
        )}

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button 
              type="button"
              className="slider-arrow slider-arrow-left" 
              onClick={handlePrev}
              aria-label="Previous Photo"
            >
              <ChevronLeft size={18} />
            </button>
            <button 
              type="button"
              className="slider-arrow slider-arrow-right" 
              onClick={handleNext}
              aria-label="Next Photo"
            >
              <ChevronRight size={18} />
            </button>
          </>
        )}

        {/* Interactive Pagination Dots */}
        {images.length > 1 && (
          <div className="slider-dots-container">
            {images.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`slider-dot ${idx === activePhotoIndex ? 'active' : ''}`}
                onClick={(e) => handleDotClick(e, idx)}
                aria-label={`Go to photo ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      <div className="property-details">
        <span className="property-type">{property.type}</span>
        <h3 className="property-title">{property.title}</h3>
        <p className="property-location">
          <MapPin size={14} /> {property.location} {property.propertyId && <span className="property-id-tag">• ID: {property.propertyId}</span>}
        </p>
        <div className="property-bottom">
          <div className="property-pricing">
            {property.rentPrice && <span className="property-price">{property.rentPrice.replace(/\s*\/\s*month/gi, '')}</span>}
            {!property.rentPrice && property.salePrice && <span className="property-price">{property.salePrice}</span>}
            {property.leasePrice && <span className="property-lease-tag"> • Lease: {property.leasePrice}</span>}
            {property.salePrice && property.rentPrice && <span className="property-lease-tag" style={{ color: '#2563eb', fontWeight: 700 }}> • Sale: {property.salePrice}</span>}
          </div>
          <button 
            type="button" 
            className="btn-secondary-sm" 
            onClick={(e) => {
              e.stopPropagation();
              onInquire && onInquire(property);
            }}
          >
            {isOccupied ? 'Inquire Next Slot' : 'Inquire'}
          </button>
        </div>
      </div>
    </div>
  );
}
