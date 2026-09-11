import { useEffect, useState } from 'react';

export default function PageLoader() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--color-ivory, #FFFDF8)',
        zIndex: 9998,
        opacity: mounted ? 1 : 0,
        transition: 'opacity 0.3s ease',
      }}
    >
      <div style={{ position: 'relative', width: 80, height: 80, marginBottom: '2rem' }}>
        <img 
          src="/images/logo/globe.png" 
          alt="SST Globe" 
          style={{ width: '100%', height: '100%', objectFit: 'contain', animation: 'pulse 2s infinite ease-in-out' }} 
        />
      </div>
      <div
        style={{
          width: 150,
          height: 2,
          background: 'rgba(0,0,0,0.05)',
          overflow: 'hidden',
          position: 'relative'
        }}
      >
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          height: '100%',
          width: '50%',
          background: 'var(--color-orange, #F4511E)',
          animation: 'progress 1.5s infinite ease-in-out'
        }} />
      </div>
      <style>{`
        @keyframes pulse { 0%, 100% { transform: scale(0.95); opacity: 0.8; } 50% { transform: scale(1.05); opacity: 1; } }
        @keyframes progress { 0% { left: -50%; } 100% { left: 100%; } }
      `}</style>
    </div>
  );
}
