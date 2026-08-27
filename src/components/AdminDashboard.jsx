import React, { useState } from 'react';
import { ArrowLeft, ShieldCheck, Lock, Plus, Trash2, CheckCircle, Image as ImageIcon, Building2, MessageSquare, LogOut, Upload } from 'lucide-react';

export default function AdminDashboard({ 
  properties, 
  onAddProperty, 
  onDeleteProperty, 
  onBackToHome,
  inquiries = []
}) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loginForm, setLoginForm] = useState({ username: '', password: '' });
  const [loginError, setLoginError] = useState('');

  const [activeTab, setActiveTab] = useState('add-property'); // 'add-property' | 'properties-list' | 'inquiries'
  const [successMessage, setSuccessMessage] = useState('');

  // New Property Form State
  const [newProp, setNewProp] = useState({
    title: '',
    city: 'Bangalore',
    area: '',
    rentPrice: '',
    leasePrice: '',
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

  const handleQuickPresetImage = (index, presetUrl) => {
    const updatedImages = [...newProp.images];
    updatedImages[index] = presetUrl;
    setNewProp((prev) => ({ ...prev, images: updatedImages }));
  };

  const handleFileUpload = (e) => {
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
      setNewProp((prev) => {
        const existingValid = prev.images.filter((img) => img.trim() !== '');
        return {
          ...prev,
          images: [...existingValid, ...base64Images]
        };
      });
    });
  };

  const handleCreatePropertySubmit = (e) => {
    e.preventDefault();
    if (!newProp.title.trim() || !newProp.area.trim()) return;

    const validImages = newProp.images.filter((url) => url.trim() !== '');
    const finalImages = validImages.length > 0 
      ? validImages 
      : ['https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80'];

    const amenitiesList = newProp.amenitiesText
      .split(',')
      .map((item) => item.trim())
      .filter((item) => item !== '');

    const propertyPayload = {
      id: Date.now(),
      title: newProp.title,
      location: `${newProp.area}, ${newProp.city === 'Bangalore' ? 'Bengaluru' : newProp.city}`,
      rentPrice: `₹${newProp.rentPrice.replace(/[^0-9]/g, '').replace(/\B(?=(\d{3})+(?!\d))/g, ',')} / month`,
      leasePrice: `₹${newProp.leasePrice} (2-3 Yrs)`,
      type: newProp.type,
      images: finalImages,
      amenities: amenitiesList.length > 0 ? amenitiesList : [
        'Biometric Smart Lock', 'High-Speed Wi-Fi', 'Power Backup', 'Housekeeping'
      ]
    };

    onAddProperty(propertyPayload);

    // Reset Form
    setNewProp({
      title: '',
      city: 'Bangalore',
      area: '',
      rentPrice: '',
      leasePrice: '',
      type: 'Fully Furnished • 2 BHK',
      images: [''],
      amenitiesText: 'Biometric Smart Lock, High-Speed Wi-Fi, 24/7 CCTV, Power Backup, Housekeeping'
    });

    setSuccessMessage(`Property "${propertyPayload.title}" uploaded successfully! It is now live on the website.`);
    setTimeout(() => setSuccessMessage(''), 5000);
  };

  // If Not Authenticated, Show Login Screen
  if (!isAuthenticated) {
    return (
      <div className="admin-login-screen">
        <div className="admin-login-card">
          <div className="login-header text-center">
            <div className="admin-icon-circle">
              <ShieldCheck size={32} className="text-gold" />
            </div>
            <h2>SecureStay Admin Portal</h2>
            <p>Sign in to upload property photos, edit stays, and manage leads</p>
          </div>

          {loginError && <div className="login-error-alert">{loginError}</div>}

          <form onSubmit={handleLogin} className="admin-login-form">
            <div className="form-group">
              <label>Username</label>
              <input 
                type="text" 
                required
                placeholder="Enter admin username"
                value={loginForm.username}
                onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input 
                type="password" 
                required
                placeholder="Enter password"
                value={loginForm.password}
                onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              />
            </div>

            <div className="login-demo-hint">
              <Lock size={13} /> Demo Credentials: <strong>admin</strong> / <strong>securestay123</strong>
            </div>

            <button type="submit" className="btn-primary w-full mt-2">
              Sign In to Admin Portal
            </button>
          </form>

          <div className="text-center mt-3">
            <button type="button" className="btn-link-sm" onClick={onBackToHome}>
              ← Return to Main Website
            </button>
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
          <div className="admin-brand flex-align">
            <ShieldCheck size={22} className="text-gold" />
            <h3>SecureStay Admin Portal</h3>
          </div>

          <div className="admin-top-actions">
            <button type="button" className="btn-secondary-sm" onClick={onBackToHome}>
              <ArrowLeft size={16} /> View Live Website
            </button>
            <button type="button" className="btn-logout" onClick={() => setIsAuthenticated(false)}>
              <LogOut size={16} /> Logout
            </button>
          </div>
        </div>
      </div>

      {/* Main Container */}
      <div className="container admin-main-body">
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
                <div className="form-group">
                  <label>Neighborhood / Area Address *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Koramangala 4th Block"
                    value={newProp.area}
                    onChange={(e) => setNewProp({ ...newProp, area: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Property Type / BHK *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. Fully Furnished • 2 BHK"
                    value={newProp.type}
                    onChange={(e) => setNewProp({ ...newProp, type: e.target.value })}
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Monthly Rent Amount (₹) *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 28000"
                    value={newProp.rentPrice}
                    onChange={(e) => setNewProp({ ...newProp, rentPrice: e.target.value })}
                  />
                </div>
                <div className="form-group">
                  <label>Long-Term Lease Deposit (₹) *</label>
                  <input 
                    type="text" 
                    required 
                    placeholder="e.g. 15L"
                    value={newProp.leasePrice}
                    onChange={(e) => setNewProp({ ...newProp, leasePrice: e.target.value })}
                  />
                </div>
              </div>

              {/* Photo Upload / Image URLs Section */}
              <div className="form-group">
                <label className="flex-between">
                  <span>Property Photos (Upload Files or Paste Image URLs)</span>
                  <button 
                    type="button" 
                    className="btn-link-sm" 
                    onClick={handleAddImageUrlField}
                  >
                    + Add URL Field
                  </button>
                </label>

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
                  <div key={idx} className="image-url-input-row">
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
            <div className="admin-section-header">
              <h3>All Published Properties ({properties.length})</h3>
              <p>Manage active listings displayed on the SecureStay catalog and homepage.</p>
            </div>

            <div className="admin-properties-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Photo</th>
                    <th>Property Title</th>
                    <th>Location</th>
                    <th>Monthly Rent</th>
                    <th>Type</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {properties.map((prop) => (
                    <tr key={prop.id}>
                      <td>
                        <img 
                          src={prop.images?.[0] || prop.image || '/assets/hero_stay.jpg'} 
                          alt={prop.title} 
                          className="table-prop-img"
                          style={{ width: '60px', height: '44px', objectFit: 'cover', borderRadius: '6px', display: 'block' }}
                        />
                      </td>
                      <td><strong>{prop.title}</strong></td>
                      <td>{prop.location}</td>
                      <td><span className="text-green font-semibold">{prop.rentPrice}</span></td>
                      <td><span className="table-badge">{prop.type}</span></td>
                      <td>
                        <button 
                          type="button" 
                          className="btn-danger-sm" 
                          onClick={() => onDeleteProperty(prop.id)}
                          title="Delete Property"
                        >
                          <Trash2 size={14} /> Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Customer Lead Inquiries */}
        {activeTab === 'inquiries' && (
          <div className="admin-card-section">
            <div className="admin-section-header">
              <h3>Submitted Lead Inquiries ({inquiries.length})</h3>
              <p>Inquiries sent through the website contact form.</p>
            </div>

            {inquiries.length > 0 ? (
              <div className="admin-inquiries-grid">
                {inquiries.map((inq, idx) => (
                  <div key={idx} className="inquiry-card">
                    <div className="inquiry-header flex-between">
                      <span className="inquiry-user-type">{inq.userType === 'owner' ? '🏠 Property Owner' : '🔑 Tenant Inquiry'}</span>
                      <span className="inquiry-date">{inq.date || 'Just Now'}</span>
                    </div>
                    <h4>{inq.name}</h4>
                    <p className="inquiry-contact">📞 {inq.phone} {inq.email ? `• ✉️ ${inq.email}` : ''}</p>
                    {inq.message && <p className="inquiry-msg">"{inq.message}"</p>}
                  </div>
                ))}
              </div>
            ) : (
              <div className="catalog-empty-state text-center">
                <MessageSquare size={40} className="text-muted mx-auto mb-2" />
                <p>No new customer lead inquiries received yet.</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
