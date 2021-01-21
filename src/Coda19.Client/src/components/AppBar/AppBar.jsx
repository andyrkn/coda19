import React, { useState } from 'react';

import MaterialAppBar from '@material-ui/core/AppBar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';

import ResponsiveDrawer from 'components/ResponsiveDrawer';
import Navbar from 'components/Navbar';

import PropTypes from 'prop-types';

const AppBar = ({ pagesList }) => {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleDrawerToggle = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <MaterialAppBar position="static">
        <Toolbar>
          <Hidden smUp>
            <IconButton
              color="inherit"
              aria-label="Open drawer"
              onClick={handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
          <Hidden xsDown>
            <Navbar />
          </Hidden>
        </Toolbar>
      </MaterialAppBar>

      <nav aria-label="Drawer content">
        <Hidden smUp>
          <ResponsiveDrawer
            pagesList={pagesList}
            isOpen={isDrawerOpen}
            handleDrawerToggle={handleDrawerToggle}
          />
        </Hidden>
      </nav>
    </>
  );
};

export default AppBar;

AppBar.propTypes = {
  pagesList: PropTypes.arrayOf(PropTypes.string).isRequired,
};
