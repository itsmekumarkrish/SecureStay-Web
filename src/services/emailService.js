/**
 * Email Delivery Service for SecureStay Inquiries
 * Delivers contact form submissions to bharath.s@securestay.in using Web3Forms.
 */

const USER_TYPE_LABELS = {
  owner: 'Property Owner / Landlord',
  tenant: 'Tenant / Guest',
  other: 'Other Inquiry'
};

export const TARGET_COMPANY_EMAIL = 'bharath.s@securestay.in';

/**
 * Sends inquiry details to company email via Web3Forms FormData
 * @param {Object} inquiryPayload 
 */
export async function sendInquiryEmail(inquiryPayload) {
  const accessKey = import.meta.env.VITE_WEB3FORMS_ACCESS_KEY || 'd0d14bc8-8aa2-46b8-ae15-cdcefdda1712';
  const userRoleLabel = USER_TYPE_LABELS[inquiryPayload.userType] || inquiryPayload.userType || 'General Inquiry';
  const refNo = inquiryPayload.refNumber || inquiryPayload.id || 'N/A';

  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', `[Ref: ${refNo}] New Lead: SecureStay Inquiry from ${inquiryPayload.name || 'Visitor'}`);
  formData.append('from_name', 'SecureStay Web Notification');
  formData.append('replyto', inquiryPayload.email || '');
  formData.append('reference_number', refNo);
  formData.append('name', inquiryPayload.name || 'Not specified');
  formData.append('phone', inquiryPayload.phone || 'Not specified');
  formData.append('email', inquiryPayload.email || 'Not specified');
  formData.append('user_type', userRoleLabel);
  formData.append('location', inquiryPayload.location || 'Not specified');
  formData.append('message', inquiryPayload.message || 'No message provided');
  formData.append('submission_date', inquiryPayload.date || new Date().toLocaleString('en-IN'));

  try {
    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      body: formData
    });

    const result = await response.json();
    console.log('[EmailService] Web3Forms submission result:', result);
    if (result.success) {
      return { success: true, message: result.message };
    } else {
      console.warn('[EmailService] Web3Forms returned warning:', result.message);
      return { success: false, error: result.message };
    }
  } catch (err) {
    console.error('[EmailService] Network / Email delivery error:', err);
    return { success: false, error: err.message };
  }
}
