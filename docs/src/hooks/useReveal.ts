import { useLayoutEffect, useRef } from 'react'
import { animate, inView } from 'motion'

interface RevealOptions {
  /** Delay before the animation starts, in seconds. */
  delay?: number
  /** Distance (px) the element slides up from. */
  y?: number
  /** Animation duration, in seconds. */
  duration?: number
  /** Fraction of the element that must be visible to trigger (0–1). */
  amount?: number
}

/**
 * Returns a ref. The referenced element starts hidden and fades + slides up
 * once it scrolls into view, powered by Motion One's `inView` + `animate`.
 */
export function useReveal<T extends HTMLElement = HTMLDivElement>(
  options: RevealOptions = {},
) {
  const { delay = 0, y = 28, duration = 0.7, amount = 0.18 } = options
  const ref = useRef<T>(null)

  useLayoutEffect(() => {
    const el = ref.current
    if (!el) return
    // Hide before paint so there's no flash for below-the-fold sections.
    el.style.opacity = '0'
    const stop = inView(
      el,
      () => {
        animate(
          el,
          { opacity: [0, 1], y: [y, 0] },
          { duration, delay, ease: [0.16, 1, 0.3, 1] },
        )
      },
      { amount },
    )
    return () => stop()
  }, [delay, y, duration, amount])

  return ref
}
