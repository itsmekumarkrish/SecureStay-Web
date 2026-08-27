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
          <MapPin size={14} /> {property.location}
        </p>
        <div className="property-bottom">
          <div className="property-pricing">
            <span className="property-price">{property.rentPrice}</span>
            <span className="property-lease-tag"> • Lease: {property.leasePrice}</span>
          </div>
          <button 
            type="button" 
            className="btn-secondary-sm" 
            onClick={() => onInquire && onInquire(property.title)}
          >
            Inquire
          </button>
        </div>
      </div>
    </div>
  );
}
