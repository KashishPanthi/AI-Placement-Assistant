import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logout, getName } from '../utils/auth';

const Navbar = () => {
  const navigate = useNavigate();
  const name = getName();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav style={styles.nav}>
      <div style={styles.brand}>🤖 AI Placement Assistant</div>
      <div style={styles.links}>
        <Link to="/" style={styles.link}>Dashboard</Link>
        <Link to="/resume" style={styles.link}>Resume</Link>
        <Link to="/interview" style={styles.link}>Interview</Link>
        <Link to="/jobs" style={styles.link}>Jobs</Link>
        <Link to="/chat" style={styles.link}>Chat</Link>
      </div>
      <div style={styles.user}>
        <span style={styles.name}>👤 {name}</span>
        <button onClick={handleLogout} style={styles.logout}>Logout</button>
      </div>
    </nav>
  );
};

const styles = {
  nav: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: '10px 30px',
    backgroundColor: '#1a1a2e',
    color: 'white',
  },
  brand: { fontSize: '20px', fontWeight: 'bold', color: '#e94560' },
  links: { display: 'flex', gap: '20px' },
  link: { color: 'white', textDecoration: 'none', fontSize: '15px' },
  user: { display: 'flex', alignItems: 'center', gap: '15px' },
  name: { color: '#e94560' },
  logout: {
    padding: '6px 14px',
    backgroundColor: '#e94560',
    color: 'white',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
  },
};

export default Navbar;