import React from 'react';
import { Star, MapPin } from 'lucide-react';

export default function ReviewsSection({ reviews }) {
  return (
    <section id="reviews" className="section reviews-marquee-section">
      <div className="container">
        <div className="section-title text-center">
          <span className="section-eyebrow">VERIFIED REVIEWS</span>
          <h2>Loved by Property Owners & Tenants</h2>
          <p>Rated 4.9/5 by 5,000+ happy customers across Bangalore, Mysuru, Hyderabad & Chennai.</p>
        </div>
      </div>

      {/* Auto-sliding Reviews Marquee Carousel */}
      <div className="reviews-marquee-wrapper">
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
