import { Link } from 'react-router-dom';
import { Globe, Share2, Mail } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer__grid">
          <div className="footer__brand">
            <Link to="/" className="footer__logo">
              <div className="footer__logo-symbol">
                <svg width="22" height="22" viewBox="0 0 28 28" fill="none">
                  <path
                    d="M4 22L14 3L24 22H18.5L14 13L9.5 22H4Z"
                    fill="url(#pm-footer-grad)"
                  />
                  <path
                    d="M14 3L21 17L18.5 22L14 13L9.5 22L7 17L14 3Z"
                    fill="#38BDF8"
                    opacity="0.85"
                  />
                  <defs>
                    <linearGradient id="pm-footer-grad" x1="4" y1="3" x2="24" y2="22" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#0066FF" />
                      <stop offset="1" stopColor="#38BDF8" />
                    </linearGradient>
                  </defs>
                </svg>
              </div>
              <span className="footer__logo-text">AthleteX</span>
            </Link>
            <p className="footer__tagline">
              Democratizing sports talent assessment. Connecting athletes with verified coaches and academies worldwide.
            </p>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Platform</h4>
            <Link to="/discover" className="footer__link">Explore</Link>
            <Link to="/discover?tab=coaches" className="footer__link">Find Coaches</Link>
            <Link to="/discover?tab=academies" className="footer__link">Featured Academies</Link>
            <Link to="/auth" className="footer__link">Join as Coach</Link>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Features</h4>
            <span className="footer__link">AI Talent Assessment</span>
            <span className="footer__link">Skill Radar Analysis</span>
            <span className="footer__link">Smart Matching</span>
            <span className="footer__link">Performance Tracking</span>
          </div>

          <div className="footer__links-group">
            <h4 className="footer__heading">Connect</h4>
            <a href="#" className="footer__link footer__link--icon"><Share2 size={14} /> Social</a>
            <a href="#" className="footer__link footer__link--icon"><Globe size={14} /> Global Network</a>
            <a href="#" className="footer__link footer__link--icon"><Mail size={14} /> Contact Us</a>
          </div>
        </div>

        <div className="footer__bottom">
          <p>© {new Date().getFullYear()} AthleteX. All rights reserved.</p>
          <p className="footer__built">Built with ⚡ for athletes, coaches, and sports champions</p>
        </div>
      </div>
    </footer>
  );
}
