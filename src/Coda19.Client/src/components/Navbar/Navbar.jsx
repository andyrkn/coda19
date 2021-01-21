import React from 'react';

import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import navbarStyles from './Navbar.module.scss';

const Navbar = () => (
  <div className={navbarStyles.container}>
    <Typography variant="h6">News</Typography>
    <div className={navbarStyles.linkContainer}>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Login</Button>
      <Button color="inherit">Login</Button>
    </div>
  </div>
);

export default Navbar;
