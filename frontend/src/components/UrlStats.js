import React, { useState } from 'react';
import { logEvent } from '../utils/logger';

export default function UrlStats() {
  const [shortcode, setShortcode] = useState('');
  const [stats, setStats] = useState(null);

  const fetchStats = async () => {
    try {
      const res = await fetch(`http://localhost:5000/shorturls/${shortcode}`);
      const data = await res.json();
      setStats(data);
      await logEvent('frontend', 'info', 'component', 'Stats fetched');
    } catch (err) {
      await logEvent('frontend', 'error', 'component', err.message);
      alert('Failed to fetch stats');
    }
  };

  return (
    <div>
      <input
        placeholder="Enter shortcode"
        value={shortcode}
        onChange={(e) => setShortcode(e.target.value)}
      />
      <button onClick={fetchStats}>Get Stats</button>

      {stats && (
        <div>
          <p>Original URL: {stats.originalUrl}</p>
          <p>Created At: {new Date(stats.createdAt).toLocaleString()}</p>
          <p>Expiry: {new Date(stats.expiry).toLocaleString()}</p>
          <p>Total Clicks: {stats.totalClicks}</p>
        </div>
      )}
    </div>
  );
}
