import React, { useState } from 'react';
import { 
  ArrowLeft, ShieldCheck, Lock, Plus, Trash2, CheckCircle, Image as ImageIcon, 
  Building2, MessageSquare, LogOut, Upload, Pencil, X, Search, Phone, Send, MapPin, 
  Users, Clock, CheckSquare, Eye, EyeOff, User, Sparkles, KeyRound, List, LayoutGrid,
  Copy, Mail, ExternalLink, Check, Maximize2, Minimize2
} from 'lucide-react';
import { sendInquiryEmail } from '../services/emailService';

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

  const [activeTab, setActiveTab] = useState('add-property'); // 'add-property' | 'properties-list' | 'inquiries' | 'email-dispatcher'
  const [successMessage, setSuccessMessage] = useState('');

  // Email Dispatcher State
  const [emailForm, setEmailForm] = useState({
    customerName: 'Bharath S.',
    customerEmail: 'bharath.s@securestay.in',
    ccEmails: '',
    bccEmails: '',
    emailSubject: 'Welcome to Secure Stay — Your Complete Stay Information Package',
    rmName: 'Rajesh Sharma',
    rmUrl: 'https://wa.me/919999999999',
    agreementUrl: 'https://www.securestay.in/docs/sample_agreement.pdf',
    mediaFolderUrl: 'https://drive.google.com/drive/folders/sample_property_photos'
  });
  const [emailCopied, setEmailCopied] = useState(false);
  const [emailSendingStatus, setEmailSendingStatus] = useState('');
  const [isFormBoxExpanded, setIsFormBoxExpanded] = useState(false);

  const handleSelectLeadForEmail = (inq) => {
    const leadName = inq.name || 'Valued Customer';
    setEmailForm({
      ...emailForm,
      customerName: leadName,
      customerEmail: inq.email || '',
      emailSubject: `Welcome to Secure Stay, ${leadName}! — Your Stay Information Package`
    });
    setActiveTab('email-dispatcher');
  };

  const getGeneratedEmailHtml = () => {
    const name = emailForm.customerName || 'Valued Customer';
    const rmName = emailForm.rmName || 'Rajesh Sharma';
    const rmUrl = emailForm.rmUrl || 'https://wa.me/919999999999';
    const agreementUrl = emailForm.agreementUrl || 'https://www.securestay.in/docs/sample_agreement.pdf';
    const mediaFolderUrl = emailForm.mediaFolderUrl || 'https://drive.google.com/drive/folders/sample_property_photos';
    const domainOrigin = typeof window !== 'undefined' ? window.location.origin : 'https://www.securestay.in';

    return `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Secure Stay - Welcome</title>
</head>
<body style="margin:0;padding:0;background-color:#DDD8CE;">
<table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#DDD8CE;">
<tr><td align="center" style="padding:28px 16px;">
  <table border="0" cellpadding="0" cellspacing="0" width="700" style="max-width:700px;width:100%;">
    <tr>
      <td style="padding:0;line-height:0;border-radius:8px 8px 0 0;overflow:hidden;">
        <img src="${domainOrigin}/assets/header_banner.png" alt="Secure Stay Private Limited" width="700" style="width:100%;max-width:700px;display:block;border-radius:8px 8px 0 0;" />
      </td>
    </tr>
    <tr>
      <td style="background-color:#4E4929;padding:36px 42px 28px 42px;">
        <h1 style="color:#F5EDD8;font-size:34px;font-weight:800;margin:0 0 18px 0;font-family:Georgia,serif;letter-spacing:-0.5px;">Dear ${name}!</h1>
        <p style="color:#D5CAAF;font-size:13.5px;line-height:1.7;margin:0 0 13px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">At Secure Stay, we believe finding and managing your stay should be simple, transparent, and hassle free. We're here to make every step of your journey smoother — from exploring your property to completing the agreement and getting settled in comfortably.</p>
        <p style="color:#D5CAAF;font-size:13.5px;line-height:1.7;margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">We've put together everything you need below, so you can explore the details at your convenience.</p>
      </td>
    </tr>
    <tr>
      <td style="background-color:#4E4929;padding:0 42px 36px 42px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom:20px;">
          <tr>
            <td style="border-top:1px solid rgba(255,255,255,0.15);padding-top:20px;">
              <div style="color:#C9BD9C;font-size:10px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;margin-bottom:4px;">EXPLORE SECURE STAY</div>
              <div style="color:#F0E8D4;font-size:20px;font-weight:700;font-family:Georgia,serif;">Your Secure Stay Journey</div>
            </td>
          </tr>
        </table>

        <!-- CARD 1 -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#3D3820;border-radius:10px;margin-bottom:10px;">
          <tr>
            <td style="padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="64" valign="top" style="padding:20px 0 20px 20px;">
                    <div style="width:40px;height:40px;border-radius:50%;background-color:#C9A84C;text-align:center;line-height:40px;color:#2C2810;font-size:15px;font-weight:800;font-family:Georgia,serif;">01</div>
                  </td>
                  <td valign="top" style="padding:20px 20px 18px 12px;">
                    <div style="color:#F0E8D4;font-size:13px;font-weight:700;margin-bottom:5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Why Secure Stay</div>
                    <div style="color:#A89E82;font-size:11px;line-height:1.55;margin-bottom:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Learn why tenants and property owners choose Secure Stay for complete transparency, zero brokerage, and dedicated support.</div>
                    <a href="${domainOrigin}/#about" target="_blank" style="display:inline-block;background-color:#C9A84C;color:#2C2810;font-size:10.5px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:6px 14px;border-radius:20px;">Why Secure Stay &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CARD 2 -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#3D3820;border-radius:10px;margin-bottom:10px;">
          <tr>
            <td style="padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="64" valign="top" style="padding:20px 0 20px 20px;">
                    <div style="width:40px;height:40px;border-radius:50%;background-color:#C9A84C;text-align:center;line-height:40px;color:#2C2810;font-size:15px;font-weight:800;font-family:Georgia,serif;">02</div>
                  </td>
                  <td valign="top" style="padding:20px 20px 18px 12px;">
                    <div style="color:#F0E8D4;font-size:13px;font-weight:700;margin-bottom:5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Our Services &amp; Benefits</div>
                    <div style="color:#A89E82;font-size:11px;line-height:1.55;margin-bottom:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Explore our services, tenant benefits, support, and the advantages of choosing a professionally managed stay.</div>
                    <a href="${domainOrigin}/#services" target="_blank" style="display:inline-block;background-color:#C9A84C;color:#2C2810;font-size:10.5px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:6px 14px;border-radius:20px;">Explore Services &amp; Benefits &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CARD 3 -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#3D3820;border-radius:10px;margin-bottom:10px;">
          <tr>
            <td style="padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="64" valign="top" style="padding:20px 0 20px 20px;">
                    <div style="width:40px;height:40px;border-radius:50%;background-color:#C9A84C;text-align:center;line-height:40px;color:#2C2810;font-size:15px;font-weight:800;font-family:Georgia,serif;">03</div>
                  </td>
                  <td valign="top" style="padding:20px 20px 18px 12px;">
                    <div style="color:#F0E8D4;font-size:13px;font-weight:700;margin-bottom:5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Dedicated Relationship Manager (${rmName})</div>
                    <div style="color:#A89E82;font-size:11px;line-height:1.55;margin-bottom:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Know who is supporting you throughout your journey and how to reach your <strong style="color:#C9A84C;">RM (${rmName})</strong> whenever you need assistance.</div>
                    <a href="${rmUrl}" target="_blank" style="display:inline-block;background-color:#C9A84C;color:#2C2810;font-size:10.5px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:6px 14px;border-radius:20px;">Contact ${rmName} &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CARD 4 -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#3D3820;border-radius:10px;margin-bottom:10px;">
          <tr>
            <td style="padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="64" valign="top" style="padding:20px 0 20px 20px;">
                    <div style="width:40px;height:40px;border-radius:50%;background-color:#C9A84C;text-align:center;line-height:40px;color:#2C2810;font-size:15px;font-weight:800;font-family:Georgia,serif;">04</div>
                  </td>
                  <td valign="top" style="padding:20px 20px 18px 12px;">
                    <div style="color:#F0E8D4;font-size:13px;font-weight:700;margin-bottom:5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Sample Agreement</div>
                    <div style="color:#A89E82;font-size:11px;line-height:1.55;margin-bottom:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Review the sample agreement and understand the key terms and conditions before you proceed.</div>
                    <a href="${agreementUrl}" target="_blank" style="display:inline-block;background-color:#C9A84C;color:#2C2810;font-size:10.5px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:6px 14px;border-radius:20px;">View Sample Agreement &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

        <!-- CARD 5: Property Photos & Videos -->
        <table border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color:#3D3820;border-radius:10px;">
          <tr>
            <td style="padding:0;">
              <table border="0" cellpadding="0" cellspacing="0" width="100%">
                <tr>
                  <td width="64" valign="top" style="padding:20px 0 20px 20px;">
                    <div style="width:40px;height:40px;border-radius:50%;background-color:#C9A84C;text-align:center;line-height:40px;color:#2C2810;font-size:15px;font-weight:800;font-family:Georgia,serif;">05</div>
                  </td>
                  <td valign="top" style="padding:20px 20px 18px 12px;">
                    <div style="color:#F0E8D4;font-size:13px;font-weight:700;margin-bottom:5px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Property Photos &amp; Video Tour</div>
                    <div style="color:#A89E82;font-size:11px;line-height:1.55;margin-bottom:12px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Browse high-resolution interior photos, walkthrough videos, and room layouts.</div>
                    <a href="${mediaFolderUrl}" target="_blank" style="display:inline-block;background-color:#C9A84C;color:#2C2810;font-size:10.5px;font-weight:700;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:6px 14px;border-radius:20px;">View Photos &amp; Videos &rarr;</a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>

      </td>
    </tr>

    <!-- 4. FEATURE STRIP -->
    <tr>
      <td style="background-color:#F0EBE0;padding:20px 36px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%"><tr>

          <td width="25%" valign="middle" style="padding:4px 8px 4px 0;">
            <table border="0" cellpadding="0" cellspacing="0"><tr>
              <td valign="middle" style="padding-right:10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="40" height="40" style="width:40px;height:40px;min-width:40px;border:1.5px solid #4E4929;border-radius:50%;border-collapse:separate;border-spacing:0;background:transparent;">
                  <tr><td align="center" valign="middle" width="40" height="40" style="width:40px;height:40px;text-align:center;vertical-align:middle;line-height:0;font-size:0;padding:0;">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#4E4929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin:0 auto;">
                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                    </svg>
                  </td></tr>
                </table>
              </td>
              <td valign="middle" style="color:#3A3620;font-size:9.5px;font-weight:700;line-height:1.35;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;letter-spacing:0.4px;">SAFE &amp; SECURE<br/>PROPERTIES</td>
            </tr></table>
          </td>

          <td width="25%" valign="middle" style="padding:4px 8px;">
            <table border="0" cellpadding="0" cellspacing="0"><tr>
              <td valign="middle" style="padding-right:10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="40" height="40" style="width:40px;height:40px;min-width:40px;border:1.5px solid #4E4929;border-radius:50%;border-collapse:separate;border-spacing:0;background:transparent;">
                  <tr><td align="center" valign="middle" width="40" height="40" style="width:40px;height:40px;text-align:center;vertical-align:middle;line-height:0;font-size:0;padding:0;">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#4E4929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin:0 auto;">
                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3l1.7 1.7"/>
                    </svg>
                  </td></tr>
                </table>
              </td>
              <td valign="middle" style="color:#3A3620;font-size:9.5px;font-weight:700;line-height:1.35;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;letter-spacing:0.4px;">TRANSPARENT<br/>PROCESS</td>
            </tr></table>
          </td>

          <td width="28%" valign="middle" style="padding:4px 8px;">
            <table border="0" cellpadding="0" cellspacing="0"><tr>
              <td valign="middle" style="padding-right:10px;">
                <table border="0" cellpadding="0" cellspacing="0" width="40" height="40" style="width:40px;height:40px;min-width:40px;border:1.5px solid #4E4929;border-radius:50%;border-collapse:separate;border-spacing:0;background:transparent;">
                  <tr><td align="center" valign="middle" width="40" height="40" style="width:40px;height:40px;text-align:center;vertical-align:middle;line-height:0;font-size:0;padding:0;">
                    <svg width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="#4E4929" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="display:inline-block;vertical-align:middle;margin:0 auto;">
                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                    </svg>
                  </td></tr>
                </table>
              </td>
              <td valign="middle" style="color:#3A3620;font-size:9.5px;font-weight:700;line-height:1.35;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;letter-spacing:0.4px;">A BETTER LIVING<br/>EXPERIENCE</td>
            </tr></table>
          </td>

          <td width="22%" valign="middle" align="right" style="padding:4px 0 4px 8px;">
            <a href="${domainOrigin}/#services" target="_blank" style="background-color:#4E4929;color:#F5EDD8;font-size:11.5px;font-weight:700;text-decoration:none;padding:10px 20px;border-radius:22px;display:inline-block;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;white-space:nowrap;letter-spacing:0.3px;">Get Started</a>
          </td>

        </tr></table>
      </td>
    </tr>
    <tr>
      <td style="background-color:#2E2A13;padding:16px 32px;border-radius:0 0 8px 8px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color:#F0E8D4;font-size:11px;font-weight:600;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Discover Our Latest Updates</td>
            <td align="right" style="color:#A89E82;font-size:10px;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">
              <a href="${domainOrigin}" target="_blank" style="color:#A89E82;text-decoration:none;margin-right:12px;">www.securestay.in</a>
              <a href="mailto:info@securestay.in" style="color:#A89E82;text-decoration:none;">info@securestay.in</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>`;
  };

  const handleCopyHtmlEmail = () => {
    const htmlContent = getGeneratedEmailHtml();
    navigator.clipboard.writeText(htmlContent);
    setEmailCopied(true);
    setTimeout(() => setEmailCopied(false), 2500);
  };

  const handleOpenGmail = () => {
    const recipient = encodeURIComponent(emailForm.customerEmail || '');
    const cc = encodeURIComponent(emailForm.ccEmails || '');
    const bcc = encodeURIComponent(emailForm.bccEmails || '');
    const subject = encodeURIComponent(emailForm.emailSubject || `Welcome to Secure Stay, ${emailForm.customerName || 'Valued Customer'}!`);
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${recipient}&cc=${cc}&bcc=${bcc}&su=${subject}`;
    window.open(gmailUrl, '_blank');
  };

  const handleSendEmailNow = async (e) => {
    e.preventDefault();
    if (!emailForm.customerEmail) {
      alert('Please enter a recipient customer email address.');
      return;
    }
    setEmailSendingStatus('sending');
    try {
      const htmlContent = getGeneratedEmailHtml();
      await sendInquiryEmail({
        name: emailForm.customerName,
        email: emailForm.customerEmail,
        cc: emailForm.ccEmails,
        bcc: emailForm.bccEmails,
        subject: emailForm.emailSubject,
        rmName: emailForm.rmName,
        phone: 'N/A (Admin Email Dispatch)',
        message: `Welcome & Information Package sent via SecureStay Admin Dashboard.`,
        customHtml: htmlContent
      });
      setEmailSendingStatus('success');
      setTimeout(() => setEmailSendingStatus(''), 4000);
    } catch (err) {
      console.error('Failed to send email:', err);
      setEmailSendingStatus('error');
      setTimeout(() => setEmailSendingStatus(''), 4000);
    }
  };

  // Table Search, Status Filters, and View Mode
  const [tableSearch, setTableSearch] = useState('');
  const [tableStatusFilter, setTableStatusFilter] = useState('all'); // 'all' | 'available' | 'occupied' | 'featured'
  const [adminViewMode, setAdminViewMode] = useState('table'); // 'table' | 'grid'
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

  const compressImageFile = (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          const canvas = document.createElement('canvas');
          let width = img.width;
          let height = img.height;
          const MAX_SIZE = 900;

          if (width > height) {
            if (width > MAX_SIZE) {
              height *= MAX_SIZE / width;
              width = MAX_SIZE;
            }
          } else {
            if (height > MAX_SIZE) {
              width *= MAX_SIZE / height;
              height = MAX_SIZE;
            }
          }

          canvas.width = width;
          canvas.height = height;
          const ctx = canvas.getContext('2d');
          ctx.drawImage(img, 0, 0, width, height);
          const dataUrl = canvas.toDataURL('image/jpeg', 0.72);
          resolve(dataUrl);
        };
        img.onerror = () => resolve(event.target.result);
        img.src = event.target.result;
      };
      reader.onerror = () => resolve('');
      reader.readAsDataURL(file);
    });
  };

  const handleFileUpload = (e, isEditMode = false) => {
    const files = Array.from(e.target.files);
    if (!files.length) return;

    const filePromises = files.map((file) => compressImageFile(file));

    Promise.all(filePromises).then((base64Images) => {
      const validNew = base64Images.filter((img) => img && img.trim() !== '');
      if (!validNew.length) return;

      if (isEditMode && editingProp) {
        setEditingProp((prev) => {
          const existing = prev.images || [];
          return {
            ...prev,
            images: [...existing.filter(i => i.trim() !== ''), ...validNew]
          };
        });
      } else {
        setNewProp((prev) => {
          const existingValid = prev.images.filter((img) => img.trim() !== '');
          return {
            ...prev,
            images: [...existingValid, ...validNew]
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
    const bhk = (typeStr.includes('1 BHK') || typeStr.includes('1 RK')) ? '1 BHK' 
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
    const bhk = (typeStr.includes('1 BHK') || typeStr.includes('1 RK')) ? '1 BHK' 
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

  // Filtered Properties for table search and status filter
  const filteredTableProperties = properties.filter(p => {
    const q = tableSearch.toLowerCase();
    const matchesSearch = p.title.toLowerCase().includes(q) || 
                          (p.location || '').toLowerCase().includes(q) || 
                          (p.city || '').toLowerCase().includes(q) ||
                          (p.propertyId || '').toLowerCase().includes(q);

    if (!matchesSearch) return false;

    if (tableStatusFilter === 'available') return p.availability !== 'Occupied';
    if (tableStatusFilter === 'occupied') return p.availability === 'Occupied';
    if (tableStatusFilter === 'featured') return !!p.isFeatured;
    return true;
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
                src="/assets/admin_dashboard_logo.png?v=1" 
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
            <img src="/assets/admin_dashboard_logo.png?v=1" alt="SecureStay Admin" className="admin-header-logo" />
            <div className="admin-brand-text">
              <h3 className="admin-brand-heading">SecureStay</h3>
              <span className="cloud-sync-badge">● Live</span>
            </div>
          </div>

          <div className="admin-top-actions">
            <a 
              href="/" 
              onClick={(e) => {
                if (onBackToHome) {
                  e.preventDefault();
                  onBackToHome();
                }
              }}
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
              <Building2 size={20} />
            </div>
            <div className="admin-metric-info">
              <div className="admin-metric-val">{properties.length}</div>
              <div className="admin-metric-lbl">
                <span className="desktop-metric-lbl">Active Properties</span>
                <span className="mobile-metric-lbl">Properties</span>
              </div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon green">
              <MapPin size={20} />
            </div>
            <div className="admin-metric-info">
              <div className="admin-metric-val">{citiesCount}</div>
              <div className="admin-metric-lbl">
                <span className="desktop-metric-lbl">Cities Covered</span>
                <span className="mobile-metric-lbl">Cities</span>
              </div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon gold">
              <MessageSquare size={20} />
            </div>
            <div className="admin-metric-info">
              <div className="admin-metric-val">{inquiries.length}</div>
              <div className="admin-metric-lbl">
                <span className="desktop-metric-lbl">Total Leads</span>
                <span className="mobile-metric-lbl">Leads</span>
              </div>
            </div>
          </div>

          <div className="admin-metric-card">
            <div className="admin-metric-icon">
              <Clock size={20} className="text-amber" />
            </div>
            <div className="admin-metric-info">
              <div className="admin-metric-val">{pendingInquiriesCount}</div>
              <div className="admin-metric-lbl">
                <span className="desktop-metric-lbl">Pending Follow-ups</span>
                <span className="mobile-metric-lbl">Pending</span>
              </div>
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
          <button 
            type="button" 
            className={`admin-tab-btn ${activeTab === 'email-dispatcher' ? 'active' : ''}`}
            onClick={() => setActiveTab('email-dispatcher')}
          >
            <Mail size={16} className="flex-shrink-0" />
            <span className="tab-btn-title">
              <span className="desktop-tab-label">Email Dispatcher</span>
              <span className="mobile-tab-label">Email</span>
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
            {/* Clean Top Search Bar as in mockup */}
            <div className="admin-search-top-bar">
              <div className="admin-search-box-wrap">
                <Search size={18} className="admin-search-icon" />
                <input 
                  type="text" 
                  className="admin-search-input-field"
                  placeholder="Search property title, city or area..." 
                  value={tableSearch}
                  onChange={(e) => setTableSearch(e.target.value)}
                />
                {tableSearch && (
                  <button 
                    type="button" 
                    className="admin-search-clear-btn"
                    onClick={() => setTableSearch('')}
                  >
                    ×
                  </button>
                )}
              </div>
            </div>

            {/* Desktop Table View matching reference layout */}
            <div className="admin-properties-table-wrap">
              <table className="admin-table">
                <thead>
                  <tr>
                    <th style={{ width: '80px' }}>PHOTO</th>
                    <th style={{ minWidth: '170px' }}>PROPERTY TITLE</th>
                    <th style={{ minWidth: '130px' }}>LOCATION</th>
                    <th style={{ minWidth: '120px' }}>MONTHLY RENT</th>
                    <th style={{ minWidth: '110px' }}>STATUS</th>
                    <th style={{ minWidth: '110px' }}>FEATURED</th>
                    <th style={{ minWidth: '160px', textAlign: 'right', paddingRight: '24px' }}>ACTION</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTableProperties.map((prop) => {
                    const isOccupied = prop.availability === 'Occupied';
                    const isFeatured = !!prop.isFeatured;
                    const propIdCode = prop.propertyId || `SS-${(prop.city || 'BLR').substring(0,3).toUpperCase()}-${String(prop.id).padStart(2,'0')}`;
                    const photoCount = prop.images?.length || 1;

                    // Format type / furnishings display
                    const typeDisplay = prop.type || 'Fully Furnished';

                    // Format rent price cleanly without repeating / month
                    const rawRent = prop.rentPrice || prop.salePrice || 'N/A';
                    const rentDisplay = rawRent.toLowerCase().includes('/month') || rawRent.toLowerCase().includes('/ month')
                      ? rawRent
                      : (prop.rentPrice ? `${prop.rentPrice} / month` : rawRent);

                    return (
                      <tr key={prop.id} className="admin-table-row">
                        <td>
                          <div className="table-img-wrap">
                            <img 
                              src={prop.images?.[0] || prop.image || '/assets/hero_stay.jpg'} 
                              alt={prop.title} 
                              className="table-prop-img"
                            />
                            {photoCount > 1 && (
                              <span className="table-img-badge">{photoCount}📷</span>
                            )}
                          </div>
                        </td>
                        <td>
                          <div className="table-prop-title-block">
                            <strong className="table-prop-name">{prop.title}</strong>
                            <span className="table-prop-id-sub">#{propIdCode}</span>
                            <span className="table-prop-type-sub">{typeDisplay}</span>
                          </div>
                        </td>
                        <td>
                          <div className="table-loc-text">
                            {prop.location}
                          </div>
                        </td>
                        <td>
                          <div className="table-price-text">
                            {rentDisplay}
                          </div>
                        </td>
                        <td>
                          <button
                            type="button"
                            onClick={() => onToggleAvailability && onToggleAvailability(prop.id)}
                            className={`table-status-pill ${isOccupied ? 'occupied' : 'available'}`}
                            title="Click to toggle Available / Occupied status"
                          >
                            <span className="status-dot">●</span>
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
                            <span className="featured-dot">{isFeatured ? '★' : '☆'}</span>
                            {isFeatured ? 'Featured' : 'Standard'}
                          </button>
                        </td>
                        <td style={{ textAlign: 'right', paddingRight: '20px' }}>
                          <div className="table-actions-cell" style={{ justifyContent: 'flex-end' }}>
                            <button 
                              type="button" 
                              className="btn-table-edit" 
                              onClick={() => setEditingProp({ ...prop, images: prop.images || [prop.image || ''] })}
                              title="Edit Property &amp; Photos"
                            >
                              <Pencil size={13} /> Edit
                            </button>
                            <button 
                              type="button" 
                              className="btn-table-remove" 
                              onClick={() => onDeleteProperty(prop.id)}
                              title="Delete Property"
                            >
                              <Trash2 size={13} /> Remove
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                  {filteredTableProperties.length === 0 && (
                    <tr>
                      <td colSpan={7} className="text-center py-6 text-muted">
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
                            className="btn-whatsapp-sm"
                            style={{ background: 'rgba(197, 155, 39, 0.15)', color: '#C59B27', border: '1px solid rgba(197, 155, 39, 0.3)' }}
                            onClick={() => handleSelectLeadForEmail(inq)}
                            title="Configure & Send HTML Email Template"
                          >
                            <Mail size={12} /> Send Email
                          </button>
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

        {/* EMAIL DISPATCHER TAB PANEL */}
        {activeTab === 'email-dispatcher' && (
          <div className="admin-card-section" style={{ background: '#FFFFFF', borderRadius: '14px', border: '1px solid #E2E8F0', padding: '24px' }}>
            <div className="admin-section-header" style={{ marginBottom: '20px' }}>
              <h3 style={{ color: '#0C2340', fontSize: '1.25rem', fontWeight: '700', margin: '0 0 4px 0' }}>
                Email Dispatcher &amp; Customer Template Studio
              </h3>
              <p style={{ color: '#64748B', fontSize: '0.875rem', margin: 0 }}>
                Generate, live-preview, and send personalized 4-card HTML welcome email packages to prospective leads.
              </p>
            </div>

            <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
              
              {/* Left Column: Form Configuration */}
              <div style={{ flex: isFormBoxExpanded ? '1 1 540px' : '1 1 380px', maxWidth: isFormBoxExpanded ? '720px' : '520px', transition: 'all 0.3s ease', display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ background: '#0C2340', border: '1px solid rgba(197, 155, 39, 0.4)', borderRadius: '12px', overflow: 'hidden', padding: '20px', boxShadow: '0 8px 20px rgba(12, 35, 64, 0.12)' }}>
                  
                  {/* Header with Box Size Increaser Toggle */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(255,255,255,0.12)', paddingBottom: '14px', marginBottom: '18px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div style={{ width: '38px', height: '38px', borderRadius: '50%', background: '#C59B27', color: '#0C2340', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: '800', flexShrink: 0 }}>
                        <Mail size={20} />
                      </div>
                      <div>
                        <h4 style={{ color: '#FFFFFF', margin: 0, fontSize: '1.05rem', fontWeight: '700' }}>Email Configuration</h4>
                        <p style={{ color: '#DDD8CE', margin: '2px 0 0 0', fontSize: '0.78rem' }}>Customize recipient details &amp; action links</p>
                      </div>
                    </div>

                    {/* Box Size Increaser Toggle Button */}
                    <button
                      type="button"
                      onClick={() => setIsFormBoxExpanded(!isFormBoxExpanded)}
                      title={isFormBoxExpanded ? "Contract Form Box Width" : "Increase Form Box Size / Width"}
                      style={{
                        flexShrink: 0,
                        whiteSpace: 'nowrap',
                        background: isFormBoxExpanded ? '#C59B27' : 'rgba(197, 155, 39, 0.15)',
                        color: isFormBoxExpanded ? '#0C2340' : '#FFD700',
                        border: '1px solid #C59B27',
                        borderRadius: '20px',
                        padding: '6px 14px',
                        fontSize: '0.78rem',
                        fontWeight: '700',
                        cursor: 'pointer',
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        transition: 'all 0.2s ease',
                        boxShadow: isFormBoxExpanded ? '0 2px 10px rgba(197, 155, 39, 0.4)' : '0 2px 6px rgba(0,0,0,0.2)'
                      }}
                    >
                      {isFormBoxExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
                      <span>{isFormBoxExpanded ? 'Standard Box' : 'Expand Box'}</span>
                    </button>
                  </div>

                  <form onSubmit={handleSendEmailNow} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                    <div>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px' }}>
                        <label style={{ fontSize: '0.8rem', fontWeight: '700', color: '#C59B27' }}>
                          Email Subject Line *
                        </label>
                        <span style={{ fontSize: '0.7rem', color: '#DDD8CE', opacity: 0.85 }}>Auto-resizable / Multiline</span>
                      </div>
                      <textarea 
                        value={emailForm.emailSubject}
                        onChange={(e) => setEmailForm({ ...emailForm, emailSubject: e.target.value })}
                        placeholder="e.g. Welcome to Secure Stay — Your Stay Information Package"
                        required
                        rows={2}
                        style={{ 
                          width: '100%', 
                          background: 'rgba(255,255,255,0.08)', 
                          color: '#FFFFFF', 
                          border: '1px solid rgba(255,255,255,0.2)', 
                          borderRadius: '8px', 
                          padding: '9px 12px', 
                          fontSize: '0.88rem', 
                          outline: 'none', 
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.45',
                          minHeight: '46px'
                        }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                        Customer Email Address (To) *
                      </label>
                      <input 
                        type="email" 
                        value={emailForm.customerEmail}
                        onChange={(e) => setEmailForm({ ...emailForm, customerEmail: e.target.value })}
                        placeholder="e.g. bharath.s@example.com"
                        required
                        style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                          CC Emails (Comma-separated)
                        </label>
                        <textarea 
                          rows={2}
                          value={emailForm.ccEmails}
                          onChange={(e) => setEmailForm({ ...emailForm, ccEmails: e.target.value })}
                          placeholder="manager@securestay.in, sales@..."
                          style={{ 
                            width: '100%', 
                            background: 'rgba(255,255,255,0.08)', 
                            color: '#FFFFFF', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '8px', 
                            padding: '8px 10px', 
                            fontSize: '0.82rem', 
                            outline: 'none', 
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            lineHeight: '1.4',
                            minHeight: '42px'
                          }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                          BCC Emails (Comma-separated)
                        </label>
                        <textarea 
                          rows={2}
                          value={emailForm.bccEmails}
                          onChange={(e) => setEmailForm({ ...emailForm, bccEmails: e.target.value })}
                          placeholder="audit@securestay.in, records@..."
                          style={{ 
                            width: '100%', 
                            background: 'rgba(255,255,255,0.08)', 
                            color: '#FFFFFF', 
                            border: '1px solid rgba(255,255,255,0.2)', 
                            borderRadius: '8px', 
                            padding: '8px 10px', 
                            fontSize: '0.82rem', 
                            outline: 'none', 
                            boxSizing: 'border-box',
                            resize: 'vertical',
                            fontFamily: 'inherit',
                            lineHeight: '1.4',
                            minHeight: '42px'
                          }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                        Customer Full Name *
                      </label>
                      <input 
                        type="text" 
                        value={emailForm.customerName}
                        onChange={(e) => setEmailForm({ ...emailForm, customerName: e.target.value })}
                        placeholder="e.g. Bharath S."
                        required
                        style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                          Relationship Manager Name
                        </label>
                        <input 
                          type="text" 
                          value={emailForm.rmName}
                          onChange={(e) => setEmailForm({ ...emailForm, rmName: e.target.value })}
                          placeholder="e.g. Rajesh Sharma"
                          style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.78rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                          RM Manager Contact Link
                        </label>
                        <input 
                          type="url" 
                          value={emailForm.rmUrl}
                          onChange={(e) => setEmailForm({ ...emailForm, rmUrl: e.target.value })}
                          placeholder="https://wa.me/919999999999"
                          style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '0.85rem', outline: 'none', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                        Sample Agreement Document URL
                      </label>
                      <input 
                        type="url" 
                        value={emailForm.agreementUrl}
                        onChange={(e) => setEmailForm({ ...emailForm, agreementUrl: e.target.value })}
                        placeholder="https://www.securestay.in/docs/sample_agreement.pdf"
                        style={{ width: '100%', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', padding: '9px 12px', fontSize: '0.88rem', outline: 'none', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: '700', color: '#C59B27', marginBottom: '4px' }}>
                        Photos &amp; Videos Folder URL (Drive / Cloud Link)
                      </label>
                      <textarea 
                        rows={2}
                        value={emailForm.mediaFolderUrl}
                        onChange={(e) => setEmailForm({ ...emailForm, mediaFolderUrl: e.target.value })}
                        placeholder="https://drive.google.com/drive/folders/your_property_media"
                        style={{ 
                          width: '100%', 
                          background: 'rgba(255,255,255,0.08)', 
                          color: '#FFFFFF', 
                          border: '1px solid rgba(255,255,255,0.2)', 
                          borderRadius: '8px', 
                          padding: '8px 10px', 
                          fontSize: '0.85rem', 
                          outline: 'none', 
                          boxSizing: 'border-box',
                          resize: 'vertical',
                          fontFamily: 'inherit',
                          lineHeight: '1.4',
                          minHeight: '42px'
                        }}
                      />
                    </div>

                    {/* Action Buttons */}
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '6px' }}>
                      <button 
                        type="submit" 
                        disabled={emailSendingStatus === 'sending'}
                        style={{ width: '100%', padding: '12px 16px', background: 'linear-gradient(135deg, #C59B27 0%, #E5B83B 100%)', color: '#0C2340', fontWeight: '800', fontSize: '0.92rem', borderRadius: '8px', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', boxShadow: '0 4px 12px rgba(197, 155, 39, 0.3)' }}
                      >
                        <Send size={16} /> 
                        {emailSendingStatus === 'sending' ? 'Sending HTML Email...' : 'Send HTML Email Now'}
                      </button>

                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                        <button 
                          type="button" 
                          onClick={handleCopyHtmlEmail}
                          style={{ padding: '10px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                          {emailCopied ? <Check size={14} style={{ color: '#4ADE80' }} /> : <Copy size={14} />}
                          {emailCopied ? 'HTML Copied!' : 'Copy HTML'}
                        </button>

                        <button 
                          type="button" 
                          onClick={handleOpenGmail}
                          style={{ padding: '10px', background: 'rgba(255,255,255,0.08)', color: '#FFFFFF', border: '1px solid rgba(255,255,255,0.2)', borderRadius: '8px', fontSize: '0.8rem', fontWeight: '600', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                        >
                          <ExternalLink size={14} /> Open in Gmail
                        </button>
                      </div>

                      {emailSendingStatus === 'success' && (
                        <div style={{ padding: '10px 14px', background: 'rgba(16, 185, 129, 0.15)', border: '1px solid rgba(16, 185, 129, 0.4)', borderRadius: '8px', color: '#34D399', fontSize: '0.8rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          <CheckCircle size={14} /> Email sent successfully to {emailForm.customerEmail}!
                        </div>
                      )}
                      {emailSendingStatus === 'error' && (
                        <div style={{ padding: '10px 14px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', borderRadius: '8px', color: '#F87171', fontSize: '0.8rem', textAlign: 'center', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}>
                          Failed to send email. Copy HTML code or check API connection.
                        </div>
                      )}
                    </div>
                  </form>
                </div>

                {/* Lead Pick Tip */}
                <div style={{ padding: '12px 16px', background: '#F8FAFC', border: '1px solid #E2E8F0', borderRadius: '10px', fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <Sparkles size={18} style={{ color: '#C59B27', flexShrink: 0 }} />
                  <span>Tip: Select any lead in <strong>Customer Inquiries</strong> to auto-fill recipient details here.</span>
                </div>
              </div>

              {/* Right Column: Live Email Preview */}
              <div style={{ flex: '1 1 450px', minWidth: '320px' }}>
                <div style={{ background: '#4E4929', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 8px 24px rgba(0,0,0,0.12)' }}>
                  
                  <div style={{ background: '#3D3820', padding: '12px 18px', borderBottom: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{ color: '#F0E8D4', fontSize: '0.8rem', fontWeight: '700', letterSpacing: '0.5px', textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Eye size={15} style={{ color: '#C9A84C' }} /> Real-Time Email Live Preview
                    </span>
                    <span style={{ color: '#C9A84C', fontSize: '0.75rem', fontWeight: '600', background: 'rgba(201, 168, 76, 0.15)', padding: '2px 8px', borderRadius: '10px' }}>
                      Dear {emailForm.customerName || 'Customer'}
                    </span>
                  </div>

                  <div style={{ backgroundColor: '#DDD8CE', padding: '20px 14px' }}>
                    <div style={{ maxWidth: '620px', margin: '0 auto', background: '#FFFFFF', borderRadius: '8px', overflow: 'hidden', boxShadow: '0 6px 20px rgba(0,0,0,0.15)' }}>
                      
                      {/* Header Banner */}
                      <div style={{ lineHeight: 0 }}>
                        <img src="/assets/header_banner.png" alt="Secure Stay Banner" style={{ width: '100%', display: 'block' }} />
                      </div>

                      {/* Greeting */}
                      <div style={{ backgroundColor: '#4E4929', padding: '24px 28px 18px 28px' }}>
                        <h2 style={{ color: '#F5EDD8', fontSize: '24px', fontWeight: '800', margin: '0 0 12px 0', fontFamily: 'Georgia, serif' }}>
                          Dear {emailForm.customerName || 'Bharath'}!
                        </h2>
                        <p style={{ color: '#D5CAAF', fontSize: '12.5px', lineHeight: '1.6', margin: '0 0 10px 0', fontFamily: 'Arial, sans-serif' }}>
                          At Secure Stay, we believe finding and managing your stay should be simple, transparent, and hassle free. We're here to make every step of your journey smoother — from exploring your property to completing the agreement and getting settled in comfortably.
                        </p>
                        <p style={{ color: '#D5CAAF', fontSize: '12.5px', lineHeight: '1.6', margin: 0, fontFamily: 'Arial, sans-serif' }}>
                          We've put together everything you need below, so you can explore the details at your convenience.
                        </p>
                      </div>

                      {/* 4 Cards Section */}
                      <div style={{ backgroundColor: '#4E4929', padding: '0 28px 24px 28px' }}>
                        <div style={{ borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px', marginBottom: '14px' }}>
                          <div style={{ color: '#C9BD9C', fontSize: '9px', fontWeight: '700', letterSpacing: '1.5px', textTransform: 'uppercase', marginBottom: '2px' }}>EXPLORE SECURE STAY</div>
                          <div style={{ color: '#F0E8D4', fontSize: '16px', fontWeight: '700', fontFamily: 'Georgia, serif' }}>Your Secure Stay Journey</div>
                        </div>

                        {/* Card 01 */}
                        <div style={{ backgroundColor: '#3D3820', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2810', fontSize: '13px', fontWeight: '800', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                            01
                          </div>
                          <div>
                            <div style={{ color: '#F0E8D4', fontSize: '12.5px', fontWeight: '700', marginBottom: '3px' }}>Why Secure Stay</div>
                            <div style={{ color: '#A89E82', fontSize: '10.5px', lineHeight: '1.5', marginBottom: '8px' }}>Learn why tenants and property owners choose Secure Stay for complete transparency, zero brokerage, and dedicated support.</div>
                            <a href="/#about" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#C9A84C', color: '#2C2810', fontSize: '9.5px', fontWeight: '700', padding: '4px 10px', borderRadius: '14px', textDecoration: 'none' }}>Why Secure Stay &rarr;</a>
                          </div>
                        </div>

                        {/* Card 02 */}
                        <div style={{ backgroundColor: '#3D3820', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2810', fontSize: '13px', fontWeight: '800', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                            02
                          </div>
                          <div>
                            <div style={{ color: '#F0E8D4', fontSize: '12.5px', fontWeight: '700', marginBottom: '3px' }}>Our Services &amp; Benefits</div>
                            <div style={{ color: '#A89E82', fontSize: '10.5px', lineHeight: '1.5', marginBottom: '8px' }}>Explore our services, tenant benefits, support, and the advantages of choosing a professionally managed stay.</div>
                            <a href="/#services" target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#C9A84C', color: '#2C2810', fontSize: '9.5px', fontWeight: '700', padding: '4px 10px', borderRadius: '14px', textDecoration: 'none' }}>Explore Services &amp; Benefits &rarr;</a>
                          </div>
                        </div>

                        {/* Card 03 */}
                        <div style={{ backgroundColor: '#3D3820', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2810', fontSize: '13px', fontWeight: '800', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                            03
                          </div>
                          <div>
                            <div style={{ color: '#F0E8D4', fontSize: '12.5px', fontWeight: '700', marginBottom: '3px' }}>Dedicated Relationship Manager ({emailForm.rmName || 'Rajesh Sharma'})</div>
                            <div style={{ color: '#A89E82', fontSize: '10.5px', lineHeight: '1.5', marginBottom: '8px' }}>Know who is supporting you throughout your journey and how to reach your <strong style={{ color: '#C9A84C' }}>RM ({emailForm.rmName || 'Rajesh Sharma'})</strong> whenever you need assistance.</div>
                            <a href={emailForm.rmUrl || '#'} target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#C9A84C', color: '#2C2810', fontSize: '9.5px', fontWeight: '700', padding: '4px 10px', borderRadius: '14px', textDecoration: 'none' }}>Contact {emailForm.rmName || 'Manager'} &rarr;</a>
                          </div>
                        </div>

                        {/* Card 04 */}
                        <div style={{ backgroundColor: '#3D3820', borderRadius: '8px', padding: '12px', marginBottom: '10px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2810', fontSize: '13px', fontWeight: '800', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                            04
                          </div>
                          <div>
                            <div style={{ color: '#F0E8D4', fontSize: '12.5px', fontWeight: '700', marginBottom: '3px' }}>Sample Agreement</div>
                            <div style={{ color: '#A89E82', fontSize: '10.5px', lineHeight: '1.5', marginBottom: '8px' }}>Review the sample agreement and understand the key terms and conditions before you proceed.</div>
                            <a href={emailForm.agreementUrl || '#'} target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#C9A84C', color: '#2C2810', fontSize: '9.5px', fontWeight: '700', padding: '4px 10px', borderRadius: '14px', textDecoration: 'none' }}>View Sample Agreement &rarr;</a>
                          </div>
                        </div>

                        {/* Card 05: Property Photos & Videos */}
                        <div style={{ backgroundColor: '#3D3820', borderRadius: '8px', padding: '12px', display: 'flex', gap: '12px', alignItems: 'flex-start' }}>
                          <div style={{ width: '32px', height: '32px', borderRadius: '50%', backgroundColor: '#C9A84C', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2C2810', fontSize: '13px', fontWeight: '800', fontFamily: 'Georgia, serif', flexShrink: 0 }}>
                            05
                          </div>
                          <div>
                            <div style={{ color: '#F0E8D4', fontSize: '12.5px', fontWeight: '700', marginBottom: '3px' }}>Property Photos &amp; Video Tour</div>
                            <div style={{ color: '#A89E82', fontSize: '10.5px', lineHeight: '1.5', marginBottom: '8px' }}>Browse high-resolution interior photos, walkthrough videos, and room layouts.</div>
                            <a href={emailForm.mediaFolderUrl || '#'} target="_blank" rel="noreferrer" style={{ display: 'inline-block', backgroundColor: '#C9A84C', color: '#2C2810', fontSize: '9.5px', fontWeight: '700', padding: '4px 10px', borderRadius: '14px', textDecoration: 'none' }}>View Photos &amp; Videos &rarr;</a>
                          </div>
                        </div>
                      </div>

                      {/* Feature Strip */}
                      <div style={{ backgroundColor: '#F0EBE0', padding: '14px 16px', borderTop: '1px solid rgba(0,0,0,0.05)' }}>
                        <table border="0" cellPadding="0" cellSpacing="0" style={{ width: '100%', borderCollapse: 'collapse' }}>
                          <tbody>
                            <tr>
                              <td style={{ width: '25%', verticalAlign: 'middle', padding: '2px 4px 2px 0' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #4E4929', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4E4929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><polyline points="9 12 11 14 15 10"/>
                                    </svg>
                                  </div>
                                  <span style={{ color: '#3A3620', fontSize: '8px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '0.2px' }}>
                                    SAFE &amp; SECURE<br/>PROPERTIES
                                  </span>
                                </div>
                              </td>

                              <td style={{ width: '25%', verticalAlign: 'middle', padding: '2px 4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #4E4929', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4E4929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/><polyline points="14 2 14 8 20 8"/><circle cx="11.5" cy="14.5" r="2.5"/><path d="M13.3 16.3l1.7 1.7"/>
                                    </svg>
                                  </div>
                                  <span style={{ color: '#3A3620', fontSize: '8px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '0.2px' }}>
                                    TRANSPARENT<br/>PROCESS
                                  </span>
                                </div>
                              </td>

                              <td style={{ width: '27%', verticalAlign: 'middle', padding: '2px 4px' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                                  <div style={{ width: '28px', height: '28px', borderRadius: '50%', border: '1.5px solid #4E4929', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#4E4929" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                      <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/>
                                    </svg>
                                  </div>
                                  <span style={{ color: '#3A3620', fontSize: '8px', fontWeight: '700', lineHeight: '1.25', letterSpacing: '0.2px' }}>
                                    A BETTER LIVING<br/>EXPERIENCE
                                  </span>
                                </div>
                              </td>

                              <td style={{ width: '23%', verticalAlign: 'middle', textAlign: 'right', padding: '2px 0 2px 4px' }}>
                                <a href="/#services" target="_blank" rel="noreferrer" style={{ backgroundColor: '#4E4929', color: '#F5EDD8', fontSize: '9.5px', fontWeight: '700', padding: '7px 14px', borderRadius: '20px', textDecoration: 'none', display: 'inline-block', whiteSpace: 'nowrap' }}>
                                  Get Started
                                </a>
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>

                      {/* Footer */}
                      <div style={{ backgroundColor: '#2E2A13', padding: '12px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '9.5px', color: '#A89E82' }}>
                        <span style={{ color: '#F0E8D4', fontWeight: '600' }}>Discover Our Latest Updates</span>
                        <div>
                          <span style={{ marginRight: '10px' }}>www.securestay.in</span>
                          <span>info@securestay.in</span>
                        </div>
                      </div>

                    </div>
                  </div>
                </div>
              </div>

            </div>
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
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginTop: '24px', justifyContent: 'flex-end' }}>
                <button type="button" className="btn-secondary" style={{ padding: '11px 24px', borderRadius: '10px', fontWeight: 600, fontSize: '0.9rem' }} onClick={() => setEditingProp(null)}>
                  Cancel
                </button>
                <button type="submit" className="btn-publish-saas" style={{ width: 'auto', padding: '11px 28px', borderRadius: '10px', margin: 0 }}>
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
