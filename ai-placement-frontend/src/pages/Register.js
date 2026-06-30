import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { register } from '../services/authService';
import { saveToken } from '../utils/auth';
import { toast } from 'react-toastify';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await register(form);
      saveToken(res.data.token, res.data.email, res.data.name);
      toast.success('Registration successful!');
      navigate('/');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Registration failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>🤖 AI Placement Assistant</h2>
        <h3 style={styles.subtitle}>Register</h3>
        <form onSubmit={handleSubmit}>
          <input
            style={styles.input}
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            style={styles.input}
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button style={styles.button} type="submit" disabled={loading}>
            {loading ? 'Registering...' : 'Register'}
          </button>
        </form>
        <p style={styles.text}>
          Already have an account? <Link to="/login" style={styles.link}>Login</Link>
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex', justifyContent: 'center',
    alignItems: 'center', height: '100vh',
    backgroundColor: '#1a1a2e',
  },
  card: {
    backgroundColor: '#16213e', padding: '40px',
    borderRadius: '10px', width: '350px',
    boxShadow: '0 4px 20px rgba(0,0,0,0.3)',
  },
  title: { color: '#e94560', textAlign: 'center', marginBottom: '5px' },
  subtitle: { color: 'white', textAlign: 'center', marginBottom: '20px' },
  input: {
    width: '100%', padding: '12px', marginBottom: '15px',
    borderRadius: '5px', border: '1px solid #444',
    backgroundColor: '#0f3460', color: 'white',
    fontSize: '14px', boxSizing: 'border-box',
  },
  button: {
    width: '100%', padding: '12px',
    backgroundColor: '#e94560', color: 'white',
    border: 'none', borderRadius: '5px',
    fontSize: '16px', cursor: 'pointer',
  },
  text: { color: 'white', textAlign: 'center', marginTop: '15px' },
  link: { color: '#e94560' },
};

export default Register;