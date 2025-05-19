const crypto = require('crypto');

const SHARED_SECRET="spenza-secret-key"
const payload = JSON.stringify({
  eventType: 'user.signup',
  data: { name: 'Aarav Sharma', email: 'aarav.sharma@example.com' },
});

const signature = crypto.createHmac('sha256', SHARED_SECRET).update(payload).digest('hex');
console.log(signature);



