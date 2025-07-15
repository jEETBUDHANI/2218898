import React from 'react';
import UrlForm from '../components/UrlForm';
import UrlStats from '../components/UrlStats';

export default function Home() {
  return (
    <div>
      <UrlForm />
      <hr />
      <UrlStats />
    </div>
  );
}
