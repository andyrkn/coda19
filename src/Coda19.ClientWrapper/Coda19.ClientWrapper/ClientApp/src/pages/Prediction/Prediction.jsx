import React, { useEffect, useState } from 'react';

// import EmptyCard from 'components/EmptyCard/EmptyCard';
import DateFnsUtils from '@date-io/date-fns';

import {
  KeyboardDatePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';

import { Paper } from '@material-ui/core';

import { useHeaderDispatch } from 'contexts/header-context';
import LineChart from 'charts/LineChart';

import { PAGES } from 'shared/constants';
import { globalCases } from './constants';

import predictionStyles from './Prediction.module.scss';

const Prediction = () => {
  const headerDispatch = useHeaderDispatch();
  const [selectedDate, setSelectedDate] = useState(
    new Date('2020-08-18T21:11:54')
  );

  const prepareGlobalCases = (data) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const preparedData = {
        keys: keys
          .filter((key) => key !== 'Date')
          .map((key) => key.replace(/([A-Z])/g, ' $1').trim()),

        entries: data.map((entry) => ({
          date: entry.Date,
          'New Cases': parseInt(entry.NewCases, 10),
        })),
      };

      return preparedData;
    }

    return [];
  };

  const propsDailyTests = {
    title: 'Predicted cases',
    width: 750,
  };

  const handleDateChange = (date) => {
    console.log(date);
    setSelectedDate(date);
  };

  useEffect(() => {
    headerDispatch({ type: PAGES.PREDICTION });
  }, []);

  return (
    <section>
      <div className={predictionStyles.globalContainer}>
        <div className={predictionStyles.noCountryFilterContainer}>
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
    </section>
  );
};

export default Prediction;
