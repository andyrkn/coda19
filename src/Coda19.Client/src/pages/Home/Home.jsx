import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard';
import { Grid, useMediaQuery } from '@material-ui/core';

import { useHeaderDispatch } from 'shared/header-context';
import { lorem, PAGES } from 'shared/constants';

import homeStyles from './Home.module.scss';

const Home = () => {
  const headerDispatch = useHeaderDispatch();

  const xs = useMediaQuery('(max-width:600px)');
  const md = useMediaQuery('(max-width:1080px)');

  const getResponsiveGrid = () => {
    if (xs) {
      return 12;
    }
    if (md) {
      return 6;
    }
    return 4;
  };

  useEffect(() => {
    headerDispatch({ type: PAGES.HOME });
  }, []);

  return (
    <section className={homeStyles.container}>
      <EmptyCard />
      <Grid container justify="center" spacing={1}>
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map((value) => (
          <Grid key={value} item xs={getResponsiveGrid()}>
            <p>{lorem}</p>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default Home;
