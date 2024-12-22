// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import User from './pages/User';
import { AuthProvider } from './context/AuthContext';
import './components/Navbar'
import './components/audio.css';

function App() {
  return (
    <AuthProvider>
      
      <Router>
      <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
          <Route path="/USer" element={<User />} />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: 'blueviolet' }}>
        </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
