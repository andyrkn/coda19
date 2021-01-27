import React from 'react';
import {
  BarChart as RechartsBarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
} from 'recharts';

import barChartStyles from './BarChart.module.scss';

const data = {
  keys: ['confirmed', 'death'],
  entries: [
    {
      ageGroup: '0 - 9',
      confirmed: 4000,
      death: 2400,
    },
    {
      ageGroup: '9 - 19',
      confirmed: 3000,
      death: 1398,
    },
    {
      ageGroup: '20 - 29',
      confirmed: 2000,
      death: 9800,
    },
    {
      ageGroup: '30 - 39',
      confirmed: 2780,
      death: 3908,
    },
    {
      ageGroup: '40 - 49',
      confirmed: 1890,
      death: 4800,
    },
    {
      ageGroup: '50 - 59',
      confirmed: 2390,
      death: 3800,
    },
    {
      ageGroup: '60 - 69',
      confirmed: 3490,
      death: 4300,
    },
    {
      ageGroup: '70 - 79',
      confirmed: 4000,
      death: 2400,
    },
    {
      ageGroup: '80 - More',
      confirmed: 3000,
      death: 1398,
    },
  ],
};
const BarChart = () => {
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <div className={barChartStyles.container}>
      <RechartsBarChart
        width={400}
        height={500}
        data={data.entries}
        layout="horizontal"
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="ageGroup" />
        <XAxis
          dataKey="ageGroup"
          axisLine={false}
          tickLine={false}
          interval={0}
          height={1}
          scale="band"
          xAxisId="quarter"
        />
        <YAxis />
        <Tooltip />
        <Legend />
        {data.keys.map((key) => {
          const randomColor = getRandomColor();
          return <Bar key={key} dataKey={key} fill={randomColor} />;
        })}
      </RechartsBarChart>
    </div>
  );
};

export default BarChart;
