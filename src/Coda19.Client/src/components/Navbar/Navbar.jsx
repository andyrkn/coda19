import React from 'react';
import { Link, useLocation } from 'react-router-dom';

import { ReactComponent as LogoSvg } from 'images/navbarLogo.svg';
// import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

// import HistoryIcon from '@material-ui/icons/History';
// import HomeIcon from '@material-ui/icons/Home';
// import InfoIcon from '@material-ui/icons/Info';
// import ListAltIcon from '@material-ui/icons/ListAlt';
// import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
// import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
// import TimelineIcon from '@material-ui/icons/Timeline';

import { upperFirstLetter } from 'shared/helpers';

import { PAGES } from 'shared/constants';
import navbarStyles from './Navbar.module.scss';

const getLinkTo = (page, loc) => (
  <Button
    className={loc === `/${page.toLowerCase()}` ? navbarStyles.activeLink : ''}
    variant="text"
    color="inherit"
  >
    <Link to={`/${page.toLowerCase()}`}>{upperFirstLetter(page)}</Link>
  </Button>
);

const Navbar = () => {
  const location = useLocation();
  return (
    <div className={navbarStyles.container}>
      <LogoSvg />
      <div className={navbarStyles.linkContainer}>
        {Object.keys(PAGES).map((page) => getLinkTo(page, location.pathname))}
      </div>
    </div>
  );
};

export default Navbar;
