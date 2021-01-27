/* eslint-disable no-undef */
import React, { useContext, useEffect } from 'react';

import { Grid, Hidden, Paper, useMediaQuery } from '@material-ui/core';

import Map from 'components/Map';
import CountrySelector from 'components/CountrySelector';
import LineChart from 'charts/LineChart';
import BarChart from 'charts/BarChart';
import ScatterChart from 'charts/ScatterChart';

import { useHeaderDispatch } from 'contexts/header-context';
import { CountryContext } from 'contexts/country-context';
import { lorem, PAGES } from 'shared/constants';

import {
  casesData,
  sarsData,
  vaccinationData,
  hospitalizationData,
  dailyTestsData,
} from './constants';
import homeStyles from './Home.module.scss';

const Home = () => {
  const headerDispatch = useHeaderDispatch();
  const country = useContext(CountryContext);
  useEffect(() => {
    console.log(country);
  }, [country]);

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

  const props = {
    title: 'Global cases',
    width: 500,
  };

  const propsSars = {
    title: 'Covid 19 vs Sars',
    width: 500,
  };

  const propsVaccination = {
    title: 'Vaccination effort globally',
    width: 500,
  };

  const propsHospitalization = {
    title: 'Number of COVID-19 patients in hospital',
    width: 500,
  };

  const propsDailyTests = {
    title: 'Daily COIVD-19 tests per thousand people',
    width: 1060,
  };

  return (
    <section className={homeStyles.container}>
      <Hidden xsDown>
        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item xs={4}>
            <CountrySelector />
          </Grid>
          <Grid item xs={8}>
            <Map />
          </Grid>
        </Grid>
      </Hidden>

      <Grid container direction="column" justify="center" spacing={2}>
        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={2}>
              <LineChart data={casesData} properties={props} />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={2}>
              <LineChart data={sarsData} properties={propsSars} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item>
            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={6}>
            <Paper elevation={2}>
              <LineChart data={vaccinationData} properties={propsVaccination} />
            </Paper>
          </Grid>

          <Grid item xs={6}>
            <Paper elevation={2}>
              <LineChart
                data={hospitalizationData}
                properties={propsHospitalization}
              />
            </Paper>
          </Grid>
        </Grid>

        <Grid container direction="row" justify="center" spacing={2}>
          <Grid item xs={5}>
            <Paper elevation={2}>
              <BarChart />
            </Paper>
          </Grid>

          <Grid item xs={7}>
            <Paper elevation={2}>
              <ScatterChart />
            </Paper>
          </Grid>
        </Grid>
      </Grid>

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
