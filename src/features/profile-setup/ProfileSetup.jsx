import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAthletes } from '../../context/AthleteContext';
import { useCoaches } from '../../context/CoachContext';
import { SPORTS, EXPERIENCE_LEVELS } from '../../data/sports';
import { calculateOverallScore } from '../../utils/scoring';
import Button from '../../components/Button/Button';
import Card from '../../components/Card/Card';
import { Zap, ArrowRight, ArrowLeft, CheckCircle2, Sliders, Shield, Award } from 'lucide-react';
import './ProfileSetup.css';

export default function ProfileSetup() {
  const { user, updateProfile } = useAuth();
  const { updateAthlete } = useAthletes();
  const { updateCoach } = useCoaches();
  const navigate = useNavigate();

  const isAthlete = user?.role === 'athlete';

  const [step, setStep] = useState(1);
  const [selectedSport, setSelectedSport] = useState(user?.sport || 'basketball');
  const [position, setPosition] = useState(user?.position || user?.specialization || '');
  const [location, setLocation] = useState(user?.location || '');
  const [age, setAge] = useState(user?.age || 20);
  const [experience, setExperience] = useState(user?.experience || 'advanced');
  const [bio, setBio] = useState(user?.bio || '');
  const [philosophy, setPhilosophy] = useState(user?.philosophy || '');

  // Skills initialization based on selected sport
  const currentSportConfig = SPORTS.find(s => s.id === selectedSport) || SPORTS[0];
  const initialSkills = {};
  currentSportConfig.skills.forEach(s => {
    initialSkills[s] = (user?.skills && user.skills[s]) || (user?.preferredSkills && user.preferredSkills[s]) || 75;
  });

  const [skills, setSkills] = useState(initialSkills);

  const handleSportChange = (sportId) => {
    setSelectedSport(sportId);
    const newSport = SPORTS.find(s => s.id === sportId);
    const newSkills = {};
    newSport.skills.forEach(s => {
      newSkills[s] = 75;
    });
    setSkills(newSkills);
    setPosition(newSport.positions[0] || '');
  };

  const handleSkillChange = (skillName, val) => {
    setSkills(prev => ({
      ...prev,
      [skillName]: Number(val),
    }));
  };

  const handleComplete = () => {
    const overallScore = calculateOverallScore(skills);
    const updatedData = {
      sport: selectedSport,
      location,
      experience,
      bio,
      ...(isAthlete
        ? {
            position,
            age: Number(age),
            skills,
            overallScore,
          }
        : {
            specialization: position,
            philosophy,
            preferredSkills: skills,
            yearsCoaching: experience === 'professional' ? 12 : 5,
            rating: 4.9,
          }),
    };

    updateProfile(updatedData);
    if (isAthlete) {
      updateAthlete({ id: user.id, ...updatedData });
    } else {
      updateCoach({ id: user.id, ...updatedData });
    }

    navigate('/dashboard');
  };

  return (
    <div className="setup-page">
      <div className="container setup-page__container">
        <div className="setup-header">
          <div className="badge badge--secondary">
            <Zap size={14} /> Profile Onboarding
          </div>
          <h1>
            Set Up Your <span className="text-gradient">{isAthlete ? 'Athlete' : 'Coach'}</span> Profile
          </h1>
          <p className="text-muted">
            Step {step} of 3 — Complete your details to enable accurate skill scoring and similarity matching.
          </p>

          <div className="setup-progress">
            <div className={`setup-step-indicator ${step >= 1 ? 'active' : ''}`}>1. Sport & Role</div>
            <div className="setup-step-line" />
            <div className={`setup-step-indicator ${step >= 2 ? 'active' : ''}`}>2. Bio & Experience</div>
            <div className="setup-step-line" />
            <div className={`setup-step-indicator ${step >= 3 ? 'active' : ''}`}>3. Skill Assessment</div>
          </div>
        </div>

        <Card variant="glass" className="setup-card animate-fade-in-up">
          {/* STEP 1: Sport Selection */}
          {step === 1 && (
            <div className="setup-step-content">
              <h3>Select Your Sport</h3>
              <p className="text-muted mb-lg">Choose the sport where you showcase talent or coach.</p>

              <div className="sports-grid">
                {SPORTS.map(sport => (
                  <div
                    key={sport.id}
                    className={`sport-select-card ${selectedSport === sport.id ? 'selected' : ''}`}
                    onClick={() => handleSportChange(sport.id)}
                  >
                    <span className="sport-icon">{sport.icon}</span>
                    <span className="sport-name">{sport.name}</span>
                  </div>
                ))}
              </div>

              <div className="form-group mt-xl">
                <label className="form-label">{isAthlete ? 'Primary Position' : 'Coaching Specialization'}</label>
                <select
                  className="form-input form-select"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                >
                  <option value="">Select position / specialization</option>
                  {currentSportConfig.positions.map(pos => (
                    <option key={pos} value={pos}>{pos}</option>
                  ))}
                </select>
              </div>

              <div className="setup-actions">
                <Button size="lg" iconRight={ArrowRight} onClick={() => setStep(2)}>
                  Continue to Details
                </Button>
              </div>
            </div>
          )}

          {/* STEP 2: Bio & Details */}
          {step === 2 && (
            <div className="setup-step-content">
              <h3>Background & Experience</h3>
              <p className="text-muted mb-lg">Provide key info to make your profile stand out to recruiters and peers.</p>

              <div className="grid grid-2 gap-lg">
                <div className="form-group">
                  <label className="form-label">Location (City, Country/State)</label>
                  <input
                    type="text"
                    className="form-input"
                    placeholder="e.g. San Francisco, CA"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>

                {isAthlete ? (
                  <div className="form-group">
                    <label className="form-label">Age</label>
                    <input
                      type="number"
                      className="form-input"
                      value={age}
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                ) : (
                  <div className="form-group">
                    <label className="form-label">Experience Tier</label>
                    <select
                      className="form-input form-select"
                      value={experience}
                      onChange={(e) => setExperience(e.target.value)}
                    >
                      {EXPERIENCE_LEVELS.map(exp => (
                        <option key={exp.id} value={exp.id}>{exp.label} ({exp.years})</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {isAthlete && (
                <div className="form-group mt-md">
                  <label className="form-label">Experience Level</label>
                  <select
                    className="form-input form-select"
                    value={experience}
                    onChange={(e) => setExperience(e.target.value)}
                  >
                    {EXPERIENCE_LEVELS.map(exp => (
                      <option key={exp.id} value={exp.id}>{exp.label} ({exp.years})</option>
                    ))}
                  </select>
                </div>
              )}

              <div className="form-group mt-md">
                <label className="form-label">Bio / Summary</label>
                <textarea
                  className="form-input form-textarea"
                  placeholder="Share your athletic journey, career highlights, and goals..."
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                />
              </div>

              {!isAthlete && (
                <div className="form-group mt-md">
                  <label className="form-label">Coaching Philosophy</label>
                  <textarea
                    className="form-input form-textarea"
                    placeholder="Describe your coaching philosophy, methodology, and mentoring approach..."
                    value={philosophy}
                    onChange={(e) => setPhilosophy(e.target.value)}
                  />
                </div>
              )}

              <div className="setup-actions">
                <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep(1)}>
                  Back
                </Button>
                <Button size="lg" iconRight={ArrowRight} onClick={() => setStep(3)}>
                  Configure Skills
                </Button>
              </div>
            </div>
          )}

          {/* STEP 3: Skill Rating */}
          {step === 3 && (
            <div className="setup-step-content">
              <h3>{isAthlete ? 'Skill Self-Assessment' : 'Target Athlete Skill Profile'}</h3>
              <p className="text-muted mb-lg">
                {isAthlete
                  ? 'Rate your core attributes (0–100) to build your performance radar and enable matching.'
                  : 'Specify the target skill levels you are scouting for in ideal candidates.'}
              </p>

              <div className="skills-sliders-grid">
                {Object.entries(skills).map(([skillName, val]) => (
                  <div key={skillName} className="skill-slider-card">
                    <div className="skill-slider-header">
                      <span className="font-semibold">{skillName}</span>
                      <span className="skill-val-pill">{val} / 100</span>
                    </div>
                    <input
                      type="range"
                      min="30"
                      max="100"
                      value={val}
                      onChange={(e) => handleSkillChange(skillName, e.target.value)}
                      className="skill-range-input"
                    />
                    <div className="skill-range-ticks">
                      <span>Developing (40)</span>
                      <span>Competent (70)</span>
                      <span>Elite (95+)</span>
                    </div>
                  </div>
                ))}
              </div>

              <div className="setup-actions">
                <Button variant="secondary" icon={ArrowLeft} onClick={() => setStep(2)}>
                  Back
                </Button>
                <Button size="lg" variant="primary" icon={CheckCircle2} onClick={handleComplete}>
                  Complete Setup & Launch Dashboard
                </Button>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
