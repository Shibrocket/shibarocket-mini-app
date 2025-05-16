'use client';
import { useState, useEffect } from 'react';

export default function Home() {
  const [balance, setBalance] = useState(0);
  const [energy, setEnergy] = useState(400);
  const [userId] = useState('test-user');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await fetch('/api/user', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId }),
        });
        const data = await res.json();
        if (data.success) {
          setBalance(data.shrockBalance || 0);
          setEnergy(data.energy || 400);
        }
      } catch (_) {
        console.error('Error fetching user data');
      }
    };
    fetchUserData();
  }, [userId]);

  const handleTap = async () => {
    try {
      const res = await fetch('/api/tap', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });
      const data = await res.json();
      if (data.success) {
        setBalance(data.newBalance);
        setEnergy(data.newEnergy);
      } else {
        alert(data.error);
      }
    } catch (_) {
      alert('Error during tap');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
      <h1 className="text-3xl font-bold mb-4">ShibaRocket</h1>
      <p>Balance: {balance} $SHROCK</p>
      <p>Energy: {energy}/500</p>
      <button
        onClick={handleTap}
        className="mt-4 px-6 py-3 bg-neon-green text-black rounded-full shadow-neon disabled:opacity-50"
        disabled={energy <= 0}
      >
        Tap to Earn
      </button>
    </div>
  );
}
