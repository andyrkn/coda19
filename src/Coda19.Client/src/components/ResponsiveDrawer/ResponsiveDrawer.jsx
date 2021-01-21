import React from 'react';
import { useLocation } from 'react-router';

import Drawer from '@material-ui/core/Drawer';

import PropTypes from 'prop-types';

import { getDrawer } from './helpers';

const ResponsiveDrawer = ({ isOpen, handleDrawerToggle }) => {
  const location = useLocation();

  return (
    <Drawer variant="temporary" open={isOpen} onClose={handleDrawerToggle}>
      {getDrawer(location.pathname)}
    </Drawer>
  );
};
export default ResponsiveDrawer;

ResponsiveDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
