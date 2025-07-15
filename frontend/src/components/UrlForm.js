import React, { useState } from 'react';
import { logEvent } from '../utils/logger';

export default function UrlForm() {
  const [url, setUrl] = useState('');
  const [shortUrl, setShortUrl] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setShortUrl('');

    if (!url.startsWith('http')) {
      setError('Please enter a valid URL with http/https');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/shorturls', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ url }),
});
      if (!response.ok) {
        throw new Error('Failed to shorten URL');
      } 

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to shorten URL');
      }

      setShortUrl(data.shortLink);
      await logEvent('frontend', 'info', 'component', 'URL submitted successfully');
    } catch (err) {
      setError(err.message);
      await logEvent('frontend', 'error', 'component', `URL submit failed: ${err.message}`);
    }
  };

  return (
    <div style={styles.container}>
      <h2>URL Shortener</h2>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="Enter full URL (e.g. https://example.com)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={styles.input}
        />
        <button type="submit" style={styles.button}>Shorten</button>
      </form>

      {shortUrl && (
        <div style={styles.success}>
          Short URL: <a href={shortUrl} target="_blank" rel="noreferrer">{shortUrl}</a>
        </div>
      )}

      {error && <div style={styles.error}>❌ {error}</div>}
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 500,
    margin: '50px auto',
    textAlign: 'center',
    fontFamily: 'sans-serif',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '1rem',
  },
  input: {
    padding: '10px',
    fontSize: '16px',
  },
  button: {
    padding: '10px',
    fontSize: '16px',
    cursor: 'pointer',
  },
  success: {
    marginTop: '20px',
    color: 'green',
    fontWeight: 'bold',
  },
  error: {
    marginTop: '20px',
    color: 'red',
  },
};
