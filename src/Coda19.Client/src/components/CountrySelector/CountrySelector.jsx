/* eslint-disable react/jsx-one-expression-per-line */
import { Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import React, { useContext } from 'react';
import { CountryContext } from 'contexts/country-context';
import { countries } from './constants';
import { backCountries } from './locations';

import countrySelectorStyles from './CountrySelector.module.scss';

const CountrySelector = () => {
  const country = useContext(CountryContext);

  const handleCountryChange = (value) => {
    const selectedCountries = value.map((entry) => {
      const backCountry = backCountries.find(
        (backCountryy) => backCountryy.Location === entry.label
      );
      if (backCountry) {
        const code = backCountry.uid.split('#');
        return code[code.length - 1];
      }

      return '';
    });

    console.log(selectedCountries);
    // return selectedCountries;
    // const strArr = str.split('#');
    // console.log('STRING ARRAY', strArr);
    // return strArr[strArr.length - 1];

    country.setCountryList(selectedCountries);
  };

  const countryToFlag = (isoCode) =>
    typeof String.fromCodePoint !== 'undefined'
      ? isoCode
          .toUpperCase()
          .replace(/./g, (char) =>
            String.fromCodePoint(char.charCodeAt(0) + 127397)
          )
      : isoCode;

  return (
    <div className={countrySelectorStyles.container}>
      <Paper elevation={0}>
        <Autocomplete
          multiple
          limitTags={0}
          disableCloseOnSelect
          disableListWrap
          id="multiple-limit-countries"
          options={countries.filter((entry) =>
            backCountries.find(
              (backCountry) => backCountry.Location === entry.label
            )
          )}
          onChange={(event, value) => handleCountryChange(value)}
          getOptionLabel={(option) => option.label}
          renderOption={(option) => (
            <>
              <span>{countryToFlag(option.code)}</span>
              <Typography variant="body2">{option.label}</Typography>
            </>
          )}
          renderInput={(params) => (
            <TextField
              // eslint-disable-next-line react/jsx-props-no-spreading
              {...params}
              variant="outlined"
              label="Countries"
              placeholder="Select..."
            />
          )}
        />
      </Paper>
    </div>
  );
};

export default CountrySelector;
