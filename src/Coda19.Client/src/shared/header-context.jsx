import React, { createContext, useReducer, useContext } from 'react';
import PropTypes from 'prop-types';
import { HEADER, PAGES } from './constants';

const HeaderStateContext = createContext();
const HeaderDispatchContext = createContext();

const HeaderReducer = (state, action) => {
  switch (action.type) {
    case PAGES.HOME:
      return {
        title: HEADER.HOME.title,
        description: HEADER.HOME.description,
      };
    case PAGES.HISTORY:
      return {
        title: HEADER.HISTORY.title,
        description: HEADER.HISTORY.description,
      };
    case PAGES.SPREAD:
      return {
        title: HEADER.SPREAD.title,
        description: HEADER.SPREAD.description,
      };
    case PAGES.SYMPTOMS:
      return {
        title: HEADER.SYMPTOMS.title,
        description: HEADER.SYMPTOMS.description,
      };
    case PAGES.PROTECTION:
      return {
        title: HEADER.PROTECTION.title,
        description: HEADER.PROTECTION.description,
      };
    case PAGES.PREDICTION:
      return {
        title: HEADER.PREDICTION.title,
        description: HEADER.PREDICTION.description,
      };
    case PAGES.ABOUT:
      return {
        title: HEADER.ABOUT.title,
        description: HEADER.ABOUT.description,
      };
    default:
      throw new Error();
  }
};

function HeaderProvider({ children }) {
  const [state, dispatch] = useReducer(HeaderReducer, HEADER.INITIAL_STATE);

  return (
    <HeaderStateContext.Provider value={state}>
      <HeaderDispatchContext.Provider value={dispatch}>
        {children}
      </HeaderDispatchContext.Provider>
    </HeaderStateContext.Provider>
  );
}

function useHeaderState() {
  const context = useContext(HeaderStateContext);
  if (!context) {
    throw new Error('useHeaderState must be used within a HeaderProvider');
  }
  return context;
}

function useHeaderDispatch() {
  const context = useContext(HeaderDispatchContext);
  if (!context) {
    throw new Error('useHeaderDispatch must be used within a HeaderProvider');
  }
  return context;
}

export { HeaderProvider, useHeaderState, useHeaderDispatch };

HeaderProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
