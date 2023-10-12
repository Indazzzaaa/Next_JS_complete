const crypto = require('crypto');

// Generate 32 random bytes
const randomBytes = crypto.randomBytes(32);

// Encode the random bytes to base64
const base64String = randomBytes.toString('base64');

console.log(base64String);
