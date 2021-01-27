import React from 'react';
import { Route, Switch } from 'react-router';
import { Provider } from 'react-redux';
import { HelmetProvider } from 'react-helmet-async';

import Home from 'pages/Home';
import History from 'pages/History';
import Spread from 'pages/Spread';
import Symptoms from 'pages/Symptoms';
import Protection from 'pages/Protection';
import Prediction from 'pages/Prediction';
import About from 'pages/About';

import Header from 'components/Header';
import { useHeaderState } from 'contexts/header-context';

import keplerGlReducer from 'kepler.gl/reducers';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { taskMiddleware } from 'react-palm/tasks';
// import useSwr from 'swr';

import './App.scss';

const reducer = combineReducers({
  keplerGl: keplerGlReducer.initialState({
    uiState: {
      activeSidePanel: null,
      currentModal: null,
    },
  }),
});

// create store
const store = createStore(reducer, {}, applyMiddleware(taskMiddleware));

function App() {
  const headerState = useHeaderState();
  const { title, description } = headerState;

  return (
    <HelmetProvider>
      <Provider store={store}>
        <div className="App">
          <Header title={title} description={description} />
          <Switch>
            <Route path="/home">
              <Home />
            </Route>
            <Route path="/history">
              <History />
            </Route>
            <Route path="/spread">
              <Spread />
            </Route>
            <Route path="/symptoms">
              <Symptoms />
            </Route>
            <Route path="/protection">
              <Protection />
            </Route>
            <Route path="/prediction">
              <Prediction />
            </Route>
            <Route path="/about">
              <About />
            </Route>
          </Switch>
        </div>
      </Provider>
    </HelmetProvider>
  );
}

export default App;
