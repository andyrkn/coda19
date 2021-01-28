import React, { useEffect, useState } from 'react';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';

import axios from 'axios';

import { Typography } from '@material-ui/core';

import symptomsStyles from './Symptoms.module.scss';

const Symptoms = () => {
  const headerDispatch = useHeaderDispatch();
  const [symptoms, setSymptoms] = useState();

  useEffect(() => {
    headerDispatch({ type: PAGES.SYMPTOMS });
  }, []);

  useEffect(() => {
    console.log(symptoms);
  }, [symptoms]);

  useEffect(() => {
    axios
      .get(`http://support.coda19.ashbell-platform.com/api/Symptom`)
      .then((res) => {
        const { data } = res;
        setSymptoms(data[0]);
      });
  }, []);

  return (
    <section>
      <div className={symptomsStyles.container}>
        <Typography variant="h3">{symptoms?.Title}</Typography>
        <Typography variant="body2">{symptoms?.Description}</Typography>
      </div>
    </section>
  );
};

export default Symptoms;
