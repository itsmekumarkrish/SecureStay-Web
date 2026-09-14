/**
 * Gmail API Draft Creator Script for SecureStay Admin
 * Account: bharath.s@securestay.in
 *
 * This script Base64url encodes the compiled HTML email package ('email_preview_review.html')
 * into a valid MIME format and injects it directly into the Gmail drafts folder of bharath.s@securestay.in.
 */

const fs = require('fs');
const path = require('path');
const https = require('https');

async function createGmailDraft(options = {}) {
  const accountEmail = 'bharath.s@securestay.in';
  const reviewFilePath = path.join(__dirname, '../email_preview_review.html');
  
  if (!fs.existsSync(reviewFilePath)) {
    console.error(`Error: Pre-send review file not found at ${reviewFilePath}`);
    console.error(`Please generate 'email_preview_review.html' before creating a draft.`);
    process.exit(1);
  }

  const htmlBody = fs.readFileSync(reviewFilePath, 'utf8');

  const to = options.to || 'bharath.s@securestay.in';
  const cc = options.cc || '';
  const bcc = options.bcc || '';
  const subject = options.subject || 'Welcome to Secure Stay — Your Complete Stay Information Package';

  // Construct MIME Message Headers
  const mimeHeaders = [
    `From: Secure Stay Admin <${accountEmail}>`,
    `To: ${to}`,
    cc ? `Cc: ${cc}` : null,
    bcc ? `Bcc: ${bcc}` : null,
    `Subject: =?UTF-8?B?${Buffer.from(subject).toString('base64')}?=`,
    `MIME-Version: 1.0`,
    `Content-Type: text/html; charset=utf-8`,
    `Content-Transfer-Encoding: base64`,
    '',
    Buffer.from(htmlBody).toString('base64')
  ].filter(line => line !== null).join('\r\n');

  // Base64url encode the raw MIME message (URL safe: replace + with -, / with _, remove =)
  const base64EncodedRaw = Buffer.from(mimeHeaders)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=+$/, '');

  const payload = JSON.stringify({
    message: {
      raw: base64EncodedRaw
    }
  });

  console.log(`====================================================`);
  console.log(`  SECURE STAY GMAIL DRAFT INJECTION (ACCOUNT: ${accountEmail})`);
  console.log(`====================================================`);
  console.log(`Sender Account : ${accountEmail}`);
  console.log(`Recipient (To) : ${to}`);
  if (cc) console.log(`CC Emails      : ${cc}`);
  if (bcc) console.log(`BCC Emails     : ${bcc}`);
  console.log(`Subject        : ${subject}`);
  console.log(`Layout File    : email_preview_review.html (${htmlBody.length} bytes)`);
  console.log(`MIME Payload   : ${base64EncodedRaw.length} chars (base64url encoded)`);
  console.log(`----------------------------------------------------`);

  // Check if OAuth Token is provided in environment
  const accessToken = process.env.GMAIL_ACCESS_TOKEN || process.env.GOOGLE_OAUTH_TOKEN;

  if (!accessToken) {
    console.log(`\n[PREVIEW MODE / READY FOR API INJECTION]`);
    console.log(`Base64url MIME payload generated successfully!`);
    console.log(`To push to Gmail API drafts endpoint (gmail.users.drafts.create):`);
    console.log(`Provide GMAIL_ACCESS_TOKEN=<token> node scripts/create_gmail_draft.js`);
    console.log(`Endpoint: POST https://gmail.googleapis.com/gmail/v1/users/me/drafts`);
    return { success: true, previewMode: true, rawPayload: base64EncodedRaw };
  }

  // Execute HTTP Request to Gmail API
  const reqOptions = {
    hostname: 'gmail.googleapis.com',
    port: 443,
    path: '/gmail/v1/users/me/drafts',
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
      'Content-Length': Buffer.byteLength(payload)
    }
  };

  return new Promise((resolve, reject) => {
    const req = https.request(reqOptions, (res) => {
      let data = '';
      res.on('data', (chunk) => data += chunk);
      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          const responseJson = JSON.parse(data);
          console.log(`SUCCESS! Draft created in Gmail account '${accountEmail}'.`);
          console.log(`Draft ID: ${responseJson.id}`);
          console.log(`Message ID: ${responseJson.message ? responseJson.message.id : 'N/A'}`);
          resolve(responseJson);
        } else {
          console.error(`Gmail API Error (Status ${res.statusCode}):`, data);
          reject(new Error(`Gmail API returned status ${res.statusCode}: ${data}`));
        }
      });
    });

    req.on('error', (err) => {
      console.error(`Network Error calling Gmail API:`, err);
      reject(err);
    });

    req.write(payload);
    req.end();
  });
}

if (require.main === module) {
  createGmailDraft().catch(err => console.error(err));
}

module.exports = { createGmailDraft };
