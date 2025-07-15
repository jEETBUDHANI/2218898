const axios = require('axios');

const ACCESS_TOKEN = 'your_access_token_here';

async function log(stack, level, pkg, message) {
  try {
    await axios.post('http://20.244.56.144/evaluation-service/logs', {
      stack,
      level,
      package: pkg,
      message,
    }, {
      headers: {
        'Authorization': `Bearer ${ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      }
    });
  } catch (error) {
    console.error('Logging failed:', error.message);
  }
}

module.exports = log;
