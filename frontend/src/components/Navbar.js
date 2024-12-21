import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <header className='navbar'>
        <div className='navbar-container'>
            <Link to="/" className='navbar-logo'>
                録音アプリ
            </Link>
            <nav className='navbar-links'>
                <Link to="/">Home</Link>
                <Link to="/about">About</Link>
            </nav>
        </div>
    </header>
  );
}

export default Navbar;
