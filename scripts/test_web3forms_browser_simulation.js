/**
 * Web3Forms Submission Simulator
 * Account: bharath.s@securestay.in
 * Access Key: d0d14bc8-8aa2-46b8-ae15-cdcefdda1712
 */

import http from 'https';

async function testSubmit() {
  const accessKey = 'd0d14bc8-8aa2-46b8-ae15-cdcefdda1712';
  const postData = JSON.stringify({
    access_key: accessKey,
    subject: 'Welcome to Secure Stay — Your Complete Stay Information Package',
    from_name: 'SecureStay Administration',
    email: 'bharath.s@securestay.in',
    to_email: 'bharath.s@securestay.in',
    name: 'Bharath S.',
    message: `
<!DOCTYPE html>
<html>
<head><title>Secure Stay Test</title></head>
<body style="background-color: #0C2340; color: #FFFFFF; font-family: sans-serif; padding: 20px;">
  <h1 style="color: #C59B27;">Welcome to Secure Stay!</h1>
  <p>This is a test of the rich HTML email dispatch system.</p>
</body>
</html>
    `
  });

  const options = {
    hostname: 'api.web3forms.com',
    port: 443,
    path: '/submit',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/122.0.0.0 Safari/537.36',
      'Origin': 'https://securestay.in',
      'Referer': 'https://securestay.in/'
    }
  };

  const req = http.request(options, (res) => {
    let body = '';
    console.log('Status Code:', res.statusCode);
    console.log('Headers:', res.headers);

    res.on('data', (chunk) => body += chunk);
    res.on('end', () => {
      console.log('Response Body:', body);
    });
  });

  req.on('error', (e) => {
    console.error('Request Error:', e);
  });

  req.write(postData);
  req.end();
}

testSubmit();
