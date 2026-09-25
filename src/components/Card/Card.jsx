import './Card.css';

export default function Card({
  children,
  variant = 'default',
  hover = true,
  glow,
  className = '',
  onClick,
  style,
}) {
  return (
    <div
      className={`card card--${variant} ${hover ? 'card--hover' : ''} ${glow ? 'card--glow' : ''} ${className}`}
      onClick={onClick}
      style={style}
    >
      {children}
    </div>
  );
}
