import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Resume from './pages/Resume';
import Interview from './pages/Interview';
import Jobs from './pages/Jobs';
import Chat from './pages/Chat';
import Navbar from './components/Navbar';
import PrivateRoute from './components/PrivateRoute';
import { isLoggedIn } from './utils/auth';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <Router>
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/" element={
          <PrivateRoute>
            <Navbar />
            <Dashboard />
          </PrivateRoute>
        } />
        <Route path="/resume" element={
          <PrivateRoute>
            <Navbar />
            <Resume />
          </PrivateRoute>
        } />
        <Route path="/interview" element={
          <PrivateRoute>
            <Navbar />
            <Interview />
          </PrivateRoute>
        } />
        <Route path="/jobs" element={
          <PrivateRoute>
            <Navbar />
            <Jobs />
          </PrivateRoute>
        } />
        <Route path="/chat" element={
          <PrivateRoute>
            <Navbar />
            <Chat />
          </PrivateRoute>
        } />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
}

export default App;