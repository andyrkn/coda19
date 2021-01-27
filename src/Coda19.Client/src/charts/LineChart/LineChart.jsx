/* eslint-disable react/prop-types */
import React, { useEffect, useState } from 'react';

import {
  LineChart as RechartsLineChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Line,
} from 'recharts';
// import PropTypes from 'prop-types';
import { Typography } from '@material-ui/core';

import { chartColors } from 'shared/constants';

import lineChartStyles from './LineChart.module.scss';

const LineChart = ({ data, properties }) => {
  const { title, width } = properties;
  const [colors, setColors] = useState(chartColors);

  useEffect(() => {
    setColors(chartColors.sort(() => Math.random() - 0.5));
  }, []);

  return (
    <div className={lineChartStyles.chartContainer}>
      <Typography variant="subtitle2" color="textSecondary" gutterBottom>
        {title}
      </Typography>
      <RechartsLineChart
        width={width}
        height={300}
        data={data?.entries}
        margin={{
          top: 5,
          right: 30,
          left: 50,
          bottom: 30,
        }}
      >
        <CartesianGrid stroke="#f5f5f5" />
        <XAxis tickMargin={20} dataKey="date" />
        <YAxis tickMargin={20} />
        <Tooltip />
        <Legend />
        {data.keys.map((key, index) => (
          <Line
            type="monotone"
            strokeWidth={2}
            legendType="rect"
            key={key}
            dataKey={key}
            stroke={colors[index]}
          />
        ))}
      </RechartsLineChart>
    </div>
  );
};
export default LineChart;
