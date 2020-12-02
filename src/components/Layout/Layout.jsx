import React from 'react'
import PropTypes from 'prop-types'
import Footer from '../Footer/Footer'
import '../../styles/index.scss'
import layoutStyles from './Layout.module.scss'
import Header from '../Header/Header'
import Card from '../Card/Card'

const Layout = ({ children }) => {
  return (
    <div className={layoutStyles.container}>
      <div className={layoutStyles.content}>
        <Header />
        {children.map(child => (
          <Card>{child}</Card>
        ))}
      </div>
      <Footer />
    </div>
  )
}

export default Layout

Layout.propTypes = {
  children: PropTypes.node.isRequired,
}
