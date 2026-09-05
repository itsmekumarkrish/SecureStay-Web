import React from 'react';
import { CheckCircle, Home, Wrench, Key } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="about" className="section bg-light">
      <div className="container">
        <div className="section-title text-center">
          <h2>Why Choose SecureStay?</h2>
          <p>We provide a seamless and transparent experience for both homeowners and tenants.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <CheckCircle size={24} />
            </div>
            <h3>Verified Tenants</h3>
            <p>Thorough background verification, ID checks, and employment verification for complete safety.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Home size={24} />
            </div>
            <h3>On-Time Rent Payouts</h3>
            <p>Reliable and timely monthly rental deposits directly to your bank account with zero hassle.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Wrench size={24} />
            </div>
            <h3>Property Maintenance</h3>
            <p>Regular inspections, quick plumbing/electrical repairs, and professional housekeeping support.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Key size={24} />
            </div>
            <h3>Zero Brokerage Stays</h3>
            <p>Tenants can rent clean, fully furnished, and verified rooms and flats with transparent pricing.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
