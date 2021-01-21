import React from 'react';

import Header from 'components/Header';
import EmptyCard from 'components/EmptyCard';
import { HOME_DESCRIPTION, TITLE } from 'shared/constants';

import homeStyles from './Home.module.scss';

const Home = () => (
  <section className={homeStyles.container}>
    <Header title={TITLE} description={HOME_DESCRIPTION} />
    <EmptyCard />
    <p>Hello there everybody</p>
  </section>
);

export default Home;
