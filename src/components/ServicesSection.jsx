import React from 'react';
import { CheckCircle } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-title text-center">
          <h2>Our Services</h2>
          <p>Comprehensive solutions tailored to property owners, NRI landlords, and tenants.</p>
        </div>

        <div className="services-grid">
          <div className="service-box">
            <h3>For Property Owners & Landlords</h3>
            <ul className="service-list">
              <li><CheckCircle size={16} className="text-green" /> Complete tenant search and onboarding</li>
              <li><CheckCircle size={16} className="text-green" /> Legal rental agreement drafting and registration</li>
              <li><CheckCircle size={16} className="text-green" /> Regular property inspections and digital updates</li>
              <li><CheckCircle size={16} className="text-green" /> End-to-end repair, painting, and maintenance handling</li>
            </ul>
            <a href="#contact-form" className="service-link">List Your Property &rarr;</a>
          </div>

          <div className="service-box">
            <h3>For Tenants & Working Professionals</h3>
            <ul className="service-list">
              <li><CheckCircle size={16} className="text-green" /> Verified, fully furnished apartments & studios</li>
              <li><CheckCircle size={16} className="text-green" /> Zero broker commission and clear deposit terms</li>
              <li><CheckCircle size={16} className="text-green" /> High-speed internet, power backup, and housekeeping</li>
              <li><CheckCircle size={16} className="text-green" /> Dedicated on-call property manager for any issues</li>
            </ul>
            <a href="#contact-form" className="service-link">Find a Home &rarr;</a>
          </div>
        </div>
      </div>
    </section>
  );
}
