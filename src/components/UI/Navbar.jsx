import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Compass, MessageCircle, Home } from 'lucide-react';
import './Navbar.css';

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { path: '/', label: 'Home', icon: Home },
    { path: '/explorer', label: 'Explorer', icon: Compass },
    { path: '/chat', label: 'Space Chat', icon: MessageCircle },
  ];

  return (
    <nav className="glass-panel main-navbar">
      <div className="nav-logo">
        <span className="text-glow">SolarKids</span>
      </div>
      <ul className="nav-links">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = location.pathname === item.path;
          return (
            <li key={item.path}>
              <Link to={item.path} className={`nav-link ${isActive ? 'active' : ''}`}>
                <Icon size={20} />
                <span>{item.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
