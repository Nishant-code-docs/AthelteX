export const SPORTS = [
  {
    id: 'basketball',
    name: 'Basketball',
    icon: '🏀',
    positions: ['Point Guard', 'Shooting Guard', 'Small Forward', 'Power Forward', 'Center'],
    skills: ['Speed', 'Agility', 'Shooting', 'Passing', 'Defense', 'Rebounding'],
  },
  {
    id: 'football',
    name: 'Football',
    icon: '⚽',
    positions: ['Goalkeeper', 'Defender', 'Midfielder', 'Forward', 'Winger'],
    skills: ['Speed', 'Dribbling', 'Shooting', 'Passing', 'Tackling', 'Stamina'],
  },
  {
    id: 'tennis',
    name: 'Tennis',
    icon: '🎾',
    positions: ['Singles', 'Doubles'],
    skills: ['Serve', 'Forehand', 'Backhand', 'Volley', 'Footwork', 'Endurance'],
  },
  {
    id: 'swimming',
    name: 'Swimming',
    icon: '🏊',
    positions: ['Freestyle', 'Backstroke', 'Breaststroke', 'Butterfly', 'Medley'],
    skills: ['Speed', 'Technique', 'Endurance', 'Turns', 'Starts', 'Breathing'],
  },
  {
    id: 'track',
    name: 'Track & Field',
    icon: '🏃',
    positions: ['Sprinter', 'Distance Runner', 'Hurdler', 'Jumper', 'Thrower'],
    skills: ['Speed', 'Endurance', 'Strength', 'Technique', 'Explosiveness', 'Flexibility'],
  },
  {
    id: 'cricket',
    name: 'Cricket',
    icon: '🏏',
    positions: ['Batsman', 'Bowler', 'All-Rounder', 'Wicketkeeper'],
    skills: ['Batting', 'Bowling', 'Fielding', 'Fitness', 'Game IQ', 'Consistency'],
  },
];

export const SKILL_COLORS = {
  Speed: 'var(--color-primary)',
  Agility: 'var(--color-secondary)',
  Strength: 'var(--color-accent)',
  Technique: 'var(--color-warning)',
  'Game IQ': 'var(--color-success)',
  Endurance: '#8b5cf6',
};

export const ACHIEVEMENT_TYPES = [
  { id: 'gold', label: 'Gold Medal', icon: '🥇', color: 'var(--color-warning)' },
  { id: 'silver', label: 'Silver Medal', icon: '🥈', color: '#c0c0c0' },
  { id: 'bronze', label: 'Bronze Medal', icon: '🥉', color: '#cd7f32' },
  { id: 'trophy', label: 'Trophy', icon: '🏆', color: 'var(--color-warning)' },
  { id: 'record', label: 'Record', icon: '⚡', color: 'var(--color-primary)' },
  { id: 'mvp', label: 'MVP Award', icon: '⭐', color: 'var(--color-secondary)' },
];

export const EXPERIENCE_LEVELS = [
  { id: 'beginner', label: 'Beginner', years: '0-1 years' },
  { id: 'intermediate', label: 'Intermediate', years: '1-3 years' },
  { id: 'advanced', label: 'Advanced', years: '3-5 years' },
  { id: 'elite', label: 'Elite', years: '5-10 years' },
  { id: 'professional', label: 'Professional', years: '10+ years' },
];
