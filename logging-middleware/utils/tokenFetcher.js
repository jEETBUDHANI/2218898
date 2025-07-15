const axios = require('axios');

async function fetchToken() {
  const res = await axios.post('http://20.244.56.144/evaluation-service/auth', {
    clientID: 'your_client_id_here',
    clientSecret: 'your_client_secret_here',
  });
  return res.data.access_token;
}

module.exports = fetchToken;
