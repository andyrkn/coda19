import { Link } from 'gatsby'
import React from 'react'
import navbarStyles from './Navbar.module.scss'

const Navbar = () => {
  return (
    <nav>
      <ul className={navbarStyles.navList}>
        <li>
          <Link
            className={navbarStyles.navItem}
            activeClassName={navbarStyles.activeNavItem}
            to="/"
          >
            Home
          </Link>
        </li>
        <li>
          <Link
            className={navbarStyles.navItem}
            activeClassName={navbarStyles.activeNavItem}
            to="/design"
          >
            Design
          </Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
