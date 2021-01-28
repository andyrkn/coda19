/* eslint-disable react/jsx-props-no-spreading */
/* eslint-disable react/prop-types */
import { Box, Typography } from '@material-ui/core';
import React from 'react';

const TabPanel = ({ children, value, index, ...other }) => (
  <div
    role="tabpanel"
    hidden={value !== index}
    id={`scrollable-auto-tabpanel-${index}`}
    aria-labelledby={`scrollable-auto-tab-${index}`}
    {...other}
  >
    {value === index && (
      <Box p={3}>
        <Typography>{children}</Typography>
      </Box>
    )}
  </div>
);

export default TabPanel;
