import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard/EmptyCard';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';

const History = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.HISTORY });
  }, []);

  return (
    <section>
      <EmptyCard />
      <p>Hello!</p>
    </section>
  );
};

export default History;
