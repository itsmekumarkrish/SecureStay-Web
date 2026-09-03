import React from 'react';
import { ArrowRight, Users, Building2, TrendingUp, ShieldCheck, Zap, Home, Key } from 'lucide-react';

export default function Hero() {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-text">
          <div className="hero-tag">
            <span className="tag-rating">★ 5/5 Rating</span>
            <span className="tag-divider-dot">•</span>
            <span>Managed with Trust • Delivered with Care</span>
          </div>
          <h1>
            Simple, Reliable & <span className="text-highlight-gold">Residential Property Services</span>
          </h1>
          <p className="hero-subtitle">
            End-to-end residential property services for owners with guaranteed on-time rent, verified tenants, and seamless property care across India.
          </p>

          {/* Animated Live Trust & Feature Strip */}
          <div className="hero-custom-design-slot">
            <div className="hero-trust-marquee-wrapper">
              <div className="hero-trust-badge badge-glow">
                <span className="badge-pulse-dot"></span>
                <Zap size={14} className="badge-icon icon-gold" />
                <span>Guaranteed On-Time Rent</span>
              </div>
              <div className="hero-trust-badge">
                <ShieldCheck size={14} className="badge-icon icon-blue" />
                <span>100% KYC Verified Tenants</span>
              </div>
              <div className="hero-trust-badge">
                <Home size={14} className="badge-icon icon-green" />
                <span>Full Property Care</span>
              </div>
              <div className="hero-trust-badge">
                <Key size={14} className="badge-icon icon-gold" />
                <span>Zero Brokerage Stays</span>
              </div>
            </div>
          </div>

          <div className="hero-buttons">
            <a href="#contact" className="btn-primary">
              Get in Touch <ArrowRight size={16} className="btn-arrow" />
            </a>
            <a href="#properties" className="btn-secondary">
              View Properties
            </a>
          </div>
        </div>

        {/* 4 Total Counts Proof Strip */}
        <div className="hero-stats-strip">
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Users size={20} className="stat-icon" />
            </div>
            <div className="stat-number">100+</div>
            <div className="stat-desc">Happy Customers</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <Building2 size={20} className="stat-icon" />
            </div>
            <div className="stat-number">50+</div>
            <div className="stat-desc">Completed Projects</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <TrendingUp size={20} className="stat-icon" />
            </div>
            <div className="stat-number">99.2%</div>
            <div className="stat-desc">On-Time Rent Payouts</div>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <div className="stat-icon-wrapper">
              <ShieldCheck size={20} className="stat-icon" />
            </div>
            <div className="stat-number">100%</div>
            <div className="stat-desc">Verified Background KYC</div>
          </div>
        </div>
      </div>
    </section>
  );
}
