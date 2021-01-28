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

import {
  dailyTestsData,
  vaccinationData,
  globalDeaths,
  globalTests,
} from './constants';
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
  const [localCases, setLocalCases] = useState([]);

  useEffect(() => {
    axios
      .get(
        `http://evolution.coda19.ashbell-platform.com/api/evolution/Global/cases?StartDate=${selectedDate.toISOString()}`
      )
      .then((res) => {
        const { data } = res;
        // api.setGlobalCases({ data });
        console.log(data);
        setGlobalCases(data);
      });
  }, [selectedDate]);

  useEffect(() => {
    const countryMap = country.countryList.map((entry) => `&Country=${entry}`);

    // console.log('STR', str, countryMap);
    axios
      .get(
        `http://evolution.coda19.ashbell-platform.com/api/evolution/Country/cases?StartDate=${selectedDate.toISOString()}${countryMap.join(
          ''
        )}`
      )
      .then((res) => {
        const { data } = res;
        console.log(data);
        setLocalCases(data);
      });
  }, [country, selectedDate]);

  useEffect(() => {
    console.log('Country', country);
  }, [country]);

  useEffect(() => {
    console.log(api);
  }, [api]);

  const xxs = useMediaQuery('(max-width:400px)');
  const xs = useMediaQuery('(max-width:600px)');
  const betweenXSandMD = useMediaQuery('(max-width:800px');
  const md = useMediaQuery('(max-width:1080px)');
  const dateBreak = useMediaQuery('(max-width:1200px)');

  const getResponsiveWidth = () => {
    if (xxs) {
      return 200;
    }
    if (xs) {
      return 250;
    }
    if (betweenXSandMD) {
      return 450;
    }
    if (md) {
      return 600;
    }
    if (dateBreak) {
      return 750;
    }
    return 750;
  };

  useEffect(() => {
    headerDispatch({ type: PAGES.HOME });
  }, []);

  const props = {
    title: 'Global cases',
    width: getResponsiveWidth(),
  };

  const propsSars = {
    title: 'Covid 19 vs Sars',
    width: getResponsiveWidth(),
  };

  const propsVaccination = {
    title: 'Vaccination effort globally',
    width: getResponsiveWidth(),
  };

  const propsHospitalization = {
    title: 'Number of COVID-19 patients in hospital',
    width: getResponsiveWidth(),
  };

  const propsDailyTests = {
    title: 'Daily COIVD-19 tests per thousand people',
    width: getResponsiveWidth(),
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

  function transform(data) {
    const output = [];
    Object.keys(data).forEach((current) => {
      JSON.parse(data[current]).forEach((entry) => {
        if (output.find((x) => x.date === entry.Date) === undefined) {
          output.push({ date: entry.Date });
        }

        const activeEntry = output.find((x) => x.date === entry.Date);
        activeEntry[current] = parseInt(entry.NewCases, 10);
      });
    });
    return output;
  }

  const prepareLocalData = (data2) => {
    console.log('localData', data2);
    // eslint-disable-next-line no-extra-boolean-cast
    if (!Array.isArray(data2)) {
      console.log('IN IF');
      const modifiedData = transform(data2);
      const keys = Object.keys(modifiedData[0]);
      const preparedData = {
        keys: keys.filter((key) => key !== 'date'),

        entries: modifiedData,
      };

      console.log(preparedData);
      return preparedData;
    }
    return [];
  };

  return (
    <section className={homeStyles.container}>
      <div>
        <Hidden mdDown>
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
        </Hidden>
        {/* Global cases */}
        <TabPanel value={value} index={0}>
          <Hidden mdDown>
            <div
              className={
                dateBreak
                  ? homeStyles.columnContainer
                  : homeStyles.globalContainer
              }
            >
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
          </Hidden>

          {/* <Map /> */}
        </TabPanel>

        {/* Global tests */}
        <TabPanel value={value} index={1}>
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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

        {/* Local Cases */}
        <TabPanel value={value} index={3}>
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
              <LineChart
                data={prepareLocalData(localCases)}
                properties={propsVaccination}
              />
            </Paper>
          </div>
        </TabPanel>
        <TabPanel value={value} index={4}>
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
        <Hidden lgUp>
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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

          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
          <div
            className={
              dateBreak
                ? homeStyles.columnContainer
                : homeStyles.globalContainer
            }
          >
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
              <LineChart
                data={prepareLocalData(localCases)}
                properties={propsVaccination}
              />
            </Paper>
          </div>
        </Hidden>
      </div>
    </section>
  );
};

export default Home;
