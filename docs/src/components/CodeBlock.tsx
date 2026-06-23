import { useEffect, useRef, useState } from 'react'
import { inView } from 'motion'
import styles from '../styles/Code.module.css'

interface CodeBlockProps {
  code: string
  /** Small label shown in the window bar (e.g. "bash", "ts"). */
  lang?: string
}

/** Dark, terminal-style code block with a copy button and an entrance glow. */
export function CodeBlock({ code, lang = 'bash' }: CodeBlockProps) {
  const [copied, setCopied] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  // Subtle glow flicker the first time the block scrolls into view.
  useEffect(() => {
    const el = ref.current
    if (!el) return
    return inView(el, () => el.classList.add(styles.lit), { amount: 0.4 })
  }, [])

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(code)
      setCopied(true)
      setTimeout(() => setCopied(false), 1500)
    } catch {
      /* clipboard unavailable — ignore */
    }
  }

  return (
    <div className={styles.block} ref={ref}>
      <div className={styles.bar}>
        <span className={styles.dots} aria-hidden="true">
          <i />
          <i />
          <i />
        </span>
        <span className={styles.lang}>{lang}</span>
        <button type="button" className={styles.copy} onClick={copy}>
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className={styles.pre}>
        <code>{code}</code>
      </pre>
    </div>
  )
}
