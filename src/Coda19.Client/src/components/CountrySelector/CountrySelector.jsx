/* eslint-disable react/jsx-one-expression-per-line */
import { Paper, TextField, Typography } from '@material-ui/core';
import { Autocomplete } from '@material-ui/lab';

import React, { useContext } from 'react';
import { CountryContext } from 'contexts/country-context';
import { countries } from './constants';

import countrySelectorStyles from './CountrySelector.module.scss';

const CountrySelector = () => {
  const country = useContext(CountryContext);

  const handleCountryChange = (value) => {
    country.setCountryList(value);
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
          open
          limitTags={0}
          disableCloseOnSelect
          disablePortal
          disableListWrap
          id="multiple-limit-countries"
          options={countries}
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
