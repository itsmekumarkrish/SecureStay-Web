/**
 * Email Delivery Service for SecureStay Inquiries & Customer Email Dispatcher
 * Delivers customer emails directly using SendGrid API & Web3Forms backup.
 */

const USER_TYPE_LABELS = {
  owner: 'Property Owner / Landlord',
  tenant: 'Tenant / Guest',
  other: 'Other Inquiry'
};

export const TARGET_COMPANY_EMAIL = 'hello@securestay.in';
export const SENDGRID_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env && (import.meta.env.VITE_SENDGRID_API_KEY || import.meta.env.SENDGRID_API_KEY)) || '';

/**
 * Sends inquiry details or custom HTML customer welcome emails
 * @param {Object} inquiryPayload 
 */
export async function sendInquiryEmail(inquiryPayload) {
  const recipientEmail = inquiryPayload.email || TARGET_COMPANY_EMAIL;
  const userRoleLabel = USER_TYPE_LABELS[inquiryPayload.userType] || inquiryPayload.userType || 'General Inquiry';
  const refNo = inquiryPayload.refNumber || inquiryPayload.id || 'N/A';
  const emailSubject = inquiryPayload.subject || `[Ref: ${refNo}] New Lead: SecureStay Inquiry from ${inquiryPayload.name || 'Visitor'}`;

  // 1. Try Vercel Serverless SendGrid API Endpoint (/api/send-email)
  try {
    const serverlessResp = await fetch('/api/send-email', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        to: recipientEmail,
        subject: emailSubject,
        html: inquiryPayload.customHtml || undefined,
        text: inquiryPayload.message || `Inquiry from ${inquiryPayload.name || 'Customer'} (${inquiryPayload.phone || 'N/A'})`,
        cc: inquiryPayload.cc || '',
        bcc: inquiryPayload.bcc || '',
        fromName: 'Secure Stay Administration'
      })
    });

    if (serverlessResp.ok) {
      const data = await serverlessResp.json();
      if (data.success) {
        console.log('[EmailService] Sent successfully via SendGrid Serverless API!');
        return { success: true, message: 'Email dispatched via SendGrid' };
      }
    }
  } catch (err) {
    console.warn('[EmailService] Serverless /api/send-email route not reached, trying direct API fallback...', err);
  }

  // 2. Direct SendGrid REST API Call Fallback (if client key present)
  if (SENDGRID_API_KEY) {
    try {
      const personalizations = [{ to: [{ email: recipientEmail }] }];
      if (inquiryPayload.cc) {
        const ccList = inquiryPayload.cc.split(',').map(e => ({ email: e.trim() })).filter(e => e.email);
        if (ccList.length > 0) personalizations[0].cc = ccList;
      }
      if (inquiryPayload.bcc) {
        const bccList = inquiryPayload.bcc.split(',').map(e => ({ email: e.trim() })).filter(e => e.email);
        if (bccList.length > 0) personalizations[0].bcc = bccList;
      }

      const sgPayload = {
        personalizations,
        from: { email: TARGET_COMPANY_EMAIL, name: 'Secure Stay Administration' },
        subject: emailSubject,
        content: [
          {
            type: 'text/html',
            value: inquiryPayload.customHtml || `<p>Name: ${inquiryPayload.name || 'N/A'}<br/>Phone: ${inquiryPayload.phone || 'N/A'}<br/>Message: ${inquiryPayload.message || 'No message'}</p>`
          }
        ]
      };

      const directSgResp = await fetch('https://api.sendgrid.com/v3/mail/send', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${SENDGRID_API_KEY}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(sgPayload)
      });

      if (directSgResp.status >= 200 && directSgResp.status < 300) {
        console.log('[EmailService] Sent successfully via Direct SendGrid API!');
        return { success: true, message: 'Delivered via SendGrid REST API' };
      }
    } catch (sgErr) {
      console.warn('[EmailService] Direct SendGrid API failed, switching to Web3Forms backup...', sgErr);
    }
  }

  // 3. Web3Forms Backup Engine
  const accessKey = (typeof import.meta !== 'undefined' && import.meta.env && import.meta.env.VITE_WEB3FORMS_ACCESS_KEY) || 'd0d14bc8-8aa2-46b8-ae15-cdcefdda1712';
  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', emailSubject);
  formData.append('from_name', 'SecureStay Administration');
  formData.append('replyto', recipientEmail);
  if (inquiryPayload.cc) formData.append('cc', inquiryPayload.cc);
  if (inquiryPayload.bcc) formData.append('bcc', inquiryPayload.bcc);

  if (inquiryPayload.customHtml) {
    formData.append('message', inquiryPayload.customHtml);
    formData.append('is_html', 'true');
    formData.append('render_html', 'true');
  } else {
    formData.append('reference_number', refNo);
    formData.append('name', inquiryPayload.name || 'Not specified');
    formData.append('phone', inquiryPayload.phone || 'Not specified');
    formData.append('email', recipientEmail);
    formData.append('user_type', userRoleLabel);
    formData.append('location', inquiryPayload.location || 'Not specified');
    formData.append('message', inquiryPayload.message || 'No message provided');
    formData.append('submission_date', inquiryPayload.date || new Date().toLocaleString('en-IN'));
  }

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
      return { success: false, error: result.message };
    }
  } catch (err) {
    console.error('[EmailService] Network / Email delivery error:', err);
    return { success: false, error: err.message };
  }
}
