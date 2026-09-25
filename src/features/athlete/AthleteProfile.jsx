import { useState, useEffect } from 'react';
import { useParams, Link, useLocation } from 'react-router-dom';
import { useAthletes } from '../../context/AthleteContext';
import { useAuth } from '../../context/AuthContext';
import AIAnalysisView from './AIAnalysisView';
import {
  User,
  Trophy,
  PlayCircle,
  FileText,
  BarChart2,
  Calendar,
  MessageSquare,
  Settings,
  Camera,
  Edit3,
  MapPin,
  Briefcase,
  Activity,
  Dumbbell,
  Target,
  Heart,
  Check,
  X,
  ShieldCheck,
  Sparkles,
} from 'lucide-react';
import SkillRadar from '../../components/SkillRadar/SkillRadar';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import './Athlete.css';

export default function AthleteProfile({ defaultTab = 'profile' }) {
  const { id } = useParams();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get('tab') || defaultTab;
  const { athletes, updateAthlete } = useAthletes();
  const { user } = useAuth();

  // Find target athlete (default to Sayantan Patra if id is not found or empty)
  const targetAthlete =
    athletes.find((a) => a.id === id || a.id === 'sayantan-patra') ||
    athletes[0] || {
      id: 'sayantan-patra',
      name: 'Sayantan Patra',
      role: 'Athlete',
      sport: 'Football',
      location: 'Kharagpur, West Bengal',
      age: 22,
      bio: 'Passionate football player looking to improve skills and connect with professional coaches.',
      experience: '5 years',
      trainingPerWeek: '4 days',
      preferredPosition: 'Midfielder',
      goals: [
        'Improve fitness and endurance',
        'Learn advanced techniques',
        'Play at a higher competitive level',
      ],
      interests: ['Strength Training', 'Tactics', 'Match Analysis', 'Nutrition'],
      avatar: 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
      banner: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
    };

  // State for active sidebar item
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    const tabFromUrl = new URLSearchParams(location.search).get('tab');
    if (tabFromUrl) {
      setActiveTab(tabFromUrl);
    } else if (defaultTab) {
      setActiveTab(defaultTab);
    }
  }, [location.search, defaultTab]);

  // State for editable profile fields
  const [profileData, setProfileData] = useState({
    name: targetAthlete.name || 'Sayantan Patra',
    role: targetAthlete.role || 'Athlete',
    sport: targetAthlete.sport || 'Football',
    location: targetAthlete.location || 'Kharagpur, West Bengal',
    age: targetAthlete.age || 22,
    bio: targetAthlete.bio || 'Passionate football player looking to improve skills and connect with professional coaches.',
    experience: targetAthlete.experience || '5 years',
    trainingPerWeek: targetAthlete.trainingPerWeek || '4 days',
    preferredPosition: targetAthlete.preferredPosition || 'Midfielder',
    goals: targetAthlete.goals || [
      'Improve fitness and endurance',
      'Learn advanced techniques',
      'Play at a higher competitive level',
    ],
    interests: targetAthlete.interests || [
      'Strength Training',
      'Tactics',
      'Match Analysis',
      'Nutrition',
    ],
    avatar: targetAthlete.avatar || 'https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=400&auto=format&fit=crop',
    banner: targetAthlete.banner || 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=1200&auto=format&fit=crop',
  });

  // Edit Modal State
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editSection, setEditSection] = useState('all');
  const [tempData, setTempData] = useState(profileData);
  const [toastMessage, setToastMessage] = useState('');

  const openEdit = (section = 'all') => {
    setEditSection(section);
    setTempData({ ...profileData });
    setIsEditModalOpen(true);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    setProfileData({ ...tempData });
    if (updateAthlete && targetAthlete.id) {
      updateAthlete(targetAthlete.id, tempData);
    }
    setIsEditModalOpen(false);
    setToastMessage('Profile updated successfully!');
    setTimeout(() => setToastMessage(''), 3000);
  };

  const navMenuItems = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'achievements', label: 'Achievements', icon: Trophy },
    { id: 'videos', label: 'Videos', icon: PlayCircle },
    { id: 'certificates', label: 'Certificates', icon: FileText },
    { id: 'ai-analysis', label: 'AI Analysis', icon: BarChart2 },
    { id: 'matches', label: 'Matches', icon: Calendar },
    { id: 'messages', label: 'Messages', icon: MessageSquare },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="pm-profile-page">
      <div className="pm-profile-layout">
        {/* ──────── LEFT SIDEBAR ──────── */}
        <aside className="pm-profile-sidebar">
          <nav className="pm-profile-nav">
            {navMenuItems.map(({ id: itemId, label, icon: Icon }) => {
              const isActive = activeTab === itemId;
              return (
                <button
                  key={itemId}
                  type="button"
                  onClick={() => setActiveTab(itemId)}
                  className={`pm-profile-nav-item ${isActive ? 'pm-profile-nav-item--active' : ''}`}
                >
                  <Icon size={18} className="pm-profile-nav-icon" />
                  <span className="pm-profile-nav-label">{label}</span>
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ──────── MAIN CONTENT AREA ──────── */}
        <main className="pm-profile-main">
          {toastMessage && (
            <div className="pm-profile-toast">
              <Check size={16} /> {toastMessage}
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="pm-profile-content">
              {/* TOP HEADER BANNER CARD */}
              <div className="pm-profile-hero-card">
                {/* Left side: Avatar & Bio */}
                <div className="pm-profile-hero-left">
                  <div className="pm-profile-avatar-wrapper">
                    <img
                      src={profileData.avatar}
                      alt={profileData.name}
                      className="pm-profile-avatar-img"
                    />
                    <button
                      type="button"
                      className="pm-profile-camera-btn"
                      title="Update Profile Photo"
                      onClick={() => openEdit('avatar')}
                    >
                      <Camera size={14} />
                    </button>
                  </div>

                  <div className="pm-profile-hero-details">
                    <h1 className="pm-profile-name">{profileData.name}</h1>
                    <div className="pm-profile-meta-tags">
                      <span className="pm-meta-pill">{profileData.role}</span>
                      <span className="pm-meta-pill">{profileData.sport}</span>
                    </div>
                    <div className="pm-profile-submeta">
                      <span>{profileData.location}</span>
                      <span className="pm-dot-separator">•</span>
                      <span>{profileData.age} years</span>
                    </div>
                    <p className="pm-profile-bio">{profileData.bio}</p>
                  </div>
                </div>

                {/* Right side: Action Photo Banner & Edit Profile Button */}
                <div className="pm-profile-hero-right">
                  <img
                    src={profileData.banner}
                    alt="Sports Action Banner"
                    className="pm-profile-banner-img"
                  />
                  <div className="pm-profile-banner-overlay" />
                  <button
                    type="button"
                    onClick={() => openEdit('all')}
                    className="pm-profile-edit-btn"
                  >
                    Edit Profile
                  </button>
                </div>
              </div>

              {/* MIDDLE ROW: Basic Information & Stats */}
              <div className="pm-profile-row pm-profile-row--2col">
                {/* Basic Information Box */}
                <div className="pm-card pm-card--info">
                  <div className="pm-card__header">
                    <h3 className="pm-card__title">Basic Information</h3>
                    <button
                      type="button"
                      className="pm-card__edit-btn"
                      onClick={() => openEdit('basic')}
                      title="Edit Basic Information"
                    >
                      <Edit3 size={15} />
                    </button>
                  </div>

                  <div className="pm-info-list">
                    <div className="pm-info-row">
                      <div className="pm-info-key">
                        <User size={16} className="pm-info-icon" />
                        <span>Name</span>
                      </div>
                      <div className="pm-info-val">{profileData.name}</div>
                    </div>

                    <div className="pm-info-row">
                      <div className="pm-info-key">
                        <Briefcase size={16} className="pm-info-icon" />
                        <span>Role</span>
                      </div>
                      <div className="pm-info-val">{profileData.role}</div>
                    </div>

                    <div className="pm-info-row">
                      <div className="pm-info-key">
                        <Activity size={16} className="pm-info-icon" />
                        <span>Sport</span>
                      </div>
                      <div className="pm-info-val">{profileData.sport}</div>
                    </div>

                    <div className="pm-info-row">
                      <div className="pm-info-key">
                        <MapPin size={16} className="pm-info-icon" />
                        <span>Location</span>
                      </div>
                      <div className="pm-info-val">{profileData.location}</div>
                    </div>

                    <div className="pm-info-row">
                      <div className="pm-info-key">
                        <Calendar size={16} className="pm-info-icon" />
                        <span>Age</span>
                      </div>
                      <div className="pm-info-val">{profileData.age} years</div>
                    </div>
                  </div>
                </div>

                {/* Stats Box */}
                <div className="pm-card pm-card--stats">
                  <div className="pm-card__header">
                    <h3 className="pm-card__title">Stats</h3>
                    <button
                      type="button"
                      className="pm-card__edit-action"
                      onClick={() => openEdit('stats')}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                  </div>

                  <div className="pm-stats-grid">
                    {/* Stat 1: Experience */}
                    <div className="pm-stat-box">
                      <div className="pm-stat-box__icon pm-stat-box__icon--blue">
                        <BarChart2 size={18} />
                      </div>
                      <span className="pm-stat-box__label">Experience</span>
                      <span className="pm-stat-box__value">{profileData.experience}</span>
                    </div>

                    {/* Stat 2: Training / Week */}
                    <div className="pm-stat-box">
                      <div className="pm-stat-box__icon pm-stat-box__icon--green">
                        <Dumbbell size={18} />
                      </div>
                      <span className="pm-stat-box__label">Training / Week</span>
                      <span className="pm-stat-box__value">{profileData.trainingPerWeek}</span>
                    </div>

                    {/* Stat 3: Preferred Position */}
                    <div className="pm-stat-box">
                      <div className="pm-stat-box__icon pm-stat-box__icon--purple">
                        <Target size={18} />
                      </div>
                      <span className="pm-stat-box__label">Preferred Position</span>
                      <span className="pm-stat-box__value">{profileData.preferredPosition}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* BOTTOM ROW: Goals & Interests */}
              <div className="pm-profile-row pm-profile-row--2col">
                {/* Goals Box */}
                <div className="pm-card pm-card--goals">
                  <div className="pm-card__header">
                    <div className="pm-card__title-wrap">
                      <Target size={18} className="pm-card__header-icon pm-card__header-icon--blue" />
                      <h3 className="pm-card__title">Goals</h3>
                    </div>
                    <button
                      type="button"
                      className="pm-card__edit-action"
                      onClick={() => openEdit('goals')}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                  </div>

                  <ul className="pm-goals-list">
                    {profileData.goals.map((goal, i) => (
                      <li key={i} className="pm-goal-item">
                        <span className="pm-goal-bullet" />
                        <span>{goal}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Interests Box */}
                <div className="pm-card pm-card--interests">
                  <div className="pm-card__header">
                    <div className="pm-card__title-wrap">
                      <Heart size={18} className="pm-card__header-icon pm-card__header-icon--pink" />
                      <h3 className="pm-card__title">Interests</h3>
                    </div>
                    <button
                      type="button"
                      className="pm-card__edit-action"
                      onClick={() => openEdit('interests')}
                    >
                      <Edit3 size={13} /> Edit
                    </button>
                  </div>

                  <div className="pm-interests-chips">
                    {profileData.interests.map((interest, i) => (
                      <span key={i} className="pm-interest-chip">
                        {interest}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* ACHIEVEMENTS TAB */}
          {activeTab === 'achievements' && (
            <div className="pm-tab-pane">
              <div className="pm-card">
                <div className="pm-card__header">
                  <h3 className="pm-card__title">Verified Achievements</h3>
                  <button type="button" className="pm-profile-edit-btn" onClick={() => openEdit('achievements')}>
                    + Add Achievement
                  </button>
                </div>
                <div className="pm-achievements-grid">
                  {(targetAthlete.achievements || []).map((ach) => (
                    <div key={ach.id} className="pm-achievement-card">
                      <Trophy size={24} className="pm-achievement-icon" />
                      <div>
                        <h4 className="pm-achievement-title">{ach.title}</h4>
                        <p className="pm-achievement-desc">{ach.description}</p>
                        <span className="pm-achievement-date">{ach.date}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* VIDEOS TAB */}
          {activeTab === 'videos' && (
            <div className="pm-tab-pane">
              <div className="pm-card">
                <div className="pm-card__header">
                  <h3 className="pm-card__title">Match Highlights & Training Clips</h3>
                  <button type="button" className="pm-profile-edit-btn">
                    + Upload Video
                  </button>
                </div>
                <div className="pm-videos-grid">
                  {(targetAthlete.videos || []).map((vid) => (
                    <div key={vid.id} className="pm-video-card">
                      <div className="pm-video-card__thumbnail">
                        <PlayCircle size={40} className="pm-video-card__play" />
                      </div>
                      <h4 className="pm-video-card__title">{vid.title}</h4>
                      <span className="pm-video-card__meta">
                        {vid.duration} • {vid.views} views
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* AI ANALYSIS TAB */}
          {activeTab === 'ai-analysis' && (
            <div className="pm-tab-pane">
              <AIAnalysisView />
            </div>
          )}

          {/* OTHER TABS */}
          {['certificates', 'matches', 'messages', 'settings'].includes(activeTab) && (
            <div className="pm-tab-pane">
              <div className="pm-card text-center" style={{ padding: '60px 20px', textAlign: 'center' }}>
                <h3 style={{ textTransform: 'capitalize', marginBottom: '8px' }}>{activeTab.replace('-', ' ')}</h3>
                <p style={{ color: '#94a3b8', fontSize: '0.9rem' }}>
                  Manage your {activeTab} information, connected coaches, and platform preferences.
                </p>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* ──────── EDIT PROFILE MODAL ──────── */}
      {isEditModalOpen && (
        <div className="pm-modal-backdrop" onClick={() => setIsEditModalOpen(false)}>
          <div className="pm-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pm-modal__header">
              <h3 className="pm-modal__title">Edit Profile</h3>
              <button
                type="button"
                className="pm-modal__close-btn"
                onClick={() => setIsEditModalOpen(false)}
              >
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="pm-modal__body">
              <div className="pm-modal__grid">
                <div className="pm-form-field">
                  <label className="pm-form-label">Full Name</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.name}
                    onChange={(e) => setTempData({ ...tempData, name: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Role</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.role}
                    onChange={(e) => setTempData({ ...tempData, role: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Sport</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.sport}
                    onChange={(e) => setTempData({ ...tempData, sport: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Location</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.location}
                    onChange={(e) => setTempData({ ...tempData, location: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Age</label>
                  <input
                    type="number"
                    className="pm-form-input"
                    value={tempData.age}
                    onChange={(e) => setTempData({ ...tempData, age: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Experience</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.experience}
                    onChange={(e) => setTempData({ ...tempData, experience: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Training / Week</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.trainingPerWeek}
                    onChange={(e) => setTempData({ ...tempData, trainingPerWeek: e.target.value })}
                  />
                </div>

                <div className="pm-form-field">
                  <label className="pm-form-label">Preferred Position</label>
                  <input
                    type="text"
                    className="pm-form-input"
                    value={tempData.preferredPosition}
                    onChange={(e) => setTempData({ ...tempData, preferredPosition: e.target.value })}
                  />
                </div>
              </div>

              <div className="pm-form-field" style={{ marginTop: '14px' }}>
                <label className="pm-form-label">Bio</label>
                <textarea
                  className="pm-form-input pm-form-textarea"
                  rows={3}
                  value={tempData.bio}
                  onChange={(e) => setTempData({ ...tempData, bio: e.target.value })}
                />
              </div>

              <div className="pm-modal__footer">
                <button
                  type="button"
                  className="pm-btn pm-btn--outline"
                  onClick={() => setIsEditModalOpen(false)}
                >
                  Cancel
                </button>
                <button type="submit" className="pm-btn pm-btn--primary">
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
