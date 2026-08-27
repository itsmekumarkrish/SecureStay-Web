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

export default function App() {
  const [currentView, setCurrentView] = useState('home'); // 'home' | 'catalog' | 'admin'
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [legalModal, setLegalModal] = useState(null);
  const [activeDetailProperty, setActiveDetailProperty] = useState(null);

  // Mobile screen restriction state (strict blocking)
  const [isMobileDevice, setIsMobileDevice] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileUA = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
      const isNarrowScreen = window.innerWidth <= 991;
      setIsMobileDevice(isMobileUA || isNarrowScreen);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Properties state initialized from localStorage or initialProperties
  const [propertiesList, setPropertiesList] = useState(() => {
    try {
      const saved = localStorage.getItem('securestay_properties');
      return saved ? JSON.parse(saved) : initialProperties;
    } catch {
      return initialProperties;
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
    message: ''
  });

  // Save properties to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('securestay_properties', JSON.stringify(propertiesList));
    } catch {
      // fallback
    }
  }, [propertiesList]);

  // Save inquiries to localStorage whenever updated
  useEffect(() => {
    try {
      localStorage.setItem('securestay_inquiries', JSON.stringify(inquiriesList));
    } catch {
      // fallback
    }
  }, [inquiriesList]);

  const handleAddProperty = (newProp) => {
    setPropertiesList((prev) => [newProp, ...prev]);
  };

  const handleDeleteProperty = (id) => {
    setPropertiesList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleInquire = (propTitle) => {
    setCurrentView('home');
    setFormData((prev) => ({
      ...prev,
      userType: 'tenant',
      message: propTitle ? `Hi, I am interested in inquiring about "${propTitle}".` : prev.message
    }));
    setTimeout(() => {
      const contactElement = document.getElementById('contact');
      if (contactElement) {
        contactElement.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSubmitContactForm = (e) => {
    e.preventDefault();
    setFormSubmitted(true);

    // Save lead to inquiriesList
    const newInquiry = {
      ...formData,
      date: new Date().toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })
    };
    setInquiriesList((prev) => [newInquiry, ...prev]);

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

  // Listen for #admin URL hash for direct admin portal access
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#admin') {
        setCurrentView('admin');
      }
    };
    handleHashChange();
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Scroll to top on view change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentView]);

  if (isMobileDevice) {
    return <MobileRestrictionModal />;
  }

  return (
    <div className="page">
      {/* 1. All Properties Catalog View */}
      {currentView === 'catalog' && (
        <PropertiesCatalogPage 
          properties={propertiesList}
          onBackToHome={() => setCurrentView('home')}
          onInquire={handleInquire}
          onOpenDetail={(prop) => setActiveDetailProperty(prop)}
          onOpenAdmin={() => setCurrentView('admin')}
        />
      )}

      {/* 2. Admin Portal View */}
      {currentView === 'admin' && (
        <AdminDashboard 
          properties={propertiesList}
          onAddProperty={handleAddProperty}
          onDeleteProperty={handleDeleteProperty}
          onBackToHome={() => setCurrentView('home')}
          inquiries={inquiriesList}
        />
      )}

      {/* 3. Main Landing Homepage View */}
      {currentView === 'home' && (
        <>
          <Header 
            mobileMenuOpen={mobileMenuOpen} 
            setMobileMenuOpen={setMobileMenuOpen} 
            onNavigate={(view) => setCurrentView(view)}
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
