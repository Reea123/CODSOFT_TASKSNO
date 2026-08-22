import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '6rem 1.5rem 5rem',
      background: 'radial-gradient(ellipse at top, #131c31 0%, #0b1120 60%)',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{
        position: 'absolute',
        top: '-100px',
        right: '-100px',
        width: '350px',
        height: '350px',
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.15), transparent 70%)'
      }} />
      <div style={{
        display: 'inline-block',
        background: 'rgba(59, 130, 246, 0.12)',
        color: '#60a5fa',
        padding: '0.4rem 1rem',
        borderRadius: '20px',
        fontSize: '0.85rem',
        fontWeight: 600,
        marginBottom: '1.5rem',
        border: '1px solid rgba(59, 130, 246, 0.25)'
      }}>
        🚀 New jobs added daily
      </div>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#f1f5f9', lineHeight: 1.15 }}>
        Find your next <span style={{
          background: 'linear-gradient(135deg, #60a5fa, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text'
        }}>opportunity</span>
      </h1>
      <p style={{ color: '#94a3b8', fontSize: '1.15rem', marginBottom: '2.5rem', maxWidth: '520px', margin: '0 auto 2.5rem' }}>
        Browse jobs, apply in seconds, and track your applications — all in one place.
      </p>
      <Link to="/jobs">
        <button style={{ fontSize: '1.05rem', padding: '1rem 2.2rem' }}>Browse Jobs →</button>
      </Link>
    </div>
  );
};

export default Home;