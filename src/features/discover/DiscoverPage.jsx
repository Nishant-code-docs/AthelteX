import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAthletes } from '../../context/AthleteContext';
import { useCoaches } from '../../context/CoachContext';
import { SPORTS } from '../../data/sports';
import { getInitials, getScoreTier } from '../../utils/scoring';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import SkillRadar from '../../components/SkillRadar/SkillRadar';
import {
  Search,
  Users,
  Award,
  Filter,
  MapPin,
  Flame,
  ArrowRight,
  ShieldCheck,
  Trophy,
  Video,
  Star,
} from 'lucide-react';
import './DiscoverPage.css';

export default function DiscoverPage() {
  const { athletes } = useAthletes();
  const { coaches } = useCoaches();

  const [activeTab, setActiveTab] = useState('athletes'); // 'athletes' | 'coaches'
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSport, setSelectedSport] = useState('all');
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'name'

  // Filtered athletes
  const filteredAthletes = useMemo(() => {
    return athletes
      .filter(athlete => {
        const matchesSearch =
          athlete.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          athlete.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          athlete.position?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport = selectedSport === 'all' || athlete.sport === selectedSport;
        return matchesSearch && matchesSport;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return (b.overallScore || 0) - (a.overallScore || 0);
        return a.name.localeCompare(b.name);
      });
  }, [athletes, searchQuery, selectedSport, sortBy]);

  // Filtered coaches
  const filteredCoaches = useMemo(() => {
    return coaches
      .filter(coach => {
        const matchesSearch =
          coach.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coach.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
          coach.specialization?.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesSport = selectedSport === 'all' || coach.sport === selectedSport;
        return matchesSearch && matchesSport;
      })
      .sort((a, b) => {
        if (sortBy === 'score') return (b.rating || 0) - (a.rating || 0);
        return a.name.localeCompare(b.name);
      });
  }, [coaches, searchQuery, selectedSport, sortBy]);

  return (
    <div className="discover-page">
      <div className="container">
        {/* Header */}
        <div className="discover-header animate-fade-in-down">
          <div className="badge badge--secondary">
            <Users size={14} /> Global Talent & Scouting Directory
          </div>
          <h1>
            Discover <span className="text-gradient">Athletes & Mentors</span>
          </h1>
          <p className="text-muted">
            Explore verified talent profiles, highlight reels, and certified coaches across all sports disciplines.
          </p>
        </div>

        {/* Search & Tabs Controls */}
        <div className="discover-controls glass mt-lg">
          {/* Role Tabs */}
          <div className="discover-tabs">
            <button
              className={`discover-tab ${activeTab === 'athletes' ? 'active' : ''}`}
              onClick={() => setActiveTab('athletes')}
            >
              <Users size={16} /> Athletes ({athletes.length})
            </button>
            <button
              className={`discover-tab ${activeTab === 'coaches' ? 'active' : ''}`}
              onClick={() => setActiveTab('coaches')}
            >
              <Award size={16} /> Coaches & Scouts ({coaches.length})
            </button>
          </div>

          {/* Search bar */}
          <div className="discover-filter-row mt-md">
            <div className="search-input-wrap">
              <Search size={16} className="search-icon" />
              <input
                type="text"
                className="form-input search-input"
                placeholder={`Search ${activeTab} by name, position, or city...`}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>

            <div className="flex gap-sm items-center flex-wrap">
              <select
                className="form-input form-select discover-select"
                value={selectedSport}
                onChange={(e) => setSelectedSport(e.target.value)}
              >
                <option value="all">All Sports</option>
                {SPORTS.map(s => (
                  <option key={s.id} value={s.id}>{s.icon} {s.name}</option>
                ))}
              </select>

              <select
                className="form-input form-select discover-select"
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
              >
                <option value="score">Sort by {activeTab === 'athletes' ? 'Talent Score' : 'Rating'}</option>
                <option value="name">Sort by Name (A-Z)</option>
              </select>
            </div>
          </div>
        </div>

        {/* Directory Grid */}
        {activeTab === 'athletes' ? (
          <div className="discover-grid mt-xl">
            {filteredAthletes.map(athlete => {
              const scoreTier = getScoreTier(athlete.overallScore || 75);
              const sportConfig = SPORTS.find(s => s.id === athlete.sport) || SPORTS[0];

              return (
                <Card key={athlete.id} variant="glass" className="discover-card">
                  <div className="discover-card-top">
                    <div className="discover-avatar">
                      {getInitials(athlete.name)}
                    </div>
                    <div className="discover-card-badge-wrap">
                      <div className="discover-score-pill">
                        <Flame size={14} color="var(--color-primary-light)" />
                        <span className="font-extrabold">{athlete.overallScore || 80}</span>
                      </div>
                      <span className="text-xs font-semibold" style={{ color: scoreTier.color }}>
                        {scoreTier.label}
                      </span>
                    </div>
                  </div>

                  <div className="discover-card-body mt-md">
                    <h3 className="discover-name">{athlete.name}</h3>
                    <p className="discover-meta text-xs text-muted">
                      <span>{sportConfig?.icon} {sportConfig?.name}</span> • <span>{athlete.position}</span>
                    </p>
                    <p className="discover-loc text-xs text-muted mt-xs flex items-center gap-xs">
                      <MapPin size={12} /> {athlete.location || 'Global'}
                    </p>
                    <p className="discover-bio text-xs text-muted mt-sm">
                      {athlete.bio?.slice(0, 85)}...
                    </p>
                  </div>

                  {/* Mini Skill Radar Preview */}
                  <div className="discover-radar-wrap mt-md">
                    <SkillRadar skills={athlete.skills || {}} size={160} showLabels={false} />
                  </div>

                  {/* Highlights & Trophies Count */}
                  <div className="discover-card-stats mt-sm">
                    <span className="flex items-center gap-xs text-xs text-muted">
                      <Video size={12} /> {athlete.videos?.length || 0} Videos
                    </span>
                    <span className="flex items-center gap-xs text-xs text-muted">
                      <Trophy size={12} /> {athlete.achievements?.length || 0} Honors
                    </span>
                  </div>

                  <div className="discover-card-footer mt-md">
                    <Link to={`/profile/${athlete.id}`} className="w-full">
                      <Button fullWidth size="sm" variant="primary" iconRight={ArrowRight}>
                        View Portfolio
                      </Button>
                    </Link>
                  </div>
                </Card>
              );
            })}
          </div>
        ) : (
          <div className="discover-grid mt-xl">
            {filteredCoaches.map(coach => (
              <Card key={coach.id} variant="glass" className="discover-card">
                <div className="discover-card-top">
                  <div className="discover-avatar" style={{ background: 'var(--gradient-accent)' }}>
                    {getInitials(coach.name)}
                  </div>
                  <div className="discover-card-badge-wrap">
                    <div className="discover-score-pill">
                      <Star size={14} color="var(--color-warning)" />
                      <span className="font-extrabold">{coach.rating || 4.9}</span>
                    </div>
                    <span className="text-xs font-semibold text-muted">
                      {coach.yearsCoaching || 10}+ Yrs
                    </span>
                  </div>
                </div>

                <div className="discover-card-body mt-md">
                  <h3 className="discover-name">{coach.name}</h3>
                  <p className="discover-meta text-xs text-muted">
                    <span>{coach.sport?.toUpperCase()}</span> • <span>{coach.specialization}</span>
                  </p>
                  <p className="discover-loc text-xs text-muted mt-xs flex items-center gap-xs">
                    <MapPin size={12} /> {coach.location}
                  </p>
                  <p className="discover-bio text-xs text-muted mt-sm">
                    {coach.philosophy?.slice(0, 95)}...
                  </p>
                </div>

                <div className="discover-certifications mt-md">
                  {coach.certifications?.slice(0, 2).map((c, i) => (
                    <span key={i} className="badge badge--secondary text-xs">{c}</span>
                  ))}
                </div>

                <div className="discover-card-footer mt-lg">
                  <Link to={`/profile/${coach.id}`} className="w-full">
                    <Button fullWidth size="sm" variant="secondary" iconRight={ArrowRight}>
                      View Coaching Profile
                    </Button>
                  </Link>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
