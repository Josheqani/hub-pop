import styles from '../styles/Footer.module.css'
import { GitHubIcon, NpmIcon } from './icons'
import { REPO_URL, NPM_URL, AUTHOR_NAME, AUTHOR_URL } from '../links'

export function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.inner}`}>
        <div className={styles.brand}>
          <div className={styles.name}>
            <span className={styles.blob} aria-hidden="true" />
            hub-pop
          </div>
          <p className={styles.tagline}>
            A floating GitHub card widget with liquid blob animation.
          </p>
        </div>

        <div className={styles.links}>
          <a href={REPO_URL} target="_blank" rel="noreferrer">
            <GitHubIcon size={16} />
            GitHub
          </a>
          <a href={NPM_URL} target="_blank" rel="noreferrer">
            <NpmIcon size={16} />
            npm
          </a>
        </div>
      </div>

      <div className={`container ${styles.bottom}`}>
        <span>
          Made with <span className={styles.heart}>♥</span> by{' '}
          <a href={AUTHOR_URL} target="_blank" rel="noreferrer">
            {AUTHOR_NAME}
          </a>
        </span>
        <span>MIT-friendly · ISC licensed</span>
      </div>
    </footer>
  )
}
