import React from 'react';
import { ArrowRight } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertiesSection({ properties, handleInquire, onSeeMore, onOpenDetail }) {
  // Show 3 property cards on the homepage landing section, prioritizing properties toggled as "★ Featured" in Admin Dashboard
  const featuredProps = (properties || []).filter((p) => p.isFeatured);
  const standardProps = (properties || []).filter((p) => !p.isFeatured);
  const displayList = featuredProps.length > 0 ? [...featuredProps, ...standardProps] : (properties || []);
  const homepageProperties = displayList.slice(0, 3);

  return (
    <section id="properties" className="section bg-light">
      <div className="container">
        <div className="section-title text-center">
          <span className="section-eyebrow properties-eyebrow">READY TO MOVE IN</span>
          <h2>Featured Residential Properties</h2>
          <p>Explore verified homes available for monthly rent and flexible long-term lease.</p>
        </div>

        <div className="properties-grid">
          {homepageProperties.map((prop) => (
            <div 
              key={prop.id} 
              className="homepage-card-wrap"
              onClick={() => onOpenDetail && onOpenDetail(prop)}
            >
              <PropertyCard property={prop} onInquire={handleInquire} />
            </div>
          ))}
        </div>

        <div className="properties-see-more-bar text-center mt-4">
          <button 
            type="button" 
            className="btn-primary btn-see-more"
            onClick={onSeeMore}
          >
            See More Properties <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </section>
  );
}
