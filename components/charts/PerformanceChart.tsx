
import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { PerformanceData } from '../../types';

interface PerformanceChartProps {
  data: PerformanceData[];
}

const PerformanceChart: React.FC<PerformanceChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="rgba(128, 128, 128, 0.3)" />
        <XAxis dataKey="date" stroke="#9ca3af" />
        <YAxis stroke="#9ca3af" />
        <Tooltip
          contentStyle={{ 
            backgroundColor: 'rgba(31, 41, 55, 0.8)', 
            borderColor: '#4b5563',
            color: '#e5e7eb'
          }} 
        />
        <Legend />
        <Line type="monotone" dataKey="score" name="Quiz Score (%)" stroke="#8884d8" activeDot={{ r: 8 }} />
        <Line type="monotone" dataKey="focusTime" name="Focus (min)" stroke="#82ca9d" />
        <Line type="monotone" dataKey="engagement" name="Engagement (%)" stroke="#ffc658" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default PerformanceChart;
