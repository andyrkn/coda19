import React from 'react';
import { Route, Switch } from 'react-router';

import Home from 'pages/Home';
import History from 'pages/History';
import Spread from 'pages/Spread';
import Symptoms from 'pages/Symptoms';
import Protection from 'pages/Protection';
import Prediction from 'pages/Prediction';
import About from 'pages/About';

import Header from 'components/Header';
import { useHeaderState } from 'shared/header-context';

function App() {
  const headerState = useHeaderState();
  const { title, description } = headerState;

  return (
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
  );
}

export default App;
