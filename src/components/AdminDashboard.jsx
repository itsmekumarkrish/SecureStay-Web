import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, Plus, Trash2, CheckCircle, Image as ImageIcon, 
  Building2, MessageSquare, LogOut, Upload, Pencil, X, Search, Phone, Send, MapPin, 
  Users, Clock, CheckSquare, Eye, EyeOff, User, Sparkles, KeyRound
} from 'lucide-react';

export default function AdminDashboard({ 
  properties = [], 
  onAddProperty,
  onEditProperty,
  onDeleteProperty,
  onToggleAvailability,
  onToggleFeatured, 
  onBackToHome,
  inquiries = [],
  onUpdateInquiryStatus,
  onDeleteInquiry
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const [loginError, setLoginError] = useState('');

  const handleAutoFillDemo = () => {
    setLoginForm({ username: 'admin', password: 'securestay123' });
    setLoginError('');
  };

  const [activeTab, setActiveTab] = useState('add-property'); // 'add-property' | 'properties-list' | 'inquiries'
  const [successMessage, setSuccessMessage] = useState('');

  // Table Search and Inquiry Filters
  const [tableSearch, setTableSearch] = useState('');
  const [inquirySearch, setInquirySearch] = useState('');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  // Editing Property Modal State
  const [editingProp, setEditingProp] = useState(null);

  // New Property Form State
  const [newProp, setNewProp] = useState({
    title: '',
    city: 'Bangalore',
    area: '',
    purpose: 'rent',
    rentPrice: '',
    leasePrice: '',
    salePrice: '',
    type: 'Fully Furnished • 2 BHK',
    images: [''],
    amenitiesText: 'Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Power Backup, Housekeeping'
  });

  const handleLogin = (e) => {
    e.preventDefault();
    if (loginForm.username === 'admin' && loginForm.password === 'securestay123') {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password. Try admin / securestay123');
    }
  };

  const handleQuickPresetImage = (index, url) => {
    setNewProp((prev) => {
      const updated = [...prev.images];
      updated[index] = url;
      return { ...prev, images: updated };
    });
  };

  const handleAddImageUrlField = () => {
    setNewProp((prev) => ({ ...prev, images: [...prev.images, ''] }));
  };

  const handleImageUrlChange = (index, value) => {
    const updatedImages = [...newProp.images];
    updatedImages[index] = value;
    setNewProp((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleRemoveImageUrlField = (index) => {
    const updatedImages = newProp.images.filter((_, i) => i !== index);
    setNewProp((prev) => ({ ...prev, images: updatedImages.length ? updatedImages : [''] }));
  };

  const handleFileUpload = (e, isEditMode = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const filePromises = files.map((file) => {
      return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target.result);
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises).then((base64Images) => {
      if (isEditMode && editingProp) {
        setEditingProp((prev) => {
          const existing = prev.images || [];
          return {
            ...prev,
            images: [...existing.filter(i => i.trim() !== ''), ...base64Images]
          };
        });
      } else {
        setNewProp((prev) => {
          const existingValid = prev.images.filter((img) => img.trim() !== '');
          return {
            ...prev,
            images: [...existingValid, ...base64Images]
          };
        });
      }
    });
  };

  const handleSaveEditedProperty = (e) => {
    e.preventDefault();
    if (!editingProp || !editingProp.title.trim()) return;

    const validImages = (editingProp.images || []).filter(img => img.trim() !== '');
    const typeStr = editingProp.type || '';
    const bhk = typeStr.includes('1 RK') ? '1 RK' 
      : typeStr.includes('1 BHK') ? '1 BHK' 
      : typeStr.includes('2 BHK') ? '2 BHK' 
      : typeStr.includes('3 BHK') ? '3 BHK' : '2 BHK';

    const feature = typeStr.includes('Gated') ? 'Gated Society' 
      : typeStr.includes('Private') ? 'Private Ensuite' : 'Fully Furnished';

    const finalProp = {
      ...editingProp,
      city: editingProp.city || 'Bangalore',
      bhk: bhk,
      feature: feature,
      purpose: editingProp.purpose || 'rent',
      rentPrice: editingProp.rentPrice ? (editingProp.rentPrice.includes('₹') ? editingProp.rentPrice : `₹${editingProp.rentPrice} / month`) : '',
      leasePrice: editingProp.leasePrice ? (editingProp.leasePrice.includes('₹') ? editingProp.leasePrice : `₹${editingProp.leasePrice}`) : '',
      salePrice: editingProp.salePrice ? (editingProp.salePrice.includes('₹') ? editingProp.salePrice : `₹${editingProp.salePrice}`) : '',
      images: validImages.length > 0 ? validImages : ['/assets/hero_stay.jpg']
    };

    if (onEditProperty) {
      onEditProperty(finalProp);
    }
    setEditingProp(null);
    setSuccessMessage(`Property "${finalProp.title}" updated successfully!`);
    setTimeout(() => setSuccessMessage(''), 4000);
  };

  const handleCreatePropertySubmit = (e) => {
    e.preventDefault();
    if (!newProp.title.trim() || !newProp.area.trim()) return;

    const validImages = newProp.images.filter((url) => url.trim() !== '');
    const finalImages = validImages.length > 0 
      ? validImages 
      : ['/assets/hero_stay.jpg'];

    const amenitiesList = newProp.amenitiesText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    const typeStr = newProp.type || '';
    const bhk = typeStr.includes('1 RK') ? '1 RK' 
      : typeStr.includes('1 BHK') ? '1 BHK' 
      : typeStr.includes('2 BHK') ? '2 BHK' 
      : typeStr.includes('3 BHK') ? '3 BHK' : '2 BHK';

    const feature = typeStr.includes('Gated') ? 'Gated Society' 
      : typeStr.includes('Private') ? 'Private Ensuite' : 'Fully Furnished';

    const rentFormatted = newProp.rentPrice 
      ? `₹${newProp.rentPrice.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / month` 
      : '';

    const leaseFormatted = newProp.leasePrice 
      ? (newProp.leasePrice.includes('₹') ? newProp.leasePrice : `₹${newProp.leasePrice}`) 
      : '';

    const saleFormatted = newProp.salePrice 
      ? (newProp.salePrice.includes('₹') ? newProp.salePrice : `₹${newProp.salePrice}`) 
      : '';

    const propertyPayload = {
      id: Date.now(),
      title: newProp.title,
      city: newProp.city || 'Bangalore',
      bhk: bhk,
      feature: feature,
      purpose: newProp.purpose || 'rent',
      location: `${newProp.area}, ${newProp.city === 'Bangalore' ? 'Bengaluru' : newProp.city}`,
      rentPrice: rentFormatted,
      leasePrice: leaseFormatted,
      salePrice: saleFormatted,
      type: newProp.type,
      images: finalImages,
      amenities: amenitiesList.length > 0 ? amenitiesList : [
        'Biometric Smart Lock', 'High-Speed Wi-Fi', 'Power Backup', 'Housekeeping'
      ]
    };

    onAddProperty(propertyPayload);
    setSuccessMessage(`Property "${propertyPayload.title}" published live to website!`);
    setTimeout(() => setSuccessMessage(''), 4000);

    // Reset Form
    setNewProp({
      title: '',
      city: 'Bangalore',
      area: '',
      purpose: 'rent',
      rentPrice: '',
      leasePrice: '',
      salePrice: '',
      type: 'Fully Furnished • 2 BHK',
      images: [''],
      amenitiesText: 'Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Power Backup, Housekeeping'
    });
  };

  // Metrics overview calculations
  const citiesCount = new Set(properties.map(p => p.city || 'Bangalore')).size;
  const pendingInquiriesCount = inquiries.filter(i => !i.status || i.status === 'pending').length;

  // Filtered Properties for table search
  const filteredTableProperties = properties.filter(p => {
    const q = tableSearch.toLowerCase();
    return p.title.toLowerCase().includes(q) || (p.location || '').toLowerCase().includes(q) || (p.city || '').toLowerCase().includes(q);
  });

  // Filtered Inquiries
  const filteredInquiries = inquiries.filter(inq => {
    const q = inquirySearch.toLowerCase();
    const matchQuery = (inq.name || '').toLowerCase().includes(q) ||
                       (inq.phone || '').toLowerCase().includes(q) ||
                       (inq.message || '').toLowerCase().includes(q);

    const status = inq.status || 'pending';
    const matchStatus = inquiryStatusFilter === 'all' || status === inquiryStatusFilter;

    return matchQuery && matchStatus;
  });

  // If Not Authenticated, Show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-orb orb-1"></div>
        <div className="admin-login-orb orb-2"></div>

        <div className="admin-login-card">
          <div className="login-header text-center">
            <div className="admin-icon-halo">
              <ShieldCheck size={28} className="text-gold" />
            </div>

            <h2>SecureStay Properties Dashboard</h2>
            <p>Sign in to manage live property stays, edit listings &amp; track customer leads</p>
          </div>

          {loginError && <div className="login-error-alert">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Admin Username</label>
              <div className="login-input-wrap">
                <User size={18} className="login-input-icon" />
                <input 
                  type="text" 
                  required
                  placeholder="e.g. admin"
                  value={loginForm.username}
                  onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
                />
              </div>
            </div>

            <div className="form-group">
              <label>Password</label>
              <div className="login-input-wrap">
                <Lock size={18} className="login-input-icon" />
                <input 
                  type={showPassword ? 'text' : 'password'} 
                  required
                  placeholder="Enter password"
                  value={loginForm.password}
                  onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
                />
                <button 
                  type="button" 
                  className="password-toggle-btn"
                  onClick={() => setShowPassword(!showPassword)}
                  title={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* 1-Click Auto-Fill Demo Credentials Button */}
            <div className="login-autofill-box">
              <button 
                type="button" 
                className="btn-autofill-demo"
                onClick={handleAutoFillDemo}
              >
                <Sparkles size={14} className="text-gold" />
                <span>Auto-fill Demo Credentials</span>
                <span className="autofill-tag">admin / securestay123</span>
              </button>
            </div>

            <button type="submit" className="btn-primary w-full py-3 mt-2 btn-login-submit">
              Sign In to Admin Portal
            </button>
          </form>

          <div className="text-center mt-4">
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-return-website" 
              style={{ textDecoration: 'none', display: 'inline-block' }}
            >
              ← Return to Main Website
            </a>
          </div>
        </div>
      </div>
    );
  }

  // Admin Dashboard Main Portal
  return (
    <div className="admin-dashboard-container">
      {/* Top Admin Bar */}
      <div className="admin-top-bar">
        <div className="container admin-top-content">
          <div className="admin-brand flex-align gap-2">
            <ShieldCheck size={22} className="text-gold" />
            <h3>SecureStay Properties Dashboard</h3>
            <span style={{ background: '#dcfce7', color: '#15803d', border: '1px solid #bbf7d0', fontSize: '0.72rem', fontWeight: 700, padding: '3px 10px', borderRadius: '12px', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
              ☁️ Live Cloud Sync
            </span>
          </div>

          <div className="admin-top-actions">
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-secondary-sm" 
              style={{ textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={16} /> View Live Website
            </a>
            <button type="button" className="btn-logout" onClick={() => setIsAuthenticated(false)}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container admin-main-body">
        {/* Overview Metrics Cards */}
        <div className="admin-metrics-grid">
          <div className="admin-metric-card">
            <div className="admin-metric-icon blue">
              <Building2 size={22} />
            </div>
            <div>
              <div className="admin-metric-val">{properties.length}</div>
              <div className="admin-metric-lbl">Active Properties</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon green">
              <MapPin size={22} />
            </div>
            <div>
              <div className="admin-metric-val">{citiesCount}</div>
              <div className="admin-metric-lbl">Cities Covered</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon gold">
              <MessageSquare size={22} />
            </div>
            <div>
              <div className="admin-metric-val">{inquiries.length}</div>
              <div className="admin-metric-lbl">Total Leads</div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <Clock size={22} className="text-amber" />
            </div>
            <div>
              <div className="admin-metric-val">{pendingInquiriesCount}</div>
              <div className="admin-metric-lbl">Pending Follow-ups</div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="admin-tabs-row">
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'add-property' ? 'active' : ''}`}
            onClick={() => setActiveTab('add-property')}
          >
            <Plus size={18} /> Upload New Property
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'properties-list' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties-list')}
          >
            <Building2 size={18} /> Manage Listings ({properties.length})
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare size={18} /> Customer Inquiries ({inquiries.length})
          </button>
        </div>

        {successMessage && (
          <div className="admin-success-banner">
            <CheckCircle size={20} className="text-green flex-shrink-0" />
            <span>{successMessage}</span>
          </div>
        )}

        {/* Tab 1: Upload New Property */}
        {activeTab === 'add-property' && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h3>Add New Property Listing</h3>
              <p>Upload high-resolution property photos, set monthly rent/lease details, and select target city.</p>
            </div>

            <form onSubmit={handleCreatePropertySubmit} className="add-property-form">
              <div className="form-row">
                <div className="form-group flex-2">
                  <label>Property Title / Building Name *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Skyline Luxury 2 BHK Residency"
                    value={newProp.title}
                    onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>City *</label>
                  <select 
                    value={newProp.city} 
                    onChange={(e) => setNewProp({ ...newProp, city: e.target.value })}
                  >
                    <option value="Bangalore">Bangalore (Bengaluru)</option>
                    <option value="Mysuru">Mysuru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group flex-1">
                  <label>Neighborhood / Area Address *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Koramangala 4th Block"
                    value={newProp.area}
                    onChange={(e) => setNewProp({ ...newProp, area: e.target.value })}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Property Type / BHK *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Fully Furnished • 2 BHK"
                    value={newProp.type}
                    onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                  />
                </div>
                <div className="form-group flex-1">
                  <label>Listing Purpose *</label>
                  <select
                    value={newProp.purpose}
                    onChange={(e) => setNewProp({ ...newProp, purpose: e.target.value })}
                  >
                    <option value="rent">For Monthly Rent</option>
                    <option value="lease">For Long-Term Lease</option>
                    <option value="sale">For Outright Sale</option>
                    <option value="rent_sale">Rent &amp; Sale Available</option>
                  </select>
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Rent (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 28000 (Optional if Sale only)"
                    value={newProp.rentPrice}
                    onChange={(e) => setNewProp({ ...newProp, rentPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Long-Term Lease (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 15L (Optional)"
                    value={newProp.leasePrice}
                    onChange={(e) => setNewProp({ ...newProp, leasePrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Outright Sale Price (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1.25 Cr (For Sale)"
                    value={newProp.salePrice}
                    onChange={(e) => setNewProp({ ...newProp, salePrice: e.target.value })}
                  />
                </div>
              </div>

              {/* Photo Upload / Image URLs Section */}
              <div className="form-group mt-3">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ margin: 0 }}>Property Photos (Upload Files or Paste Image URLs)</label>
                  <button 
                    type="button" 
                    className="btn-link-sm" 
                    onClick={handleAddImageUrlField}
                  >
                    + Add URL Field
                  </button>
                </div>

                {/* Multi File Picker Drop Box */}
                <div className="multi-file-upload-box mb-3">
                  <label className="btn-upload-multiple">
                    <Upload size={18} />
                    <span>📁 Upload Multiple Photo Files (Select All / Cmd+A Supported)</span>
                    <input 
                      type="file" 
                      multiple 
                      accept="image/*" 
                      onChange={handleFileUpload}
                      style={{ display: 'none' }}
                    />
                  </label>
                  <span className="upload-help-text">You can hold Shift/Cmd to select all photo files at once.</span>
                </div>

                {newProp.images.map((imgUrl, idx) => (
                  <div key={idx} className="image-url-input-row mb-2">
                    <input 
                      type="url" 
                      placeholder={`Photo ${idx + 1} URL (https://...)`}
                      value={imgUrl}
                      onChange={(e) => handleImageUrlChange(idx, e.target.value)}
                    />
                    {newProp.images.length > 1 && (
                      <button 
                        type="button" 
                        className="btn-icon-danger"
                        onClick={() => handleRemoveImageUrlField(idx)}
                        title="Remove photo field"
                      >
                        <Trash2 size={16} />
                      </button>
                    )}
                  </div>
                ))}

                {/* Sample Preset Photo Selector Chips */}
                <div className="preset-photos-bar">
                  <span className="preset-label"><ImageIcon size={13} /> Quick Sample Photos:</span>
                  <button 
                    type="button" 
                    className="preset-chip"
                    onClick={() => handleQuickPresetImage(0, 'https://images.unsplash.com/photo-1522771739844-6a9f6d5f14af?auto=format&fit=crop&w=800&q=80')}
                  >
                    Modern Bedroom
                  </button>
                  <button 
                    type="button" 
                    className="preset-chip"
                    onClick={() => handleQuickPresetImage(0, 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80')}
                  >
                    Luxury Living Room
                  </button>
                  <button 
                    type="button" 
                    className="preset-chip"
                    onClick={() => handleQuickPresetImage(0, 'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&w=800&q=80')}
                  >
                    Coliving Suite
                  </button>
                </div>
              </div>

              <div className="form-group">
                <label>Included Amenities (Comma Separated)</label>
                <textarea 
                  rows={2}
                  placeholder="Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Housekeeping, Power Backup"
                  value={newProp.amenitiesText}
                  onChange={(e) => setNewProp({ ...newProp, amenitiesText: e.target.value })}
                ></textarea>
              </div>

              <button type="submit" className="btn-primary w-full py-3">
                Upload & Publish Property Live
              </button>
            </form>
          </div>
        )}

        {/* Tab 2: Manage Properties List */}
        {activeTab === 'properties-list' && (
          <div className="admin-card-section">
            <div className="admin-section-header flex-between flex-wrap gap-2">
              <div>
                <h3>All Published Properties ({filteredTableProperties.length})</h3>
                <p>Manage active listings displayed on the SecureStay catalog and homepage.</p>
              </div>

              <div className="search-input-wrap" style={{ maxWidth: '300px' }}>
                <Search size={16} className="search-icon" />
                <input 
                  type="text" 
                  placeholder="Search property title or area..." 
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                  style={{ padding: '6px 12px 6px 36px', fontSize: '0.84rem' }}
                />
              </div>
            </div>

            <div className="admin-properties-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Property Title</th>
                    <th>Location</th>
                    <th>Monthly Rent</th>
                    <th>Status</th>
                    <th>Featured</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableProperties.map((prop) => {
                    const isOccupied = prop.availability === 'Occupied';
                    const isFeatured = !!prop.isFeatured;
                    return (
                      <tr key={prop.id}>
                        <td>
                          <img 
                            src={prop.images?.[0] || prop.image || '/assets/hero_stay.jpg'} 
                            alt={prop.title} 
                            className="table-prop-img"
                          />
                        </td>
                        <td>
                          <strong>{prop.title}</strong>
                          <div className="text-xs text-muted">{prop.type}</div>
                        </td>
                        <td>{prop.location}</td>
                        <td><span className="text-green font-semibold">{prop.rentPrice}</span></td>
                        <td>
                          <button
                            type="button"
                            onClick={() => onToggleAvailability && onToggleAvailability(prop.id)}
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                              background: isOccupied ? '#fef2f2' : '#dcfce7',
                              color: isOccupied ? '#dc2626' : '#15803d',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.78rem',
                              fontWeight: 700
                            }}
                            title="Click to toggle Available / Occupied status"
                          >
                            {isOccupied ? '🔴 Occupied' : '🟢 Available'}
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => onToggleFeatured && onToggleFeatured(prop.id)}
                            style={{
                              border: 'none',
                              cursor: 'pointer',
                              background: isFeatured ? '#fef9c3' : '#f1f5f9',
                              color: isFeatured ? '#ca8a04' : '#64748b',
                              padding: '4px 10px',
                              borderRadius: '12px',
                              fontSize: '0.78rem',
                              fontWeight: 700
                            }}
                            title="Click to toggle Featured on Homepage"
                          >
                            {isFeatured ? '★ Featured' : '☆ Standard'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            <button 
                              type="button" 
                              className="btn-edit-sm" 
                              onClick={() => setEditingProp({ ...prop, images: prop.images || [prop.image || ''] })}
                              title="Edit Property & Photos"
                            >
                              <Pencil size={14} /> Edit
                            </button>
                            <button 
                              type="button" 
                              className="btn-danger-sm" 
                              onClick={() => onDeleteProperty(prop.id)}
                              title="Delete Property"
                            >
                              <Trash2 size={14} /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTableProperties.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-4 text-muted">
                        No properties found matching "{tableSearch}"
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Lead Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="admin-card-section">
            <div className="admin-section-header flex-between flex-wrap gap-2">
              <div>
                <h3>Submitted Lead Inquiries ({filteredInquiries.length})</h3>
                <p>Inquiries sent through website forms, connected directly to your management workflow.</p>
              </div>

              <div className="flex-align gap-2 flex-wrap">
                <div className="search-input-wrap" style={{ maxWidth: '240px' }}>
                  <Search size={16} className="search-icon" />
                  <input 
                    type="text" 
                    placeholder="Search name, phone, msg..." 
                    value={inquirySearch}
                    onChange={(e) => setInquirySearch(e.target.value)}
                    style={{ padding: '6px 12px 6px 36px', fontSize: '0.84rem' }}
                  />
                </div>

                <select 
                  value={inquiryStatusFilter}
                  onChange={(e) => setInquiryStatusFilter(e.target.value)}
                  style={{ padding: '6px 12px', fontSize: '0.84rem', borderRadius: '8px', border: '1px solid #cbd5e1' }}
                >
                  <option value="all">All Statuses</option>
                  <option value="pending">Pending</option>
                  <option value="contacted">Contacted</option>
                  <option value="converted">Converted</option>
                </select>
              </div>
            </div>

            {filteredInquiries.length > 0 ? (
              <div className="admin-inquiries-grid">
                {filteredInquiries.map((inq, idx) => {
                  const status = inq.status || 'pending';
                  const cleanPhone = (inq.phone || '').replace(/[^0-9]/g, '');
                  return (
                    <div key={inq.id || idx} className="inquiry-card">
                      <div className="inquiry-header flex-between mb-2">
                        <span className="inquiry-user-type">
                          {inq.userType === 'owner' ? '🏠 Property Owner' : '🔑 Tenant Inquiry'}
                        </span>
                        <span className={`status-badge ${status}`}>
                          {status}
                        </span>
                      </div>

                      <h4>{inq.name}</h4>
                      <p className="inquiry-contact">
                        📞 {inq.phone} {inq.email ? `• ✉️ ${inq.email}` : ''}
                      </p>
                      {inq.message && <p className="inquiry-msg">"{inq.message}"</p>}
                      <div className="text-xs text-muted mt-1">Submitted: {inq.date || 'Recently'}</div>

                      <div className="inquiry-actions-row">
                        <div className="flex-align gap-2">
                          <label className="text-xs font-semibold text-muted">Status:</label>
                          <select 
                            className="inquiry-status-select"
                            value={status}
                            onChange={(e) => onUpdateInquiryStatus && onUpdateInquiryStatus(inq.id, e.target.value)}
                          >
                            <option value="pending">Pending</option>
                            <option value="contacted">Contacted</option>
                            <option value="converted">Converted</option>
                          </select>
                        </div>

                        <div className="flex-align gap-2">
                          {cleanPhone && (
                            <a 
                              href={`https://wa.me/91${cleanPhone}?text=Hi%20${encodeURIComponent(inq.name)},%20thank%20you%20for%20contacting%20SecureStay!`}
                              target="_blank"
                              rel="noreferrer"
                              className="btn-whatsapp-sm"
                              title="Chat on WhatsApp"
                            >
                              <Send size={12} /> WhatsApp
                            </a>
                          )}
                          <button 
                            type="button" 
                            className="btn-icon-danger"
                            onClick={() => onDeleteInquiry && onDeleteInquiry(inq.id)}
                            title="Delete Lead Record"
                          >
                            <Trash2 size={14} />
                          </button>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div className="catalog-empty-state text-center">
                <MessageSquare size={40} className="text-muted mx-auto mb-2" />
                <p>No customer lead inquiries match the selected filter.</p>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Edit Property Modal */}
      {editingProp && (
        <div className="legal-modal-backdrop" onClick={() => setEditingProp(null)}>
          <div className="legal-modal-card admin-edit-modal" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <h3>✏️ Edit Property Listing</h3>
              <button type="button" className="legal-modal-close" onClick={() => setEditingProp(null)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEditedProperty} className="admin-form">
              <div className="form-group">
                <label>Property Title *</label>
                <input 
                  type="text" 
                  required
                  value={editingProp.title || ''}
                  onChange={(e) => setEditingProp({ ...editingProp, title: e.target.value })}
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>City *</label>
                  <select 
                    value={editingProp.city || 'Bangalore'}
                    onChange={(e) => setEditingProp({ ...editingProp, city: e.target.value })}
                  >
                    <option value="Bangalore">Bangalore</option>
                    <option value="Mysuru">Mysuru</option>
                    <option value="Hyderabad">Hyderabad</option>
                    <option value="Chennai">Chennai</option>
                  </select>
                </div>
                <div className="form-group">
                  <label>Location / Area *</label>
                  <input 
                    type="text" 
                    required
                    value={editingProp.location || ''}
                    onChange={(e) => setEditingProp({ ...editingProp, location: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Rent</label>
                  <input 
                    type="text" 
                    value={editingProp.rentPrice || ''}
                    onChange={(e) => setEditingProp({ ...editingProp, rentPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Long-Term Lease</label>
                  <input 
                    type="text" 
                    value={editingProp.leasePrice || ''}
                    onChange={(e) => setEditingProp({ ...editingProp, leasePrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Outright Sale Price (₹)</label>
                  <input 
                    type="text" 
                    placeholder="e.g. 1.25 Cr"
                    value={editingProp.salePrice || ''}
                    onChange={(e) => setEditingProp({ ...editingProp, salePrice: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Property Type / BHK *</label>
                  <input 
                    type="text" 
                    required
                    value={editingProp.type || ''}
                    onChange={(e) => setEditingProp({ ...editingProp, type: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Listing Purpose *</label>
                  <select
                    value={editingProp.purpose || 'rent'}
                    onChange={(e) => setEditingProp({ ...editingProp, purpose: e.target.value })}
                  >
                    <option value="rent">For Monthly Rent</option>
                    <option value="lease">For Long-Term Lease</option>
                    <option value="sale">For Outright Sale</option>
                    <option value="rent_sale">Rent &amp; Sale Available</option>
                  </select>
                </div>
              </div>

              {/* Photo Upload & Replacement */}
              <div className="form-group">
                <label>Property Photos (Upload Files or Edit Links)</label>
                <div className="admin-photo-upload-box mb-2">
                  <input 
                    type="file" 
                    multiple 
                    accept="image/*" 
                    id="edit-photo-file-input"
                    className="file-input-hidden"
                    onChange={(e) => handleFileUpload(e, true)}
                    style={{ display: 'none' }}
                  />
                  <label htmlFor="edit-photo-file-input" className="file-upload-dropzone btn-upload-multiple">
                    <Upload size={18} />
                    <span>Upload / Add Photos</span>
                  </label>
                </div>

                <div className="image-urls-list mt-3">
                  <label className="text-xs font-semibold text-muted">Current Photos List ({(editingProp.images || []).length}):</label>
                  {(editingProp.images || []).map((imgUrl, idx) => (
                    <div key={idx} className="image-url-row" style={{ display: 'flex', gap: '8px', alignItems: 'center', marginBottom: '8px' }}>
                      <img 
                        src={imgUrl || '/assets/hero_stay.jpg'} 
                        alt="preview" 
                        style={{ width: '40px', height: '30px', objectFit: 'cover', borderRadius: '4px', border: '1px solid #cbd5e1' }}
                      />
                      <input 
                        type="text" 
                        placeholder="Image URL or Base64"
                        value={imgUrl}
                        onChange={(e) => {
                          const updated = [...(editingProp.images || [])];
                          updated[idx] = e.target.value;
                          setEditingProp({ ...editingProp, images: updated });
                        }}
                        style={{ flex: 1, padding: '6px 10px', fontSize: '0.82rem', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                      />
                      {(editingProp.images || []).length > 1 && (
                        <button 
                          type="button" 
                          className="btn-danger-sm"
                          onClick={() => {
                            const updated = editingProp.images.filter((_, i) => i !== idx);
                            setEditingProp({ ...editingProp, images: updated });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                  <button 
                    type="button" 
                    className="btn-secondary"
                    style={{ padding: '6px 12px', fontSize: '0.82rem' }}
                    onClick={() => setEditingProp({ ...editingProp, images: [...(editingProp.images || []), ''] })}
                  >
                    <Plus size={14} /> Add Image Link
                  </button>
                </div>
              </div>

              <div className="admin-modal-actions mt-4" style={{ display: 'flex', justifyContent: 'flex-end', gap: '12px', marginTop: '20px' }}>
                <button type="button" className="btn-secondary" onClick={() => setEditingProp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
