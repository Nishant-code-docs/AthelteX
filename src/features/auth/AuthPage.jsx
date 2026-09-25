import { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAthletes } from '../../context/AthleteContext';
import { useCoaches } from '../../context/CoachContext';
import { v4 as uuidv4 } from 'uuid';
import { Zap, User, Award, Mail, Lock, Eye, EyeOff } from 'lucide-react';
import Button from '../../components/Button/Button';
import './AuthPage.css';

export default function AuthPage() {
  const [searchParams] = useSearchParams();
  const preselectedRole = searchParams.get('role');
  const [isLogin, setIsLogin] = useState(false);
  const [role, setRole] = useState(preselectedRole || 'athlete');
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  });
  const [error, setError] = useState('');

  const { login } = useAuth();
  const { athletes, addAthlete } = useAthletes();
  const { coaches, addCoach } = useCoaches();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all required fields.');
      return;
    }

    if (isLogin) {
      // Login: find existing user
      const allUsers = [...athletes, ...coaches];
      const user = allUsers.find(u => u.email === formData.email);
      if (user) {
        login(user);
        navigate('/dashboard');
      } else {
        setError('No account found with this email. Please sign up first.');
      }
    } else {
      // Sign up
      if (!formData.name) {
        setError('Please enter your name.');
        return;
      }

      const id = role === 'athlete' ? `ath-${uuidv4().slice(0, 8)}` : `coach-${uuidv4().slice(0, 8)}`;
      
      const userData = {
        id,
        role,
        name: formData.name,
        email: formData.email,
        avatar: null,
        createdAt: new Date().toISOString().split('T')[0],
      };

      if (role === 'athlete') {
        const athleteData = {
          ...userData,
          sport: '',
          position: '',
          location: '',
          age: '',
          experience: '',
          bio: '',
          skills: {},
          overallScore: 0,
          achievements: [],
          videos: [],
          connectedCoaches: [],
        };
        addAthlete(athleteData);
        login(athleteData);
      } else {
        const coachData = {
          ...userData,
          sport: '',
          specialization: '',
          location: '',
          experience: '',
          certifications: [],
          bio: '',
          philosophy: '',
          preferredSkills: {},
          connectedAthletes: [],
          successStories: 0,
          yearsCoaching: 0,
          rating: 0,
        };
        addCoach(coachData);
        login(coachData);
      }

      navigate('/setup');
    }
  };

  return (
    <div className="auth">
      <div className="auth__bg">
        <div className="auth__orb auth__orb--1" />
        <div className="auth__orb auth__orb--2" />
      </div>
      <div className="auth__card animate-scale-in">
        <div className="auth__header">
          <div className="auth__logo">
            <Zap size={24} />
          </div>
          <h2>{isLogin ? 'Welcome Back' : 'Join AthleteX'}</h2>
          <p className="text-muted">
            {isLogin ? 'Log in to your account' : 'Create your account and start your journey'}
          </p>
        </div>

        {!isLogin && (
          <div className="auth__role-toggle">
            <button
              className={`auth__role-btn ${role === 'athlete' ? 'auth__role-btn--active' : ''}`}
              onClick={() => setRole('athlete')}
              type="button"
            >
              <User size={16} />
              Athlete
            </button>
            <button
              className={`auth__role-btn ${role === 'coach' ? 'auth__role-btn--active' : ''}`}
              onClick={() => setRole('coach')}
              type="button"
            >
              <Award size={16} />
              Coach
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth__form">
          {!isLogin && (
            <div className="form-group">
              <label className="form-label">Full Name</label>
              <div className="auth__input-wrap">
                <User size={16} className="auth__input-icon" />
                <input
                  type="text"
                  name="name"
                  className="form-input auth__input"
                  placeholder="Enter your full name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <div className="auth__input-wrap">
              <Mail size={16} className="auth__input-icon" />
              <input
                type="email"
                name="email"
                className="form-input auth__input"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Password</label>
            <div className="auth__input-wrap">
              <Lock size={16} className="auth__input-icon" />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="form-input auth__input"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
              />
              <button
                type="button"
                className="auth__eye-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          {error && <div className="auth__error">{error}</div>}

          <Button type="submit" fullWidth size="lg" icon={Zap}>
            {isLogin ? 'Log In' : 'Create Account'}
          </Button>
        </form>

        <div className="auth__footer">
          <span className="text-muted">
            {isLogin ? "Don't have an account?" : 'Already have an account?'}
          </span>
          <button
            className="auth__toggle-btn"
            onClick={() => { setIsLogin(!isLogin); setError(''); }}
          >
            {isLogin ? 'Sign Up' : 'Log In'}
          </button>
        </div>

        {isLogin && (
          <div className="auth__demo">
            <p className="auth__demo-label">Quick Demo Access</p>
            <div className="auth__demo-btns">
              <button
                className="auth__demo-btn"
                onClick={() => {
                  const demoAthlete = athletes[0];
                  if (demoAthlete) { login(demoAthlete); navigate('/dashboard'); }
                }}
              >
                🏃 Demo Athlete
              </button>
              <button
                className="auth__demo-btn"
                onClick={() => {
                  const demoCoach = coaches[0];
                  if (demoCoach) { login(demoCoach); navigate('/dashboard'); }
                }}
              >
                🎯 Demo Coach
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
