import React, { useState } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const Interview = () => {
  const [topic, setTopic] = useState('');
  const [questions, setQuestions] = useState('');
  const [answer, setAnswer] = useState('');
  const [question, setQuestion] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const generateQuestions = async () => {
    if (!topic) return toast.error('Please enter a topic!');
    setLoading(true);
    try {
      const res = await API.get(`/interview/questions?topic=${topic}`);
      setQuestions(res.data.reply);
    } catch (err) {
      toast.error('Failed to generate questions!');
    } finally {
      setLoading(false);
    }
  };

  const submitAnswer = async () => {
    if (!question || !answer) return toast.error('Please enter question and answer!');
    setLoading(true);
    try {
      const res = await API.post('/interview/submit', { topic, question, answer });
      setFeedback(res.data.reply);
    } catch (err) {
      toast.error('Failed to get feedback!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>🎯 Interview Practice</h2>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Generate Questions</h3>
        <input
          style={styles.input}
          placeholder="Enter topic (e.g. Spring Boot, React, DSA)"
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
        />
        <button style={styles.button} onClick={generateQuestions} disabled={loading}>
          {loading ? 'Generating...' : 'Generate Questions'}
        </button>
        {questions && (
          <div style={styles.output}>
            <pre style={styles.pre}>{questions}</pre>
          </div>
        )}
      </div>

      <div style={styles.section}>
        <h3 style={styles.sectionTitle}>Practice Answer</h3>
        <input
          style={styles.input}
          placeholder="Enter the question"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
        />
        <textarea
          style={styles.textarea}
          placeholder="Type your answer here..."
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          rows={5}
        />
        <button style={styles.button} onClick={submitAnswer} disabled={loading}>
          {loading ? 'Getting Feedback...' : 'Get AI Feedback'}
        </button>
        {feedback && (
          <div style={styles.output}>
            <pre style={styles.pre}>{feedback}</pre>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#1a1a2e', padding: '40px', color: 'white' },
  title: { color: '#e94560', marginBottom: '30px' },
  section: { backgroundColor: '#16213e', padding: '25px', borderRadius: '10px', marginBottom: '25px' },
  sectionTitle: { color: 'white', marginBottom: '15px' },
  input: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#0f3460', color: 'white', fontSize: '14px', boxSizing: 'border-box' },
  textarea: { width: '100%', padding: '12px', marginBottom: '15px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#0f3460', color: 'white', fontSize: '14px', boxSizing: 'border-box', resize: 'vertical' },
  button: { padding: '10px 25px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  output: { marginTop: '20px', backgroundColor: '#0f3460', padding: '15px', borderRadius: '8px' },
  pre: { color: '#ccc', whiteSpace: 'pre-wrap', fontSize: '13px', lineHeight: '1.6' },
};

export default Interview;