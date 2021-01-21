/* eslint-disable import/prefer-default-export */
import React from 'react';

import Divider from '@material-ui/core/Divider';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';

import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import TimelineIcon from '@material-ui/icons/Timeline';

import { ReactComponent as LogoSvg } from 'images/logo.svg';
import { PAGE_TITLE, PAGES_LIST } from './constants';

import drawerStyles from './ResponsiveDrawer.module.scss';

const getIcon = (title) => {
  switch (title) {
    case PAGE_TITLE.HOME:
      return <HomeIcon />;
    case PAGE_TITLE.HISTORY:
      return <HistoryIcon />;
    case PAGE_TITLE.SPREAD:
      return <PeopleOutlineIcon />;
    case PAGE_TITLE.SYMPTOMS:
      return <ListAltIcon />;
    case PAGE_TITLE.PROTECTION:
      return <LocalHospitalIcon />;
    case PAGE_TITLE.PREDICTION:
      return <TimelineIcon />;
    case PAGE_TITLE.ABOUT:
    default:
      return <InfoIcon />;
  }
};

const getIsSelected = (text, path) => !!path.includes(text.toLowerCase());

export const getDrawer = (path) => (
  <div className={drawerStyles.container}>
    <Divider />

    <List>
      {PAGES_LIST.map((title) => (
        <ListItem button key={title} selected={getIsSelected(title, path)}>
          <ListItemIcon>{getIcon(title)}</ListItemIcon>
          <ListItemText primary={title} />
        </ListItem>
      ))}
    </List>

    <LogoSvg className={drawerStyles.logoSvg} />
  </div>
);
