import { Play, Eye, Clock } from 'lucide-react';
import './VideoPlayer.css';

export default function VideoPlayer({ video, compact = false }) {
  return (
    <div className={`video-card ${compact ? 'video-card--compact' : ''}`}>
      <div className="video-card__thumbnail">
        <div className="video-card__placeholder">
          <Play size={compact ? 24 : 36} />
        </div>
        <div className="video-card__overlay">
          <button className="video-card__play-btn">
            <Play size={20} fill="white" />
          </button>
        </div>
        {video.duration && (
          <span className="video-card__duration">
            <Clock size={10} /> {video.duration}
          </span>
        )}
      </div>
      <div className="video-card__info">
        <h4 className="video-card__title">{video.title}</h4>
        {video.views && (
          <span className="video-card__views">
            <Eye size={12} /> {video.views.toLocaleString()} views
          </span>
        )}
      </div>
    </div>
  );
}
