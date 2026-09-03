import React, { useRef, useState } from 'react';
import { Star, MapPin } from 'lucide-react';

export default function ReviewsSection({ reviews }) {
  const wrapperRef = useRef(null);
  const [isSwiping, setIsSwiping] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleTouchStart = (e) => {
    setIsSwiping(true);
    if (wrapperRef.current) {
      setStartX(e.touches[0].pageX - wrapperRef.current.offsetLeft);
      setScrollLeft(wrapperRef.current.scrollLeft);
    }
  };

  const handleTouchMove = (e) => {
    if (!isSwiping || !wrapperRef.current) return;
    const x = e.touches[0].pageX - wrapperRef.current.offsetLeft;
    const walk = (x - startX) * 1.5;
    wrapperRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleTouchEnd = () => {
    setIsSwiping(false);
  };

  return (
    <section id="reviews" className="section reviews-marquee-section">
      <div className="container">
        <div className="section-title text-center">
          <span className="section-eyebrow verified-reviews-eyebrow">VERIFIED REVIEWS</span>
          <h2 className="reviews-section-title">Loved by Proud Customers</h2>
          <p>Rated 5/5 by 100+ happy customers across Bangalore, Mysuru, Hyderabad &amp; Chennai.</p>
        </div>
      </div>

      {/* Auto-sliding Reviews Marquee Carousel with Touch Dragging */}
      <div 
        ref={wrapperRef}
        className={`reviews-marquee-wrapper ${isSwiping ? 'is-swiping' : ''}`}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="reviews-marquee-track">
          {/* First Set of Reviews */}
          {reviews.map((rev) => (
            <div key={`rev-a-${rev.id}`} className="review-card marquee-card">
              <div className="review-card-top">
                <div className="review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="star-filled" />
                  ))}
                </div>
                <span className="review-tag-badge">{rev.tag}</span>
              </div>

              <div className="review-body">
                <p className="review-text">{rev.text}</p>
              </div>

              <div className="review-author">
                <div className="review-author-info">
                  <h4 className="author-name">{rev.name}</h4>
                  <p className="author-role">{rev.role}</p>
                  <p className="author-loc"><MapPin size={12} /> {rev.location}</p>
                </div>
              </div>
            </div>
          ))}

          {/* Second Set of Reviews (Seamless Loop) */}
          {reviews.map((rev) => (
            <div key={`rev-b-${rev.id}`} className="review-card marquee-card">
              <div className="review-card-top">
                <div className="review-stars">
                  {[...Array(rev.rating)].map((_, i) => (
                    <Star key={i} size={15} className="star-filled" />
                  ))}
                </div>
                <span className="review-tag-badge">{rev.tag}</span>
              </div>

              <div className="review-body">
                <p className="review-text">{rev.text}</p>
              </div>

              <div className="review-author">
                <div className="review-author-info">
                  <h4 className="author-name">{rev.name}</h4>
                  <p className="author-role">{rev.role}</p>
                  <p className="author-loc"><MapPin size={12} /> {rev.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Line / Segmented Dashes Indicator Below Cards */}
      <div className="container">
        <div className="reviews-line-track">
          <span className="dash-segment dash-1"></span>
          <span className="dash-segment dash-2"></span>
          <span className="dash-segment dash-3"></span>
          <span className="dash-segment dash-4"></span>
          <span className="dash-segment dash-5"></span>
          <span className="dash-segment dash-6"></span>
          <span className="dash-segment dash-7"></span>
        </div>
      </div>
    </section>
  );
}
