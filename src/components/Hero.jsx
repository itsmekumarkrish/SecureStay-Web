import React from 'react';
import { ArrowRight, Users, Building2, TrendingUp, ShieldCheck } from 'lucide-react';

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
          {/* Custom Design / Element Slot Gap */}
          <div className="hero-custom-design-slot"></div>
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
