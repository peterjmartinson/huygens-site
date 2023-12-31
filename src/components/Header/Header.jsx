import { useState } from 'react'
import Link from 'next/link'
import styles from './Header.module.css'

export const navLinks = [
  {
    aria: 'Proposition I',
    href: '/proposition-1',
    id: 'PROPOSITION_1',
    label: 'Proposition I'
  },
  {
    aria: 'Proposition II',
    href: '/proposition-2',
    id: 'PROPOSITION_2',
    label: 'Proposition II'
  },
  {
    aria: 'About',
    href: '/about',
    id: 'ABOUT',
    label: 'About'
  }
]

export function Header () {
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
            <li key={link.id} >
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
