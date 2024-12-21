import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import './components/Navbar'
import './components/audio.css';

function App() {
  return (
    <Router>
      <div className="content">
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>



        <footer style={{ textAlign: 'center', padding: '20px', backgroundColor: '#f1f1f1' }}>
      </footer>
      </div>
    </Router>
  );
}

export default App;
