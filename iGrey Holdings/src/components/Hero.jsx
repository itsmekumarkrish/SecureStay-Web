import React from 'react';
import { ArrowRight, Building2, TrendingUp, ShieldCheck, Globe } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text hero-content-main">
          <div className="hero-tag">
            <span className="tag-rating">★ Grade-A Portfolio</span>
            <span className="tag-divider-dot">•</span>
            <span>Real Estate & Property Development Holdings</span>
          </div>
          <h1>
            Architecting Timeless <span className="text-highlight-gold">Real Estate & Urban Assets</span>
          </h1>
          <p className="hero-subtitle">
            iGrey Holdings is a premier real estate development and asset management group developing Grade-A commercial towers, ultra-luxury sky residences, and high-tech industrial parks.
          </p>
          <div className="hero-buttons">
            <a href="#properties" className="btn-primary">
              Explore Portfolio <ArrowRight size={16} className="btn-arrow" />
            </a>
            <a href="#contact" className="btn-secondary">
              Investor & Leasing Inquiry
            </a>
          </div>
        </div>

        {/* 4 Key Institutional Stats */}
        <div className="hero-stats-strip">
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <TrendingUp size={20} className="stat-icon" />
            </div>
            <div className="stat-number">$850M+</div>
            <div className="stat-desc">Assets Under Management</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Building2 size={20} className="stat-icon" />
            </div>
            <div className="stat-number">4.8M+</div>
            <div className="stat-desc">Sq. Ft. Developed & Managed</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <ShieldCheck size={20} className="stat-icon" />
            </div>
            <div className="stat-number">98.4%</div>
            <div className="stat-desc">Institutional Occupancy</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Globe size={20} className="stat-icon" />
            </div>
            <div className="stat-number">100%</div>
            <div className="stat-desc">LEED & ESG Certified</div>
          </div>
        </div>
      </div>
    </section>
  );
}
