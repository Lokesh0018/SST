export default function PageLoader() {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#F7F0E0',
        zIndex: 9998,
      }}
    >
      <div
        style={{
          width: 48,
          height: 48,
          border: '3px solid #EFE4CF',
          borderTopColor: '#F15A24',
          borderRadius: '50%',
          animation: 'spin 0.8s linear infinite',
        }}
      />
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
