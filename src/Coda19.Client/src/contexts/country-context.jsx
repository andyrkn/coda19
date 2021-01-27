import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const CountryContext = createContext();

export const CountryProvider = ({ children }) => {
  //   const [state, dispatch] = useReducer(CountryReducer, []);
  const [countryList, setCountryList] = useState([]);

  return (
    <CountryContext.Provider value={{ countryList, setCountryList }}>
      {children}
    </CountryContext.Provider>
  );
};

CountryProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
