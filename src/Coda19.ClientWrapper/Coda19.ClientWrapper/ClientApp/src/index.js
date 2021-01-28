/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'index.scss';
import App from 'pages/App/App';
import { HeaderProvider } from 'contexts/header-context';
import { CountryProvider } from 'contexts/country-context';
import { ApiProvider } from 'contexts/api-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderProvider>
        <CountryProvider>
          <ApiProvider>
            <App />
          </ApiProvider>
        </CountryProvider>
      </HeaderProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
