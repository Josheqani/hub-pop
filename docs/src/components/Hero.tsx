import { useEffect, useRef } from 'react'
import { animate, stagger } from 'motion'
import styles from '../styles/Hero.module.css'
import { GitHubIcon, GlobeIcon, ArrowIcon } from './icons'
import { REPO_URL } from '../links'

const TITLE = 'Your GitHub card, floating beautifully.'

export function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null)
  const belowRef = useRef<HTMLDivElement>(null)
  const previewRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (titleRef.current) {
      const words = titleRef.current.querySelectorAll('span')
      animate(
        words,
        { opacity: [0, 1], y: [26, 0] },
        { delay: stagger(0.06), duration: 0.6, ease: [0.16, 1, 0.3, 1] },
      )
    }
    if (belowRef.current) {
      animate(
        belowRef.current,
        { opacity: [0, 1], y: [20, 0] },
        { delay: 0.5, duration: 0.7, ease: [0.16, 1, 0.3, 1] },
      )
    }
    if (previewRef.current) {
      animate(
        previewRef.current,
        { opacity: [0, 1], y: [40, 0], scale: [0.96, 1] },
        { delay: 0.35, duration: 0.9, ease: [0.16, 1, 0.3, 1] },
      )
    }
  }, [])

  return (
    <section className={styles.hero} id="top">
      <div className={styles.bgGlow} aria-hidden="true" />
      <div className={`container ${styles.inner}`}>
        <div className={styles.copy}>
          <span className={styles.badge}>zero dependencies · ~8 kB</span>
          <h1 className={styles.title} ref={titleRef}>
            {TITLE.split(' ').map((word, i) => (
              <span key={i}>{word}&nbsp;</span>
            ))}
          </h1>
          <div ref={belowRef}>
            <p className={styles.sub}>
              A zero-dependency widget that adds an animated floating GitHub card
              to any website. Install once, works everywhere.
            </p>
            <div className={styles.actions}>
              <a href="#install" className={styles.primary}>
                Install Now
                <ArrowIcon size={16} />
              </a>
              <a
                href={REPO_URL}
                target="_blank"
                rel="noreferrer"
                className={styles.ghost}
              >
                <GitHubIcon size={18} />
                View on GitHub
              </a>
            </div>
          </div>
        </div>

        <div className={styles.previewWrap} ref={previewRef}>
          <Preview />
        </div>
      </div>
    </section>
  )
}

/** Pure-CSS simulation of what hub-pop looks like on a real site. */
function Preview() {
  return (
    <div className={styles.preview}>
      <div className={styles.previewBar}>
        <span />
        <span />
        <span />
        <div className={styles.previewUrl}>yoursite.dev</div>
      </div>
      <div className={styles.previewBody}>
        <div className={styles.skelTitle} />
        <div className={styles.skelLine} />
        <div className={styles.skelLine} style={{ width: '78%' }} />
        <div className={styles.skelLine} style={{ width: '60%' }} />
        <div className={styles.skelBlock} />

        {/* the widget's expanded card */}
        <div className={styles.widgetCard}>
          <div className={styles.widgetGlow} aria-hidden="true" />
          <div className={styles.widgetName}>Your Name</div>
          <div className={styles.widgetRow}>
            <GitHubIcon size={14} /> GitHub
          </div>
          <div className={styles.widgetRow}>
            <GlobeIcon size={14} /> Website
          </div>
        </div>

        {/* the floating blob button */}
        <button className={styles.blobBtn} type="button" aria-hidden="true">
          <GitHubIcon size={22} />
        </button>
      </div>
    </div>
  )
}
