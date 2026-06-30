import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const Resume = () => {
  const [file, setFile] = useState(null);
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchResumes();
  }, []);

  const fetchResumes = async () => {
    try {
      const res = await API.get('/resume/all');
      setResumes(res.data);
    } catch (err) {
      toast.error('Failed to fetch resumes');
    }
  };

  const handleUpload = async () => {
    if (!file) return toast.error('Please select a PDF file!');
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      await API.post('/resume/upload', formData);
      toast.success('Resume uploaded successfully!');
      fetchResumes();
      setFile(null);
    } catch (err) {
      toast.error('Upload failed!');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>📄 Resume Manager</h2>
      <div style={styles.uploadBox}>
        <h3 style={styles.sectionTitle}>Upload Resume</h3>
        <input
          type="file"
          accept=".pdf"
          onChange={(e) => setFile(e.target.files[0])}
          style={styles.fileInput}
        />
        <button onClick={handleUpload} style={styles.button} disabled={loading}>
          {loading ? 'Uploading...' : 'Upload PDF'}
        </button>
      </div>

      <div style={styles.resumeList}>
        <h3 style={styles.sectionTitle}>My Resumes ({resumes.length})</h3>
        {resumes.length === 0 ? (
          <p style={styles.noData}>No resumes uploaded yet</p>
        ) : (
          resumes.map((r) => (
            <div key={r.id} style={styles.resumeCard}>
              <div style={styles.resumeHeader}>
                <span style={styles.fileName}>📄 {r.fileName}</span>
                <span style={styles.date}>
                  {new Date(r.uploadedAt).toLocaleDateString()}
                </span>
              </div>
              <p style={styles.preview}>
                {r.extractedText?.substring(0, 200)}...
              </p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#1a1a2e', padding: '40px', color: 'white' },
  title: { color: '#e94560', marginBottom: '30px' },
  uploadBox: { backgroundColor: '#16213e', padding: '25px', borderRadius: '10px', marginBottom: '30px' },
  sectionTitle: { color: 'white', marginBottom: '15px' },
  fileInput: { display: 'block', marginBottom: '15px', color: 'white' },
  button: { padding: '10px 25px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  resumeList: { backgroundColor: '#16213e', padding: '25px', borderRadius: '10px' },
  noData: { color: '#aaa' },
  resumeCard: { backgroundColor: '#0f3460', padding: '15px', borderRadius: '8px', marginBottom: '15px' },
  resumeHeader: { display: 'flex', justifyContent: 'space-between', marginBottom: '10px' },
  fileName: { color: '#e94560', fontWeight: 'bold' },
  date: { color: '#aaa', fontSize: '13px' },
  preview: { color: '#ccc', fontSize: '13px', lineHeight: '1.5' },
};

export default Resume;