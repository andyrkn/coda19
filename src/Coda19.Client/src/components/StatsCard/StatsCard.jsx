/* eslint-disable react/prop-types */
import { Grid, Typography } from '@material-ui/core';
import React from 'react';

import statsCardStyles from './StatsCard.module.scss';

const StatsCard = ({ virus, title, number }) => {
  console.log('ey');
  return (
    <div className={statsCardStyles.container}>
      <Grid container direction="row" justify="center" spacing={0}>
        <Grid item xs={3}>
          {virus}
        </Grid>
        <Grid container direction="row" justify="center" xs={9}>
          <Grid item xs={12}>
            <Typography variant="subtitle2" gutterBottom>
              {title}
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body2" gutterBottom>
              {number}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
};

export default StatsCard;
