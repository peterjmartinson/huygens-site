import Link from 'next/link'
import styles from './Footer.module.css'

export const navLinks = [
  {
    aria: 'About',
    id: 'ABOUT',
    href: '/about',
    label: 'About'
  },
  {
    aria: 'Contact',
    id: 'CONTACT',
    href: '/contact',
    label: 'Contact'
  },
  {
    aria: 'Home',
    id: 'HOME',
    href: '/',
    label: 'Home'
  }
]

export const socialLinks = [
  {
    aria: 'Twitter',
    id: 'TWITTER',
    href: 'https://twitter.com/',
    label: 'X'
  },
  {
    aria: 'Facebook',
    id: 'FACEBOOK',
    href: 'https://www.facebook.com/',
    label: 'F'
  }
]

export function Footer () {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <ul className={styles.navLinks}>
          {navLinks.map(link => (
            <li key={link.id}>
              <Link
                aria-label={link.aria}
                className={styles.navlink}
                href={link.href}
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        <ul className={styles.socialLinks}>
          {socialLinks.map(link => (
            <li key={link.id}>
              <Link
                aria-label={link.aria}
                href={link.href}
                target='_blank'
                rel='noreferrer'
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <p className={styles.copyright}>
        Copyright 2024 Martinson & Schwane
      </p>
    </footer>
  )
}
