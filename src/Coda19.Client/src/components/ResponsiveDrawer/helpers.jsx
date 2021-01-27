/* eslint-disable import/prefer-default-export */
import React from 'react';

import HistoryIcon from '@material-ui/icons/History';
import HomeIcon from '@material-ui/icons/Home';
import InfoIcon from '@material-ui/icons/Info';
import ListAltIcon from '@material-ui/icons/ListAlt';
import LocalHospitalIcon from '@material-ui/icons/LocalHospital';
import PeopleOutlineIcon from '@material-ui/icons/PeopleOutline';
import TimelineIcon from '@material-ui/icons/Timeline';

import { PAGES } from 'shared/constants';

export const getIcon = (title) => {
  switch (title) {
    case PAGES.HOME:
      return <HomeIcon />;
    case PAGES.HISTORY:
      return <HistoryIcon />;
    case PAGES.SPREAD:
      return <PeopleOutlineIcon />;
    case PAGES.SYMPTOMS:
      return <ListAltIcon />;
    case PAGES.PROTECTION:
      return <LocalHospitalIcon />;
    case PAGES.PREDICTION:
      return <TimelineIcon />;
    case PAGES.ABOUT:
    default:
      return <InfoIcon />;
  }
};

export const getIsSelected = (text, path) =>
  !!path.includes(text.toLowerCase());
