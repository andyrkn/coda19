import React from 'react';
// import { Helmet } from 'react-helmet';
import { Helmet } from 'react-helmet-async';

import { Hidden } from '@material-ui/core';
import AppBar from 'components/AppBar';
import MainTitle from 'components/MainTitle';
import Statistics from 'components/Statistics';
import PropTypes from 'prop-types';

import { ReactComponent as CenterSvg } from 'images/virus.svg';
import { ReactComponent as TopRightSvg } from 'images/halfVirus.svg';
import { pagesList } from './constants';

import headerStyles from './Header.module.scss';

const Header = ({ title, description }) => (
  <div className={headerStyles.container}>
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
    </Helmet>
    <AppBar pagesList={pagesList} />

    <Hidden smUp>
      <TopRightSvg className={headerStyles.topRightSvg} />
      <CenterSvg className={headerStyles.centerSvg} />
    </Hidden>

    <MainTitle title={title} description={description} />

    <Statistics />
  </div>
);
export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
