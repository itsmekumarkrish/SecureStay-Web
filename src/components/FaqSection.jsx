import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export default function FaqSection({ faqs }) {
  const [openFaq, setOpenFaq] = useState(0);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    <section id="faq" className="section bg-light">
      <div className="container">
        <div className="section-title text-center">
          <span className="section-eyebrow">HELP & CLARITY</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know about property onboarding, rent guarantees, and stay agreements.</p>
        </div>

        <div className="faq-container">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div 
                key={idx} 
                className={`faq-item ${isOpen ? 'faq-item-open' : ''}`}
              >
                <button 
                  type="button"
                  className="faq-question-btn"
                  onClick={() => toggleFaq(idx)}
                  aria-expanded={isOpen}
                >
                  <span className="faq-q-text">{faq.question}</span>
                  <span className="faq-icon-wrapper">
                    <ChevronDown size={18} className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} />
                  </span>
                </button>
                
                {isOpen && (
                  <div className="faq-answer-content">
                    <p>{faq.answer}</p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="faq-bottom-cta text-center">
          <p>Still have questions about listing or renting?</p>
          <a href="#contact-form" className="btn-secondary-sm">Talk to an Advisor &rarr;</a>
        </div>
      </div>
    </section>
  );
}
