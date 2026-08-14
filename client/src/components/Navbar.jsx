import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.nav}>
      <Link to="/" style={styles.logo}>
        JobBoard
      </Link>

      <div style={styles.links}>
        <Link to="/jobs" style={styles.link}>
          Browse Jobs
        </Link>

        {!user && (
          <>
            <Link to="/login" style={styles.link}>
              Login
            </Link>
            <Link to="/register" style={styles.link}>
              Register
            </Link>
          </>
        )}

        {user && user.role === "employer" && (
          <Link to="/employer/dashboard" style={styles.link}>
            Dashboard
          </Link>
        )}

        {user && user.role === "candidate" && (
          <>
            <Link to="/candidate/dashboard" style={styles.link}>
              My Applications
            </Link>
            <Link to="/profile" style={styles.link}>
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
    backgroundColor: "white",
    boxShadow: "0 1px 2px rgba(20,20,43,0.04)",
    borderBottom: "1px solid #f0f1f6",
    position: "sticky",
    top: 0,
    zIndex: 10,
    padding: "1rem 1.5rem",
  },
  logo: {
    fontWeight: 700,
    fontSize: "1.4rem",
    textDecoration: "none",
    color: "#4361ee",
  },
  links: {
    display: "flex",
    gap: "1.5rem",
    alignItems: "center",
  },
  link: {
    textDecoration: "none",
    color: "#1a1a2e",
    fontWeight: 500,
  },
  greeting: {
    color: "#6b7280",
    fontSize: "0.9rem",
  },
};

export default Navbar;
