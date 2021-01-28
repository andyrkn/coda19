import React, { createContext, useState } from 'react';
import PropTypes from 'prop-types';

export const ApiContext = createContext();

export const ApiProvider = ({ children }) => {
  const [globalCases, setGlobalCases] = useState([]);
  const [globalTests, setGlobalTests] = useState([]);
  const [globalDeaths, setGlobalDeaths] = useState([]);

  return (
    <ApiContext.Provider
      value={{
        globalCases,
        setGlobalCases,
        globalTests,
        setGlobalTests,
        globalDeaths,
        setGlobalDeaths,
      }}
    >
      {children}
    </ApiContext.Provider>
  );
};

ApiProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
