/**
 * Vercel Serverless Function: Direct Email Dispatcher via SendGrid API
 * Route: POST /api/send-email
 */

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const sendgridApiKey = process.env.SENDGRID_API_KEY || process.env.VITE_SENDGRID_API_KEY;
  if (!sendgridApiKey) {
    return res.status(500).json({ success: false, error: 'SENDGRID_API_KEY environment variable is missing.' });
  }

  try {
    const { to, subject, html, text, cc, bcc, fromName } = req.body || {};
    const recipientEmail = to || 'hello@securestay.in';

    const personalizations = [
      {
        to: [{ email: recipientEmail }]
      }
    ];

    if (cc) {
      const ccList = cc.split(',').map(e => ({ email: e.trim() })).filter(e => e.email);
      if (ccList.length > 0) personalizations[0].cc = ccList;
    }

    if (bcc) {
      const bccList = bcc.split(',').map(e => ({ email: e.trim() })).filter(e => e.email);
      if (bccList.length > 0) personalizations[0].bcc = bccList;
    }

    const payload = {
      personalizations,
      from: {
        email: 'hello@securestay.in',
        name: fromName || 'Secure Stay Administration'
      },
      subject: subject || 'Secure Stay — Welcome Package',
      content: [
        {
          type: 'text/html',
          value: html || `<p>${text || 'Welcome to Secure Stay!'}</p>`
        }
      ]
    };

    const sgResponse = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${sendgridApiKey}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload)
    });

    if (sgResponse.status >= 200 && sgResponse.status < 300) {
      return res.status(200).json({ success: true, message: 'Email delivered successfully via SendGrid API' });
    } else {
      const errorText = await sgResponse.text();
      console.warn('[SendGrid API Error]:', sgResponse.status, errorText);
      return res.status(sgResponse.status).json({ success: false, error: errorText });
    }
  } catch (err) {
    console.error('[SendGrid Serverless Function Error]:', err);
    return res.status(500).json({ success: false, error: err.message });
  }
}
