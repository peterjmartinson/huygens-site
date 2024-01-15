import React, { useState } from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import styles from './Header.module.css'

export function Header ({ navLinks }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const closeMenu = () => setIsMenuOpen(false)
  const toggleMenuOpen = () => setIsMenuOpen(prevState => !prevState)

  return (
    <header className={styles.header}>
      <Link
        className={styles.home}
        href='/'
        onClick={closeMenu}
      >
        <h1>Huygens Pendulum Clock</h1>
      </Link>

      {/** hamburer icon */}
      <input
        checked={isMenuOpen}
        className={styles.sideMenu}
        id='side-menu'
        onChange={toggleMenuOpen}
        type='checkbox'
      />
      <label className={styles.hamburger} htmlFor='side-menu'>
        <span className={styles.hamburgerLine} />
      </label>

      {/** nav links */}
      <nav className={styles.nav}>
        <ul className={styles.menu}>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                aria-label={link.aria}
                className={styles.navlink}
                href={link.href}
                onClick={closeMenu}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  )
}

Header.propTypes = {
  navLinks: PropTypes.arrayOf(PropTypes.shape({
    aria: PropTypes.string,
    href: PropTypes.string,
    id: PropTypes.string,
    label: PropTypes.string
  }))
}
