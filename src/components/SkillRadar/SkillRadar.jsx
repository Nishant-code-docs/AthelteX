import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';

export default function SkillRadar({ skills, size = 300, showLabels = true, color = 'var(--color-primary)' }) {
  const data = Object.entries(skills).map(([name, value]) => ({
    skill: name,
    value,
    fullMark: 100,
  }));

  return (
    <div style={{ width: '100%', height: size }}>
      <ResponsiveContainer>
        <RadarChart data={data} cx="50%" cy="50%" outerRadius="75%">
          <PolarGrid
            stroke="hsla(230, 20%, 40%, 0.3)"
            strokeDasharray="3 3"
          />
          {showLabels && (
            <PolarAngleAxis
              dataKey="skill"
              tick={{
                fill: 'hsl(230, 15%, 65%)',
                fontSize: 11,
                fontWeight: 500,
              }}
            />
          )}
          <PolarRadiusAxis
            angle={30}
            domain={[0, 100]}
            tick={false}
            axisLine={false}
          />
          <Radar
            name="Skills"
            dataKey="value"
            stroke="hsl(250, 84%, 54%)"
            fill="hsla(250, 84%, 54%, 0.25)"
            strokeWidth={2}
            dot={{ r: 4, fill: 'hsl(250, 84%, 54%)', strokeWidth: 0 }}
            animationDuration={800}
            animationEasing="ease-out"
          />
          <Tooltip
            contentStyle={{
              background: 'hsl(230, 20%, 12%)',
              border: '1px solid hsla(230, 20%, 30%, 0.4)',
              borderRadius: '8px',
              color: 'hsl(0, 0%, 95%)',
              fontSize: '13px',
              padding: '8px 12px',
            }}
            formatter={(value) => [`${value}/100`, 'Score']}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
