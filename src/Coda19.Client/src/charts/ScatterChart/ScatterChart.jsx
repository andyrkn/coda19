import React from 'react';

import {
  ScatterChart as RechartsScatterChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  LabelList,
  Legend,
  Scatter,
} from 'recharts';
// import PropTypes from 'prop-types';

const data = {
  continents: ['North America', 'Europe', 'Asia'],
  entries: [
    {
      country: 'Germany',
      continent: 'Europe',
      tests: 240,
      confirmed: 1595,
      z: 200,
    },
    {
      country: 'Romania',
      continent: 'Europe',
      tests: 301,
      confirmed: 2041,
      z: 260,
    },
    {
      country: 'France',
      continent: 'Europe',
      tests: 501,
      confirmed: 4095,
      z: 400,
    },
    {
      country: 'USA',
      continent: 'North America',
      tests: 602,
      confirmed: 5450,
      z: 280,
    },
    {
      country: 'China',
      continent: 'Asia',
      tests: 504,
      confirmed: 10000,
      z: 500,
    },
    {
      country: 'Luxembourg',
      continent: 'Europe',
      tests: 201,
      confirmed: 5191,
      z: 200,
    },
  ],
};

const ScatterChart = () => {
  const getRandomColor = () =>
    `#${Math.floor(Math.random() * 16777215).toString(16)}`;

  return (
    <RechartsScatterChart
      width={590}
      height={500}
      margin={{
        top: 50,
        left: -60,
        right: 50,
        bottom: 5,
      }}
    >
      <CartesianGrid />
      <XAxis
        type="number"
        label={{
          value: 'Daily tests per million',
          position: 'insideBottomRight',
        }}
        height={70}
        dataKey="tests"
        name="stature"
      />
      <YAxis
        type="number"
        label={{
          value: 'Daily coonfirmed cases per million people',
          angle: -90,
        }}
        width={200}
        dataKey="confirmed"
        name="weight"
      />
      <Tooltip cursor={{ strokeDasharray: '3 3' }} />
      <Legend />
      {data.continents.map((continent) => {
        const randomColor = getRandomColor();
        return (
          <Scatter
            name={continent}
            data={data.entries.filter((entry) => entry.continent === continent)}
            fill={randomColor}
          >
            <LabelList dataKey="country" position="top" />
          </Scatter>
        );
      })}
    </RechartsScatterChart>
  );
};

export default ScatterChart;
