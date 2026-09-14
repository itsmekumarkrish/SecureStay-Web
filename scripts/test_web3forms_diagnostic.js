async function testWeb3FormsDirect() {
  const accessKey = 'd0d14bc8-8aa2-46b8-ae15-cdcefdda1712';
  const formData = new FormData();
  formData.append('access_key', accessKey);
  formData.append('subject', 'Test Rich HTML Email - SecureStay');
  formData.append('from_name', 'SecureStay Administration');
  formData.append('to', 'bharath.s@securestay.in');
  formData.append('email', 'bharath.s@securestay.in');
  formData.append('name', 'Bharath S.');
  formData.append('message', '<h1>Hello World - Secure Stay Rich HTML Test</h1>');

  console.log('Sending direct Web3Forms request...');
  const res = await fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Origin': 'https://www.securestay.in',
      'Referer': 'https://www.securestay.in/'
    },
    body: formData
  });

  console.log('Status Code:', res.status);
  const text = await res.text();
  console.log('Response Body:', text.slice(0, 500));
}

testWeb3FormsDirect().catch(err => console.error(err));
