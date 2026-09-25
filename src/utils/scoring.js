/**
 * Scoring Utilities
 */

/**
 * Calculate overall score from skill values
 * @param {Object} skills - Skill name → value (0-100)
 * @returns {number} Weighted average score (0-100)
 */
export function calculateOverallScore(skills) {
  const values = Object.values(skills);
  if (values.length === 0) return 0;
  const sum = values.reduce((acc, val) => acc + val, 0);
  return Math.round(sum / values.length);
}

/**
 * Get score tier label
 * @param {number} score - Score 0-100
 * @returns {{ label: string, color: string }}
 */
export function getScoreTier(score) {
  if (score >= 90) return { label: 'Elite', color: 'var(--color-warning)' };
  if (score >= 80) return { label: 'Advanced', color: 'var(--color-success)' };
  if (score >= 70) return { label: 'Skilled', color: 'var(--color-secondary)' };
  if (score >= 60) return { label: 'Developing', color: 'var(--color-primary)' };
  return { label: 'Emerging', color: 'var(--text-muted)' };
}

/**
 * Get match quality label
 * @param {number} score - Match score 0-100
 * @returns {{ label: string, color: string, emoji: string }}
 */
export function getMatchQuality(score) {
  if (score >= 90) return { label: 'Perfect Match', color: 'var(--color-warning)', emoji: '🔥' };
  if (score >= 80) return { label: 'Excellent Match', color: 'var(--color-success)', emoji: '⭐' };
  if (score >= 70) return { label: 'Strong Match', color: 'var(--color-secondary)', emoji: '💪' };
  if (score >= 60) return { label: 'Good Match', color: 'var(--color-primary)', emoji: '👍' };
  return { label: 'Potential Match', color: 'var(--text-secondary)', emoji: '🔍' };
}

/**
 * Generate initials from a name
 * @param {string} name
 * @returns {string}
 */
export function getInitials(name) {
  return name
    .split(' ')
    .map(n => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);
}

/**
 * Format a number with commas
 * @param {number} num
 * @returns {string}
 */
export function formatNumber(num) {
  if (num >= 1000000) return (num / 1000000).toFixed(1) + 'M';
  if (num >= 1000) return (num / 1000).toFixed(1) + 'K';
  return num.toString();
}
