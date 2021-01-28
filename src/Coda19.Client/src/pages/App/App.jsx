import React from 'react';
import { Redirect, Route, Switch } from 'react-router';
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

import './App.scss';

function App() {
  const headerState = useHeaderState();
  const { title, description } = headerState;

  return (
    <HelmetProvider>
      <div className="App">
        <Header title={title} description={description} />
        <Switch>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
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
    </HelmetProvider>
  );
}

export default App;
