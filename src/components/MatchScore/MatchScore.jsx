import { getMatchQuality } from '../../utils/scoring';
import './MatchScore.css';

export default function MatchScore({ score, size = 'md', showLabel = true }) {
  const { label, color, emoji } = getMatchQuality(score);
  const circumference = 2 * Math.PI * 42;
  const offset = circumference - (score / 100) * circumference;

  return (
    <div className={`match-score match-score--${size}`}>
      <div className="match-score__ring">
        <svg viewBox="0 0 100 100" className="match-score__svg">
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke="var(--bg-hover)"
            strokeWidth="6"
          />
          <circle
            cx="50"
            cy="50"
            r="42"
            fill="none"
            stroke={color}
            strokeWidth="6"
            strokeLinecap="round"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            className="match-score__progress"
            style={{ '--target-offset': offset }}
          />
        </svg>
        <div className="match-score__value">
          <span className="match-score__number" style={{ color }}>{score}</span>
          <span className="match-score__percent">%</span>
        </div>
      </div>
      {showLabel && (
        <div className="match-score__label">
          <span className="match-score__emoji">{emoji}</span>
          <span style={{ color }}>{label}</span>
        </div>
      )}
    </div>
  );
}
