import React from 'react';
import { CheckCircle, ArrowRight } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="section bg-light">
      <div className="container">
        <div className="section-title text-center">
          <h2 className="services-section-title">Our Services</h2>
          <p className="services-section-subtitle">
            Comprehensive solutions tailored to property owners, NRI landlords, and tenants.
          </p>
        </div>

        <div className="services-grid">
          <div className="service-box">
            <h3 className="service-card-title">For Property Owners &amp; Landlords</h3>
            <ul className="service-list">
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Complete tenant search and onboarding</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Legal rental agreement drafting and registration</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Regular property inspections and digital updates</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>End-to-end repair, painting, and maintenance handling</span>
              </li>
            </ul>
            <a href="#contact-form" className="service-link btn-service-pill">
              List Your Property <ArrowRight size={16} className="btn-service-arrow" />
            </a>
          </div>

          <div className="service-box">
            <h3 className="service-card-title">For Tenants &amp; Working Professionals</h3>
            <ul className="service-list">
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Verified, fully furnished apartments &amp; studios</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Zero broker commission and clear deposit terms</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>High-speed internet, power backup, and housekeeping</span>
              </li>
              <li>
                <div className="service-icon-wrapper">
                  <CheckCircle size={16} className="service-icon-svg" />
                </div>
                <span>Dedicated on-call property manager for any issues</span>
              </li>
            </ul>
            <a href="#contact-form" className="service-link btn-service-pill">
              Find a Home <ArrowRight size={16} className="btn-service-arrow" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
