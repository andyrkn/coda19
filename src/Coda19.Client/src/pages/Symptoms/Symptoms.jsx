import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard/EmptyCard';

import { useHeaderDispatch } from 'shared/header-context';
import { PAGES } from 'shared/constants';

const Symptoms = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.SYMPTOMS });
  }, []);

  return (
    <section>
      <EmptyCard />
      <p>hello!</p>
    </section>
  );
};

export default Symptoms;
