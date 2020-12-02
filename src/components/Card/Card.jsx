import React from 'react'
import PropTypes from 'prop-types'
import cardStyles from './Card.module.scss'

const Card = ({ children }) => {
  return <div className={cardStyles.container}>{children}</div>
}

export default Card

Card.propTypes = {
  children: PropTypes.node.isRequired,
}
