import React from 'react';
import { Building2, Home, Landmark, Cpu } from 'lucide-react';

export default function FeaturesSection() {
  return (
    <section id="about" className="section bg-light">
      <div className="container">
        <div className="section-title text-center">
          <h2>Core Investment & Development Pillars</h2>
          <p>We acquire, develop, and manage prime real estate assets designed for long-term capital appreciation and institutional yield.</p>
        </div>

        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">
              <Building2 size={24} />
            </div>
            <h3>Grade-A Commercial Towers</h3>
            <p>LEED Platinum corporate skyscrapers equipped with smart HVAC, renewable microgrids, and Fortune 500 facilities.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Home size={24} />
            </div>
            <h3>Ultra-Luxury Residences</h3>
            <p>Exclusive high-rise penthouses and gated eco-estates featuring private plunge pools, concierge, and smart automation.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Landmark size={24} />
            </div>
            <h3>Integrated Mixed-Use Hubs</h3>
            <p>Transit-oriented developments combining high-street luxury retail, tech parks, and 5-star hospitality infrastructure.</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">
              <Cpu size={24} />
            </div>
            <h3>Logistics & Tech Parks</h3>
            <p>High-capacity automated warehousing and robotics assembly hubs with rooftop solar arrays and port connectivity.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
