// src/Header.js
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

function Header() {
    const [isMenuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen((prev) => !prev);
    };

    return (
        <header className="app-header">
            <div className="header-left">
                <nav className="nav-menu">
                    <Link to="/dashboard">Dashboard</Link>
                    <Link to="/pay">Pay/Transfer</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to='/our-team'>Our Team</Link>
                </nav>
            </div>
            <div className="header-right">
                <div className="burger-menu" onClick={toggleMenu}>
                    <div className="bar"></div>
                    <div className="bar"></div>
                    <div className="bar"></div>
                </div>
                {isMenuOpen && (
                    <div className="dropdown-menu">
                        <Link to="/settings" onClick={() => setMenuOpen(false)}>
                            Settings
                        </Link>
                        <Link to="/help" onClick={() => setMenuOpen(false)}>
                            Help
                        </Link>
                        <Link to="/manage-cards" onClick={() => setMenuOpen(false)}>
                            Manage Credit/Debit Card
                        </Link>
                    </div>
                )}
            </div>
        </header>
    );
}

export default Header;
