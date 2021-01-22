import React from 'react';
import { Helmet } from 'react-helmet';

import { ReactComponent as CenterSvg } from 'images/virus.svg';
import { ReactComponent as TopRightSvg } from 'images/halfVirus.svg';
import { ReactComponent as BigLogoSvg } from 'images/bigLogo.svg';

import { Grid, Hidden } from '@material-ui/core';
import AppBar from 'components/AppBar';
import PropTypes from 'prop-types';

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
      <div className={headerStyles.textWrapper}>
        <h2 className={headerStyles.title}>{title}</h2>
        <p className={headerStyles.description}>{description}</p>
      </div>
    </Hidden>

    <Hidden xsDown>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <Grid xs={5}>
          <Grid item>
            <h2 className={headerStyles.title}>{title}</h2>
          </Grid>
          <Grid item>
            <p className={headerStyles.description}>{description}</p>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <BigLogoSvg className={headerStyles.bigLogo} />
        </Grid>
      </Grid>
    </Hidden>

    <Hidden smUp>
      <TopRightSvg className={headerStyles.topRightSvg} />
      <CenterSvg className={headerStyles.centerSvg} />
    </Hidden>
  </div>
);
export default Header;

Header.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
