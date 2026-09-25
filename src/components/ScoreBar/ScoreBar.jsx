import './ScoreBar.css';

export default function ScoreBar({ label, value, maxValue = 100, color }) {
  const percentage = Math.min((value / maxValue) * 100, 100);
  const barColor = color || (
    percentage >= 90 ? 'var(--color-warning)' :
    percentage >= 75 ? 'var(--color-success)' :
    percentage >= 60 ? 'var(--color-secondary)' :
    percentage >= 40 ? 'var(--color-primary)' :
    'var(--color-accent)'
  );

  return (
    <div className="score-bar">
      <div className="score-bar__header">
        <span className="score-bar__label">{label}</span>
        <span className="score-bar__value" style={{ color: barColor }}>{value}</span>
      </div>
      <div className="score-bar__track">
        <div
          className="score-bar__fill"
          style={{
            width: `${percentage}%`,
            background: barColor,
          }}
        />
      </div>
    </div>
  );
}
