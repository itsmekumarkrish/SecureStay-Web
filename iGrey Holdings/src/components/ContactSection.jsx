import React, { useState } from 'react';
import { MapPin, CheckCircle, ChevronDown, X } from 'lucide-react';

export default function ContactSection({ formData, setFormData, formSubmitted, handleSubmit }) {
  const [isUserTypeSheetOpen, setIsUserTypeSheetOpen] = useState(false);

  const userTypeLabels = {
    owner: 'Institutional Investor / Asset Manager',
    tenant: 'Corporate Leasing Tenant',
    partner: 'Joint Venture Property Partner',
    buyer: 'High-Net-Worth Estate Buyer',
    other: 'Other Business Inquiry'
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div id="contact-card" className="contact-card">
          <div className="contact-info">
            <h2>Connect with iGrey Holdings</h2>
            <p>Direct your investment queries, corporate leasing proposals, or joint development opportunities to our leadership team.</p>
            
            <div className="contact-details mt-4">
              <div className="contact-row mb-2">
                <MapPin size={18} className="text-gold" />
                <span>Executive Offices: Mumbai • Hyderabad • Bengaluru • Gurugram • Chennai</span>
              </div>
            </div>
          </div>

          <div className="contact-form-wrapper">
            {!formSubmitted ? (
              <form id="contact-form" onSubmit={handleSubmit} className="contact-form">
                <div className="form-group">
                  <label>Full Name / Designation</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Victoria Sterling, Managing Director"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Corporate / Phone Contact</label>
                    <input 
                      type="tel" 
                      required 
                      placeholder="+91 98765 00000"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Corporate Email</label>
                    <input 
                      type="email" 
                      placeholder="corporate@firm.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>I am representing</label>
                  <button 
                    type="button" 
                    className="custom-select-trigger"
                    onClick={() => setIsUserTypeSheetOpen(true)}
                    aria-haspopup="dialog"
                    aria-expanded={isUserTypeSheetOpen}
                  >
                    <span className="custom-select-value">
                      {userTypeLabels[formData.userType] || 'Select your inquiry type...'}
                    </span>
                    <ChevronDown size={18} className="custom-select-chevron" />
                  </button>
                </div>

                <div className="form-group">
                  <label>Target City / Asset Class</label>
                  <input 
                    type="text" 
                    placeholder="e.g. Grade-A Commercial in Hyderabad, Luxury Residence in Bengaluru"
                    value={formData.location || ''}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Inquiry Details / Capital Allocation</label>
                  <textarea 
                    rows={3} 
                    placeholder="Provide brief details regarding your leasing requirements or investment proposal..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  ></textarea>
                </div>

                <button type="submit" className="btn-primary w-full">
                  Submit Institutional Inquiry
                </button>
              </form>
            ) : (
              <div className="form-success text-center">
                <CheckCircle size={48} className="text-green mx-auto mb-2" />
                <h3>Inquiry Received</h3>
                <p>Thank you for connecting with iGrey Holdings. Our institutional relations executive will reach out to your office within 24 hours.</p>
                <button className="btn-secondary mt-3" onClick={() => setFormData({ name: '', phone: '', email: '', userType: 'owner', location: '', message: '' })}>
                  Submit Another Request
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* State-Driven Bottom Sheet Modal for 'I am representing' Selection */}
      {isUserTypeSheetOpen && (
        <div className="bottom-sheet-root">
          <div 
            className="bottom-sheet-backdrop" 
            onClick={() => setIsUserTypeSheetOpen(false)} 
          />
          <div className="bottom-sheet-tray" role="dialog" aria-modal="true">
            <div className="bottom-sheet-handle" />
            <div className="bottom-sheet-header">
              <h3 className="bottom-sheet-title">Inquiry Representation</h3>
              <button 
                type="button" 
                className="bottom-sheet-close-btn"
                onClick={() => setIsUserTypeSheetOpen(false)}
                aria-label="Close"
              >
                <X size={18} />
              </button>
            </div>
            <div className="bottom-sheet-options">
              {[
                { key: 'owner', title: 'Institutional Investor / Asset Manager', subtitle: 'Capital allocation, REIT, and fund investments' },
                { key: 'tenant', title: 'Corporate Leasing Tenant', subtitle: 'Grade-A office, retail, or industrial logistics leasing' },
                { key: 'partner', title: 'Joint Venture Property Partner', subtitle: 'Land development and strategic co-ventures' },
                { key: 'buyer', title: 'High-Net-Worth Estate Buyer', subtitle: 'Ultra-luxury sky penthouses & eco estates' },
                { key: 'other', title: 'Other Business Inquiry', subtitle: 'General press or corporate inquiries' }
              ].map((opt) => {
                const isSelected = formData.userType === opt.key;
                return (
                  <button
                    key={opt.key}
                    type="button"
                    className={`bottom-sheet-option-row ${isSelected ? 'is-selected' : ''}`}
                    onClick={() => {
                      setFormData({ ...formData, userType: opt.key });
                      setIsUserTypeSheetOpen(false);
                    }}
                  >
                    <div className="option-text-wrapper">
                      <span className="option-title">{opt.title}</span>
                      <span className="option-subtitle">{opt.subtitle}</span>
                    </div>
                    <div className="custom-radio-circle">
                      {isSelected && <div className="custom-radio-inner-dot" />}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
