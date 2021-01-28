import React, { useContext, useEffect, useState } from 'react';

// import EmptyCard from 'components/EmptyCard/EmptyCard';

import CountrySelector from 'components/CountrySelector';

import { Paper, useMediaQuery } from '@material-ui/core';

import { useHeaderDispatch } from 'contexts/header-context';
import LineChart from 'charts/LineChart';
import { CountryContext } from 'contexts/country-context';
import axios from 'axios';

import { PAGES } from 'shared/constants';
// import { globalCases } from './constants';

import predictionStyles from './Prediction.module.scss';

const Prediction = () => {
  const [localCases, setLocalCases] = useState([]);
  const country = useContext(CountryContext);

  const prepareGlobalCases = (data) => {
    if (data.length > 0) {
      const keys = Object.keys(data[0]);
      const preparedData = {
        keys: keys
          .filter((key) => key !== 'date')
          .map((key) => key.replace(/([A-Z])/g, ' $1').trim()),

        entries: data.map((entry) => ({
          date: entry.date,
          'new Cases': parseInt(entry.newCases, 10),
        })),
      };

      return preparedData;
    }

    return [];
  };

  useEffect(() => {
    if (country?.countryList) {
      axios
        .get(
          `http://prediction.coda19.ashbell-platform.com/api/prediction?Country=${country.countryList}`
        )
        .then((res) => {
          const { data } = res;
          setLocalCases(data);
        });
    }
  }, [country]);

  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.PREDICTION });
  }, []);

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

  const propsVaccination = {
    title: 'Vaccination effort globally',
    width: getResponsiveWidth(),
  };

  return (
    <section>
      <div
        className={
          dateBreak
            ? predictionStyles.columnContainer
            : predictionStyles.globalContainer
        }
      >
        <div className={predictionStyles.filtersContainer}>
          <CountrySelector multipleValues={false} />
        </div>

        <Paper elevation={2}>
          <LineChart
            data={prepareGlobalCases(localCases)}
            properties={propsVaccination}
          />
        </Paper>
      </div>
    </section>
  );
};

export default Prediction;
