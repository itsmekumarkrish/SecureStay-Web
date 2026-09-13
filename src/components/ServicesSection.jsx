import React, { useState } from 'react';
import { 
  CheckCircle2, 
  ArrowRight, 
  ShieldCheck, 
  KeyRound, 
  FileText, 
  Wrench, 
  Sparkles, 
  UserCheck, 
  Smartphone, 
  Clock, 
  Award, 
  Building2, 
  Home,
  Check,
  X
} from 'lucide-react';

export default function ServicesSection() {
  const [activeTab, setActiveTab] = useState('tenants');

  const tenantServices = [
    {
      icon: Home,
      title: "Verified Furnished Homes",
      desc: "Fully equipped 1, 2 & 3 BHK apartments and studios with modern furniture, appliances, and kitchen setups.",
      perk: "100% Physical & Digital Verification"
    },
    {
      icon: ShieldCheck,
      title: "Zero Brokerage & Transparent Deposit",
      desc: "No hidden charges or middleman commissions. Clear, refundable security deposit terms guaranteed.",
      perk: "Save up to 1 Month's Rent"
    },
    {
      icon: Sparkles,
      title: "All-Inclusive Amenities",
      desc: "High-speed Wi-Fi, power backup, regular housekeeping, and appliance maintenance included.",
      perk: "Hassle-Free Living"
    },
    {
      icon: UserCheck,
      title: "Dedicated Relationship Manager",
      desc: "One point of contact for all your queries, maintenance requests, and contract renewals.",
      perk: "24/7 On-Call Support"
    },
    {
      icon: FileText,
      title: "Instant Digital Agreement",
      desc: "Hassle-free online agreement drafting, digital signatures, and police verification support.",
      perk: "Completed in Under 24 Hours"
    },
    {
      icon: Clock,
      title: "Flexible Tenure Options",
      desc: "Custom stay durations tailored for working professionals, corporate travelers, and families.",
      perk: "Flexible Lock-in Periods"
    }
  ];

  const ownerServices = [
    {
      icon: Award,
      title: "Guaranteed Monthly Rent",
      desc: "Enjoy consistent on-time rental payouts directly to your account, ensuring complete financial security.",
      perk: "Zero Payment Delays"
    },
    {
      icon: UserCheck,
      title: "Strict Tenant Screening",
      desc: "Background checks, corporate employment verification, and identity validation for every occupant.",
      perk: "Verified Working Professionals"
    },
    {
      icon: Wrench,
      title: "End-to-End Maintenance",
      desc: "Regular upkeep, professional deep cleaning, plumbing, electrical, and painting handled by experts.",
      perk: "Preserves Property Value"
    },
    {
      icon: Smartphone,
      title: "Digital Updates & Audits",
      desc: "Receive periodic photo & video inspection reports directly on your phone, perfect for NRI landlords.",
      perk: "Complete Peace of Mind"
    },
    {
      icon: FileText,
      title: "Legal & Taxation Support",
      desc: "Professional drafting, registration, tenant verification, and rent receipt management.",
      perk: "100% Legally Compliant"
    },
    {
      icon: Building2,
      title: "NRI Property Management",
      desc: "Complete hands-off management for overseas landlords — from keys custody to tenant onboarding.",
      perk: "Dedicated Overseas Desk"
    }
  ];

  const comparisonItems = [
    { feature: "Zero Broker Commission", secureStay: true, traditional: false },
    { feature: "Verified Property Inspections", secureStay: true, traditional: false },
    { feature: "Dedicated Relationship Manager", secureStay: true, traditional: false },
    { feature: "Instant Digital Agreement & KYC", secureStay: true, traditional: false },
    { feature: "On-Call Repair & Maintenance", secureStay: true, traditional: false },
    { feature: "Transparent Refundable Deposit", secureStay: true, traditional: false }
  ];

  const currentServices = activeTab === 'tenants' ? tenantServices : ownerServices;

  return (
    <section id="services" className="section bg-light services-section-container" style={{ backgroundColor: 'var(--bg-light)' }}>
      <div className="container">
        
        {/* Header */}
        <div className="section-title text-center" style={{ maxWidth: '760px', margin: '0 auto 40px auto' }}>
          <div style={{
            display: 'inline-block',
            backgroundColor: '#E8F0F8',
            color: '#0C2340',
            padding: '5px 16px',
            borderRadius: '20px',
            fontSize: '11px',
            fontWeight: '700',
            letterSpacing: '1.2px',
            textTransform: 'uppercase',
            marginBottom: '12px',
            border: '1px solid #DBE4EF'
          }}>
            OUR SERVICES &amp; BENEFITS
          </div>
          <h2 className="services-section-title" style={{ fontSize: 'clamp(24px, 5vw, 36px)', fontWeight: '800', color: '#0C2340', marginBottom: '12px', letterSpacing: '-0.5px' }}>
            Tailored Property Solutions For Everyone
          </h2>
          <p className="services-section-subtitle" style={{ fontSize: 'clamp(13.5px, 3.5vw, 16px)', color: '#475569', lineHeight: '1.6', margin: 0 }}>
            Whether you are looking for a hassle-free premium stay or looking to maximize rental yield for your property, Secure Stay delivers complete transparency, security, and dedicated support.
          </p>
        </div>

        {/* Tab Selector */}
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '40px', width: '100%' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            backgroundColor: '#DDE4EE',
            padding: '5px',
            borderRadius: '50px',
            gap: '4px',
            border: '1px solid #C5D1E0',
            boxShadow: 'inset 0 2px 5px rgba(0,0,0,0.07), 0 2px 8px rgba(12,35,64,0.05)',
          }}>
            {/* Tab 1 */}
            <button
              type="button"
              onClick={() => setActiveTab('tenants')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 24px',
                borderRadius: '44px',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                backgroundColor: activeTab === 'tenants' ? '#0C2340' : 'transparent',
                color: activeTab === 'tenants' ? '#FFFFFF' : '#4B5975',
                boxShadow: activeTab === 'tenants' ? '0 4px 14px rgba(12,35,64,0.28)' : 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
            >
              <Home size={16} style={{ flexShrink: 0, display: 'block' }} />
              <span>For Tenants &amp; Professionals</span>
            </button>

            {/* Tab 2 */}
            <button
              type="button"
              onClick={() => setActiveTab('owners')}
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '8px',
                padding: '11px 24px',
                borderRadius: '44px',
                border: 'none',
                outline: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit',
                fontSize: '14px',
                fontWeight: '700',
                whiteSpace: 'nowrap',
                transition: 'all 0.25s ease',
                backgroundColor: activeTab === 'owners' ? '#0C2340' : 'transparent',
                color: activeTab === 'owners' ? '#FFFFFF' : '#4B5975',
                boxShadow: activeTab === 'owners' ? '0 4px 14px rgba(12,35,64,0.28)' : 'none',
                WebkitAppearance: 'none',
                MozAppearance: 'none',
                appearance: 'none',
              }}
            >
              <Building2 size={16} style={{ flexShrink: 0, display: 'block' }} />
              <span>For Property Owners &amp; NRIs</span>
            </button>
          </div>
        </div>

        {/* Services Grid */}
        <div className="services-main-grid" style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          gap: '24px',
          marginBottom: '48px',
          alignItems: 'stretch'
        }}>
          {currentServices.map((item, index) => {
            const IconComp = item.icon;
            return (
              <div 
                key={index} 
                className="feature-card service-card-item"
                style={{
                  backgroundColor: '#FFFFFF',
                  borderRadius: '16px',
                  padding: '28px 24px',
                  border: '1px solid #DBE4EF',
                  boxShadow: '0 4px 20px rgba(12, 35, 64, 0.06)',
                  transition: 'all 0.25s ease',
                  display: 'flex',
                  flexDirection: 'column',
                  height: '100%',
                  position: 'relative',
                  overflow: 'hidden',
                  boxSizing: 'border-box'
                }}
              >
                <div style={{ flex: '1 1 auto' }}>
                  <div style={{
                    width: '48px',
                    height: '48px',
                    minWidth: '48px',
                    minHeight: '48px',
                    borderRadius: '50%',
                    backgroundColor: '#E8F0F8',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#0C2340',
                    marginBottom: '18px',
                    border: '1px solid #DBE4EF',
                    boxSizing: 'border-box',
                    padding: '0',
                    lineHeight: '0'
                  }}>
                    <IconComp size={22} strokeWidth={2} style={{ display: 'block', margin: '0 auto', flexShrink: 0 }} />
                  </div>
                  <h3 style={{ fontSize: '18px', fontWeight: '700', color: '#0C2340', marginBottom: '8px' }}>
                    {item.title}
                  </h3>
                  <p style={{ fontSize: '13.5px', color: '#475569', lineHeight: '1.6', marginBottom: '20px' }}>
                    {item.desc}
                  </p>
                </div>
                <div style={{
                  paddingTop: '14px',
                  borderTop: '1px solid #F1F5F9',
                  display: 'flex',
                  alignItems: 'center',
                  marginTop: 'auto'
                }}>
                  <div style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '6px',
                    backgroundColor: '#E8F0F8',
                    padding: '5px 12px',
                    borderRadius: '20px',
                    fontSize: '12px',
                    fontWeight: '700',
                    color: '#0C2340',
                    border: '1px solid #DBE4EF',
                    maxWidth: '100%'
                  }}>
                    <CheckCircle2 size={14} style={{ color: '#C59B27', flexShrink: 0 }} />
                    <span style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{item.perk}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Why Secure Stay Comparison Section */}
        <div className="services-comparison-box" style={{
          backgroundColor: '#0C2340',
          borderRadius: '24px',
          padding: '44px 32px',
          color: '#FFFFFF',
          boxShadow: '0 16px 40px rgba(12, 35, 64, 0.3)',
          border: '1px solid rgba(255, 255, 255, 0.1)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 32px auto' }}>
            <h3 style={{ fontSize: 'clamp(22px, 4.5vw, 28px)', fontWeight: '800', marginBottom: '10px', color: '#FFFFFF', letterSpacing: '-0.5px' }}>
              Why Choose Secure Stay?
            </h3>
            <p style={{ fontSize: 'clamp(13px, 3.5vw, 15px)', color: '#CBD5E1', lineHeight: '1.6', margin: 0 }}>
              Compare how Secure Stay simplifies your experience vs. traditional offline renting methods.
            </p>
          </div>

          <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch', paddingBottom: '8px' }}>
            <table style={{ width: '100%', minWidth: '460px', borderCollapse: 'separate', borderSpacing: '0 8px' }}>
              <thead>
                <tr>
                  <th style={{ textAlign: 'left', padding: '12px 16px', color: '#94A3B8', fontSize: '13px', fontWeight: '700' }}>Features &amp; Guarantees</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#C59B27', fontSize: '14px', fontWeight: '800', backgroundColor: 'rgba(255, 255, 255, 0.08)', borderRadius: '10px 10px 0 0', borderTop: '2px solid #C59B27' }}>Secure Stay</th>
                  <th style={{ textAlign: 'center', padding: '12px 16px', color: '#94A3B8', fontSize: '13px', fontWeight: '600' }}>Traditional Brokers</th>
                </tr>
              </thead>
              <tbody>
                {comparisonItems.map((comp, i) => (
                  <tr key={i} style={{ backgroundColor: i % 2 === 0 ? 'rgba(255,255,255,0.04)' : 'transparent' }}>
                    <td style={{ padding: '14px 16px', fontSize: '13.5px', fontWeight: '600', color: '#FFFFFF', borderTopLeftRadius: '8px', borderBottomLeftRadius: '8px' }}>
                      {comp.feature}
                    </td>
                    <td style={{ textAlign: 'center', padding: '14px 16px', backgroundColor: 'rgba(255, 255, 255, 0.08)' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', backgroundColor: '#C59B27', color: '#0C2340', boxShadow: '0 2px 8px rgba(197, 155, 39, 0.4)' }}>
                        <Check size={16} strokeWidth={3} />
                      </div>
                    </td>
                    <td style={{ textAlign: 'center', padding: '14px 16px', borderTopRightRadius: '8px', borderBottomRightRadius: '8px' }}>
                      <div style={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'center', width: '26px', height: '26px', borderRadius: '50%', backgroundColor: 'rgba(255,255,255,0.08)', color: '#64748B' }}>
                        <X size={15} strokeWidth={2.5} />
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div style={{ textAlign: 'center', marginTop: '32px' }}>
            <a 
              href="#contact-form" 
              className="services-cta-btn"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                backgroundColor: '#C59B27',
                color: '#0C2340',
                padding: '14px 32px',
                borderRadius: '32px',
                fontSize: '14px',
                fontWeight: '800',
                textDecoration: 'none',
                boxShadow: '0 6px 20px rgba(197, 155, 39, 0.4)',
                transition: 'all 0.25s ease'
              }}
            >
              {activeTab === 'tenants' ? 'Find Your Dream Home Now' : 'List Your Property With Us'} <ArrowRight size={18} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}


