import React from 'react';
import { Grid, Hidden } from '@material-ui/core';

import PropTypes from 'prop-types';
import { ReactComponent as BigLogoSvg } from 'images/bigLogo.svg';
import { ReactComponent as MdLogoSvg } from 'images/mdLogo.svg';

import mainTitleStyles from './MainTitle.module.scss';

const MainTitle = ({ title, description }) => (
  <div className={mainTitleStyles.container}>
    <Hidden smUp>
      <div className={mainTitleStyles.textWrapper}>
        <h2 className={mainTitleStyles.title}>{title}</h2>
        <p className={mainTitleStyles.description}>{description}</p>
      </div>
    </Hidden>

    <Hidden mdDown>
      <Grid
        container
        direction="row"
        alignItems="center"
        justify="center"
        spacing={1}
      >
        <Grid item xs={7}>
          <Grid item>
            <h2 className={mainTitleStyles.title}>{title}</h2>
          </Grid>
          <Grid item>
            <p className={mainTitleStyles.description}>{description}</p>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <BigLogoSvg className={mainTitleStyles.bigLogo} />
        </Grid>
      </Grid>
    </Hidden>

    <Hidden xsDown lgUp>
      <Grid
        container
        direction="column"
        alignItems="center"
        justify="center"
        spacing={2}
      >
        <Grid>
          <Grid item>
            <h2 className={mainTitleStyles.title}>{title}</h2>
          </Grid>
          <Grid item>
            <p className={mainTitleStyles.description}>{description}</p>
          </Grid>
        </Grid>
        <Grid item xs={5}>
          <MdLogoSvg className={mainTitleStyles.bigLogo} />
        </Grid>
      </Grid>
    </Hidden>
  </div>
);

export default MainTitle;

MainTitle.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
