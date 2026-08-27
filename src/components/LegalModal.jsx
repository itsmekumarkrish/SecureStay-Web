import React from 'react';
import { X } from 'lucide-react';

export default function LegalModal({ legalModal, setLegalModal }) {
  if (!legalModal) return null;

  return (
    <div className="legal-modal-backdrop" onClick={() => setLegalModal(null)}>
      <div className="legal-modal-card" onClick={(e) => e.stopPropagation()}>
        <div className="legal-modal-header">
          <h3>
            {legalModal === 'privacy' && 'Privacy Policy'}
            {legalModal === 'terms' && 'Terms of Service'}
            {legalModal === 'trust' && 'Trust & Safety Commitment'}
          </h3>
          <button type="button" className="legal-modal-close" onClick={() => setLegalModal(null)}>
            <X size={18} />
          </button>
        </div>
        <div className="legal-modal-body">
          {legalModal === 'privacy' && (
            <>
              <p><strong>Secure Stay Private Limited</strong> respects your privacy. We are committed to protecting all personal and property information submitted through our platform.</p>
              <p>All tenant KYC documents (Aadhaar, Passport, HR verification) are encrypted with enterprise-grade SSL standards and stored securely solely for background validation and registered rental agreement execution.</p>
              <p>We strictly never sell or share resident or homeowner contact details with third-party telemarketers or unauthorized agencies.</p>
            </>
          )}
          {legalModal === 'terms' && (
            <>
              <p>Welcome to <strong>Secure Stay Private Limited</strong>. By listing a property or booking a stay with us, you agree to our standard terms of service.</p>
              <p><strong>Rent Payout Guarantee:</strong> For subscribed homeowners, monthly rental payments are deposited directly into the registered bank account strictly on the 1st of every month.</p>
              <p><strong>Zero Brokerage Policy:</strong> SecureStay guarantees 100% zero broker commissions for verified working professionals and resident tenants.</p>
            </>
          )}
          {legalModal === 'trust' && (
            <>
              <p>Safety and peace of mind are the core pillars of <strong>SecureStay</strong>.</p>
              <p><strong>100% Verified Residents:</strong> Every prospective tenant undergoes mandatory 3-tier background checks including government photo ID validation, local police verification, and employment confirmation.</p>
              <p><strong>Regular Property Audits:</strong> In-house technicians conduct digital maintenance inspections with detailed photo updates for NRI and domestic landlords.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
