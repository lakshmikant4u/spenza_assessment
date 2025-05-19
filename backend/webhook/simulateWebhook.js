const axios = require('axios');
const crypto = require('crypto');

// Webhook simulation target
const webhookEndpoint = 'http://localhost:3000/webhooks/events';

// Shared secret used for signing (must match backend config)
const SHARED_SECRET = 'spenza-secret-key';

// Sample Indian user data for the webhook payload
const samplePayload = {
  eventType: 'user.created',
  data: {
    id: 'IN-001',
    name: 'Aarav Sharma',
    email: 'aarav.sharma@example.in',
    phone: '+91-9876543210',
    city: 'Mumbai',
    state: 'Maharashtra',
    timestamp: new Date().toISOString()
  }
};

// Generate HMAC SHA256 signature
function generateSignature(payload, secret) {
  const payloadString = JSON.stringify(payload);
  return crypto.createHmac('sha256', secret)
    .update(payloadString)
    .digest('hex');
}

// Main function to simulate webhook call
const simulateWebhookEvent = async () => {
  try {
    const signature = generateSignature(samplePayload, SHARED_SECRET);

    const response = await axios.post(webhookEndpoint, samplePayload, {
      headers: {
        'Content-Type': 'application/json',
        'X-Signature': signature  // Custom header for signature
      }
    });

    console.log('✅ Webhook event sent successfully!');
    console.log('Server Response:', response.data);
  } catch (error) {
    console.error('❌ Failed to send webhook event:', error.message);
    if (error.response) {
      console.error('Server responded with:', error.response.status, error.response.data);
    }
  }
};

simulateWebhookEvent();
