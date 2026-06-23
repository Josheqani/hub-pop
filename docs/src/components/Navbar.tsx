import { useEffect, useState } from 'react'
import styles from '../styles/Navbar.module.css'
import { GitHubIcon, NpmIcon } from './icons'
import { REPO_URL, NPM_URL } from '../links'

export function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''}`}>
      <div className={`container ${styles.inner}`}>
        <a className={styles.logo} href="#top">
          <span className={styles.blob} aria-hidden="true" />
          hub-pop
        </a>
        <nav className={styles.links}>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            <GitHubIcon size={18} />
            <span>GitHub</span>
          </a>
          <a href={NPM_URL} target="_blank" rel="noreferrer">
            <NpmIcon size={18} />
            <span>npm</span>
          </a>
        </nav>
      </div>
    </header>
  )
}
