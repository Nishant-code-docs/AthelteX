import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useCoaches } from '../../context/CoachContext';
import { useAthletes } from '../../context/AthleteContext';
import { rankAthletes } from '../../utils/matchingAlgorithm';
import { getInitials } from '../../utils/scoring';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import StatCard from '../../components/StatCard/StatCard';
import MatchScore from '../../components/MatchScore/MatchScore';
import SkillRadar from '../../components/SkillRadar/SkillRadar';
import {
  Target,
  Users,
  Award,
  Sparkles,
  ArrowRight,
  Flame,
  Search,
  ExternalLink,
  ShieldCheck,
  Filter,
  CheckCircle,
} from 'lucide-react';
import './Coach.css';

export default function CoachDashboard() {
  const { user } = useAuth();
  const { coaches } = useCoaches();
  const { athletes } = useAthletes();

  const currentCoach = coaches.find(c => c.id === user?.id) || user || coaches[0];
  const preferredSkills = currentCoach.preferredSkills || {
    Speed: 90,
    Agility: 85,
    Shooting: 80,
    Passing: 85,
    Defense: 75,
    Rebounding: 70,
  };

  // Run cosine similarity matching engine for this coach against all athletes
  const rankedTalents = rankAthletes(preferredSkills, athletes);
  const topMatches = rankedTalents.slice(0, 4);

  // Connected athletes
  const connectedAthletesList = athletes.filter(a =>
    currentCoach.connectedAthletes?.includes(a.id)
  );

  return (
    <div className="coach-dashboard">
      <div className="container">
        {/* Coach Header Banner */}
        <div className="coach-hero-card glass animate-fade-in-down">
          <div className="coach-hero-content">
            <div className="coach-avatar-large">
              {getInitials(currentCoach.name || 'Coach')}
            </div>
            <div className="coach-hero-info">
              <div className="flex items-center gap-sm flex-wrap">
                <h2>{currentCoach.name}</h2>
                <span className="badge badge--accent flex items-center gap-xs">
                  <ShieldCheck size={12} /> Certified Coach
                </span>
              </div>
              <p className="coach-meta-subtitle">
                <span>{currentCoach.sport?.toUpperCase()}</span> • <span>{currentCoach.specialization || 'Head Coach'}</span> •{' '}
                <span>{currentCoach.location || 'Global'}</span>
              </p>
              <p className="coach-bio-snippet">{currentCoach.philosophy || currentCoach.bio}</p>
            </div>
            <div className="coach-cta-box">
              <Link to="/matching">
                <Button variant="primary" icon={Target} size="md">
                  Run Talent Matcher
                </Button>
              </Link>
            </div>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-4 gap-md mt-lg">
          <StatCard
            icon={Target}
            label="Scouted Talent Matches"
            value={rankedTalents.length}
            color="var(--color-primary)"
          />
          <StatCard
            icon={Users}
            label="Active Roster / Connected"
            value={connectedAthletesList.length}
            color="var(--color-secondary)"
          />
          <StatCard
            icon={Award}
            label="Success Stories Placed"
            value={currentCoach.successStories || 12}
            color="var(--color-warning)"
          />
          <StatCard
            icon={Flame}
            label="Coach Rating"
            value={currentCoach.rating || 4.9}
            suffix="★"
            color="var(--color-accent)"
          />
        </div>

        {/* 2-Column Scout Dashboard */}
        <div className="coach-grid-layout mt-xl">
          {/* Left Column: Target Skill Benchmark */}
          <div className="coach-left-col">
            <Card variant="glass" className="mb-lg">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Sparkles size={18} className="text-gradient" />
                  <h3>Target Skill Matrix</h3>
                </div>
                <Link to="/setup" className="text-xs text-muted hover:text-white underline">
                  Adjust Weights
                </Link>
              </div>
              <p className="text-muted text-sm mb-md">
                Your desired skill profile used as the vector benchmark for talent similarity calculations.
              </p>
              <SkillRadar skills={preferredSkills} size={280} />
            </Card>

            {/* Connected Athletes List */}
            <Card variant="glass">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Users size={18} className="text-gradient" />
                  <h3>Connected Athletes</h3>
                </div>
                <span className="badge badge--secondary">{connectedAthletesList.length}</span>
              </div>
              {connectedAthletesList.length > 0 ? (
                <div className="connected-list mt-md">
                  {connectedAthletesList.map(athlete => (
                    <Link
                      key={athlete.id}
                      to={`/profile/${athlete.id}`}
                      className="connected-athlete-card"
                    >
                      <div className="connected-avatar">{getInitials(athlete.name)}</div>
                      <div className="connected-info">
                        <span className="font-semibold text-sm">{athlete.name}</span>
                        <span className="text-muted text-xs">{athlete.position} • Score: {athlete.overallScore}</span>
                      </div>
                      <ExternalLink size={14} className="text-muted" />
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="empty-state-box py-md">
                  <p className="text-muted text-sm">No athletes connected yet. Browse recommendations or run the matching algorithm.</p>
                </div>
              )}
            </Card>
          </div>

          {/* Right Column: Top Algorithmic Matches */}
          <div className="coach-right-col">
            <Card variant="glass">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Target size={18} className="text-gradient" />
                  <h3>Top Recommended Talent (Similarity Matches)</h3>
                </div>
                <Link to="/matching">
                  <Button size="sm" variant="ghost" iconRight={ArrowRight}>
                    View All
                  </Button>
                </Link>
              </div>

              <div className="matches-grid mt-md">
                {topMatches.map(({ athlete, matchScore, similarity }) => (
                  <div key={athlete.id} className="match-card-item glass">
                    <div className="match-card-header">
                      <div className="flex items-center gap-md">
                        <div className="athlete-mini-avatar">
                          {getInitials(athlete.name)}
                        </div>
                        <div>
                          <h4 className="font-bold text-base">{athlete.name}</h4>
                          <span className="text-muted text-xs">
                            {athlete.sport?.toUpperCase()} • {athlete.position} • {athlete.location}
                          </span>
                        </div>
                      </div>
                      <MatchScore score={matchScore} size="sm" />
                    </div>

                    <p className="text-sm text-muted match-card-bio mt-sm">
                      {athlete.bio?.slice(0, 110)}...
                    </p>

                    <div className="match-card-skills-row mt-md">
                      {Object.entries(athlete.skills || {}).slice(0, 4).map(([k, v]) => (
                        <span key={k} className="skill-pill">
                          {k}: <strong>{v}</strong>
                        </span>
                      ))}
                    </div>

                    <div className="match-card-footer mt-md">
                      <span className="text-xs text-muted">
                        Cosine Fit: <strong>{similarity}%</strong>
                      </span>
                      <Link to={`/profile/${athlete.id}`}>
                        <Button size="sm" variant="secondary" iconRight={ArrowRight}>
                          Review Profile
                        </Button>
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
