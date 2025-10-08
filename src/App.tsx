import { useState } from 'react'
import Header from './components/Header'
import HeroLogin from './components/HeroLogin'
import Sections from './components/Sections'

export type NavKey = 'home' | 'services' | 'about' | 'contact'

function App() {
  const [active, setActive] = useState<NavKey>('home')

  return (
    <div className="min-h-screen relative bg-black text-white">
      {/* global background */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(99,102,241,0.14),transparent_45%),radial-gradient(ellipse_at_bottom_right,rgba(236,72,153,0.14),transparent_45%)]" />

      <Header active={active} onChange={setActive} />
      <HeroLogin active={active} />
      <Sections />
    </div>
  )
}

export default App
