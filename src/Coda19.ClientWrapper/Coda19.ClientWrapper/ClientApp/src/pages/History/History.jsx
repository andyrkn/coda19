import React, { useEffect } from 'react';

import { Grid, Typography } from '@material-ui/core';

import { useHeaderDispatch } from 'contexts/header-context';
import { lorem, PAGES } from 'shared/constants';

import historyStyles from './History.module.scss';

const History = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.HISTORY });
  }, []);

  return (
    <section className={historyStyles.container}>
      <Grid container justify="flex-start" direction="column">
        <Grid item xs={12}>
          <Typography variant="h4">HELLO THERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">HELLO THERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">HELLO THERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">HELLO THERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">HELLO THERE</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">{lorem}</Typography>
        </Grid>
      </Grid>
    </section>
  );
};

export default History;
