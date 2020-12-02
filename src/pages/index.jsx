import React from 'react'
import Layout from '../components/Layout/Layout'

const IndexPage = () => {
  return (
    <Layout>
      <>
        <h1>1. General Meeting</h1>
        <p>
          During this meeting we discussed about the general idea of the
          project, how the tasks should be split and what type of resources
          would be needed. Everyone chimed in and debated on which approach to
          follow; what the architecture should look like and what amount of work
          would each module require. The details of this blog were discussed
          during this meeting.
        </p>
        <p>
          We also focused on the main points of our design process; the tool we
          want to use is Adobe XD, in part thanks to its prototyping
          functionalities.
        </p>
        <p>
          Our architecture diagrams will be done using the LucidChart platform.
        </p>
      </>

      <>
        <h1>2. Check-up (3 days later)</h1>
        <p>
          The point of our second meeting was to check everybody&apos;s progress
          and assess if anything should change in our approach moving forward.
        </p>
        <p>
          At this point, we had the smartphone design ready, a third of our
          architecture done and the beginnings of our scholarly report. The blog
          was up and running and we began writing about our process.
        </p>
      </>

      <>
        <h1>3. Midterm deliverable review*</h1>
        <p>
          Our third main meeting was about going over all the work we did and
          making sure that it is complete.
        </p>
        <p>
          We also used this opportunity to discuss about potential development
          issues that we might encounter in the future, deployment talks,
          different technologies pros and cons and what our calendar looks like
          during the holiday.
        </p>
        <p>
          *even though we have only described our 3 most important meetings, we
          have had numerous discussions (either shorter or longer in length)
          regarding the state of everyone&apos;s work.
        </p>
      </>
    </Layout>
  )
}

export default IndexPage
