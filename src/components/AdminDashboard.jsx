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
    propertyId: '',
    city: 'Bangalore',
    customCity: '',
    area: '',
    purposes: ['rent'],
    customPurpose: '',
    purpose: 'rent',
    rentPrice: '',
    leasePrice: '',
    salePrice: '',
    type: 'Fully Furnished • 2 BHK',
    description: '',
    images: [''],
    amenitiesText: 'Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Power Backup, Housekeeping',
    customFields: []
  });

  const togglePurpose = (pType) => {
    setNewProp((prev) => {
      const current = prev.purposes || ['rent'];
      const exists = current.includes(pType);
      const updated = exists ? current.filter((t) => t !== pType) : [...current, pType];
      return {
        ...prev,
        purposes: updated.length > 0 ? updated : ['rent']
      };
    });
  };

  const handleAddCustomField = () => {
    setNewProp((prev) => ({
      ...prev,
      customFields: [...(prev.customFields || []), { label: '', value: '' }]
    }));
  };

  const handleCustomFieldChange = (index, field, val) => {
    setNewProp((prev) => {
      const updated = [...(prev.customFields || [])];
      updated[index] = { ...updated[index], [field]: val };
      return { ...prev, customFields: updated };
    });
  };

  const handleRemoveCustomField = (index) => {
    setNewProp((prev) => ({
      ...prev,
      customFields: (prev.customFields || []).filter((_, i) => i !== index)
    }));
  };

  const toggleEditPurpose = (purposeKey) => {
    if (!editingProp) return;
    const current = editingProp.purposes || [editingProp.purpose || 'rent'];
    let updated;
    if (current.includes(purposeKey)) {
      if (current.length === 1) return;
      updated = current.filter(k => k !== purposeKey);
    } else {
      updated = [...current, purposeKey];
    }
    setEditingProp({ ...editingProp, purposes: updated });
  };

  const handleAddEditCustomField = () => {
    if (!editingProp) return;
    const current = editingProp.customFields || [];
    setEditingProp({
      ...editingProp,
      customFields: [...current, { label: '', value: '' }]
    });
  };

  const handleEditCustomFieldChange = (idx, field, val) => {
    if (!editingProp) return;
    const current = [...(editingProp.customFields || [])];
    current[idx] = { ...current[idx], [field]: val };
    setEditingProp({ ...editingProp, customFields: current });
  };

  const handleRemoveEditCustomField = (idx) => {
    if (!editingProp) return;
    const current = (editingProp.customFields || []).filter((_, i) => i !== idx);
    setEditingProp({ ...editingProp, customFields: current });
  };

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

    const selectedPurposes = editingProp.purposes || [editingProp.purpose || 'rent'];
    const purposeNames = selectedPurposes.map((p) => {
      if (p === 'rent') return 'Monthly Rent';
      if (p === 'lease') return 'Long-Term Lease';
      if (p === 'sale') return 'Outright Sale';
      if (p === 'custom') return editingProp.customPurpose || 'Custom Purpose';
      return p;
    });

    const effectiveCity = editingProp.city === 'Other' && editingProp.customCity
      ? editingProp.customCity
      : editingProp.city || 'Bangalore';

    const validCustomFields = (editingProp.customFields || []).filter(
      (f) => f.label && f.label.trim() !== '' && f.value && f.value.trim() !== ''
    );

    const finalProp = {
      ...editingProp,
      city: effectiveCity,
      customCity: editingProp.customCity || '',
      location: editingProp.location || editingProp.area || 'City Center',
      area: editingProp.area || editingProp.location || 'City Center',
      bhk: bhk,
      feature: feature,
      purposes: selectedPurposes,
      purposeText: purposeNames.join(' • '),
      purpose: selectedPurposes.includes('rent') ? 'rent' : selectedPurposes[0],
      rentPrice: editingProp.rentPrice ? (editingProp.rentPrice.includes('₹') ? editingProp.rentPrice : `₹${editingProp.rentPrice} / month`) : '',
      leasePrice: editingProp.leasePrice ? (editingProp.leasePrice.includes('₹') ? editingProp.leasePrice : `₹${editingProp.leasePrice}`) : '',
      salePrice: editingProp.salePrice ? (editingProp.salePrice.includes('₹') ? editingProp.salePrice : `₹${editingProp.salePrice}`) : '',
      customFields: validCustomFields,
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
      ? `₹${newProp.rentPrice.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')}` 
      : '';

    const leaseFormatted = newProp.leasePrice 
      ? (newProp.leasePrice.includes('₹') ? newProp.leasePrice : `₹${newProp.leasePrice}`) 
      : '';

    const saleFormatted = newProp.salePrice 
      ? (newProp.salePrice.includes('₹') ? newProp.salePrice : `₹${newProp.salePrice}`) 
      : '';

    const effectiveCity = newProp.city === 'Other' && newProp.customCity && newProp.customCity.trim() 
      ? newProp.customCity.trim() 
      : newProp.city;

    const cityCode = effectiveCity.substring(0, 3).toUpperCase();
    const autoPropId = `SS-${cityCode}-${Math.floor(10 + Math.random() * 90)}`;
    const finalPropertyId = newProp.propertyId && newProp.propertyId.trim() ? newProp.propertyId.trim() : autoPropId;

    const activePurposes = newProp.purposes || ['rent'];
    let computedPurpose = 'rent';
    if (activePurposes.includes('rent') && activePurposes.includes('sale')) {
      computedPurpose = 'rent_sale';
    } else if (activePurposes.includes('rent')) {
      computedPurpose = 'rent';
    } else if (activePurposes.includes('lease')) {
      computedPurpose = 'lease';
    } else if (activePurposes.includes('sale')) {
      computedPurpose = 'sale';
    } else if (activePurposes.includes('custom')) {
      computedPurpose = newProp.customPurpose || 'custom';
    }

    const validCustomFields = (newProp.customFields || []).filter((cf) => cf.label.trim() !== '' && cf.value.trim() !== '');

    const propertyPayload = {
      id: Date.now(),
      propertyId: finalPropertyId,
      title: newProp.title,
      city: effectiveCity,
      bhk: bhk,
      feature: feature,
      purposes: activePurposes,
      customPurpose: newProp.customPurpose || '',
      purpose: computedPurpose,
      location: `${newProp.area}, ${effectiveCity}`,
      rentPrice: rentFormatted,
      leasePrice: leaseFormatted,
      salePrice: saleFormatted,
      type: newProp.type,
      description: newProp.description || '',
      images: finalImages,
      amenities: amenitiesList.length > 0 ? amenitiesList : [
        'Biometric Smart Lock', 'High-Speed Wi-Fi', 'Power Backup', 'Housekeeping'
      ],
      customFields: validCustomFields
    };

    onAddProperty(propertyPayload);
    setSuccessMessage(`Property "${propertyPayload.title}" (${finalPropertyId}) in ${effectiveCity} published live to website!`);
    setTimeout(() => setSuccessMessage(''), 4000);

    // Reset Form
    setNewProp({
      title: '',
      propertyId: '',
      city: 'Bangalore',
      customCity: '',
      area: '',
      purposes: ['rent'],
      customPurpose: '',
      purpose: 'rent',
      rentPrice: '',
      leasePrice: '',
      salePrice: '',
      type: 'Fully Furnished • 2 BHK',
      description: '',
      images: [''],
      amenitiesText: 'Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Power Backup, Housekeeping',
      customFields: []
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
            <div className="admin-login-brand-wrap">
              <img 
                src="/assets/securestay_logo.png" 
                alt="SecureStay Logo" 
                className="admin-login-brand-logo" 
              />
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
                <Sparkles size={14} style={{ color: '#0284c7' }} />
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
          <div className="admin-brand">
            <img src="/assets/securestay_logo.png" alt="SecureStay" className="admin-header-logo" />
            <div className="admin-brand-text">
              <h3 className="admin-brand-heading">SecureStay</h3>
              <span className="cloud-sync-badge">● Live</span>
            </div>
          </div>

          <div className="admin-top-actions">
            <a 
              href="/" 
              target="_blank" 
              rel="noreferrer" 
              className="btn-header-live" 
            >
              <ArrowLeft size={14} /> Website
            </a>
            <button type="button" className="btn-header-logout" onClick={() => setIsAuthenticated(false)}>
              <LogOut size={14} /> Logout
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
            <Plus size={16} className="flex-shrink-0" />
            <span className="tab-btn-title">
              <span className="desktop-tab-label">Upload New Property</span>
              <span className="mobile-tab-label">+ Upload</span>
            </span>
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'properties-list' ? 'active' : ''}`}
            onClick={() => setActiveTab('properties-list')}
          >
            <Building2 size={16} className="flex-shrink-0" />
            <span className="tab-btn-title">
              <span className="desktop-tab-label">Manage Listings <span className="tab-count-badge">({properties.length})</span></span>
              <span className="mobile-tab-label">Listings ({properties.length})</span>
            </span>
          </button>
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'inquiries' ? 'active' : ''}`}
            onClick={() => setActiveTab('inquiries')}
          >
            <MessageSquare size={16} className="flex-shrink-0" />
            <span className="tab-btn-title">
              <span className="desktop-tab-label">Customer Inquiries <span className="tab-count-badge">({inquiries.length})</span></span>
              <span className="mobile-tab-label">Inquiries ({inquiries.length})</span>
            </span>
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

            <form onSubmit={handleCreatePropertySubmit} className="add-property-form-saas">
              {/* Section 1: Basic Details & Location */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">1</div>
                  <div>
                    <h4 className="saas-card-title">Basic Details &amp; Location</h4>
                    <p className="saas-card-subtitle">Set property building title, tracking ID, target city, and area address.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  {/* Row 1: Property Title (3fr) + Property ID Number (1fr) */}
                  <div className="saas-grid-3fr-1fr">
                    <div className="saas-field">
                      <label className="saas-label">Property Title / Building Name *</label>
                      <input 
                        type="text" 
                        required 
                        className="saas-input"
                        placeholder="e.g. Skyline Luxury 2 BHK Residency"
                        value={newProp.title}
                        onChange={(e) => setNewProp({ ...newProp, title: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Property ID Number</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. SS-MYS-02 (Auto-generated)"
                        value={newProp.propertyId || ''}
                        onChange={(e) => setNewProp({ ...newProp, propertyId: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Row 2: 3 Equal Columns (33.33% each) */}
                  <div className="saas-grid-3">
                    <div className="saas-field">
                      <label className="saas-label">City Location *</label>
                      <select 
                        className="saas-input saas-select"
                        value={newProp.city} 
                        onChange={(e) => setNewProp({ ...newProp, city: e.target.value })}
                      >
                        <option value="Bangalore">Bangalore (Bengaluru)</option>
                        <option value="Mysuru">Mysuru</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Other">Add Custom City Manually...</option>
                      </select>
                    </div>

                    {newProp.city === 'Other' && (
                      <div className="saas-field">
                        <label className="saas-label">Manual City Name *</label>
                        <input 
                          type="text" 
                          required 
                          className="saas-input"
                          placeholder="e.g. Pune, Mangalore, Coimbatore"
                          value={newProp.customCity || ''}
                          onChange={(e) => setNewProp({ ...newProp, customCity: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="saas-field">
                      <label className="saas-label">Neighborhood / Area Address *</label>
                      <input 
                        type="text" 
                        required 
                        className="saas-input"
                        placeholder="e.g. Koramangala 4th Block"
                        value={newProp.area}
                        onChange={(e) => setNewProp({ ...newProp, area: e.target.value })}
                      />
                    </div>

                    <div className="saas-field">
                      <label className="saas-label">Property Type / BHK *</label>
                      <input 
                        type="text" 
                        required 
                        className="saas-input"
                        placeholder="e.g. Fully Furnished • 2 BHK"
                        value={newProp.type}
                        onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Section Field Block: Property Description */}
                  <div className="saas-field mt-3">
                    <label className="saas-label">Property Description</label>
                    <textarea 
                      rows="4"
                      className="saas-input saas-textarea"
                      placeholder="e.g. Beautiful sun-lit studio apartment located right next to the metro station..."
                      value={newProp.description || ''}
                      onChange={(e) => setNewProp({ ...newProp, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Listing Purpose & Pricing Models */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">2</div>
                  <div>
                    <h4 className="saas-card-title">Listing Purpose &amp; Pricing Models</h4>
                    <p className="saas-card-subtitle">Select single or multiple availability options and set pricing structure.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  <div className="saas-field mb-4">
                    <label className="saas-label">Listing Purpose Types (Select Single or Multiple Options) *</label>
                    <div className="purpose-checkbox-group">
                      <label className={`purpose-checkbox-pill ${(newProp.purposes || ['rent']).includes('rent') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(newProp.purposes || ['rent']).includes('rent')} 
                          onChange={() => togglePurpose('rent')} 
                        />
                        <span>For Monthly Rent</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(newProp.purposes || []).includes('lease') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(newProp.purposes || []).includes('lease')} 
                          onChange={() => togglePurpose('lease')} 
                        />
                        <span>For Long-Term Lease</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(newProp.purposes || []).includes('sale') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(newProp.purposes || []).includes('sale')} 
                          onChange={() => togglePurpose('sale')} 
                        />
                        <span>For Outright Sale</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(newProp.purposes || []).includes('custom') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(newProp.purposes || []).includes('custom')} 
                          onChange={() => togglePurpose('custom')} 
                        />
                        <span>Add Custom Listing Purpose...</span>
                      </label>
                    </div>

                    {(newProp.purposes || []).includes('custom') && (
                      <div className="mt-3">
                        <input 
                          type="text" 
                          className="saas-input"
                          placeholder="e.g. PG / Paying Guest, Commercial Lease, Short Stay"
                          value={newProp.customPurpose || ''}
                          onChange={(e) => setNewProp({ ...newProp, customPurpose: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="saas-grid-3">
                    <div className="saas-field">
                      <label className="saas-label">Monthly Rent (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. 28000 (Optional if Sale only)"
                        value={newProp.rentPrice}
                        onChange={(e) => setNewProp({ ...newProp, rentPrice: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Long-Term Lease (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. 15L (Optional)"
                        value={newProp.leasePrice}
                        onChange={(e) => setNewProp({ ...newProp, leasePrice: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Outright Sale Price (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. 1.25 Cr (For Sale)"
                        value={newProp.salePrice}
                        onChange={(e) => setNewProp({ ...newProp, salePrice: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Dynamic Custom Details & Extra Fields */}
              <div className="saas-form-card">
                <div className="saas-card-header flex-between">
                  <div className="flex-align">
                    <div className="saas-card-number">3</div>
                    <div>
                      <h4 className="saas-card-title">Dynamic Custom Details / Extra Fields</h4>
                      <p className="saas-card-subtitle">Add optional key-value attributes (e.g. Security Deposit, Facing, Floor Number).</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-secondary-sm" 
                    onClick={handleAddCustomField}
                  >
                    + Add Extra Field
                  </button>
                </div>

                <div className="saas-card-body">
                  {(newProp.customFields || []).length > 0 ? (
                    <div className="extra-fields-stack">
                      {newProp.customFields.map((field, idx) => (
                        <div key={idx} className="extra-field-grid">
                          <input 
                            type="text" 
                            className="saas-input"
                            placeholder="Field Label (e.g. Security Deposit)"
                            value={field.label || ''}
                            onChange={(e) => handleCustomFieldChange(idx, 'label', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="saas-input"
                            placeholder="Field Value (e.g. 2 Months Rent)"
                            value={field.value || ''}
                            onChange={(e) => handleCustomFieldChange(idx, 'value', e.target.value)}
                          />
                          <button 
                            type="button" 
                            className="btn-icon-danger"
                            onClick={() => handleRemoveCustomField(idx)}
                            title="Delete Field"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-fields-text">No custom extra fields added yet. Click "+ Add Extra Field" to specify key-value property metadata.</p>
                  )}
                </div>
              </div>

              {/* Section 4: Property Media & Amenities */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">4</div>
                  <div>
                    <h4 className="saas-card-title">Property Media &amp; Included Amenities</h4>
                    <p className="saas-card-subtitle">Upload high-resolution property photos or paste direct image URLs.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  {/* Redesigned Media Drag-and-Drop Area */}
                  <div className="saas-upload-dropzone mb-4">
                    <Upload size={28} className="saas-upload-icon" />
                    <h5 className="saas-upload-title">Upload Property Photos</h5>
                    <p className="saas-upload-sub">Drag &amp; drop photos here or click selector below (Hold Shift/Cmd to select multiple files)</p>
                    
                    <label className="btn-upload-saas mt-2">
                      <span>📁 Select Photo Files</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={handleFileUpload}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="saas-field mb-3">
                    <div className="saas-media-header-row mb-3">
                      <label className="saas-label margin-0">Property Image URLs ({newProp.images.length}):</label>
                      <button 
                        type="button" 
                        className="btn-add-photo-pill" 
                        onClick={handleAddImageUrlField}
                      >
                        + Add Photo Link
                      </button>
                    </div>

                    {newProp.images.map((imgUrl, idx) => (
                      <div key={idx} className="image-url-input-row mb-2">
                        <img 
                          src={imgUrl || '/assets/hero_stay.jpg'} 
                          alt="preview" 
                          className="media-url-thumb"
                        />
                        <input 
                          type="url" 
                          className="saas-input"
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

                    {/* Preset Sample Photo Chips */}
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

                  <div className="saas-field">
                    <label className="saas-label">Included Amenities (Comma Separated)</label>
                    <textarea 
                      rows={3}
                      className="saas-input saas-textarea"
                      placeholder="Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Housekeeping, Power Backup"
                      value={newProp.amenitiesText}
                      onChange={(e) => setNewProp({ ...newProp, amenitiesText: e.target.value })}
                    ></textarea>
                  </div>
                </div>
              </div>

              {/* Premium Global Action Button */}
              <div className="saas-submit-bar mt-4">
                <button type="submit" className="btn-publish-saas">
                  Upload &amp; Publish Property Live
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Tab 2: Manage Properties List */}
        {activeTab === 'properties-list' && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h3>All Published Properties ({filteredTableProperties.length})</h3>
              <p>Manage active listings displayed on the SecureStay catalog and homepage.</p>
            </div>

            <div className="admin-toolbar-row">
              <div className="admin-search-wrap">
                <Search size={16} className="admin-search-icon" />
                <input 
                  type="text" 
                  className="admin-search-input"
                  placeholder="Search property title, city or area..." 
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
              </div>

              {tableSearch && (
                <button 
                  type="button" 
                  className="btn-link-sm text-muted"
                  onClick={() => setTableSearch('')}
                >
                  Clear Search
                </button>
              )}
            </div>

            {/* Desktop Table View */}
            <div className="admin-properties-table-wrap desktop-only-table">
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
                    const propIdCode = prop.propertyId || `SS-${(prop.city || 'BLR').substring(0,3).toUpperCase()}-${String(prop.id).padStart(2,'0')}`;
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
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '3px' }}>
                            <strong style={{ color: '#0c2340', fontSize: '0.95rem' }}>{prop.title}</strong>
                            <span className="table-prop-id-badge">#{propIdCode}</span>
                            <span style={{ fontSize: '0.78rem', color: '#64748b' }}>{prop.type}</span>
                          </div>
                        </td>
                        <td>{prop.location}</td>
                        <td><span className="text-green font-semibold">{prop.rentPrice || prop.salePrice || 'N/A'}</span></td>
                        <td>
                          <button
                            type="button"
                            onClick={() => onToggleAvailability && onToggleAvailability(prop.id)}
                            className={`table-status-pill ${isOccupied ? 'occupied' : 'available'}`}
                            title="Click to toggle Available / Occupied status"
                          >
                            <span className="status-dot"></span>
                            {isOccupied ? 'Occupied' : 'Available'}
                          </button>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => onToggleFeatured && onToggleFeatured(prop.id)}
                            className={`table-featured-btn ${isFeatured ? 'active' : ''}`}
                            title="Click to toggle Featured on Homepage"
                          >
                            {isFeatured ? '★ Featured' : '☆ Standard'}
                          </button>
                        </td>
                        <td>
                          <div className="table-actions-cell">
                            <button 
                              type="button" 
                              className="btn-table-edit" 
                              onClick={() => setEditingProp({ ...prop, images: prop.images || [prop.image || ''] })}
                              title="Edit Property &amp; Photos"
                            >
                              <Pencil size={14} /> Edit
                            </button>
                            <button 
                              type="button" 
                              className="btn-table-remove" 
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

            {/* Mobile Application Style Cards View */}
            <div className="admin-mobile-properties-cards mobile-only-cards">
              {filteredTableProperties.map((prop) => {
                const isOccupied = prop.availability === 'Occupied';
                const isFeatured = !!prop.isFeatured;
                const propIdCode = prop.propertyId || `SS-${(prop.city || 'BLR').substring(0,3).toUpperCase()}-${String(prop.id).padStart(2,'0')}`;
                return (
                  <div className="admin-mobile-prop-card" key={prop.id}>
                    {/* Top Row: ID Badge & Availability Status */}
                    <div className="mobile-card-top-bar">
                      <span className="mobile-card-id-chip">#{propIdCode}</span>
                      <button
                        type="button"
                        onClick={() => onToggleAvailability && onToggleAvailability(prop.id)}
                        className={`table-status-pill ${isOccupied ? 'occupied' : 'available'}`}
                        title="Click to toggle Available / Occupied status"
                      >
                        <span className="status-dot"></span>
                        {isOccupied ? 'Occupied' : 'Available'}
                      </button>
                    </div>

                    {/* Main Content Body: Image + Details */}
                    <div className="mobile-card-body">
                      <img 
                        src={prop.images?.[0] || prop.image || '/assets/hero_stay.jpg'} 
                        alt={prop.title} 
                        className="mobile-card-img"
                      />
                      <div className="mobile-card-details">
                        <div className="mobile-card-price">{prop.rentPrice || prop.salePrice || 'N/A'}</div>
                        <h4 className="mobile-card-title">{prop.title}</h4>
                        <div className="mobile-card-location">
                          <MapPin size={13} className="flex-shrink-0 text-muted" />
                          <span>{prop.location}</span>
                        </div>
                        {prop.type && <div className="mobile-card-subtext">{prop.type}</div>}
                      </div>
                    </div>

                    {/* Bottom Row: 3 Touch Action Buttons */}
                    <div className="mobile-card-footer">
                      <button
                        type="button"
                        onClick={() => onToggleFeatured && onToggleFeatured(prop.id)}
                        className={`mobile-card-btn featured-btn ${isFeatured ? 'active' : ''}`}
                        title="Toggle Featured status on Homepage"
                      >
                        {isFeatured ? '★ Featured' : '☆ Standard'}
                      </button>
                      <button 
                        type="button" 
                        className="mobile-card-btn edit-btn" 
                        onClick={() => setEditingProp({ ...prop, images: prop.images || [prop.image || ''] })}
                      >
                        <Pencil size={14} /> Edit
                      </button>
                      <button 
                        type="button" 
                        className="mobile-card-btn remove-btn" 
                        onClick={() => onDeleteProperty(prop.id)}
                      >
                        <Trash2 size={14} /> Remove
                      </button>
                    </div>
                  </div>
                );
              })}

              {filteredTableProperties.length === 0 && (
                <div className="text-center py-6 text-muted">
                  No properties found matching "{tableSearch}"
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 3: Customer Lead Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h3>Submitted Lead Inquiries ({filteredInquiries.length})</h3>
              <p>Inquiries sent through website forms, connected directly to your management workflow.</p>
            </div>

            <div className="admin-toolbar-row">
              <div className="admin-search-wrap">
                <Search size={16} className="admin-search-icon" />
                <input 
                  type="text" 
                  className="admin-search-input"
                  placeholder="Search lead name, phone, message..." 
                  value={inquirySearch}
                  onChange={(e) => setInquirySearch(e.target.value)}
                />
              </div>

              <select 
                className="admin-filter-select"
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
              >
                <option value="all">All Statuses</option>
                <option value="pending">🟡 Pending</option>
                <option value="contacted">🔵 Contacted</option>
                <option value="converted">🟢 Converted</option>
              </select>

              {(inquirySearch || inquiryStatusFilter !== 'all') && (
                <button 
                  type="button" 
                  className="btn-link-sm text-muted"
                  onClick={() => {
                    setInquirySearch('');
                    setInquiryStatusFilter('all');
                  }}
                >
                  Clear Filters
                </button>
              )}
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
          <div className="legal-modal-card admin-edit-modal-saas" onClick={(e) => e.stopPropagation()}>
            <div className="legal-modal-header">
              <h3>Edit Property Listing</h3>
              <button type="button" className="legal-modal-close" onClick={() => setEditingProp(null)}>
                <X size={20} />
              </button>
            </div>
            
            <form onSubmit={handleSaveEditedProperty} className="add-property-form-saas mt-3">
              {/* Section 1: Basic Details & Location */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">1</div>
                  <div>
                    <h4 className="saas-card-title">Basic Details &amp; Location</h4>
                    <p className="saas-card-subtitle">Edit building title, tracking ID, target city, and area address.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  <div className="saas-grid-3fr-1fr">
                    <div className="saas-field">
                      <label className="saas-label">Property Title / Building Name *</label>
                      <input 
                        type="text" 
                        required
                        className="saas-input"
                        value={editingProp.title || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, title: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Property ID Number</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. SS-MYS-02"
                        value={editingProp.propertyId || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, propertyId: e.target.value })}
                      />
                    </div>
                  </div>

                  <div className="saas-grid-3 mt-3">
                    <div className="saas-field">
                      <label className="saas-label">City Location *</label>
                      <select 
                        className="saas-input saas-select"
                        value={['Bangalore','Mysuru','Hyderabad','Chennai'].includes(editingProp.city) ? editingProp.city : 'Other'} 
                        onChange={(e) => {
                          const val = e.target.value;
                          setEditingProp({ 
                            ...editingProp, 
                            city: val === 'Other' ? (editingProp.customCity || 'Other') : val,
                            customCity: val === 'Other' ? (editingProp.customCity || '') : ''
                          });
                        }}
                      >
                        <option value="Bangalore">Bangalore (Bengaluru)</option>
                        <option value="Mysuru">Mysuru</option>
                        <option value="Hyderabad">Hyderabad</option>
                        <option value="Chennai">Chennai</option>
                        <option value="Other">Add Custom City Manually...</option>
                      </select>
                    </div>

                    {(!['Bangalore','Mysuru','Hyderabad','Chennai'].includes(editingProp.city) || editingProp.city === 'Other') && (
                      <div className="saas-field">
                        <label className="saas-label">Manual City Name *</label>
                        <input 
                          type="text" 
                          required
                          className="saas-input"
                          placeholder="e.g. Pune, Mangalore, Coimbatore"
                          value={editingProp.customCity || (editingProp.city !== 'Other' ? editingProp.city : '')}
                          onChange={(e) => setEditingProp({ ...editingProp, customCity: e.target.value, city: e.target.value })}
                        />
                      </div>
                    )}

                    <div className="saas-field">
                      <label className="saas-label">Neighborhood / Area Address *</label>
                      <input 
                        type="text" 
                        required
                        className="saas-input"
                        value={editingProp.location || editingProp.area || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, location: e.target.value, area: e.target.value })}
                      />
                    </div>

                    <div className="saas-field">
                      <label className="saas-label">Property Type / BHK *</label>
                      <input 
                        type="text" 
                        required
                        className="saas-input"
                        value={editingProp.type || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, type: e.target.value })}
                      />
                    </div>
                  </div>

                  {/* Section Field Block: Property Description */}
                  <div className="saas-field mt-3">
                    <label className="saas-label">Property Description</label>
                    <textarea 
                      rows="4"
                      className="saas-input saas-textarea"
                      placeholder="e.g. Beautiful sun-lit studio apartment located right next to the metro station..."
                      value={editingProp.description || ''}
                      onChange={(e) => setEditingProp({ ...editingProp, description: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Listing Purpose & Pricing Models */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">2</div>
                  <div>
                    <h4 className="saas-card-title">Listing Purpose &amp; Pricing Models</h4>
                    <p className="saas-card-subtitle">Select availability options and update pricing structure.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  <div className="saas-field mb-4">
                    <label className="saas-label mb-2">Listing Purpose Types (Select Single or Multiple Options) *</label>
                    <div className="purpose-checkbox-group">
                      <label className={`purpose-checkbox-pill ${(editingProp.purposes || [editingProp.purpose || 'rent']).includes('rent') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(editingProp.purposes || [editingProp.purpose || 'rent']).includes('rent')} 
                          onChange={() => toggleEditPurpose('rent')} 
                        />
                        <span>For Monthly Rent</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(editingProp.purposes || [editingProp.purpose || 'rent']).includes('lease') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(editingProp.purposes || [editingProp.purpose || 'rent']).includes('lease')} 
                          onChange={() => toggleEditPurpose('lease')} 
                        />
                        <span>For Long-Term Lease</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(editingProp.purposes || [editingProp.purpose || 'rent']).includes('sale') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(editingProp.purposes || [editingProp.purpose || 'rent']).includes('sale')} 
                          onChange={() => toggleEditPurpose('sale')} 
                        />
                        <span>For Outright Sale</span>
                      </label>

                      <label className={`purpose-checkbox-pill ${(editingProp.purposes || [editingProp.purpose || 'rent']).includes('custom') ? 'active' : ''}`}>
                        <input 
                          type="checkbox" 
                          checked={(editingProp.purposes || [editingProp.purpose || 'rent']).includes('custom')} 
                          onChange={() => toggleEditPurpose('custom')} 
                        />
                        <span>Add Custom Listing Purpose...</span>
                      </label>
                    </div>

                    {(editingProp.purposes || []).includes('custom') && (
                      <div className="mt-3">
                        <input 
                          type="text" 
                          className="saas-input"
                          placeholder="e.g. PG / Paying Guest, Commercial Lease, Short Stay"
                          value={editingProp.customPurpose || ''}
                          onChange={(e) => setEditingProp({ ...editingProp, customPurpose: e.target.value })}
                        />
                      </div>
                    )}
                  </div>

                  <div className="saas-grid-3">
                    <div className="saas-field">
                      <label className="saas-label">Monthly Rent (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        value={editingProp.rentPrice || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, rentPrice: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Long-Term Lease (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        value={editingProp.leasePrice || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, leasePrice: e.target.value })}
                      />
                    </div>
                    <div className="saas-field">
                      <label className="saas-label">Outright Sale Price (₹)</label>
                      <input 
                        type="text" 
                        className="saas-input"
                        placeholder="e.g. 1.25 Cr"
                        value={editingProp.salePrice || ''}
                        onChange={(e) => setEditingProp({ ...editingProp, salePrice: e.target.value })}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 3: Dynamic Custom Details & Extra Fields */}
              <div className="saas-form-card">
                <div className="saas-card-header flex-between">
                  <div className="flex-align">
                    <div className="saas-card-number">3</div>
                    <div>
                      <h4 className="saas-card-title">Dynamic Custom Details / Extra Fields</h4>
                      <p className="saas-card-subtitle">Add or edit optional custom key-value attributes (e.g. Security Deposit, Facing).</p>
                    </div>
                  </div>
                  <button 
                    type="button" 
                    className="btn-secondary-sm" 
                    onClick={handleAddEditCustomField}
                  >
                    + Add Extra Field
                  </button>
                </div>

                <div className="saas-card-body">
                  {(editingProp.customFields || []).length > 0 ? (
                    <div className="extra-fields-stack">
                      {editingProp.customFields.map((field, idx) => (
                        <div key={idx} className="extra-field-grid">
                          <input 
                            type="text" 
                            className="saas-input"
                            placeholder="Field Label (e.g. Security Deposit)"
                            value={field.label || ''}
                            onChange={(e) => handleEditCustomFieldChange(idx, 'label', e.target.value)}
                          />
                          <input 
                            type="text" 
                            className="saas-input"
                            placeholder="Field Value (e.g. 2 Months Rent)"
                            value={field.value || ''}
                            onChange={(e) => handleEditCustomFieldChange(idx, 'value', e.target.value)}
                          />
                          <button 
                            type="button" 
                            className="btn-icon-danger"
                            onClick={() => handleRemoveEditCustomField(idx)}
                            title="Delete Field"
                          >
                            <Trash2 size={16} />
                          </button>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="empty-fields-text">No custom extra fields added yet. Click "+ Add Extra Field" to add custom metadata.</p>
                  )}
                </div>
              </div>

              {/* Section 4: Property Media & Photos */}
              <div className="saas-form-card">
                <div className="saas-card-header">
                  <div className="saas-card-number">4</div>
                  <div>
                    <h4 className="saas-card-title">Property Media &amp; Photos</h4>
                    <p className="saas-card-subtitle">Upload new photo files or manage image links.</p>
                  </div>
                </div>

                <div className="saas-card-body">
                  <div className="saas-upload-dropzone mb-4">
                    <Upload size={28} className="saas-upload-icon" />
                    <h5 className="saas-upload-title">Upload New Photos</h5>
                    <p className="saas-upload-sub">Select multiple photo files from your computer</p>
                    
                    <label className="btn-upload-saas mt-2">
                      <span>📁 Select Photo Files</span>
                      <input 
                        type="file" 
                        multiple 
                        accept="image/*" 
                        onChange={(e) => handleFileUpload(e, true)}
                        style={{ display: 'none' }}
                      />
                    </label>
                  </div>

                  <div className="saas-field mb-3">
                    <div className="saas-media-header-row mb-3">
                      <label className="saas-label margin-0">Current Photos List ({(editingProp.images || []).length}):</label>
                      <button 
                        type="button" 
                        className="btn-add-photo-pill" 
                        onClick={() => setEditingProp({ ...editingProp, images: [...(editingProp.images || []), ''] })}
                      >
                        + Add Photo Link
                      </button>
                    </div>

                    {(editingProp.images || []).map((imgUrl, idx) => (
                      <div key={idx} className="image-url-input-row mb-2">
                        <img 
                          src={imgUrl || '/assets/hero_stay.jpg'} 
                          alt="preview" 
                          className="media-url-thumb"
                        />
                        <input 
                          type="url" 
                          className="saas-input"
                          placeholder="Image URL (https://...)"
                          value={imgUrl}
                          onChange={(e) => {
                            const updated = [...(editingProp.images || [])];
                            updated[idx] = e.target.value;
                            setEditingProp({ ...editingProp, images: updated });
                          }}
                        />
                        {(editingProp.images || []).length > 1 && (
                          <button 
                            type="button" 
                            className="btn-icon-danger"
                            onClick={() => {
                              const updated = editingProp.images.filter((_, i) => i !== idx);
                              setEditingProp({ ...editingProp, images: updated });
                            }}
                            title="Remove photo"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Modal Submit Actions */}
              <div className="saas-modal-actions flex-between mt-4">
                <button type="button" className="btn-secondary px-4 py-2" onClick={() => setEditingProp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-publish-saas" style={{ width: 'auto', padding: '12px 28px' }}>
                  Save Property Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
