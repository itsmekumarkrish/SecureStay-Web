import React, { useState, useEffect } from 'react';
import confetti from 'canvas-confetti';
import Header from './components/Header';
import Hero from './components/Hero';
import FeaturesSection from './components/FeaturesSection';
import ServicesSection from './components/ServicesSection';
import PropertiesSection from './components/PropertiesSection';
import ReviewsSection from './components/ReviewsSection';
import FaqSection from './components/FaqSection';
import ContactSection from './components/ContactSection';
import Footer from './components/Footer';
import LiveChat from './components/LiveChat';
import LegalModal from './components/LegalModal';
import PropertyDetailModal from './components/PropertyDetailModal';
import PropertiesCatalogPage from './components/PropertiesCatalogPage';
import AdminDashboard from './components/AdminDashboard';
import MobileRestrictionModal from './components/MobileRestrictionModal';
import { properties as initialProperties, reviews, faqs } from './data/mockData';
import './App.css';

function normalizeProperty(item) {
  if (!item) return item;
  const locStr = item.location || '';
  const typeStr = item.type || '';

  let city = item.city;
  if (!city) {
    if (locStr.toLowerCase().includes('bengaluru') || locStr.toLowerCase().includes('bangalore') || locStr.toLowerCase().includes('hsr') || locStr.toLowerCase().includes('koramangala')) city = 'Bangalore';
    else if (locStr.toLowerCase().includes('mysuru') || locStr.toLowerCase().includes('mysore') || locStr.toLowerCase().includes('gokulam') || locStr.toLowerCase().includes('vijayanagar')) city = 'Mysuru';
    else if (locStr.toLowerCase().includes('hyderabad') || locStr.toLowerCase().includes('gachibowli') || locStr.toLowerCase().includes('jubilee')) city = 'Hyderabad';
    else if (locStr.toLowerCase().includes('chennai') || locStr.toLowerCase().includes('t. nagar') || locStr.toLowerCase().includes('anna nagar')) city = 'Chennai';
    else city = 'Bangalore';
  }

  let bhk = item.bhk;
  if (!bhk) {
    if (typeStr.includes('1 RK')) bhk = '1 RK';
    else if (typeStr.includes('1 BHK')) bhk = '1 BHK';
    else if (typeStr.includes('2 BHK') || typeStr.includes('2.5 BHK')) bhk = '2 BHK';
    else if (typeStr.includes('3 BHK')) bhk = '3 BHK';
    else bhk = '2 BHK';
  }

  let feature = item.feature;
  if (!feature) {
    if (typeStr.includes('Gated')) feature = 'Gated Society';
    else if (typeStr.includes('Fully')) feature = 'Fully Furnished';
    else if (typeStr.includes('Private')) feature = 'Private Ensuite';
    else feature = 'Fully Furnished';
  }

  let propertyId = item.propertyId;
  if (!propertyId) {
    const cityCode = city === 'Mysuru' ? 'MYS' : city === 'Hyderabad' ? 'HYD' : city === 'Chennai' ? 'CHE' : 'BLR';
    const num = String(item.id || Math.floor(Math.random() * 90 + 10)).padStart(2, '0');
    propertyId = `SS-${cityCode}-${num}`;
  }

  return {
    ...item,
    city,
    bhk,
    feature,
    propertyId
  };
}

import { 
  isCloudConfigured,
  fetchCloudProperties,
  fetchCloudInquiries,
  syncAllCloudProperties,
  syncAllCloudInquiries,
  saveCloudProperty, 
  deleteCloudProperty, 
  saveCloudInquiry, 
  updateCloudInquiryStatus, 
  deleteCloudInquiry 
} from './services/supabaseService';

export default function App() {
  const [currentView, setCurrentView] = useState(() => {
    if (typeof window !== 'undefined') {
      const path = window.location.pathname;
      const hash = window.location.hash;
      if (path === '/propertyadmin' || hash === '#propertyadmin' || path === '/admin' || hash === '#admin') {
        return 'admin';
      }
      if (path === '/catalog' || hash === '#catalog') {
        return 'catalog';
      }
    }
    return 'home';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  const [activeDetailProperty, setActiveDetailProperty] = useState(null);

  // Mobile screen restriction state (strict blocking)
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isHandheldPhone = window.innerWidth <= 600;
      setIsMobileDevice(isMobileUA && isHandheldPhone);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Deleted property IDs stored in localStorage
  const [deletedIds, setDeletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('securestay_deleted_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Properties state initialized from localStorage or initialProperties minus deleted IDs
  const [propertiesList, setPropertiesList] = useState(() => {
    try {
      const savedDeleted = localStorage.getItem('securestay_deleted_ids');
      const deletedArr = savedDeleted ? JSON.parse(savedDeleted) : [];
      const deletedSet = new Set(deletedArr);

      const savedProps = localStorage.getItem('securestay_properties');
      const baseProps = savedProps ? JSON.parse(savedProps) : initialProperties;

      return baseProps.filter((p) => !deletedSet.has(p.id)).map(normalizeProperty);
    } catch {
      return initialProperties.map(normalizeProperty);
    }
  });

  // Inquiries leads state initialized from localStorage
  const [inquiriesList, setInquiriesList] = useState(() => {
    try {
      const saved = localStorage.getItem('securestay_inquiries');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    userType: 'owner',
    location: '',
    message: ''
  });

  // Fetch latest properties and inquiries from Cloud Database on mount and window focus
  useEffect(() => {
    async function syncCloudOnMount() {
      try {
        const cloudProps = await fetchCloudProperties();
        if (cloudProps && Array.isArray(cloudProps) && cloudProps.length > 0) {
          const savedDeleted = localStorage.getItem('securestay_deleted_ids');
          const deletedArr = savedDeleted ? JSON.parse(savedDeleted) : [];
          const deletedSet = new Set(deletedArr);
          const filtered = cloudProps.filter((p) => !deletedSet.has(p.id)).map(normalizeProperty);
          setPropertiesList(filtered);
        }

        const cloudInqs = await fetchCloudInquiries();
        if (cloudInqs && Array.isArray(cloudInqs) && cloudInqs.length > 0) {
          setInquiriesList(cloudInqs);
        }
      } catch (err) {
        console.warn('Initial cloud sync error:', err);
      }
    }

    syncCloudOnMount();

    const handleFocus = () => {
      syncCloudOnMount();
    };
    window.addEventListener('focus', handleFocus);
    return () => window.removeEventListener('focus', handleFocus);
  }, []);

  // Real-time synchronization via BroadcastChannel and Storage Event
  useEffect(() => {
    let bc;
    if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
      bc = new BroadcastChannel('securestay_live_channel');
      bc.onmessage = (event) => {
        if (event.data?.type === 'PROPERTIES_SYNC' && Array.isArray(event.data.payload)) {
          setPropertiesList(event.data.payload.map(normalizeProperty));
        }
        if (event.data?.type === 'INQUIRIES_SYNC' && Array.isArray(event.data.payload)) {
          setInquiriesList(event.data.payload);
        }
      };
    }

    const handleStorage = (e) => {
      if (e.key === 'securestay_properties' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setPropertiesList(parsed.map(normalizeProperty));
        } catch {
          // fallback
        }
      }
      if (e.key === 'securestay_inquiries' && e.newValue) {
        try {
          const parsed = JSON.parse(e.newValue);
          setInquiriesList(parsed);
        } catch {
          // fallback
        }
      }
    };

    window.addEventListener('storage', handleStorage);
    return () => {
      window.removeEventListener('storage', handleStorage);
      if (bc) bc.close();
    };
  }, []);

  // Save properties to localStorage and sync to cloud database whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('securestay_properties', JSON.stringify(propertiesList));
      syncAllCloudProperties(propertiesList);
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('securestay_live_channel');
        bc.postMessage({ type: 'PROPERTIES_SYNC', payload: propertiesList });
        bc.close();
      }
    } catch {
      // fallback
    }
  }, [propertiesList]);

  // Save deleted IDs to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('securestay_deleted_ids', JSON.stringify(deletedIds));
    } catch {
      // fallback
    }
  }, [deletedIds]);

  // Save inquiries to localStorage and sync to cloud database whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('securestay_inquiries', JSON.stringify(inquiriesList));
      syncAllCloudInquiries(inquiriesList);
      if (typeof window !== 'undefined' && 'BroadcastChannel' in window) {
        const bc = new BroadcastChannel('securestay_live_channel');
        bc.postMessage({ type: 'INQUIRIES_SYNC', payload: inquiriesList });
        bc.close();
      }
    } catch {
      // fallback
    }
  }, [inquiriesList]);

  const handleAddProperty = (newProp) => {
    setPropertiesList((prev) => [newProp, ...prev]);
    saveCloudProperty(newProp);
  };

  const handleEditProperty = (updatedProp) => {
    setPropertiesList((prev) =>
      prev.map((p) => (p.id === updatedProp.id ? updatedProp : p))
    );
    saveCloudProperty(updatedProp);
  };

  const handleTogglePropertyAvailability = (id) => {
    setPropertiesList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const currentStatus = p.availability || 'Available';
          const nextStatus = currentStatus === 'Available' ? 'Occupied' : 'Available';
          const updated = { ...p, availability: nextStatus };
          saveCloudProperty(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const handleTogglePropertyFeatured = (id) => {
    setPropertiesList((prev) =>
      prev.map((p) => {
        if (p.id === id) {
          const updated = { ...p, isFeatured: !p.isFeatured };
          saveCloudProperty(updated);
          return updated;
        }
        return p;
      })
    );
  };

  const handleDeleteProperty = (id) => {
    if (window.confirm('Are you sure you want to remove this property listing from SecureStay?')) {
      setDeletedIds((prev) => [...prev, id]);
      setPropertiesList((prev) => prev.filter((p) => p.id !== id));
      deleteCloudProperty(id);
    }
  };

  const handleInquire = (propOrTitle) => {
    setCurrentView('home');
    let messageText = '';
    let targetLocation = '';

    if (typeof propOrTitle === 'object' && propOrTitle !== null) {
      const p = propOrTitle;
      const cityCode = p.city === 'Mysuru' ? 'MYS' : p.city === 'Hyderabad' ? 'HYD' : p.city === 'Chennai' ? 'CHE' : 'BLR';
      const fallbackId = `SS-${cityCode}-${String(p.id || 1).padStart(2, '0')}`;
      const propId = p.propertyId || fallbackId;
      const idFormatted = propId.startsWith('ID:') ? propId : `ID: ${propId}`;
      const titleStr = p.title || 'Property';
      const locStr = p.location ? ` located in ${p.location}` : '';
      targetLocation = p.location || '';
      messageText = `Hi SecureStay team, I am interested in inquiring about the ${titleStr} (${idFormatted})${locStr}. Please share more details.`;
    } else if (typeof propOrTitle === 'string' && propOrTitle.trim() !== '') {
      messageText = `Hi SecureStay team, I am interested in inquiring about "${propOrTitle}". Please share more details.`;
    }

    setFormData((prev) => ({
      ...prev,
      userType: 'tenant',
      location: targetLocation || prev.location,
      message: messageText || prev.message
    }));

    setTimeout(() => {
      const elem = document.getElementById('contact-form') || document.getElementById('contact-card') || document.getElementById('contact');
      if (elem) {
        const headerOffset = 100;
        const elementPosition = elem.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
        window.scrollTo({
          top: offsetPosition,
          behavior: 'smooth'
        });
      }
    }, 120);
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Save lead to inquiriesList with unique ID and status
    const newInquiry = {
      id: Date.now(),
      ...formData,
      status: 'pending',
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setInquiriesList((prev) => [newInquiry, ...prev]);
    saveCloudInquiry(newInquiry);

    try {
      confetti({
        particleCount: 90,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch {
      // fallback
    }
  };

  const handleUpdateInquiryStatus = (id, status) => {
    setInquiriesList((prev) =>
      prev.map((inq) => (inq.id === id ? { ...inq, status } : inq))
    );
    updateCloudInquiryStatus(id, status);
  };

  const handleDeleteInquiry = (id) => {
    if (window.confirm('Are you sure you want to remove this inquiry record?')) {
      setInquiriesList((prev) => prev.filter((inq) => inq.id !== id));
      deleteCloudInquiry(id);
    }
  };

  const navigateToView = (viewName) => {
    setCurrentView(viewName);
    if (viewName === 'admin') {
      window.location.hash = 'propertyadmin';
    } else if (viewName === 'catalog') {
      window.location.hash = 'catalog';
    } else {
      if (window.location.hash === '#propertyadmin' || window.location.hash === '#admin' || window.location.hash === '#catalog') {
        window.history.replaceState(null, '', window.location.pathname);
      }
    }
  };

  // Listen for URL hash or path changes and secret hotkey (Ctrl+Shift+A / Cmd+Shift+A)
  useEffect(() => {
    const handleUrlSync = () => {
      const hash = window.location.hash;
      const path = window.location.pathname;
      if (hash === '#propertyadmin' || path === '/propertyadmin' || hash === '#admin' || path === '/admin') {
        setCurrentView('admin');
      } else if (hash === '#catalog' || path === '/catalog') {
        setCurrentView('catalog');
      }
    };

    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setCurrentView((prev) => {
          const next = prev === 'admin' ? 'home' : 'admin';
          if (next === 'admin') window.location.hash = 'propertyadmin';
          else window.history.replaceState(null, '', window.location.pathname);
          return next;
        });
      }
    };

    handleUrlSync();
    window.addEventListener('hashchange', handleUrlSync);
    window.addEventListener('popstate', handleUrlSync);
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('hashchange', handleUrlSync);
      window.removeEventListener('popstate', handleUrlSync);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  return (
    <div className="page">
      {/* 1. All Properties Catalog View */}
      {currentView === 'catalog' && (
        <PropertiesCatalogPage 
          properties={propertiesList}
          onBackToHome={() => navigateToView('home')}
          onInquire={handleInquire}
          onOpenDetail={(prop) => setActiveDetailProperty(prop)}
        />
      )}

      {/* 2. Admin Portal View */}
      {currentView === 'admin' && (
        <AdminDashboard 
          properties={propertiesList}
          onAddProperty={handleAddProperty}
          onEditProperty={handleEditProperty}
          onDeleteProperty={handleDeleteProperty}
          onToggleAvailability={handleTogglePropertyAvailability}
          onToggleFeatured={handleTogglePropertyFeatured}
          onBackToHome={() => navigateToView('home')}
          inquiries={inquiriesList}
          onUpdateInquiryStatus={handleUpdateInquiryStatus}
          onDeleteInquiry={handleDeleteInquiry}
        />
      )}

      {/* 3. Main Landing Homepage View */}
      {currentView === 'home' && (
        <>
          <Header 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
            onNavigate={(view) => navigateToView(view)}
          />
          <Hero />
          <FeaturesSection />
          <ServicesSection />
          <PropertiesSection 
            properties={propertiesList} 
            handleInquire={handleInquire}
            onSeeMore={() => setCurrentView('catalog')}
            onOpenDetail={(prop) => setActiveDetailProperty(prop)}
          />
          <ReviewsSection reviews={reviews} />
          <FaqSection faqs={faqs} />
          <ContactSection 
            formData={formData} 
            setFormData={setFormData} 
            formSubmitted={formSubmitted} 
            handleSubmit={handleSubmitContactForm} 
          />
          <Footer 
            setLegalModal={setLegalModal} 
            onNavigate={(view) => setCurrentView(view)}
          />
          <LiveChat />
        </>
      )}

      {/* Shared Modals */}
      <LegalModal legalModal={legalModal} setLegalModal={setLegalModal} />

      <PropertyDetailModal 
        property={activeDetailProperty}
        onClose={() => setActiveDetailProperty(null)}
        onInquire={handleInquire}
      />
    </div>
  );
}
