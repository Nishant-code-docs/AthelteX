import { useState } from 'react';
import {
  Sparkles,
  TrendingUp,
  Download,
  ArrowUpRight,
  Target,
  Compass,
  Zap,
  Activity,
  ChevronDown,
  ChevronRight,
  Play,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react';
import './AIAnalysis.css';

export default function AIAnalysisView() {
  const [selectedSport, setSelectedSport] = useState('Football');
  const [timeRange, setTimeRange] = useState('Last 3 Months');
  const [metricRange, setMetricRange] = useState('Last 6 Months');
  const [activeSportOpen, setActiveSportOpen] = useState(false);
  const [activeTimeOpen, setActiveTimeOpen] = useState(false);
  const [activeMetricOpen, setActiveMetricOpen] = useState(false);

  // Performance multi-line chart points (6 months)
  const months = ['May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct'];
  const metricsData = [
    { label: 'Speed', color: '#00e5ff', points: [70, 75, 82, 86, 88, 90] },
    { label: 'Stamina', color: '#10b981', points: [66, 72, 78, 76, 80, 82] },
    { label: 'Passing', color: '#f59e0b', points: [60, 65, 70, 74, 76, 78] },
    { label: 'Shooting', color: '#c026d3', points: [52, 55, 58, 56, 61, 64] },
  ];

  // SVG Chart Dimensions
  const chartW = 540;
  const chartH = 140;
  const padX = 20;
  const padY = 15;
  const usableW = chartW - padX * 2;
  const usableH = chartH - padY * 2;

  // Generate SVG path for a metric
  const getPath = (points) => {
    const coords = points.map((val, idx) => {
      const x = padX + (idx / (points.length - 1)) * usableW;
      const y = padY + (1 - (val - 45) / 55) * usableH;
      return [x, y];
    });

    // Create smooth bezier curve
    return coords.reduce((acc, [x, y], i, arr) => {
      if (i === 0) return `M ${x} ${y}`;
      const [prevX, prevY] = arr[i - 1];
      const midX = (prevX + x) / 2;
      return `${acc} C ${midX} ${prevY}, ${midX} ${y}, ${x} ${y}`;
    }, '');
  };

  // Radar Chart Data (6 Axes: Speed, Stamina, Passing, Shooting, Defending, Tactical)
  const radarAxes = [
    { label: 'Speed', angle: 270, value: 0.9 },
    { label: 'Stamina', angle: 330, value: 0.82 },
    { label: 'Passing', angle: 30, value: 0.78 },
    { label: 'Shooting', angle: 90, value: 0.65 },
    { label: 'Defending', angle: 150, value: 0.72 },
    { label: 'Tactical', angle: 210, value: 0.85 },
  ];

  const radarCenter = { x: 120, y: 110 };
  const radarRadius = 75;

  const getRadarPoint = (angleDeg, r) => {
    const rad = (angleDeg * Math.PI) / 180;
    return {
      x: radarCenter.x + r * Math.cos(rad),
      y: radarCenter.y + r * Math.sin(rad),
    };
  };

  // Radar polygon points
  const currentRadarPolygon = radarAxes
    .map((axis) => {
      const pt = getRadarPoint(axis.angle, radarRadius * axis.value);
      return `${pt.x},${pt.y}`;
    })
    .join(' ');

  // Matches list
  const matches = [
    {
      id: 1,
      opponent: 'vs Riverside FC',
      date: '12 Sep 2024',
      rating: '8.2',
      ratingColor: '#a855f7',
      goals: 2,
      assists: 1,
      thumb: 'https://images.unsplash.com/photo-1574629810360-7efbbe195018?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 2,
      opponent: 'vs United Academy',
      date: '5 Sep 2024',
      rating: '7.6',
      ratingColor: '#38bdf8',
      goals: 0,
      assists: 2,
      thumb: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 3,
      opponent: 'vs City Juniors',
      date: '28 Aug 2024',
      rating: '7.9',
      ratingColor: '#10b981',
      goals: 1,
      assists: 1,
      thumb: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=200&auto=format&fit=crop',
    },
  ];

  // Video Insights
  const videoInsights = [
    {
      id: 1,
      title: 'Passing Analysis',
      subtitle: 'Key moments from your last 3 matches',
      duration: '02:14',
      category: 'Passing',
      badgeColor: '#10b981',
      badgeBg: 'rgba(16, 185, 129, 0.15)',
      thumb: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 2,
      title: 'Movement Heatmap',
      subtitle: 'Your positioning on the field',
      duration: '01:48',
      category: 'Tactical',
      badgeColor: '#38bdf8',
      badgeBg: 'rgba(56, 189, 248, 0.15)',
      thumb: 'https://images.unsplash.com/photo-1511886929837-354d827aae26?q=80&w=200&auto=format&fit=crop',
    },
    {
      id: 3,
      title: 'Defensive Actions',
      subtitle: 'Tackles, interceptions and clearances',
      duration: '01:32',
      category: 'Defending',
      badgeColor: '#a855f7',
      badgeBg: 'rgba(168, 85, 247, 0.15)',
      thumb: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?q=80&w=200&auto=format&fit=crop',
    },
  ];

  return (
    <div className="pm-ai-view">
      {/* ──────── HEADER CONTROLS ──────── */}
      <div className="pm-ai-hdr">
        <div className="pm-ai-hdr__left">
          <h1 className="pm-ai-hdr__title">AI Analysis</h1>
          <p className="pm-ai-hdr__subtitle">
            Get personalized insights on your performance. Track your strengths, identify areas to improve,
            and receive AI-powered recommendations.
          </p>
        </div>

        <div className="pm-ai-hdr__controls">
          {/* Sport Dropdown */}
          <div className="pm-select-wrap">
            <span className="pm-select-lbl">Sport</span>
            <div
              className="pm-select-btn"
              onClick={() => {
                setActiveSportOpen(!activeSportOpen);
                setActiveTimeOpen(false);
              }}
            >
              <span>⚽ {selectedSport}</span>
              <ChevronDown size={14} />
            </div>
            {activeSportOpen && (
              <div className="pm-dropdown-menu">
                {['Football', 'Basketball', 'Tennis', 'Cricket'].map((s) => (
                  <div
                    key={s}
                    className="pm-dropdown-item"
                    onClick={() => {
                      setSelectedSport(s);
                      setActiveSportOpen(false);
                    }}
                  >
                    {s}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Time Range Dropdown */}
          <div className="pm-select-wrap">
            <span className="pm-select-lbl">Time Range:</span>
            <div
              className="pm-select-btn"
              onClick={() => {
                setActiveTimeOpen(!activeTimeOpen);
                setActiveSportOpen(false);
              }}
            >
              <span>{timeRange}</span>
              <ChevronDown size={14} />
            </div>
            {activeTimeOpen && (
              <div className="pm-dropdown-menu">
                {['Last 1 Month', 'Last 3 Months', 'Last 6 Months', 'All Time'].map((t) => (
                  <div
                    key={t}
                    className="pm-dropdown-item"
                    onClick={() => {
                      setTimeRange(t);
                      setActiveTimeOpen(false);
                    }}
                  >
                    {t}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Export Report Button */}
          <button type="button" className="pm-btn-export">
            <Download size={15} />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {/* ──────── ROW 1: 4 TOP CARDS ──────── */}
      <div className="pm-ai-row pm-ai-row--4col">
        {/* Card 1: Overall Score */}
        <div className="pm-ai-card pm-ai-card--score">
          <h3 className="pm-ai-card__title">Overall Score</h3>
          <div className="pm-score-block">
            {/* Circular Gauge */}
            <div className="pm-score-ring">
              <svg width="100" height="100" viewBox="0 0 100 100">
                <defs>
                  <linearGradient id="score-grad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#00e5ff" />
                    <stop offset="50%" stopColor="#0066ff" />
                    <stop offset="100%" stopColor="#d946ef" />
                  </linearGradient>
                </defs>
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(255,255,255,0.06)"
                  strokeWidth="8"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#score-grad)"
                  strokeWidth="8"
                  strokeDasharray="263.9"
                  strokeDashoffset={263.9 * (1 - 0.78)}
                  strokeLinecap="round"
                  transform="rotate(-90 50 50)"
                />
              </svg>
              <div className="pm-score-ring__center">
                <span className="pm-score-num">78</span>
                <span className="pm-score-max">/100</span>
              </div>
            </div>

            {/* Score Meta */}
            <div className="pm-score-meta">
              <span className="pm-score-badge">
                <TrendingUp size={12} /> 12%
              </span>
              <span className="pm-score-sub">Better than last month</span>
            </div>
          </div>
        </div>

        {/* Card 2: Strengths */}
        <div className="pm-ai-card pm-ai-card--strengths">
          <h3 className="pm-ai-card__title pm-ai-card__title--green">Strengths</h3>
          <div className="pm-items-list">
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--green">
                <Zap size={14} />
              </div>
              <span className="pm-item-text">Speed</span>
            </div>
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--green">
                <Activity size={14} />
              </div>
              <span className="pm-item-text">Endurance</span>
            </div>
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--green">
                <CheckCircle2 size={14} />
              </div>
              <span className="pm-item-text">Ball Control</span>
            </div>
          </div>
        </div>

        {/* Card 3: Areas to Improve */}
        <div className="pm-ai-card pm-ai-card--improve">
          <h3 className="pm-ai-card__title pm-ai-card__title--red">Areas to Improve</h3>
          <div className="pm-items-list">
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--red">
                <Target size={14} />
              </div>
              <span className="pm-item-text">Passing Accuracy</span>
            </div>
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--red">
                <Compass size={14} />
              </div>
              <span className="pm-item-text">Tactical Awareness</span>
            </div>
            <div className="pm-item-row">
              <div className="pm-item-icon pm-item-icon--red">
                <TrendingUp size={14} />
              </div>
              <span className="pm-item-text">Consistency</span>
            </div>
          </div>
        </div>

        {/* Card 4: AI Recommendation */}
        <div className="pm-ai-card pm-ai-card--rec">
          <div className="pm-ai-rec-header">
            <Sparkles size={16} className="pm-ai-rec-sparkle" />
            <h3 className="pm-ai-card__title pm-ai-card__title--purple">AI Recommendation</h3>
          </div>
          <p className="pm-ai-rec-text">
            Focus on improving your passing accuracy through targeted drills and match practice.
          </p>
          <div className="pm-ai-rec-action">
            <button type="button" className="pm-ai-rec-btn">
              <span>1</span>
              <ArrowRight size={13} />
            </button>
          </div>
        </div>
      </div>

      {/* ──────── ROW 2: PERFORMANCE METRICS & SKILL BREAKDOWN ──────── */}
      <div className="pm-ai-row pm-ai-row--metrics">
        {/* Performance Metrics Chart */}
        <div className="pm-ai-card pm-ai-card--chart">
          <div className="pm-ai-chart-header">
            <div>
              <h3 className="pm-ai-card__title">Performance Metrics</h3>
              {/* Legend */}
              <div className="pm-chart-legend">
                <span className="pm-legend-item">
                  <span className="pm-legend-dot" style={{ background: '#00e5ff' }} /> Speed
                </span>
                <span className="pm-legend-item">
                  <span className="pm-legend-dot" style={{ background: '#10b981' }} /> Stamina
                </span>
                <span className="pm-legend-item">
                  <span className="pm-legend-dot" style={{ background: '#f59e0b' }} /> Passing
                </span>
                <span className="pm-legend-item">
                  <span className="pm-legend-dot" style={{ background: '#c026d3' }} /> Shooting
                </span>
              </div>
            </div>

            <div className="pm-chart-range-select">
              <div
                className="pm-select-btn pm-select-btn--sm"
                onClick={() => setActiveMetricOpen(!activeMetricOpen)}
              >
                <span>{metricRange}</span>
                <ChevronDown size={12} />
              </div>
              {activeMetricOpen && (
                <div className="pm-dropdown-menu pm-dropdown-menu--right">
                  {['Last 3 Months', 'Last 6 Months', 'Last 1 Year'].map((r) => (
                    <div
                      key={r}
                      className="pm-dropdown-item"
                      onClick={() => {
                        setMetricRange(r);
                        setActiveMetricOpen(false);
                      }}
                    >
                      {r}
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* SVG Multi-Line Chart */}
          <div className="pm-chart-container">
            <svg
              className="pm-line-chart-svg"
              viewBox={`0 0 ${chartW} ${chartH}`}
              preserveAspectRatio="none"
            >
              {/* Horizontal Grid lines */}
              {[0, 0.25, 0.5, 0.75, 1].map((ratio, i) => (
                <line
                  key={i}
                  x1={padX}
                  y1={padY + ratio * usableH}
                  x2={chartW - padX}
                  y2={padY + ratio * usableH}
                  stroke="rgba(255,255,255,0.05)"
                  strokeWidth="1"
                />
              ))}

              {/* 4 Colored Splines */}
              {metricsData.map(({ label, color, points }) => (
                <g key={label}>
                  <path
                    d={getPath(points)}
                    fill="none"
                    stroke={color}
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    style={{ filter: `drop-shadow(0 0 6px ${color}80)` }}
                  />
                  {/* Point circles */}
                  {points.map((val, idx) => {
                    const x = padX + (idx / (points.length - 1)) * usableW;
                    const y = padY + (1 - (val - 45) / 55) * usableH;
                    return (
                      <circle
                        key={idx}
                        cx={x}
                        cy={y}
                        r="3.5"
                        fill="#0b1220"
                        stroke={color}
                        strokeWidth="2"
                      />
                    );
                  })}
                </g>
              ))}
            </svg>
          </div>
        </div>

        {/* Skill Breakdown Radar */}
        <div className="pm-ai-card pm-ai-card--radar">
          <div className="pm-radar-header">
            <h3 className="pm-ai-card__title">Skill Breakdown</h3>
            <div className="pm-radar-legend">
              <span className="pm-radar-dot pm-radar-dot--blue" />
              <span className="pm-radar-dot pm-radar-dot--muted" />
            </div>
          </div>

          <div className="pm-radar-body">
            <svg width="240" height="220" viewBox="0 0 240 220" className="pm-radar-svg">
              {/* Concentric Hexagons */}
              {[0.25, 0.5, 0.75, 1].map((scale, i) => {
                const ringPoints = radarAxes
                  .map((a) => {
                    const pt = getRadarPoint(a.angle, radarRadius * scale);
                    return `${pt.x},${pt.y}`;
                  })
                  .join(' ');
                return (
                  <polygon
                    key={i}
                    points={ringPoints}
                    fill="none"
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Axis lines */}
              {radarAxes.map((a, i) => {
                const pt = getRadarPoint(a.angle, radarRadius);
                return (
                  <line
                    key={i}
                    x1={radarCenter.x}
                    y1={radarCenter.y}
                    x2={pt.x}
                    y2={pt.y}
                    stroke="rgba(255,255,255,0.08)"
                    strokeWidth="1"
                  />
                );
              })}

              {/* Active Skill Filled Polygon */}
              <polygon
                points={currentRadarPolygon}
                fill="rgba(0, 102, 255, 0.35)"
                stroke="#0084ff"
                strokeWidth="2"
                style={{ filter: 'drop-shadow(0 0 10px rgba(0, 132, 255, 0.6))' }}
              />

              {/* Vertices */}
              {radarAxes.map((a, i) => {
                const pt = getRadarPoint(a.angle, radarRadius * a.value);
                return (
                  <circle
                    key={i}
                    cx={pt.x}
                    cy={pt.y}
                    r="3.5"
                    fill="#38bdf8"
                    stroke="#ffffff"
                    strokeWidth="1.5"
                  />
                );
              })}

              {/* Axis Labels */}
              {radarAxes.map((a, i) => {
                const labelPt = getRadarPoint(a.angle, radarRadius + 18);
                return (
                  <text
                    key={i}
                    x={labelPt.x}
                    y={labelPt.y + 4}
                    textAnchor="middle"
                    fill="rgba(255, 255, 255, 0.75)"
                    fontSize="9.5"
                    fontFamily="Inter, sans-serif"
                    fontWeight="500"
                  >
                    {a.label}
                  </text>
                );
              })}
            </svg>
          </div>
        </div>
      </div>

      {/* ──────── ROW 3: MATCH ANALYSIS & VIDEO INSIGHTS ──────── */}
      <div className="pm-ai-row pm-ai-row--2col">
        {/* Recent Match Analysis */}
        <div className="pm-ai-card">
          <div className="pm-card-row-hdr">
            <h3 className="pm-ai-card__title">Recent Match Analysis</h3>
            <button type="button" className="pm-arrow-link" title="View all matches">
              <ArrowRight size={15} />
            </button>
          </div>

          <div className="pm-matches-list">
            {matches.map((match) => (
              <div key={match.id} className="pm-match-item">
                <div className="pm-match-thumb-wrap">
                  <img src={match.thumb} alt={match.opponent} className="pm-match-thumb" />
                  <div className="pm-match-play-icon">
                    <Play size={10} fill="#ffffff" />
                  </div>
                </div>

                <div className="pm-match-info">
                  <h4 className="pm-match-opponent">{match.opponent}</h4>
                  <span className="pm-match-date">{match.date}</span>
                </div>

                <div className="pm-match-stat">
                  <span className="pm-match-stat-val" style={{ color: match.ratingColor }}>
                    {match.rating}
                  </span>
                  <span className="pm-match-stat-lbl">Match Rating</span>
                </div>

                <div className="pm-match-stat">
                  <span className="pm-match-stat-val">{match.goals}</span>
                  <span className="pm-match-stat-lbl">Goals</span>
                </div>

                <div className="pm-match-stat">
                  <span className="pm-match-stat-val">{match.assists}</span>
                  <span className="pm-match-stat-lbl">Assists</span>
                </div>

                <ChevronRight size={16} className="pm-match-chevron" />
              </div>
            ))}
          </div>
        </div>

        {/* Video Insights */}
        <div className="pm-ai-card">
          <div className="pm-card-row-hdr">
            <h3 className="pm-ai-card__title">Video Insights</h3>
            <a href="#videos" className="pm-view-all-link">
              View All <ArrowRight size={13} />
            </a>
          </div>

          <div className="pm-video-insights-list">
            {videoInsights.map((vid) => (
              <div key={vid.id} className="pm-video-insight-item">
                <div className="pm-vid-thumb-wrap">
                  <img src={vid.thumb} alt={vid.title} className="pm-vid-thumb" />
                  <div className="pm-vid-play-btn">
                    <Play size={12} fill="#ffffff" />
                  </div>
                  <span className="pm-vid-duration">{vid.duration}</span>
                </div>

                <div className="pm-vid-details">
                  <h4 className="pm-vid-title">{vid.title}</h4>
                  <span className="pm-vid-desc">{vid.subtitle}</span>
                </div>

                <div className="pm-vid-badge-wrap">
                  <span
                    className="pm-vid-badge"
                    style={{ color: vid.badgeColor, background: vid.badgeBg }}
                  >
                    {vid.category}
                  </span>
                </div>

                <ChevronRight size={16} className="pm-match-chevron" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
