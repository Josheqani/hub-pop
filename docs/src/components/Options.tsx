import styles from '../styles/Options.module.css'
import { useReveal } from '../hooks/useReveal'

interface Row {
  option: string
  type: string
  def: string
  required?: boolean
  desc: string
}

const ROWS: Row[] = [
  { option: 'name', type: 'string', def: 'required', required: true, desc: 'Your display name' },
  { option: 'github', type: 'string', def: 'required', required: true, desc: 'Your GitHub profile URL' },
  { option: 'website', type: 'string', def: '—', desc: 'Your personal website' },
  { option: 'position', type: 'string', def: "'bottom-right'", desc: 'Widget corner position' },
  { option: 'theme', type: 'string', def: "'dark'", desc: "'dark' or 'light'" },
]

export function Options() {
  const sectionRef = useReveal<HTMLElement>()

  return (
    <section className="section" id="config" ref={sectionRef}>
      <div className="container">
        <span className="eyebrow">Configuration</span>
        <h2 className="sectionTitle">Every option, explained</h2>
        <p className="sectionLead">
          Only <code>name</code> and <code>github</code> are required — the rest
          have sensible defaults.
        </p>

        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Option</th>
                <th>Type</th>
                <th>Default</th>
                <th>Description</th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((row) => (
                <tr key={row.option}>
                  <td>
                    <code className={styles.opt}>{row.option}</code>
                  </td>
                  <td>
                    <code className={styles.type}>{row.type}</code>
                  </td>
                  <td>
                    {row.required ? (
                      <span className={styles.required}>required</span>
                    ) : (
                      <code className={styles.def}>{row.def}</code>
                    )}
                  </td>
                  <td className={styles.desc}>{row.desc}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  )
}
