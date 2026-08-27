import React, { useState } from 'react';
import { ArrowLeft, Search, Building2, SlidersHorizontal, ShieldCheck, IndianRupee, RotateCcw, ArrowUpDown } from 'lucide-react';
import PropertyCard from './PropertyCard';

export default function PropertiesCatalogPage({ 
  properties, 
  onBackToHome, 
  onInquire, 
  onOpenDetail
}) {
  const [selectedCity, setSelectedCity] = useState('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedBHK, setSelectedBHK] = useState('All');
  const [selectedPriceRange, setSelectedPriceRange] = useState('All');
  const [selectedFeature, setSelectedFeature] = useState('All');
  const [sortBy, setSortBy] = useState('default');

  const cities = ['All', 'Bangalore', 'Mysuru', 'Hyderabad', 'Chennai'];

  // Parse rent price string like "₹22,000 / month" → 22000
  const parsePrice = (priceStr) => {
    if (!priceStr) return 0;
    return parseInt(priceStr.replace(/[^0-9]/g, ''), 10) || 0;
  };

  const filteredProperties = properties.filter((prop) => {
    // 1. City — match against dedicated city field (with Bengaluru alias)
    const cityMatch = selectedCity === 'All'
      ? true
      : (prop.city === selectedCity ||
        (selectedCity === 'Bangalore' && (prop.city === 'Bangalore' || (prop.location || '').toLowerCase().includes('bengaluru'))));

    // 2. Full-text Search — title, location, type string
    const q = searchQuery.trim().toLowerCase();
    const searchMatch = q === ''
      ? true
      : (prop.title.toLowerCase().includes(q) ||
         (prop.location || '').toLowerCase().includes(q) ||
         (prop.type || '').toLowerCase().includes(q));

    // 3. BHK / Configuration filter — exact match against dedicated bhk field
    const bhkMatch = selectedBHK === 'All'
      ? true
      : (prop.bhk || '').toLowerCase() === selectedBHK.toLowerCase();

    // 4. Price Range — extracted from rentPrice string
    const price = parsePrice(prop.rentPrice);
    let priceMatch = true;
    if (selectedPriceRange === 'under-15k')    priceMatch = price < 15000;
    else if (selectedPriceRange === '15k-25k') priceMatch = price >= 15000 && price <= 25000;
    else if (selectedPriceRange === '25k-40k') priceMatch = price > 25000 && price <= 40000;
    else if (selectedPriceRange === 'above-40k') priceMatch = price > 40000;

    // 5. Feature — exact match against dedicated feature field
    const featureMatch = selectedFeature === 'All'
      ? true
      : (prop.feature || '').toLowerCase() === selectedFeature.toLowerCase();

    return cityMatch && searchMatch && bhkMatch && priceMatch && featureMatch;
  });

  // Sorting
  const sortedProperties = [...filteredProperties].sort((a, b) => {
    if (sortBy === 'price-low')  return parsePrice(a.rentPrice) - parsePrice(b.rentPrice);
    if (sortBy === 'price-high') return parsePrice(b.rentPrice) - parsePrice(a.rentPrice);
    return 0;
  });

  const hasActiveFilters = selectedCity !== 'All' || searchQuery !== '' || selectedBHK !== 'All' || selectedPriceRange !== 'All' || selectedFeature !== 'All' || sortBy !== 'default';

  const resetAllFilters = () => {
    setSelectedCity('All');
    setSearchQuery('');
    setSelectedBHK('All');
    setSelectedPriceRange('All');
    setSelectedFeature('All');
    setSortBy('default');
  };

  return (
    <div className="catalog-page-container">
      {/* Top Catalog Header */}
      <div className="catalog-header-bar">
        <div className="container catalog-header-content">

          {/* Left: Back button */}
          <div className="catalog-header-left">
            <button type="button" className="btn-back-home" onClick={onBackToHome}>
              <ArrowLeft size={17} />
              <span>Back to Home</span>
            </button>
          </div>

          {/* Center: Title block */}
          <div className="catalog-header-center">
            <div className="catalog-brand-title">
              <h1>Find Your Perfect Home</h1>
              <p>Zero-brokerage monthly stays &amp; long-term leases across South India&apos;s prime hubs</p>
            </div>
          </div>

          {/* Right: invisible spacer to keep title perfectly centered */}
          <div className="catalog-header-left" style={{visibility: 'hidden', pointerEvents: 'none'}}>
            <button type="button" className="btn-back-home">
              <ArrowLeft size={17} />
              <span>Back to Home</span>
            </button>
          </div>

        </div>
      </div>

      {/* Main Catalog Content */}
      <div className="container catalog-main-body">

        {/* Filter & Search Card */}
        <div className="catalog-controls-card">

          {/* Search Bar */}
          <div className="catalog-search-row">
            <div className="search-input-wrap">
              <Search size={18} className="search-icon" />
              <input
                type="text"
                placeholder="Search by area, city, or property name (e.g. Koramangala, Gokulam)…"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button type="button" className="clear-search-btn" onClick={() => setSearchQuery('')}>
                  Clear
                </button>
              )}
            </div>
          </div>

          {/* Four Filter Dropdowns */}
          <div className="catalog-dropdowns-row">
            <div className="filter-dropdown-item">
              <label><SlidersHorizontal size={13} /> BHK &amp; Configuration</label>
              <select value={selectedBHK} onChange={(e) => setSelectedBHK(e.target.value)}>
                <option value="All">All Configurations</option>
                <option value="1 RK">1 RK / Studio</option>
                <option value="1 BHK">1 BHK</option>
                <option value="2 BHK">2 BHK</option>
                <option value="3 BHK">3 BHK</option>
                <option value="Coliving">Coliving / Shared</option>
              </select>
            </div>

            <div className="filter-dropdown-item">
              <label><IndianRupee size={13} /> Monthly Budget</label>
              <select value={selectedPriceRange} onChange={(e) => setSelectedPriceRange(e.target.value)}>
                <option value="All">Any Budget</option>
                <option value="under-15k">Under ₹15,000</option>
                <option value="15k-25k">₹15,000 – ₹25,000</option>
                <option value="25k-40k">₹25,000 – ₹40,000</option>
                <option value="above-40k">Above ₹40,000</option>
              </select>
            </div>

            <div className="filter-dropdown-item">
              <label><Building2 size={13} /> Property Feature</label>
              <select value={selectedFeature} onChange={(e) => setSelectedFeature(e.target.value)}>
                <option value="All">All Features</option>
                <option value="Fully Furnished">Fully Furnished</option>
                <option value="Gated Society">Gated Society</option>
                <option value="Coliving">Coliving / Private Room</option>
              </select>
            </div>

            <div className="filter-dropdown-item">
              <label><ArrowUpDown size={13} /> Sort By</label>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                <option value="default">Featured First</option>
                <option value="price-low">Rent: Low → High</option>
                <option value="price-high">Rent: High → Low</option>
              </select>
            </div>
          </div>

          {/* City Pills + Reset All */}
          <div className="catalog-city-pills-row">
            <div className="pills-header">
              <div className="flex-align gap-2">
                <span className="pills-label">City:</span>
                <div className="pills-group">
                  {cities.map((city) => (
                    <button
                      key={city}
                      type="button"
                      className={`city-filter-pill ${selectedCity === city ? 'active' : ''}`}
                      onClick={() => setSelectedCity(city)}
                    >
                      {city}
                    </button>
                  ))}
                </div>
              </div>
              {hasActiveFilters && (
                <button type="button" className="btn-reset-filters" onClick={resetAllFilters}>
                  <RotateCcw size={13} /> Reset All
                </button>
              )}
            </div>
          </div>

        </div>

        {/* Results Meta Row */}
        <div className="catalog-results-meta">
          <span className="results-count">
            Showing <strong>{sortedProperties.length}</strong> {sortedProperties.length === 1 ? 'property' : 'properties'}
          </span>
          <span className="results-badge">
            <ShieldCheck size={14} /> 100% Verified Stays
          </span>
        </div>

        {/* Properties Grid */}
        {sortedProperties.length > 0 ? (
          <div className="properties-grid">
            {sortedProperties.map((prop) => (
              <div
                key={prop.id}
                className="catalog-card-wrapper"
                onClick={() => onOpenDetail(prop)}
              >
                <PropertyCard property={prop} onInquire={onInquire} />
                <button
                  type="button"
                  className="btn-view-details-overlay"
                  onClick={(e) => {
                    e.stopPropagation();
                    onOpenDetail(prop);
                  }}
                >
                  View Full Details &amp; Photos
                </button>
              </div>
            ))}
          </div>
        ) : (
          <div className="catalog-empty-state">
            <Building2 size={48} style={{color: '#94a3b8', margin: '0 auto 16px', display: 'block'}} />
            <h3 style={{color: '#0c2340', marginBottom: 8}}>No Stays Match Your Filters</h3>
            <p style={{color: '#64748b', marginBottom: 20}}>Try adjusting your budget or clearing a filter to see more verified stays.</p>
            <button type="button" className="btn-secondary" onClick={resetAllFilters}>
              Reset All Filters
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
