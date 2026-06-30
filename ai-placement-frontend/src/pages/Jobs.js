import React, { useState, useEffect } from 'react';
import API from '../services/api';
import { toast } from 'react-toastify';

const Jobs = () => {
  const [jobs, setJobs] = useState([]);
  const [search, setSearch] = useState('');
  const [form, setForm] = useState({ title: '', company: '', description: '', location: '', salary: '' });
  const [showForm, setShowForm] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const res = await API.get('/jobs');
      setJobs(res.data);
    } catch (err) {
      toast.error('Failed to fetch jobs');
    }
  };

  const handleSearch = async () => {
    try {
      const res = await API.get(`/jobs/search?title=${search}`);
      setJobs(res.data);
    } catch (err) {
      toast.error('Search failed');
    }
  };

  const handleAdd = async () => {
    try {
      await API.post('/jobs', form);
      toast.success('Job added!');
      setShowForm(false);
      fetchJobs();
    } catch (err) {
      toast.error('Failed to add job');
    }
  };

  const handleDelete = async (id) => {
    try {
      await API.delete(`/jobs/${id}`);
      toast.success('Job deleted!');
      fetchJobs();
    } catch (err) {
      toast.error('Failed to delete job');
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>💼 Job Listings</h2>

      <div style={styles.topBar}>
        <input
          style={styles.searchInput}
          placeholder="Search jobs by title..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button style={styles.button} onClick={handleSearch}>Search</button>
        <button style={styles.button} onClick={fetchJobs}>All Jobs</button>
        <button style={{ ...styles.button, backgroundColor: '#533483' }} onClick={() => setShowForm(!showForm)}>
          + Add Job
        </button>
      </div>

      {showForm && (
        <div style={styles.form}>
          {['title', 'company', 'description', 'location', 'salary'].map((field) => (
            <input
              key={field}
              style={styles.input}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
            />
          ))}
          <button style={styles.button} onClick={handleAdd}>Save Job</button>
        </div>
      )}

      <div style={styles.jobList}>
        {jobs.length === 0 ? (
          <p style={styles.noData}>No jobs found</p>
        ) : (
          jobs.map((job) => (
            <div key={job.id} style={styles.jobCard}>
              <div style={styles.jobHeader}>
                <h3 style={styles.jobTitle}>{job.title}</h3>
                <button style={styles.deleteBtn} onClick={() => handleDelete(job.id)}>🗑️</button>
              </div>
              <p style={styles.company}>🏢 {job.company}</p>
              <p style={styles.location}>📍 {job.location} | 💰 {job.salary}</p>
              <p style={styles.desc}>{job.description}</p>
            </div>
          ))
        )}
      </div>
    </div>
  );
};

const styles = {
  container: { minHeight: '100vh', backgroundColor: '#1a1a2e', padding: '40px', color: 'white' },
  title: { color: '#e94560', marginBottom: '20px' },
  topBar: { display: 'flex', gap: '10px', marginBottom: '25px', flexWrap: 'wrap' },
  searchInput: { flex: 1, padding: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#0f3460', color: 'white', fontSize: '14px' },
  button: { padding: '10px 20px', backgroundColor: '#e94560', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer' },
  form: { backgroundColor: '#16213e', padding: '20px', borderRadius: '10px', marginBottom: '25px' },
  input: { width: '100%', padding: '10px', marginBottom: '10px', borderRadius: '5px', border: '1px solid #444', backgroundColor: '#0f3460', color: 'white', boxSizing: 'border-box' },
  jobList: {},
  noData: { color: '#aaa' },
  jobCard: { backgroundColor: '#16213e', padding: '20px', borderRadius: '10px', marginBottom: '15px' },
  jobHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' },
  jobTitle: { color: '#e94560', margin: 0 },
  company: { color: '#ccc', margin: '8px 0' },
  location: { color: '#aaa', fontSize: '13px', margin: '5px 0' },
  desc: { color: '#ccc', fontSize: '13px', marginTop: '10px' },
  deleteBtn: { background: 'none', border: 'none', cursor: 'pointer', fontSize: '18px' },
};

export default Jobs;