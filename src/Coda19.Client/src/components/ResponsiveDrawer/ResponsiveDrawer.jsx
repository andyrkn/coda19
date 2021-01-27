import React from 'react';
import { useLocation } from 'react-router';
import { Link } from 'react-router-dom';

import Drawer from '@material-ui/core/Drawer';
import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import PropTypes from 'prop-types';

import { ReactComponent as LogoSvg } from 'images/logo.svg';
import { PAGES } from 'shared/constants';
import { upperFirstLetter } from 'shared/helpers';
import { getIcon, getIsSelected } from './helpers';
import drawerStyles from './ResponsiveDrawer.module.scss';

const ResponsiveDrawer = ({ isOpen, handleDrawerToggle }) => {
  const location = useLocation();

  return (
    <Drawer variant="temporary" open={isOpen} onClose={handleDrawerToggle}>
      <div className={drawerStyles.container}>
        <Divider />

        <List>
          {Object.keys(PAGES).map((title) => (
            <ListItem
              button
              key={title}
              component={Link}
              to={`/${title.toLowerCase()}`}
              selected={getIsSelected(title, location.pathname)}
            >
              <ListItemIcon>{getIcon(title)}</ListItemIcon>
              <ListItemText primary={upperFirstLetter(title)} />
            </ListItem>
          ))}
        </List>

        <LogoSvg className={drawerStyles.logoSvg} />
      </div>
    </Drawer>
  );
};
export default ResponsiveDrawer;

ResponsiveDrawer.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  handleDrawerToggle: PropTypes.func.isRequired,
};
