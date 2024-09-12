'use client';

import { useState } from 'react';
function clearCookies() {
  const cookies = document.cookie.split(';');
  cookies.forEach(cookie => {
    const [name] = cookie.split('=');
    document.cookie = `${name.trim()}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
  });
}
export default function ClientLogoutButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const handleLogout = async () => {
    setLoading(true);
    try {
      await fetch('/api/logout', { method: 'GET' });

      clearCookies();

      window.location.href = '/';
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button onClick={handleLogout} disabled={loading}>
      {loading ? 'Logging out...' : 'Logout'}
    </button>
  );
}