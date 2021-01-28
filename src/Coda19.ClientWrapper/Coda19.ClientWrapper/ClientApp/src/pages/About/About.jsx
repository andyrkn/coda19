import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard/EmptyCard';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';

const About = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.SPREAD });
  }, []);

  return (
    <section>
      <EmptyCard />
      <p>hello!</p>
    </section>
  );
};

export default About;
