import React from 'react'
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'

import Gallery from '@browniebroke/gatsby-image-gallery'
import '@browniebroke/gatsby-image-gallery/dist/style.css'

import Layout from '../components/Layout/Layout'

const DesignPage = ({ data }) => {
  const images = data.images.edges.map(({ node }) => ({
    ...node.childImageSharp,
    caption: node.childImageSharp.thumb.originalName,
  }))

  return (
    <Layout>
      <>
        <h1>Smartphone</h1>
        <Gallery
          images={images
            .map((image, index) => (index < 9 ? image : {}))
            .filter(image => Object.keys(image).length !== 0)}
        />
      </>
      <>
        <h1>Tablet</h1>
        <Gallery
          images={images
            .map((image, index) => (index > 8 && index < 15 ? image : {}))
            .filter(image => Object.keys(image).length !== 0)}
        />
      </>
      <>
        <h1>Web</h1>
        <Gallery
          images={images
            .map((image, index) => (index > 14 ? image : {}))
            .filter(image => Object.keys(image).length !== 0)}
        />
      </>
    </Layout>
  )
}

export const smartPhoneQuery = graphql`
  query ImagesForGallery {
    images: allFile(
      filter: { relativeDirectory: { eq: "gallery" } }
      sort: { fields: name }
    ) {
      edges {
        node {
          childImageSharp {
            thumb: fluid(maxWidth: 270, maxHeight: 270) {
              ...GatsbyImageSharpFluid
              originalName
            }
            full: fluid(maxWidth: 1024) {
              ...GatsbyImageSharpFluid
            }
          }
        }
      }
    }
  }
`

export default DesignPage

DesignPage.propTypes = {
  data: PropTypes.node.isRequired,
}
