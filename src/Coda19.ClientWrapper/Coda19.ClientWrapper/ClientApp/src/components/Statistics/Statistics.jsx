/* eslint-disable react/jsx-wrap-multilines */
import React, { useEffect, useState } from 'react';
import EmptyCard from 'components/EmptyCard';
import { Grid } from '@material-ui/core';
import { ReactComponent as RedVirusSvg } from 'images/redVirus.svg';
import { ReactComponent as GreenVirusSvg } from 'images/greenVirus.svg';
import { ReactComponent as GrayVirusSvg } from 'images/grayVirus.svg';
import axios from 'axios';
// import { ReactComponent as BlueVirusSvg } from 'images/blueVirus.svg';

import statisticsStyles from './Statistics.module.scss';
import StatsCard from '../StatsCard';

const Statistics = () => {
  const [statistics, setStatistics] = useState({});

  useEffect(() => {
    axios
      .get(
        `http://evolution.coda19.ashbell-platform.com/api/evolution/Global/all`
      )
      .then((res) => {
        const { data } = res;
        setStatistics(data[0]);
      });
  }, [statistics]);

  return (
    <div className={statisticsStyles.container}>
      <EmptyCard
        content={
          // <div className={statisticsStyles.stats}>
          <Grid container direction="row" spacing={4}>
            <Grid item xs={4}>
              <StatsCard
                virus={<RedVirusSvg />}
                title="Cases"
                number={statistics?.NewCases}
              />
            </Grid>
            <Grid item xs={4}>
              <StatsCard
                virus={<GreenVirusSvg />}
                title="Tests"
                number={statistics?.NewTests}
              />
            </Grid>
            <Grid item xs={4}>
              <StatsCard
                virus={<GrayVirusSvg />}
                title="Deaths"
                number={statistics?.NewDeaths}
              />
            </Grid>
          </Grid>
          // </div>
        }
      />
    </div>
  );
};

export default Statistics;
