import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{
      textAlign: 'center',
      padding: '6rem 1.5rem',
      background: 'linear-gradient(180deg, #eef1ff 0%, #f8f9fc 100%)'
    }}>
      <h1 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: '#1a1a2e' }}>
        Find your next <span style={{ color: '#4361ee' }}>opportunity</span>
      </h1>
      <p style={{ color: '#6b7280', fontSize: '1.15rem', marginBottom: '2rem', maxWidth: '500px', margin: '0 auto 2rem' }}>
        Browse jobs, apply in seconds, and track your applications — all in one place.
      </p>
      <Link to="/jobs">
        <button style={{ fontSize: '1.05rem', padding: '0.9rem 2rem' }}>Browse Jobs →</button>
      </Link>
    </div>
  );
};

export default Home;