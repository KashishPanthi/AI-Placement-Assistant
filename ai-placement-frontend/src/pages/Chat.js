import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const Chat = () => {
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Hi! I am your AI Placement Assistant. Ask me anything about your career, resume, or interview prep! 🤖' }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: 'user', text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setLoading(true);
    try {
      const res = await API.post('/chat', { message: input });
      setMessages((prev) => [...prev, { role: 'ai', text: res.data.reply }]);
    } catch (err) {
      toast.error('Failed to get response!');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') sendMessage();
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🤖 AI Career Chat</h2>
      <div style={styles.chatBox}>
        {messages.map((msg, i) => (
          <div key={i} style={msg.role === 'user' ? styles.userMsg : styles.aiMsg}>
            <span style={styles.role}>{msg.role === 'user' ? '👤 You' : '🤖 AI'}</span>
            <pre style={styles.msgText}>{msg.text}</pre>
          </div>
        ))}
        {loading && (
          <div style={styles.aiMsg}>
            <span style={styles.role}>🤖 AI</span>
            <p style={styles.msgText}>Thinking...</p>
          </div>
        )}
      </div>
      <div style={styles.inputBar}>
        <input
          style={styles.input}
          placeholder="Ask anything about your career..."
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={handleKeyPress}
        />
        <button style={styles.button} onClick={sendMessage} disabled={loading}>
          Send 🚀
        </button>
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#1a1a2e', padding: '40px', color: 'white', display: 'flex', flexDirection: 'column' },
  title: { color: '#e94560', marginBottom: '20px' },
  chatBox: { flex: 1, backgroundColor: '#16213e', borderRadius: '10px', padding: '20px', marginBottom: '20px', overflowY: 'auto', maxHeight: '60vh' },
  userMsg: { backgroundColor: '#0f3460', padding: '12px', borderRadius: '8px', marginBottom: '10px', marginLeft: '20%' },
  aiMsg: { backgroundColor: '#533483', padding: '12px', borderRadius: '8px', marginBottom: '10px', marginRight: '20%' },
  role: { fontSize: '12px', color: '#e94560', display: 'block', marginBottom: '5px' },
  msgText: { color: 'white', margin: 0, whiteSpace: 'pre-wrap', fontSize: '14px', lineHeight: '1.5' },
  inputBar: { display: 'flex', gap: '10px' },
  input: { flex: 1, padding: '12px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#0f3460', color: 'white', fontSize: '14px' },
  button: { padding: '12px 25px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '15px' },
};

export default Chat;