import { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { getInitials } from '../../utils/scoring';
import {
  Search,
  User,
  LogOut,
  Menu,
  X,
  LayoutDashboard,
  Bell,
} from 'lucide-react';
import './Navbar.css';

export default function Navbar() {
  const { user, isAuthenticated, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchVal, setSearchVal] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    setShowDropdown(false);
    navigate('/');
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Explore', path: '/discover' },
    { label: 'Coaches', path: '/discover?tab=coaches' },
    { label: 'Academies', path: '/discover?tab=academies' },
    { label: 'Sports', path: '/discover?tab=sports' },
    { label: 'Pricing', path: '/#pricing' },
  ];

  return (
    <header className={`navbar ${mobileOpen ? 'navbar--mobile-open' : ''}`}>
      <div className="navbar__container">
        {/* Brand Logo */}
        <Link to="/" className="navbar__logo">
          <div className="navbar__logo-symbol">
            <svg width="26" height="26" viewBox="0 0 28 28" fill="none">
              <path
                d="M4 22L14 3L24 22H18.5L14 13L9.5 22H4Z"
                fill="url(#pm-blue-grad)"
              />
              <path
                d="M14 3L21 17L18.5 22L14 13L9.5 22L7 17L14 3Z"
                fill="#38BDF8"
                opacity="0.85"
              />
              <defs>
                <linearGradient id="pm-blue-grad" x1="4" y1="3" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#0066FF" />
                  <stop offset="1" stopColor="#38BDF8" />
                </linearGradient>
              </defs>
            </svg>
          </div>
          <span className="navbar__brand">AthleteX</span>
        </Link>

        {/* Center Nav Links */}
        <nav className="navbar__nav">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path || (item.path === '/' && location.pathname === '/');
            return (
              <Link
                key={item.label}
                to={item.path}
                className={`navbar__link ${isActive ? 'navbar__link--active' : ''}`}
                onClick={() => setMobileOpen(false)}
              >
                {item.label}
                {isActive && <span className="navbar__active-indicator" />}
              </Link>
            );
          })}
        </nav>

        {/* Right Section: Search & Auth */}
        <div className="navbar__right">
          {/* Search Box */}
          <div className="navbar__search">
            <Search size={14} className="navbar__search-icon" />
            <input
              type="text"
              placeholder="Search coaches, academies, sports..."
              value={searchVal}
              onChange={(e) => setSearchVal(e.target.value)}
              className="navbar__search-input"
            />
          </div>

          {/* Notification Bell */}
          <button className="navbar__notif-btn" title="Notifications" type="button">
            <Bell size={18} />
            <span className="navbar__notif-dot" />
          </button>

          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <div
                className="navbar__avatar"
                onClick={() => setShowDropdown(!showDropdown)}
                title={user.name}
              >
                <img
                  src="https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=200&auto=format&fit=crop"
                  alt={user.name}
                  className="navbar__avatar-img"
                />
              </div>
              {showDropdown && (
                <div className="navbar__dropdown">
                  <div className="navbar__dropdown-header">
                    <div className="navbar__dropdown-name">{user.name}</div>
                    <div className="navbar__dropdown-role">{user.role}</div>
                  </div>
                  <button
                    className="navbar__dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate('/dashboard');
                    }}
                  >
                    <LayoutDashboard size={14} />
                    Dashboard
                  </button>
                  <button
                    className="navbar__dropdown-item"
                    onClick={() => {
                      setShowDropdown(false);
                      navigate(`/profile/${user.id}`);
                    }}
                  >
                    <User size={14} />
                    My Profile
                  </button>
                  <div className="navbar__dropdown-divider" />
                  <button
                    className="navbar__dropdown-item navbar__dropdown-item--danger"
                    onClick={handleLogout}
                  >
                    <LogOut size={14} />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <div className="navbar__auth-actions">
              <Link to="/auth" className="navbar__login-btn">
                Login
              </Link>
              <Link to="/auth?mode=signup" className="navbar__signup-btn">
                Sign Up
              </Link>
            </div>
          )}

          {/* Mobile hamburger */}
          <button
            className="navbar__menu-btn"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle Navigation"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>
    </header>
  );
}
