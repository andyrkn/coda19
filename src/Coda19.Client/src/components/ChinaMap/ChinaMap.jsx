import React from 'react';

import { Grid, Paper } from '@material-ui/core';
import { ReactComponent as ChinaMapSvg } from 'images/chinaMap.svg';
import { ReactComponent as HubeiMapSvg } from 'images/hubeiMap.svg';

import chinaMapStyles from './ChinaMap.module.scss';

const ChinaMap = () => {
  console.log('ceva');
  return (
    <div className={chinaMapStyles.container}>
      <Grid container justify="center" direction="row" spacing={4}>
        <Grid item xs={6}>
          <Paper elevation={2}>
            <ChinaMapSvg />
          </Paper>
        </Grid>
        <Grid item xs={6}>
          <Paper elevation={2}>
            <HubeiMapSvg />
          </Paper>
        </Grid>
      </Grid>
    </div>
  );
};

export default ChinaMap;
