import React, { useEffect, useState } from 'react';

import axios from 'axios';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';
import { Typography } from '@material-ui/core';

import productionStyles from './Production.module.scss';

const Protection = () => {
  const headerDispatch = useHeaderDispatch();
  const [tips, setTips] = useState();

  useEffect(() => {
    headerDispatch({ type: PAGES.PROTECTION });
  }, []);

  useEffect(() => {
    axios
      .get(`http://support.coda19.ashbell-platform.com/api/Tips`)
      .then((res) => {
        const { data } = res;
        setTips(data[0]);
      });
  }, []);

  return (
    <section>
      <div className={productionStyles.container}>
        <Typography variant="h3">{tips?.Title}</Typography>
        <Typography variant="body2">{tips?.Description}</Typography>
      </div>
    </section>
  );
};

export default Protection;
