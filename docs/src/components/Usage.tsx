import { useEffect, useRef, useState } from 'react'
import { animate } from 'motion'
import styles from '../styles/Usage.module.css'
import { CodeBlock } from './CodeBlock'
import { useReveal } from '../hooks/useReveal'

const TABS = [
  {
    id: 'Vanilla JS',
    lang: 'js',
    code: `import { HubPop } from 'hub-pop'

HubPop({
  name: 'Your Name',
  github: 'https://github.com/username',
  website: 'https://yoursite.dev',
  position: 'bottom-right',
  theme: 'dark',
})`,
  },
  {
    id: 'React',
    lang: 'tsx',
    code: `import { useEffect } from 'react'
import { HubPop } from 'hub-pop'

useEffect(() => {
  HubPop({
    name: 'Your Name',
    github: 'https://github.com/username',
    website: 'https://yoursite.dev',
    position: 'bottom-right',
    theme: 'dark',
  })
}, [])`,
  },
  {
    id: 'Vue',
    lang: 'ts',
    code: `import { onMounted } from 'vue'
import { HubPop } from 'hub-pop'

onMounted(() => {
  HubPop({
    name: 'Your Name',
    github: 'https://github.com/username',
    website: 'https://yoursite.dev',
  })
})`,
  },
] as const

export function Usage() {
  const sectionRef = useReveal<HTMLElement>()
  const [active, setActive] = useState(0)
  const codeRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (codeRef.current) {
      animate(
        codeRef.current,
        { opacity: [0, 1], x: [16, 0] },
        { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
      )
    }
  }, [active])

  return (
    <section className="section" id="usage" ref={sectionRef}>
      <div className="container">
        <span className="eyebrow">Usage</span>
        <h2 className="sectionTitle">Simple to use</h2>
        <p className="sectionLead">
          One import, one call. The same API works in any framework.
        </p>

        <div className={styles.card}>
          <div className={styles.tabs} role="tablist" aria-label="Frameworks">
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

          <div ref={codeRef}>
            <CodeBlock code={TABS[active].code} lang={TABS[active].lang} />
          </div>
        </div>
      </div>
    </section>
  )
}
