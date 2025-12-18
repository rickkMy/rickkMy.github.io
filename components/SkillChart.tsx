import React from 'react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, ResponsiveContainer } from 'recharts';
import { SKILLS_DATA } from '../constants';

const SkillChart: React.FC = () => {
  return (
    <div className="w-full h-[240px] relative">
       <div className="absolute top-0 left-0 text-[10px] font-sans text-neutral-400 uppercase tracking-widest font-medium">
            FIG 2.0—Competency
        </div>
      <div className="w-full h-full absolute inset-0 pt-6">
        <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={SKILLS_DATA}>
            <PolarGrid stroke="#e5e7eb" strokeDasharray="3 3" />
            <PolarAngleAxis 
                dataKey="subject" 
                tick={{ fill: '#171717', fontSize: 10, fontFamily: '"JetBrains Mono", monospace', fontWeight: 500 }} 
                tickLine={false}
            />
            <Radar
                name="Skills"
                dataKey="A"
                stroke="#000000"
                strokeWidth={1.5}
                fill="#000000"
                fillOpacity={0.05} // Very subtle fill
                isAnimationActive={true}
                dot={{ r: 2, fill: "#000000" }} // Technical dots at vertices
            />
            </RadarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SkillChart;