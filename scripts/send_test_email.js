/**
 * Send Test Email Routine for SecureStay Admin
 * Account: bharath.s@securestay.in
 */

import { sendInquiryEmail } from '../src/services/emailService.js';

// Construct sample HTML email package
const sampleName = 'Bharath S.';
const rmName = 'Rajesh Sharma';
const rmUrl = 'https://wa.me/919999999999';
const agreementUrl = 'https://www.securestay.in/docs/sample_agreement.pdf';
const mediaFolderUrl = 'https://drive.google.com/drive/folders/sample_property_photos';
const domainOrigin = 'https://www.securestay.in';

const testHtmlContent = `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
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
        <h1 style="color:#F5EDD8;font-size:34px;font-weight:800;margin:0 0 18px 0;font-family:Georgia,serif;letter-spacing:-0.5px;">Dear ${sampleName}!</h1>
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

    <!-- FEATURE STRIP -->
    <tr>
      <td style="background-color:#0C2340;padding:24px 42px;">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="color:#DDD8CE;font-size:12.5px;font-weight:600;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Ready to secure your stay?</td>
            <td align="right">
              <a href="${domainOrigin}/#contact" target="_blank" style="background-color:#C59B27;color:#0C2340;font-size:11px;font-weight:800;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;text-decoration:none;padding:8px 18px;border-radius:20px;display:inline-block;">Get Started &rarr;</a>
            </td>
          </tr>
        </table>
      </td>
    </tr>

    <!-- FOOTER -->
    <tr>
      <td style="background-color:#08182D;padding:28px 42px;text-align:center;border-radius:0 0 8px 8px;">
        <p style="color:#7A8B9E;font-size:11px;line-height:1.6;margin:0 0 8px 0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Secure Stay Private Limited &bull; Professional Property &amp; Stay Management</p>
        <p style="color:#4B5B6E;font-size:10px;margin:0;font-family:'Helvetica Neue',Helvetica,Arial,sans-serif;">Sent from <strong style="color:#7A8B9E;">bharath.s@securestay.in</strong> &bull; Confidential Stay Package</p>
      </td>
    </tr>
  </table>
</td></tr>
</table>
</body>
</html>`;

async function runTest() {
  console.log('Sending Test Rich HTML Email to bharath.s@securestay.in...');
  const res = await sendInquiryEmail({
    name: 'Bharath S.',
    email: 'bharath.s@securestay.in',
    subject: 'Welcome to Secure Stay — Your Complete Stay Information Package',
    rmName: 'Rajesh Sharma',
    customHtml: testHtmlContent
  });
  console.log('Test Email Result:', res);
}

runTest();
