import React, { useEffect } from 'react';

import EmptyCard from 'components/EmptyCard';

import { useHeaderDispatch } from 'shared/header-context';
import { PAGES } from 'shared/constants';

import homeStyles from './Home.module.scss';

const Home = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.HOME });
  }, []);

  return (
    <section className={homeStyles.container}>
      <EmptyCard />
      <p>Hello there everybody</p>
    </section>
  );
};

export default Home;
