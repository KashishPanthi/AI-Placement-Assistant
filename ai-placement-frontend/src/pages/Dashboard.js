import React from 'react';
import { useNavigate } from 'react-router-dom';
import { getName } from '../utils/auth';

const Dashboard = () => {
  const navigate = useNavigate();
  const name = getName();

  const cards = [
    { title: '📄 Resume', desc: 'Upload and analyze your resume', path: '/resume', color: '#e94560' },
    { title: '🎯 Interview', desc: 'Practice interview questions with AI', path: '/interview', color: '#0f3460' },
    { title: '💼 Jobs', desc: 'Browse and search job listings', path: '/jobs', color: '#533483' },
    { title: '🤖 AI Chat', desc: 'Chat with AI for career guidance', path: '/chat', color: '#e94560' },
  ];

  return (
    <div style={styles.container}>
      <h2 style={styles.welcome}>Welcome back, {name}! 👋</h2>
      <p style={styles.subtitle}>What would you like to do today?</p>
      <div style={styles.grid}>
        {cards.map((card, i) => (
          <div
            key={i}
            style={{ ...styles.card, borderTop: `4px solid ${card.color}` }}
            onClick={() => navigate(card.path)}
          >
            <h3 style={styles.cardTitle}>{card.title}</h3>
            <p style={styles.cardDesc}>{card.desc}</p>
            <button style={{ ...styles.button, backgroundColor: card.color }}>
              Go →
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: '100vh', backgroundColor: '#1a1a2e',
    padding: '40px', color: 'white',
  },
  welcome: { fontSize: '28px', color: '#e94560', marginBottom: '5px' },
  subtitle: { color: '#aaa', marginBottom: '30px' },
  grid: {
    display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '20px', maxWidth: '800px',
  },
  card: {
    backgroundColor: '#16213e', padding: '25px',
    borderRadius: '10px', cursor: 'pointer',
    transition: 'transform 0.2s',
  },
  cardTitle: { fontSize: '20px', marginBottom: '10px' },
  cardDesc: { color: '#aaa', marginBottom: '20px' },
  button: {
    padding: '8px 20px', color: 'white',
    border: 'none', borderRadius: '5px', cursor: 'pointer',
  },
};

export default Dashboard;