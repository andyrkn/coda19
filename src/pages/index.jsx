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
      <>
        <h1>4. Preparations for the final deliverables*</h1>
        <p>
          Our fourth meeting was going about how we are going to split over the
          microservices that needed to be implemented and we reviewed the notes
          for the A compononet.
        </p>
        <p>
          We decided to move to a triple store implementation, following the advice
          and removed the in memory graph storage.
        </p>
      </>
      <>
        <h1>5. Preparations the work for the backend*</h1>
        <p>
          The most important part was implementing the core of our microservices:
             - The SparQL Query runners.
        </p>
        <p>
          A generic solution for querying and updating the rdf riple store was 
          implemented. This allowed us to be very nimble in implementing SparQL 
          Queries. We wrote unit tests over this core functionality and proceeded
          with relief on the next topics
        </p>
      </>
      <>
        <h1>6. Preparations the work for the frontend*</h1>
        <p>
          For all the pages most common components had to implemented before 
          the actual work started. Here we split and worked with mocked data for
          a bit until we had all the tools to implement the necessary pages
        </p>
      </>
      <>
        <h1>7. Back end deployment*</h1>
        <p>
          In order for the front-end to work easily across 3 developers, 
          we finished and deployed in the cloud the backend first.
          We needed 3 sites in azure and another for our internal private API.
          For the APIs we used simple IIS hosting and Flask for the internal
          neural network
        </p>
      </>
      <>
        <h1>8. Front end deployment*</h1>
        <p>
          Some tweaks had to be made for the front end to be deployed. 
          We wrapped the static react client around a .NET 5 MVC Host.
          This made it very easy to deploy the front end to a Azure
          App Service. It's currently available at https://coda19.azurewebsites.net/ !
        </p>
      </>
    </Layout>
  )
}

export default IndexPage
