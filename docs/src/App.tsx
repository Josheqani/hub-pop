import { Navbar } from './components/Navbar'
import { Hero } from './components/Hero'
import { Install } from './components/Install'
import { Usage } from './components/Usage'
import { Options } from './components/Options'
import { Footer } from './components/Footer'

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Install />
        <Usage />
        <Options />
      </main>
      <Footer />
    </>
  )
}
