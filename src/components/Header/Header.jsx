import { Link } from 'gatsby'
import React from 'react'
import Navbar from '../Navbar/Navbar'
import headerStyles from './Header.module.scss'

const Header = () => {
  return (
    <header className={headerStyles.header}>
      <h1>
        <Link className={headerStyles.title} to="/">
          CODA - Covid-19 Data for All
        </Link>
        <Navbar />
      </h1>
    </header>
  )
}

export default Header
