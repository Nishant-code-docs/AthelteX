import './StatCard.css';

export default function StatCard({ icon: Icon, label, value, suffix, color, trend }) {
  return (
    <div className="stat-card">
      <div className="stat-card__icon" style={{ background: `${color}15`, color }}>
        {Icon && <Icon size={20} />}
      </div>
      <div className="stat-card__content">
        <span className="stat-card__value" style={{ color }}>
          {value}{suffix && <span className="stat-card__suffix">{suffix}</span>}
        </span>
        <span className="stat-card__label">{label}</span>
      </div>
      {trend && (
        <span className={`stat-card__trend stat-card__trend--${trend > 0 ? 'up' : 'down'}`}>
          {trend > 0 ? '↑' : '↓'} {Math.abs(trend)}%
        </span>
      )}
    </div>
  );
}
