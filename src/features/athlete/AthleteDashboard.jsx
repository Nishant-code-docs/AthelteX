import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAthletes } from '../../context/AthleteContext';
import { useCoaches } from '../../context/CoachContext';
import { getScoreTier, getInitials } from '../../utils/scoring';
import { SPORTS, ACHIEVEMENT_TYPES } from '../../data/sports';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import StatCard from '../../components/StatCard/StatCard';
import SkillRadar from '../../components/SkillRadar/SkillRadar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import VideoPlayer from '../../components/VideoPlayer/VideoPlayer';
import Modal from '../../components/Modal/Modal';
import {
  Trophy,
  Video,
  Target,
  Sparkles,
  Plus,
  TrendingUp,
  Award,
  Users,
  MapPin,
  Flame,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import './Athlete.css';

export default function AthleteDashboard() {
  const { user } = useAuth();
  const { athletes, addAchievement, addVideo } = useAthletes();
  const { coaches } = useCoaches();

  const currentAthlete = athletes.find(a => a.id === user?.id) || user || athletes[0];
  const skills = currentAthlete.skills || {};
  const overallScore = currentAthlete.overallScore || 80;
  const scoreTier = getScoreTier(overallScore);

  // Modals state
  const [achievementModalOpen, setAchievementModalOpen] = useState(false);
  const [videoModalOpen, setVideoModalOpen] = useState(false);

  // Form states
  const [achForm, setAchForm] = useState({ title: '', description: '', type: 'trophy', date: '' });
  const [vidForm, setVidForm] = useState({ title: '', duration: '3:00', url: '' });

  const handleAddAchievement = (e) => {
    e.preventDefault();
    if (!achForm.title) return;
    addAchievement(currentAthlete.id, {
      id: `ach-${Date.now()}`,
      ...achForm,
      date: achForm.date || new Date().toISOString().split('T')[0],
    });
    setAchForm({ title: '', description: '', type: 'trophy', date: '' });
    setAchievementModalOpen(false);
  };

  const handleAddVideo = (e) => {
    e.preventDefault();
    if (!vidForm.title) return;
    addVideo(currentAthlete.id, {
      id: `vid-${Date.now()}`,
      ...vidForm,
      views: 1,
    });
    setVidForm({ title: '', duration: '3:00', url: '' });
    setVideoModalOpen(false);
  };

  const sportConfig = SPORTS.find(s => s.id === currentAthlete.sport) || SPORTS[0];

  return (
    <div className="athlete-dashboard">
      <div className="container">
        {/* Profile Header Banner */}
        <div className="athlete-hero-card glass animate-fade-in-down">
          <div className="athlete-hero-content">
            <div className="athlete-avatar-large">
              {getInitials(currentAthlete.name || 'Athlete')}
            </div>
            <div className="athlete-hero-info">
              <div className="flex items-center gap-sm flex-wrap">
                <h2>{currentAthlete.name}</h2>
                <span className="badge badge--secondary flex items-center gap-xs">
                  <ShieldCheck size={12} /> Verified Athlete
                </span>
              </div>
              <p className="athlete-meta-subtitle">
                <span>{sportConfig?.icon} {sportConfig?.name}</span> • <span>{currentAthlete.position || 'Player'}</span> •{' '}
                <span className="flex items-center gap-xs inline-flex"><MapPin size={12} /> {currentAthlete.location || 'Global'}</span>
              </p>
              <p className="athlete-bio-snippet">{currentAthlete.bio || 'Passionate athlete focused on high-performance athletic development.'}</p>
            </div>
            <div className="athlete-score-badge">
              <span className="athlete-score-number">{overallScore}</span>
              <span className="athlete-score-tier" style={{ color: scoreTier.color }}>
                {scoreTier.label} Rating
              </span>
            </div>
          </div>
        </div>

        {/* Quick Stat Cards */}
        <div className="grid grid-4 gap-md mt-lg">
          <StatCard
            icon={Flame}
            label="Overall Talent Index"
            value={overallScore}
            suffix="/100"
            color="var(--color-primary)"
            trend={4}
          />
          <StatCard
            icon={Trophy}
            label="Achievements"
            value={currentAthlete.achievements?.length || 0}
            color="var(--color-warning)"
          />
          <StatCard
            icon={Video}
            label="Reels & Highlights"
            value={currentAthlete.videos?.length || 0}
            color="var(--color-accent)"
          />
          <StatCard
            icon={Users}
            label="Connected Coaches"
            value={currentAthlete.connectedCoaches?.length || 0}
            color="var(--color-success)"
          />
        </div>

        {/* Core Layout: Left Radar & Skills / Right Achievements & Videos */}
        <div className="athlete-grid-layout mt-xl">
          {/* Left Column: Skills Radar & Breakdown */}
          <div className="athlete-left-col">
            <Card variant="glass" className="mb-lg">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Sparkles size={18} className="text-gradient" />
                  <h3>Performance Skill Matrix</h3>
                </div>
                <span className="badge">{sportConfig?.name}</span>
              </div>
              <p className="text-muted text-sm mb-md">
                Multi-axis skill scoring used for algorithmic matchmaking with coach criteria.
              </p>
              <SkillRadar skills={skills} size={280} />

              <div className="skills-breakdown-list mt-md">
                {Object.entries(skills).map(([skillName, value]) => (
                  <ScoreBar key={skillName} label={skillName} value={value} />
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column: Video Highlights + Achievements */}
          <div className="athlete-right-col">
            {/* Video Showcase Section */}
            <Card variant="glass" className="mb-lg">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Video size={18} className="text-gradient" />
                  <h3>Highlight Reels & Game Film</h3>
                </div>
                <Button size="sm" icon={Plus} onClick={() => setVideoModalOpen(true)}>
                  Upload Reel
                </Button>
              </div>

              {currentAthlete.videos && currentAthlete.videos.length > 0 ? (
                <div className="grid grid-2 gap-md mt-md">
                  {currentAthlete.videos.map(vid => (
                    <VideoPlayer key={vid.id} video={vid} />
                  ))}
                </div>
              ) : (
                <div className="empty-state-box">
                  <Video size={36} className="text-muted mb-sm" />
                  <p className="font-semibold">No highlight videos uploaded yet</p>
                  <p className="text-muted text-sm">Upload clips to let coaches analyze your form, speed, and game decisions.</p>
                  <Button size="sm" icon={Plus} className="mt-md" onClick={() => setVideoModalOpen(true)}>
                    Add First Highlight
                  </Button>
                </div>
              )}
            </Card>

            {/* Achievements Section */}
            <Card variant="glass">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Trophy size={18} className="text-gradient" />
                  <h3>Trophies & Milestones</h3>
                </div>
                <Button size="sm" variant="secondary" icon={Plus} onClick={() => setAchievementModalOpen(true)}>
                  Add Milestone
                </Button>
              </div>

              {currentAthlete.achievements && currentAthlete.achievements.length > 0 ? (
                <div className="achievements-list mt-md">
                  {currentAthlete.achievements.map(ach => {
                    const achType = ACHIEVEMENT_TYPES.find(t => t.id === ach.type) || ACHIEVEMENT_TYPES[0];
                    return (
                      <div key={ach.id} className="achievement-row">
                        <span className="achievement-icon-pill">{achType.icon}</span>
                        <div className="achievement-info">
                          <div className="flex items-center justify-between">
                            <span className="achievement-title">{ach.title}</span>
                            <span className="achievement-date text-muted text-xs">{ach.date}</span>
                          </div>
                          <p className="achievement-desc text-sm text-muted">{ach.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              ) : (
                <div className="empty-state-box">
                  <Trophy size={36} className="text-muted mb-sm" />
                  <p className="font-semibold">No milestones recorded</p>
                  <p className="text-muted text-sm">Record medals, championships, MVPs, and records.</p>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>

      {/* Modal: Add Achievement */}
      <Modal
        isOpen={achievementModalOpen}
        onClose={() => setAchievementModalOpen(false)}
        title="Add Verified Milestone"
      >
        <form onSubmit={handleAddAchievement} className="form-group gap-md">
          <div className="form-group">
            <label className="form-label">Milestone Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. State Championship MVP"
              value={achForm.title}
              onChange={(e) => setAchForm({ ...achForm, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Category</label>
            <select
              className="form-input form-select"
              value={achForm.type}
              onChange={(e) => setAchForm({ ...achForm, type: e.target.value })}
            >
              {ACHIEVEMENT_TYPES.map(t => (
                <option key={t.id} value={t.id}>{t.icon} {t.label}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Date Achieved</label>
            <input
              type="date"
              className="form-input"
              value={achForm.date}
              onChange={(e) => setAchForm({ ...achForm, date: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Description / Context</label>
            <textarea
              className="form-input form-textarea"
              placeholder="Details regarding the event, records set, stats, or opponent..."
              value={achForm.description}
              onChange={(e) => setAchForm({ ...achForm, description: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-sm mt-md">
            <Button variant="ghost" onClick={() => setAchievementModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" icon={Award}>Save Achievement</Button>
          </div>
        </form>
      </Modal>

      {/* Modal: Add Video */}
      <Modal
        isOpen={videoModalOpen}
        onClose={() => setVideoModalOpen(false)}
        title="Upload Video Highlight"
      >
        <form onSubmit={handleAddVideo} className="form-group gap-md">
          <div className="form-group">
            <label className="form-label">Highlight Title</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 2025 Game Winning Drive & Clutch Plays"
              value={vidForm.title}
              onChange={(e) => setVidForm({ ...vidForm, title: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Video URL or Tag</label>
            <input
              type="text"
              className="form-input"
              placeholder="https://youtu.be/... or MP4 link"
              value={vidForm.url}
              onChange={(e) => setVidForm({ ...vidForm, url: e.target.value })}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Estimated Duration</label>
            <input
              type="text"
              className="form-input"
              placeholder="e.g. 4:32"
              value={vidForm.duration}
              onChange={(e) => setVidForm({ ...vidForm, duration: e.target.value })}
            />
          </div>

          <div className="flex justify-end gap-sm mt-md">
            <Button variant="ghost" onClick={() => setVideoModalOpen(false)}>Cancel</Button>
            <Button type="submit" variant="primary" icon={Video}>Publish Highlight</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}
