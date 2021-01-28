import React from 'react';
// import { Helmet } from 'react-helmet';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router';

import { Hidden } from '@material-ui/core';
import AppBar from 'components/AppBar';
import MainTitle from 'components/MainTitle';
import ChinaMap from 'components/ChinaMap';
import Statistics from 'components/Statistics';
import PropTypes from 'prop-types';

import { pagesList } from './constants';

import headerStyles from './Header.module.scss';

const Header = ({ title, description }) => {
  const location = useLocation();
  return (
    <div className={headerStyles.container}>
      <Helmet>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Helmet>
      <AppBar pagesList={pagesList} />

      <MainTitle title={title} description={description} />

      {location.pathname === '/home' ? (
        <Hidden xsDown>
          <Statistics />
        </Hidden>
      ) : (
        ''
      )}
      {location.pathname === '/history' ? <ChinaMap /> : ''}
    </div>
  );
};
export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
