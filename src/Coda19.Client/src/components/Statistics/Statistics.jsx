/* eslint-disable react/jsx-wrap-multilines */
import React from 'react';
import EmptyCard from 'components/EmptyCard';
import { Grid } from '@material-ui/core';
import { ReactComponent as RedVirusSvg } from 'images/redVirus.svg';
import { ReactComponent as GreenVirusSvg } from 'images/greenVirus.svg';
import { ReactComponent as GrayVirusSvg } from 'images/grayVirus.svg';
// import { ReactComponent as BlueVirusSvg } from 'images/blueVirus.svg';

import statisticsStyles from './Statistics.module.scss';
import StatsCard from '../StatsCard';

const Statistics = () => (
  <div className={statisticsStyles.container}>
    <EmptyCard
      content={
        // <div className={statisticsStyles.stats}>
        <Grid container direction="row" spacing={4}>
          <Grid item xs={4}>
            <StatsCard
              virus={<RedVirusSvg />}
              title="Total Cases"
              number={1239543}
            />
          </Grid>
          <Grid item xs={4}>
            <StatsCard
              virus={<GreenVirusSvg />}
              title="Total Recovered"
              number={259544}
            />
          </Grid>
          <Grid item xs={4}>
            <StatsCard
              virus={<GrayVirusSvg />}
              title="Total Deaths"
              number={68184}
            />
          </Grid>
        </Grid>
        // </div>
      }
    />
  </div>
);

export default Statistics;
