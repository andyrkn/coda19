import React from 'react';
import { Route, Switch } from 'react-router';
import Home from 'pages/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route path="/home">
          <Home />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
