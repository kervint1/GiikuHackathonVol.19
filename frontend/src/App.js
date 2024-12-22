// src/App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Login from './pages/Login';
import { AuthProvider } from './context/AuthContext';
import './components/Navbar'
import './components/audio.css';

function App() {
  return (
    <AuthProvider>
      
      <Router>
      <div className="content">
        <nav>
          <Link to="/">Home</Link> | <Link to="/about">About</Link> | <Link to="/login">Login</Link>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>
        </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
