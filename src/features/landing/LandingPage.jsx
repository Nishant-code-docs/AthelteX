import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Sparkles,
  ArrowRight,
  Play,
  User,
  Cpu,
  Users,
  Building2,
  ChevronRight,
  Star,
  MapPin,
  CheckCircle,
  BarChart2,
  TrendingUp,
  Activity,
  Award,
} from 'lucide-react';
import './LandingPage.css';

// 9 Sports corresponding to the cards in the screenshot
const SPORTS_CARDS = [
  {
    id: 'football',
    name: 'Football',
    image: 'https://images.unsplash.com/photo-1508098682722-e99c43a406b2?q=80&w=400&auto=format&fit=crop',
    alt: 'Football soccer ball on stadium grass',
  },
  {
    id: 'cricket',
    name: 'Cricket',
    image: 'https://images.unsplash.com/photo-1531415074968-036ba1b575da?q=80&w=400&auto=format&fit=crop',
    alt: 'Red cricket ball on pitch',
  },
  {
    id: 'basketball',
    name: 'Basketball',
    image: 'https://images.unsplash.com/photo-1519861531473-9200262188bf?q=80&w=400&auto=format&fit=crop',
    alt: 'Basketball on court',
  },
  {
    id: 'badminton',
    name: 'Badminton',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=400&auto=format&fit=crop',
    alt: 'Badminton shuttlecock on green court',
  },
  {
    id: 'tennis',
    name: 'Tennis',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?q=80&w=400&auto=format&fit=crop',
    alt: 'Tennis ball on hard court',
  },
  {
    id: 'table-tennis',
    name: 'Table Tennis',
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?q=80&w=400&auto=format&fit=crop',
    alt: 'Table tennis paddle and ball',
  },
  {
    id: 'swimming',
    name: 'Swimming',
    image: 'https://images.unsplash.com/photo-1530549387789-4c1017266635?q=80&w=400&auto=format&fit=crop',
    alt: 'Swimming goggles in water',
  },
  {
    id: 'athletics',
    name: 'Athletics',
    image: 'https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=400&auto=format&fit=crop',
    alt: 'Athletics runner shoes on track',
  },
  {
    id: 'gym',
    name: 'Fitness & Gym',
    image: 'https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?q=80&w=400&auto=format&fit=crop',
    alt: 'Gym dumbbells and weights',
  },
];

// Top Coaches for You
const TOP_COACHES = [
  {
    id: 1,
    name: 'Rohan Sharma',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=350&auto=format&fit=crop',
    rating: '4.8',
    reviews: '1200 reviews',
    tags: ['Football', 'Strength Training'],
    location: 'Bengaluru, KA',
  },
  {
    id: 2,
    name: 'Priya Sen',
    image: 'https://images.unsplash.com/photo-1594381898411-846e7d193883?q=80&w=350&auto=format&fit=crop',
    rating: '4.9',
    reviews: '176 reviews',
    tags: ['Badminton', 'Fitness'],
    location: 'Kolkata, WB',
  },
  {
    id: 3,
    name: 'Kabir Khan',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?q=80&w=350&auto=format&fit=crop',
    rating: '4.8',
    reviews: '165 reviews',
    tags: ['Cricket', 'Mental Training'],
    location: 'Delhi, IN',
  },
  {
    id: 4,
    name: 'Neer Patel',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=350&auto=format&fit=crop',
    rating: '4.7',
    reviews: '89 reviews',
    tags: ['Athletics', 'Speed Training'],
    location: 'Mumbai, MH',
  },
  {
    id: 5,
    name: 'Simran Kaur',
    image: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=350&auto=format&fit=crop',
    rating: '4.9',
    reviews: '403 reviews',
    tags: ['Gymnastics', 'Skill Development'],
    location: 'Chandigarh, CH',
  },
];

// Featured Academies
const FEATURED_ACADEMIES = [
  {
    id: 1,
    name: 'Elite Sports Academy',
    image: 'https://images.unsplash.com/photo-1577223625816-7546f13df25d?q=80&w=400&auto=format&fit=crop',
    rating: '4.8',
    reviews: '210 reviews',
    location: 'Bengaluru, KA',
    tags: ['Football', 'Cricket', 'Gym'],
  },
  {
    id: 2,
    name: 'NextGen Academy',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?q=80&w=400&auto=format&fit=crop',
    rating: '4.7',
    reviews: '180 reviews',
    location: 'Kolkata, WB',
    tags: ['Badminton', 'Table Tennis'],
  },
  {
    id: 3,
    name: 'Champions Hub',
    image: 'https://images.unsplash.com/photo-1518609878373-06d740f60d8b?q=80&w=400&auto=format&fit=crop',
    rating: '4.9',
    reviews: '250 reviews',
    location: 'Delhi, IN',
    tags: ['Athletics', 'Swimming'],
  },
  {
    id: 4,
    name: 'ProFit Sports Center',
    image: 'https://images.unsplash.com/photo-1540497077202-7c8a3999166f?q=80&w=400&auto=format&fit=crop',
    rating: '4.6',
    reviews: '140 reviews',
    location: 'Mumbai, MH',
    tags: ['Gym', 'Strength Training'],
  },
];

export default function LandingPage() {
  const [activeSportIndex, setActiveSportIndex] = useState(0);
  const navigate = useNavigate();

  return (
    <div className="pm-page">
      {/* ──────────────── HERO SECTION ──────────────── */}
      <section className="pm-hero">
        {/* Background Atmosphere & Lighting */}
        <div className="pm-hero__bg">
          <div className="pm-hero__light pm-hero__light--top" />
          <div className="pm-hero__light pm-hero__light--left" />
          <div className="pm-hero__light pm-hero__light--right" />
          <div className="pm-hero__stadium-mesh" />

          {/* Athletic Player Hero Graphic with Stadium Lighting */}
          <div className="pm-hero__visual">
            <div className="pm-hero__visual-spotlight" />
            <img
              src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1200&auto=format&fit=crop"
              alt="Athlete looking forward at stadium lights"
              className="pm-hero__player-img"
            />
            {/* Dark vignette gradient overlay over player */}
            <div className="pm-hero__player-overlay" />

            {/* Cursive Handwriting Text */}
            <div className="pm-hero__handwriting">
              <span className="pm-hero__script-word">Train</span>
              <span className="pm-hero__script-word">Compete</span>
              <span className="pm-hero__script-word">Grow</span>
            </div>
          </div>
        </div>

        {/* Hero Foreground Content */}
        <div className="pm-hero__container">
          {/* Left Column: Headlines, CTA, Stats */}
          <div className="pm-hero__left">
            {/* AI Badge */}
            <div className="pm-hero__badge">
              <Sparkles size={14} className="pm-hero__badge-icon" />
              <span>AI-Powered Sports Platform</span>
            </div>

            {/* Main Headline */}
            <h1 className="pm-hero__title">
              Find the Right <span className="pm-hero__highlight--blue">Coach.</span>
              <br />
              Build Your <span className="pm-hero__highlight--purple">Future.</span>
            </h1>

            {/* Subtitle */}
            <p className="pm-hero__subtitle">
              Connect with verified coaches and academies, showcase your achievements,
              get AI-powered insights, and take your sports journey to the next level.
            </p>

            {/* CTA Buttons */}
            <div className="pm-hero__ctas">
              <Link to="/auth" className="pm-btn pm-btn--primary">
                Get Started <ArrowRight size={16} />
              </Link>
              <button
                type="button"
                className="pm-btn pm-btn--outline"
                onClick={() => navigate('/discover')}
              >
                <Play size={14} className="pm-btn__play-icon" />
                Watch Demo
              </button>
            </div>

            {/* Stats Row */}
            <div className="pm-hero__stats">
              <div className="pm-hero__stat-item">
                <span className="pm-hero__stat-num">10K+</span>
                <span className="pm-hero__stat-lbl">Athletes</span>
              </div>
              <div className="pm-hero__stat-item">
                <span className="pm-hero__stat-num">2K+</span>
                <span className="pm-hero__stat-lbl">Coaches</span>
              </div>
              <div className="pm-hero__stat-item">
                <span className="pm-hero__stat-num">500+</span>
                <span className="pm-hero__stat-lbl">Academies</span>
              </div>
              <div className="pm-hero__stat-item">
                <span className="pm-hero__stat-num">15+</span>
                <span className="pm-hero__stat-lbl">Sports</span>
              </div>
            </div>
          </div>

          {/* Right Column: Floating Glass Menu */}
          <div className="pm-hero__right">
            <div className="pm-glass-card">
              {/* Row 1: Create Profile */}
              <Link to="/auth" className="pm-glass-row">
                <div className="pm-glass-row__icon pm-glass-row__icon--blue">
                  <User size={18} />
                </div>
                <div className="pm-glass-row__content">
                  <h4 className="pm-glass-row__title">Create Profile</h4>
                  <p className="pm-glass-row__desc">Showcase your skills and achievements</p>
                </div>
                <div className="pm-glass-row__arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>

              {/* Row 2: Get AI Analysis */}
              <Link to="/ai-analysis" className="pm-glass-row">
                <div className="pm-glass-row__icon pm-glass-row__icon--purple">
                  <Cpu size={18} />
                </div>
                <div className="pm-glass-row__content">
                  <h4 className="pm-glass-row__title">Get AI Analysis</h4>
                  <p className="pm-glass-row__desc">Identify strengths and improvement areas</p>
                </div>
                <div className="pm-glass-row__arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>

              {/* Row 3: Find Coaches */}
              <Link to="/discover?tab=coaches" className="pm-glass-row">
                <div className="pm-glass-row__icon pm-glass-row__icon--green">
                  <Users size={18} />
                </div>
                <div className="pm-glass-row__content">
                  <h4 className="pm-glass-row__title">Find Coaches</h4>
                  <p className="pm-glass-row__desc">Connect with verified coaches</p>
                </div>
                <div className="pm-glass-row__arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>

              {/* Row 4: Join Academies */}
              <Link to="/discover?tab=academies" className="pm-glass-row">
                <div className="pm-glass-row__icon pm-glass-row__icon--amber">
                  <Building2 size={18} />
                </div>
                <div className="pm-glass-row__content">
                  <h4 className="pm-glass-row__title">Join Academies</h4>
                  <p className="pm-glass-row__desc">Explore programs and take your game higher</p>
                </div>
                <div className="pm-glass-row__arrow">
                  <ArrowRight size={14} />
                </div>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── SPORTS CAROUSEL / HORIZONTAL SELECTOR ──────────────── */}
      <section className="pm-sports-section">
        <div className="pm-sports-scroll">
          {SPORTS_CARDS.map((sport, index) => {
            const isSelected = activeSportIndex === index;
            return (
              <div
                key={sport.id}
                onClick={() => setActiveSportIndex(index)}
                className={`pm-sport-card ${isSelected ? 'pm-sport-card--active' : ''}`}
              >
                <img src={sport.image} alt={sport.alt} className="pm-sport-card__img" />
                <div className="pm-sport-card__overlay" />
                {isSelected && (
                  <div className="pm-sport-card__active-action">
                    <ArrowRight size={14} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* ──────────────── DISCOVERY SECTION (COACHES + ACADEMIES) ──────────────── */}
      <section className="pm-discovery">
        <div className="pm-discovery__grid">
          {/* LEFT: Top Coaches for You */}
          <div className="pm-col pm-col--coaches">
            <div className="pm-col__header">
              <div className="pm-col__title-wrap">
                <Star size={18} className="pm-col__star-icon" fill="#f59e0b" color="#f59e0b" />
                <h3 className="pm-col__heading">Top Coaches for You</h3>
              </div>
              <Link to="/discover?tab=coaches" className="pm-col__view-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pm-coaches-list">
              {TOP_COACHES.map((coach) => (
                <div key={coach.id} className="pm-coach-card">
                  <div className="pm-coach-card__img-wrap">
                    <img src={coach.image} alt={coach.name} className="pm-coach-card__img" />
                    <div className="pm-coach-card__verified" title="Verified Coach">
                      <CheckCircle size={14} fill="#0066ff" color="#ffffff" />
                    </div>
                  </div>
                  <h4 className="pm-coach-card__name">{coach.name}</h4>
                  <div className="pm-coach-card__rating">
                    <Star size={11} fill="#f59e0b" color="#f59e0b" />
                    <span className="pm-coach-card__score">{coach.rating}</span>
                    <span className="pm-coach-card__reviews">({coach.reviews})</span>
                  </div>
                  <div className="pm-coach-card__tags">
                    {coach.tags.map((tag) => (
                      <span key={tag} className="pm-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="pm-coach-card__location">
                    <MapPin size={11} />
                    <span>{coach.location}</span>
                  </div>
                  <Link to={`/profile/${coach.id}`} className="pm-coach-card__btn">
                    View Profile
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT: Featured Academies */}
          <div className="pm-col pm-col--academies">
            <div className="pm-col__header">
              <div className="pm-col__title-wrap">
                <Building2 size={18} className="pm-col__building-icon" color="#f59e0b" />
                <h3 className="pm-col__heading">Featured Academies</h3>
              </div>
              <Link to="/discover?tab=academies" className="pm-col__view-all">
                View All <ArrowRight size={14} />
              </Link>
            </div>

            <div className="pm-academies-list">
              {FEATURED_ACADEMIES.map((academy) => (
                <div key={academy.id} className="pm-academy-card">
                  <div className="pm-academy-card__img-wrap">
                    <img src={academy.image} alt={academy.name} className="pm-academy-card__img" />
                  </div>
                  <h4 className="pm-academy-card__name">{academy.name}</h4>
                  <div className="pm-academy-card__rating">
                    <Star size={11} fill="#f59e0b" color="#f59e0b" />
                    <span className="pm-academy-card__score">{academy.rating}</span>
                    <span className="pm-academy-card__reviews">({academy.reviews})</span>
                  </div>
                  <div className="pm-academy-card__location">
                    <MapPin size={11} />
                    <span>{academy.location}</span>
                  </div>
                  <div className="pm-academy-card__tags">
                    {academy.tags.map((tag) => (
                      <span key={tag} className="pm-tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link to="/auth" className="pm-academy-card__btn">
                    View Details
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ──────────────── BOTTOM AI-POWERED ANALYSIS & CTA BANNER ──────────────── */}
      <section className="pm-ai-banner">
        <div className="pm-ai-banner__wrapper">
          {/* Left AI Information */}
          <div className="pm-ai-banner__left">
            <div className="pm-ai-banner__header">
              <div className="pm-ai-banner__icon-box">
                <Cpu size={24} color="#d946ef" />
              </div>
              <div>
                <h3 className="pm-ai-banner__title">AI-Powered Analysis for Your Growth</h3>
                <p className="pm-ai-banner__subtitle">
                  Get personalized insights, track your progress, and improve with AI.
                </p>
              </div>
            </div>

            {/* 4 Feature Badges */}
            <div className="pm-ai-banner__features-grid">
              <div className="pm-ai-pill">
                <div className="pm-ai-pill__icon pm-ai-pill__icon--purple">
                  <BarChart2 size={16} />
                </div>
                <div>
                  <div className="pm-ai-pill__title">Strength Analysis</div>
                  <div className="pm-ai-pill__desc">Identify your key strengths</div>
                </div>
              </div>

              <div className="pm-ai-pill">
                <div className="pm-ai-pill__icon pm-ai-pill__icon--fuchsia">
                  <TrendingUp size={16} />
                </div>
                <div>
                  <div className="pm-ai-pill__title">Improvement Suggestions</div>
                  <div className="pm-ai-pill__desc">Get personalized training plans</div>
                </div>
              </div>

              <div className="pm-ai-pill">
                <div className="pm-ai-pill__icon pm-ai-pill__icon--blue">
                  <Activity size={16} />
                </div>
                <div>
                  <div className="pm-ai-pill__title">Performance Tracking</div>
                  <div className="pm-ai-pill__desc">Track progress over time</div>
                </div>
              </div>

              <div className="pm-ai-pill">
                <div className="pm-ai-pill__icon pm-ai-pill__icon--violet">
                  <Award size={16} />
                </div>
                <div>
                  <div className="pm-ai-pill__title">Coach Recommendations</div>
                  <div className="pm-ai-pill__desc">Find the best coaches for you</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right CTA Area */}
          <div className="pm-ai-banner__right">
            <div className="pm-ai-banner__cta-box">
              <p className="pm-ai-banner__cta-tag">Ready to take your game to the next level?</p>
              <h4 className="pm-ai-banner__cta-headline">
                Join thousands of athletes, coaches, and academies on AthleteX.
              </h4>
              <Link to="/auth" className="pm-btn pm-btn--primary pm-btn--glow">
                Get Started <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
