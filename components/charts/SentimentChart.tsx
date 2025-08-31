
import React from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { SentimentData } from '../../types';

interface SentimentChartProps {
  data: SentimentData[];
}

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const SentimentChart: React.FC<SentimentChartProps> = ({ data }) => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={100}
          fill="#8884d8"
          dataKey="value"
          nameKey="name"
          label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip 
             contentStyle={{ 
                backgroundColor: 'rgba(31, 41, 55, 0.8)', 
                borderColor: '#4b5563',
                color: '#e5e7eb'
              }} 
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default SentimentChart;
