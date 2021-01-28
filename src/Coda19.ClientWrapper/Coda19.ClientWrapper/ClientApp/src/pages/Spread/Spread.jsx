import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';
import { Typography } from '@material-ui/core';

import spreadStyles from './Spread.module.scss';

const Spread = () => {
  const headerDispatch = useHeaderDispatch();
  const [spread, setSpread] = useState();

  useEffect(() => {
    headerDispatch({ type: PAGES.SPREAD });
  }, []);

  useEffect(() => {
    axios
      .get(`http://support.coda19.ashbell-platform.com/api/Spread`)
      .then((res) => {
        const { data } = res;
        setSpread(data[0]);
      });
  }, []);

  return (
    <section>
      <div className={spreadStyles.container}>
        <Typography variant="h3">{spread?.Title}</Typography>
        <Typography variant="body2">{spread?.Description}</Typography>
      </div>
    </section>
  );
};

export default Spread;
