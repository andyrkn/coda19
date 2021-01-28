import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard/EmptyCard';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';

const Protection = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.PROTECTION });
  }, []);

  return (
    <section>
      <EmptyCard />
      <p>hello!</p>
    </section>
  );
};

export default Protection;
