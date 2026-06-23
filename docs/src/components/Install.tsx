import { useEffect, useRef, useState } from 'react'
import { animate } from 'motion'
import styles from '../styles/Install.module.css'
import { CodeBlock } from './CodeBlock'
import { useReveal } from '../hooks/useReveal'

const TABS = [
  { id: 'npm', cmd: 'npm install hub-pop' },
  { id: 'pnpm', cmd: 'pnpm add hub-pop' },
  { id: 'bun', cmd: 'bun add hub-pop' },
] as const

export function Install() {
  const sectionRef = useReveal<HTMLElement>()
  const [active, setActive] = useState(0)
  const codeRef = useRef<HTMLDivElement>(null)

  // Slide the code in whenever the active tab changes.
  useEffect(() => {
    if (codeRef.current) {
      animate(
        codeRef.current,
        { opacity: [0, 1], x: [14, 0] },
        { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      )
    }
  }, [active])

  return (
    <section className="section" id="install" ref={sectionRef}>
      <div className="container">
        <span className="eyebrow">Install</span>
        <h2 className="sectionTitle">Get started in seconds</h2>
        <p className="sectionLead">
          Add hub-pop with your favorite package manager.
        </p>

        <div className={styles.card}>
          <div
            className={styles.tabs}
            role="tablist"
            aria-label="Package managers"
          >
            <span
              className={styles.indicator}
              style={{ transform: `translateX(${active * 100}%)` }}
              aria-hidden="true"
            />
            {TABS.map((tab, i) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={active === i}
                className={`${styles.tab} ${active === i ? styles.active : ''}`}
                onClick={() => setActive(i)}
              >
                {tab.id}
              </button>
            ))}
          </div>

          <div ref={codeRef} className={styles.code}>
            <CodeBlock code={TABS[active].cmd} lang="bash" />
          </div>
        </div>
      </div>
    </section>
  )
}
