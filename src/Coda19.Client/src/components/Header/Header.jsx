import React from 'react';

import { ReactComponent as CenterSvg } from 'images/virus.svg';
import { ReactComponent as TopRightSvg } from 'images/halfVirus.svg';

import AppBar from 'components/AppBar';
import PropTypes from 'prop-types';

import { pagesList } from './constants';

import headerStyles from './Header.module.scss';

const Header = ({ title, description }) => (
  <div className={headerStyles.container}>
    <AppBar pagesList={pagesList} />
    <div className={headerStyles.textWrapper}>
      <h1 className={headerStyles.title}>{title}</h1>
      <p className={headerStyles.description}>{description}</p>
    </div>

    <TopRightSvg className={headerStyles.topRightSvg} />
    <CenterSvg className={headerStyles.centerSvg} />
  </div>
);
export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
