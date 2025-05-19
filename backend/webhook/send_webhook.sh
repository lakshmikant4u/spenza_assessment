#!/bin/bash

# Configuration
SHARED_SECRET="spenza-secret-key"
WEBHOOK_URL="http://localhost:3000/webhooks/events"

# Minified JSON Payload (no spaces or newlines)
PAYLOAD='{"eventType":"user.created","data":{"name":"Aarav Mehta","email":"aarav@example.com"}}'

# Generate HMAC SHA256 signature using OpenSSL
SIGNATURE=$(echo -n "$PAYLOAD" | openssl dgst -sha256 -hmac "$SHARED_SECRET" | sed 's/^.* //')

# Send POST request with correct signature
curl -X POST "$WEBHOOK_URL" \
  -H "Content-Type: application/json" \
  -H "x-signature: $SIGNATURE" \
  -d "$PAYLOAD"
