/* eslint-disable react/no-unescaped-entities */
import React, { useEffect } from 'react';

import { Grid, Typography } from '@material-ui/core';

import { useHeaderDispatch } from 'contexts/header-context';
import { PAGES } from 'shared/constants';

import historyStyles from './History.module.scss';

const History = () => {
  const headerDispatch = useHeaderDispatch();

  useEffect(() => {
    headerDispatch({ type: PAGES.HISTORY });
  }, []);

  return (
    <section className={historyStyles.container}>
      <Grid container justify="flex-start" direction="column">
        <Grid item xs={12}>
          <Typography variant="h4">Origin</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            The virus is thought to be natural and has an animal origin, through
            spillover infection. There are several theories about where the
            first case (the so-called patient zero) originated. Phylogenetics
            estimates that SARS-CoV-2 arose in October or November 2019.
            Evidence suggests that it descends from a coronavirus that infects
            wild bats and spread to humans through an intermediary wildlife
            host.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">First human case</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            The first known human infections were in Wuhan, Hubei, China. A
            study of the first 41 cases of confirmed COVID-19, published in
            January 2020 in The Lancet, reported the earliest date of onset of
            symptoms as 1 December 2019. Official publications from the WHO
            reported the earliest onset of symptoms as 8 December 2019.
            Human-to-human transmission was confirmed by the WHO and Chinese
            authorities by 20 January 2020. According to official Chinese
            sources, these were mostly linked to the Huanan Seafood Wholesale
            Market, which also sold live animals. In May 2020, George Gao, the
            director of the CDC, said animal samples collected from the seafood
            market had tested negative for the virus, indicating that the market
            was the site of an early superspreading event, but it was not the
            site of the initial outbreak. Traces of the virus have been found in
            wastewater that was collected from Milan and Turin, Italy, on 18
            December 2019.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">Spread</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            By December 2019, the spread of infection was almost entirely driven
            by human-to-human transmission. The number of coronavirus cases in
            Hubei gradually increased, reaching 60 by 20 December and at least
            266 by 31 December. On 24 December, Wuhan Central Hospital sent a
            bronchoalveolar lavage fluid (BAL) sample from an unresolved
            clinical case to sequencing company Vision Medicals. On 27 and 28
            December, Vision Medicals informed the Wuhan Central Hospital and
            the Chinese CDC of the results of the test, showing a new
            coronavirus. A pneumonia cluster of unknown cause was observed on 26
            December and treated by the doctor Zhang Jixian in Hubei Provincial
            Hospital, who informed the Wuhan Jianghan CDC on 27 December. On 30
            December, a test report addressed to Wuhan Central Hospital, from
            company CapitalBio Medlab, stated an erroneous positive result for
            SARS, causing a group of doctors at Wuhan Central Hospital to alert
            their colleagues and relevant hospital authorities of the result.
            That evening, the Wuhan Municipal Health Commission issued a notice
            to various medical institutions on "the treatment of pneumonia of
            unknown cause". Eight of these doctors, including Li Wenliang
            (punished on 3 January), were later admonished by the police for
            spreading false rumours, and another, Ai Fen, was reprimanded by her
            superiors for raising the alarm.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h4">The outbreak</Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            The Wuhan Municipal Health Commission made the first public
            announcement of a pneumonia outbreak of unknown cause on 31
            December, confirming 27 cases—enough to trigger an investigation.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            During the early stages of the outbreak, the number of cases doubled
            approximately every seven and a half days. In early and mid-January
            2020, the virus spread to other Chinese provinces, helped by the
            Chinese New Year migration and Wuhan being a transport hub and major
            rail interchange. On 20 January, China reported nearly 140 new cases
            in one day, including two people in Beijing and one in Shenzhen.
            Later official data shows 6,174 people had already developed
            symptoms by then, and more may have been infected. A report in The
            Lancet on 24 January indicated human transmission, strongly
            recommended personal protective equipment for health workers, and
            said testing for the virus was essential due to its "pandemic
            potential". On 30 January, the WHO declared the coronavirus a Public
            Health Emergency of International Concern. By this time, the
            outbreak spread by a factor of 100 to 200 times.
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="body1">
            On 31 January 2020, Italy had its first confirmed cases, two
            tourists from China. As of 13 March 2020, the WHO considered Europe
            the active centre of the pandemic. On 19 March 2020, Italy overtook
            China as the country with the most deaths. By 26 March, the United
            States had overtaken China and Italy with the highest number of
            confirmed cases in the world. Research on coronavirus genomes
            indicates the majority of COVID-19 cases in New York came from
            European travellers, rather than directly from China or any other
            Asian country. Retesting of prior samples found a person in France
            who had the virus on 27 December 2019 and a person in the United
            States who died from the disease on 6 February 2020.
          </Typography>
        </Grid>
      </Grid>
    </section>
  );
};

export default History;
