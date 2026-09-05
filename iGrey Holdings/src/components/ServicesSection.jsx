import React from 'react';
import { ShieldCheck, BarChart3, Layers, Compass } from 'lucide-react';

export default function ServicesSection() {
  return (
    <section id="services" className="section">
      <div className="container">
        <div className="section-title text-center">
          <h2>Holding Capabilities & Asset Management</h2>
          <p>End-to-end real estate development, asset optimization, and corporate leasing solutions.</p>
        </div>

        <div className="services-grid">
          <div className="service-card">
            <div className="service-icon-bg">
              <BarChart3 size={28} className="text-gold" />
            </div>
            <h3>Asset Management & Yield Optimization</h3>
            <p>Maximizing property portfolio yields through active asset management, institutional tenant selection, and long-term lease structures.</p>
          </div>

          <div className="service-card">
            <div className="service-icon-bg">
              <Compass size={28} className="text-gold" />
            </div>
            <h3>Build-to-Suit Corporate Development</h3>
            <p>Custom architectural engineering and turnkey development tailored to multi-national enterprise office and industrial specifications.</p>
          </div>

          <div className="service-card">
            <div className="service-icon-bg">
              <Layers size={28} className="text-gold" />
            </div>
            <h3>Land Acquisition & Banking</h3>
            <p>Strategic acquisition of high-growth urban land reserves and transit-adjacent zones for future high-density mixed-use developments.</p>
          </div>

          <div className="service-card">
            <div className="service-icon-bg">
              <ShieldCheck size={28} className="text-gold" />
            </div>
            <h3>ESG & Carbon-Neutral Integration</h3>
            <p>Pioneering sustainable real estate with solar microgrids, zero-water discharge systems, and smart energy grid integration.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
