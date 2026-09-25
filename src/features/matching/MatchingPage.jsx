import { useState, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAthletes } from '../../context/AthleteContext';
import { useCoaches } from '../../context/CoachContext';
import { SPORTS } from '../../data/sports';
import { computeMatchScore, rankAthletes } from '../../utils/matchingAlgorithm';
import { getInitials } from '../../utils/scoring';
import Card from '../../components/Card/Card';
import Button from '../../components/Button/Button';
import MatchScore from '../../components/MatchScore/MatchScore';
import SkillRadar from '../../components/SkillRadar/SkillRadar';
import ScoreBar from '../../components/ScoreBar/ScoreBar';
import {
  Target,
  Sliders,
  Sparkles,
  ArrowRight,
  Filter,
  RefreshCw,
  Search,
  ExternalLink,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import './MatchingPage.css';

export default function MatchingPage() {
  const { user } = useAuth();
  const { athletes } = useAthletes();
  const { coaches } = useCoaches();

  const currentCoach = coaches.find(c => c.id === user?.id) || coaches[0];
  const [selectedSport, setSelectedSport] = useState(currentCoach?.sport || 'basketball');
  const [minMatchThreshold, setMinMatchThreshold] = useState(50);
  const [selectedPosition, setSelectedPosition] = useState('all');
  const [expandedId, setExpandedId] = useState(null);

  // Editable target skill vector
  const currentSportConfig = SPORTS.find(s => s.id === selectedSport) || SPORTS[0];
  const defaultSkills = {};
  currentSportConfig.skills.forEach(s => {
    defaultSkills[s] = (currentCoach?.preferredSkills && currentCoach.preferredSkills[s]) || 80;
  });

  const [targetSkills, setTargetSkills] = useState(defaultSkills);

  const handleSportChange = (sportId) => {
    setSelectedSport(sportId);
    setSelectedPosition('all');
    const newSport = SPORTS.find(s => s.id === sportId) || SPORTS[0];
    const newSkills = {};
    newSport.skills.forEach(s => {
      newSkills[s] = 80;
    });
    setTargetSkills(newSkills);
  };

  const handleSkillSliderChange = (skillName, val) => {
    setTargetSkills(prev => ({
      ...prev,
      [skillName]: Number(val),
    }));
  };

  // Run dynamic matching engine
  const matchedAthletes = useMemo(() => {
    const sportAthletes = athletes.filter(a => {
      const matchSport = a.sport === selectedSport;
      const matchPos = selectedPosition === 'all' || a.position === selectedPosition;
      return matchSport && matchPos;
    });

    const ranked = rankAthletes(targetSkills, sportAthletes);
    return ranked.filter(r => r.matchScore >= minMatchThreshold);
  }, [athletes, targetSkills, selectedSport, selectedPosition, minMatchThreshold]);

  return (
    <div className="matching-page">
      <div className="container">
        {/* Page Header */}
        <div className="matching-header animate-fade-in-down">
          <div className="badge badge--gold">
            <Sparkles size={14} /> Algorithmic Talent Matcher
          </div>
          <h1>
            Cosine Similarity <span className="text-gradient">Scoring Engine</span>
          </h1>
          <p className="text-muted">
            Configure your target athlete skill vector below. The engine calculates multidimensional dot-product
            similarity to identify talent that fits your coaching system.
          </p>
        </div>

        {/* Top Sport & Filter Bar */}
        <div className="matching-filters-bar glass mt-lg">
          <div className="flex items-center gap-md flex-wrap">
            <span className="text-sm font-semibold flex items-center gap-xs">
              <Target size={16} className="text-gradient" /> Sport:
            </span>
            <div className="flex gap-xs flex-wrap">
              {SPORTS.map(s => (
                <button
                  key={s.id}
                  className={`sport-chip ${selectedSport === s.id ? 'active' : ''}`}
                  onClick={() => handleSportChange(s.id)}
                >
                  {s.icon} {s.name}
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-md flex-wrap mt-md">
            <div className="flex items-center gap-sm">
              <label className="text-xs text-muted font-medium">Position:</label>
              <select
                className="form-input form-select form-input--compact"
                value={selectedPosition}
                onChange={(e) => setSelectedPosition(e.target.value)}
              >
                <option value="all">All Positions</option>
                {currentSportConfig.positions.map(p => (
                  <option key={p} value={p}>{p}</option>
                ))}
              </select>
            </div>

            <div className="flex items-center gap-sm">
              <label className="text-xs text-muted font-medium">Min Match %:</label>
              <input
                type="range"
                min="40"
                max="90"
                value={minMatchThreshold}
                onChange={(e) => setMinMatchThreshold(Number(e.target.value))}
                className="skill-range-input"
                style={{ width: '100px' }}
              />
              <span className="text-xs font-bold">{minMatchThreshold}%+</span>
            </div>
          </div>
        </div>

        {/* 2-Column: Left Weight Tuner / Right Ranked Candidates */}
        <div className="matching-grid mt-xl">
          {/* Target Skill Vector Controls */}
          <div className="matching-left-col">
            <Card variant="glass" className="mb-lg">
              <div className="section-title-wrap">
                <div className="flex items-center gap-sm">
                  <Sliders size={18} className="text-gradient" />
                  <h3>Target Skill Vector</h3>
                </div>
                <button
                  className="text-xs text-muted hover:text-white flex items-center gap-xs"
                  onClick={() => {
                    const reset = {};
                    currentSportConfig.skills.forEach(s => { reset[s] = 80; });
                    setTargetSkills(reset);
                  }}
                >
                  <RefreshCw size={12} /> Reset
                </button>
              </div>

              <p className="text-muted text-xs mb-md">
                Adjust sliders to emphasize attributes critical for your playbook:
              </p>

              <div className="target-sliders-list">
                {Object.entries(targetSkills).map(([skill, val]) => (
                  <div key={skill} className="target-slider-item">
                    <div className="flex justify-between text-xs font-medium mb-xs">
                      <span>{skill}</span>
                      <span className="text-gradient font-bold">{val}</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="99"
                      value={val}
                      onChange={(e) => handleSkillSliderChange(skill, e.target.value)}
                      className="skill-range-input"
                    />
                  </div>
                ))}
              </div>

              <div className="mt-lg pt-md" style={{ borderTop: '1px solid var(--border-subtle)' }}>
                <SkillRadar skills={targetSkills} size={240} />
              </div>
            </Card>
          </div>

          {/* Ranked Candidates */}
          <div className="matching-right-col">
            <div className="flex items-center justify-between mb-md">
              <h3 className="text-lg font-bold">
                Ranked Candidates ({matchedAthletes.length} Found)
              </h3>
              <span className="text-xs text-muted">Sorted by Cosine Match Index</span>
            </div>

            {matchedAthletes.length > 0 ? (
              <div className="ranked-athletes-list">
                {matchedAthletes.map(({ athlete, matchScore, breakdown, similarity }, index) => {
                  const isExpanded = expandedId === athlete.id;
                  return (
                    <Card key={athlete.id} variant="glass" className="ranked-athlete-card">
                      <div className="ranked-card-main">
                        <div className="rank-badge">#{index + 1}</div>

                        <div className="ranked-athlete-avatar">
                          {getInitials(athlete.name)}
                        </div>

                        <div className="ranked-athlete-info">
                          <div className="flex items-center gap-sm">
                            <h4 className="font-bold text-base">{athlete.name}</h4>
                            <span className="badge badge--secondary">{athlete.position}</span>
                          </div>
                          <p className="text-muted text-xs mt-xs">
                            {athlete.location} • Age {athlete.age} • Overall Score: <strong>{athlete.overallScore}</strong>
                          </p>
                        </div>

                        <div className="ranked-score-wrap">
                          <MatchScore score={matchScore} size="sm" />
                        </div>

                        <div className="ranked-actions">
                          <Link to={`/profile/${athlete.id}`}>
                            <Button size="sm" variant="primary" iconRight={ExternalLink}>
                              Profile
                            </Button>
                          </Link>
                          <button
                            className="expand-btn"
                            onClick={() => setExpandedId(isExpanded ? null : athlete.id)}
                            title="View Skill Gap Breakdown"
                          >
                            {isExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                          </button>
                        </div>
                      </div>

                      {/* Detailed Skill Breakdown Drawer */}
                      {isExpanded && (
                        <div className="skill-breakdown-drawer animate-fade-in">
                          <div className="flex justify-between items-center mb-sm">
                            <h5 className="text-xs font-bold uppercase text-muted">
                              Cosine Vector Similarity: {similarity}% | Skill Gap Analysis
                            </h5>
                          </div>
                          <div className="breakdown-bars-grid">
                            {breakdown.map(item => (
                              <div key={item.skill} className="breakdown-item">
                                <div className="flex justify-between text-xs mb-xs">
                                  <span>{item.skill}</span>
                                  <span>
                                    Target: {item.preferred} vs Actual: <strong>{item.actual}</strong> ({item.gap >= 0 ? `+${item.gap}` : item.gap})
                                  </span>
                                </div>
                                <ScoreBar
                                  label=""
                                  value={item.actual}
                                  maxValue={100}
                                  color={item.gap >= 0 ? 'var(--color-success)' : 'var(--color-warning)'}
                                />
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </Card>
                  );
                })}
              </div>
            ) : (
              <Card variant="glass" className="empty-state-box">
                <Target size={48} className="text-muted mb-md" />
                <h4>No Matches Above {minMatchThreshold}% Threshold</h4>
                <p className="text-muted text-sm mt-xs">
                  Try lowering the match threshold or selecting 'All Positions' to see more prospective athletes.
                </p>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
