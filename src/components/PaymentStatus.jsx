import { useEffect } from 'react';

export default function PaymentStatus({ type }) {
  const isSuccess = type === 'success';

  useEffect(() => {
    document.title = isSuccess ? 'Ödəniş uğurlu — Sekond' : 'Ödəniş uğursuz — Sekond';
  }, [isSuccess]);

  return (
    <div style={{
      minHeight: '80vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem',
      fontFamily: 'inherit',
    }}>
      <div style={{
        width: 80,
        height: 80,
        borderRadius: '50%',
        background: isSuccess ? '#E6F9F1' : '#FEF2F2',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: '1.5rem',
        fontSize: 36,
      }}>
        {isSuccess ? '✓' : '✕'}
      </div>

      <h1 style={{
        fontSize: '1.75rem',
        fontWeight: 800,
        color: isSuccess ? '#0E9F6E' : '#EF4444',
        margin: '0 0 0.75rem',
      }}>
        {isSuccess ? 'Ödəniş uğurlu keçdi' : 'Ödəniş uğursuz oldu'}
      </h1>

      <p style={{
        fontSize: '1rem',
        color: '#6B7280',
        maxWidth: 360,
        margin: '0 0 2rem',
        lineHeight: 1.6,
      }}>
        {isSuccess
          ? 'Balansınız artırıldı. Tətbiqə qayıda bilərsiniz.'
          : 'Ödəniş zamanı xəta baş verdi. Zəhmət olmasa yenidən cəhd edin.'}
      </p>

      <a
        href="/"
        style={{
          display: 'inline-block',
          padding: '0.75rem 2rem',
          background: '#18B96B',
          color: '#fff',
          borderRadius: 12,
          fontWeight: 700,
          textDecoration: 'none',
          fontSize: '0.95rem',
        }}
      >
        Ana səhifəyə qayıt
      </a>
    </div>
  );
}
