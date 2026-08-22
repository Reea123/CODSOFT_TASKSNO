import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate("/");
    setMenuOpen(false);
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.topRow}>
        <Link to="/" style={styles.logo} onClick={() => setMenuOpen(false)}>
          JobBoard
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          style={styles.menuButton}
          className="mobile-menu-btn"
        >
          {menuOpen ? '✕' : '☰'}
        </button>
      </div>

      <div style={styles.links} className={`nav-links ${menuOpen ? 'open' : ''}`}>
        <Link to="/jobs" style={styles.link} onClick={() => setMenuOpen(false)}>
          Browse Jobs
        </Link>
        <Link to="/blog" style={styles.link} onClick={() => setMenuOpen(false)}>
          Blog
        </Link>
        <Link to="/contact" style={styles.link} onClick={() => setMenuOpen(false)}>
          Contact
        </Link>

        {!user && (
          <>
            <Link to="/login" style={styles.link} onClick={() => setMenuOpen(false)}>
              Login
            </Link>
            <Link to="/register" style={styles.link} onClick={() => setMenuOpen(false)}>
              Register
            </Link>
          </>
        )}

        {user && user.role === "employer" && (
          <Link to="/employer/dashboard" style={styles.link} onClick={() => setMenuOpen(false)}>
            Dashboard
          </Link>
        )}

        {user && user.role === "candidate" && (
          <>
            <Link to="/candidate/dashboard" style={styles.link} onClick={() => setMenuOpen(false)}>
              My Applications
            </Link>
            <Link to="/profile" style={styles.link} onClick={() => setMenuOpen(false)}>
              Profile
            </Link>
          </>
        )}

        {user && (
          <>
            <span style={styles.greeting}>Hi, {user.name}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        )}
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    backgroundColor: '#0f172a',
    boxShadow: '0 1px 2px rgba(0,0,0,0.3)',
    borderBottom: '1px solid #1e293b',
    position: 'sticky',
    top: 0,
    zIndex: 10,
    padding: '1rem 1.5rem'
  },
  topRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  logo: {
    fontWeight: 700,
    fontSize: '1.4rem',
    textDecoration: 'none',
    color: '#60a5fa'
  },
  menuButton: {
    display: 'none',
    background: 'none',
    color: '#e2e8f0',
    fontSize: '1.5rem',
    padding: '0.25rem 0.5rem'
  },
  links: {
    gap: '1.5rem',
    alignItems: 'center',
    display: 'flex'
  },
  link: {
    textDecoration: 'none',
    color: '#e2e8f0',
    fontWeight: 500
  },
  greeting: {
    color: '#94a3b8',
    fontSize: '0.9rem'
  }
};

export default Navbar;