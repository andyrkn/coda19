/* eslint-disable no-undef */
/* eslint-disable react/jsx-filename-extension */
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import 'index.scss';
import App from 'pages/App/App';
import { HeaderProvider } from 'shared/header-context';

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <HeaderProvider>
        <App />
      </HeaderProvider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);
