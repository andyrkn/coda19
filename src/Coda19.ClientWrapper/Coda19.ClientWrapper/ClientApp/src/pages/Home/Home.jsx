/* eslint-disable react/prop-types */
/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import DateFnsUtils from '@date-io/date-fns';
import {
  AppBar,
  Hidden,
  Paper,
  Tab,
  Tabs,
  useMediaQuery,
} from '@material-ui/core';
import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import axios from 'axios';
import LineChart from 'charts/LineChart';
import CountrySelector from 'components/CountrySelector';
import TabPanel from 'components/TabPanel';
import { ApiContext } from 'contexts/api-context';
import { CountryContext } from 'contexts/country-context';
import { useHeaderDispatch } from 'contexts/header-context';
import React, { useContext, useEffect, useState } from 'react';
import { PAGES } from 'shared/constants';

import { dailyTestsData, globalDeaths, globalTests } from './constants';
import {
  prepareGlobalCases,
  prepareGlobalDeaths,
  prepareGlobalTests,
} from './helpers';
import homeStyles from './Home.module.scss';

const Home = () => {
  const headerDispatch = useHeaderDispatch();
  const country = useContext(CountryContext);
  const api = useContext(ApiContext);
  const [selectedDate, setSelectedDate] = useState(
    new Date('2020-08-18T21:11:54')
  );
  const [value, setValue] = useState(0);
  const [globalCases, setGlobalCases] = useState([]);

  useEffect(() => {
    axios
      .get(
        `https://localhost:5010/api/evolution/Global/cases?StartDate=${selectedDate.toISOString()}`
      )
      .then((res) => {
        const { data } = res;
        // api.setGlobalCases({ data });
        console.log(data);
        setGlobalCases(data);
      });
  }, [selectedDate]);

  useEffect(() => {
    console.log(country);
  }, [country]);

  useEffect(() => {
    console.log(api);
  }, [api]);

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
    width: 750,
  };

  function a11yProps(index) {
    return {
      id: `scrollable-auto-tab-${index}`,
      'aria-controls': `scrollable-auto-tabpanel-${index}`,
    };
  }

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  return (
    <section className={homeStyles.container}>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="scrollable"
            scrollButtons="auto"
            aria-label="scrollable auto tabs example"
          >
            <Tab label="Global cases" {...a11yProps(0)} />
            <Tab label="Global tests" {...a11yProps(1)} />
            <Tab label="Global deaths" {...a11yProps(2)} />
            <Tab label="Local Cases" {...a11yProps(3)} />
            <Tab label="Local Tests" {...a11yProps(4)} />
            <Tab label="Local Deaths" {...a11yProps(5)} />
            <Tab label="Leaderboard" {...a11yProps(6)} />
          </Tabs>
        </AppBar>
        {/* Global cases */}
        <TabPanel value={value} index={0}>
          <Hidden xsDown>
            <div className={homeStyles.globalContainer}>
              <div className={homeStyles.noCountryFilterContainer}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Pick a start date!"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>

              <Paper elevation={2}>
                <LineChart
                  data={prepareGlobalCases(globalCases)}
                  properties={propsDailyTests}
                />
              </Paper>
            </div>

            {/* <Map /> */}
          </Hidden>
        </TabPanel>

        {/* Global tests */}
        <TabPanel value={value} index={1}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.noCountryFilterContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Pick a start date!"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>

            <Paper elevation={2}>
              <LineChart
                data={prepareGlobalTests(globalTests)}
                properties={propsDailyTests}
              />
            </Paper>
          </div>
        </TabPanel>

        {/* Global Deaths */}
        <TabPanel value={value} index={2}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.noCountryFilterContainer}>
              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Pick a start date!"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>

            <Paper elevation={2}>
              <LineChart
                data={prepareGlobalDeaths(globalDeaths)}
                properties={propsDailyTests}
              />
            </Paper>
          </div>
        </TabPanel>

        <TabPanel value={value} index={3}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.filtersContainer}>
              <CountrySelector />

              <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <KeyboardDatePicker
                  disableToolbar
                  variant="inline"
                  format="dd/MM/yyyy"
                  margin="normal"
                  id="date-picker-inline"
                  label="Pick a start date!"
                  value={selectedDate}
                  onChange={handleDateChange}
                  KeyboardButtonProps={{
                    'aria-label': 'change date',
                  }}
                />
              </MuiPickersUtilsProvider>
            </div>

            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.filtersContainer}>
              <CountrySelector />
              <div className={homeStyles.rangePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Pick a start date!"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={5}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.filtersContainer}>
              <CountrySelector />
              <div className={homeStyles.rangePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Pick a start date!"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={6}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.filtersContainer}>
              <CountrySelector />
              <div className={homeStyles.rangePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Pick a start date!"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={7}>
          <div className={homeStyles.globalContainer}>
            <div className={homeStyles.filtersContainer}>
              <CountrySelector />
              <div className={homeStyles.rangePicker}>
                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                  <KeyboardDatePicker
                    disableToolbar
                    variant="inline"
                    format="dd/MM/yyyy"
                    margin="normal"
                    id="date-picker-inline"
                    label="Pick a start date!"
                    value={selectedDate}
                    onChange={handleDateChange}
                    KeyboardButtonProps={{
                      'aria-label': 'change date',
                    }}
                  />
                </MuiPickersUtilsProvider>
              </div>
            </div>

            <Paper elevation={2}>
              <LineChart data={dailyTestsData} properties={propsDailyTests} />
            </Paper>
          </div>
        </TabPanel>
      </div>

      {/* <Grid container direction="column" justify="center" spacing={2}>
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
      </Grid> */}
    </section>
  );
};

export default Home;
