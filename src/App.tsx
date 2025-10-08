import { useEffect, useState } from 'react'
import Header from './components/Header'
import HeroLogin from './components/HeroLogin'

export type NavKey = 'home' | 'services' | 'about' | 'contact'
export type ThemeName = 'dark' | 'light' | 'pink' | 'green' | 'red' | 'sky'

function useTheme() {
  const [theme, setTheme] = useState<ThemeName>('dark')

  useEffect(() => {
    const saved = (localStorage.getItem('theme') as ThemeName) || 'dark'
    setTheme(saved)
    document.body.classList.add(`theme-${saved}`)
  }, [])

  useEffect(() => {
    document.body.classList.forEach((cls) => {
      if (cls.startsWith('theme-')) document.body.classList.remove(cls)
    })
    document.body.classList.add(`theme-${theme}`)
    localStorage.setItem('theme', theme)
  }, [theme])

  return { theme, setTheme }
}

function App() {
  const [active, setActive] = useState<NavKey>('home')
  const { theme, setTheme } = useTheme()

  return (
    <div className="min-h-screen relative">
      {/* global background uses theme gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -top-24 -left-24 h-96 w-[40rem] rounded-full blur-3xl opacity-60 md:opacity-80"
             style={{ background: `radial-gradient(closest-side, rgb(var(--grad-a) / 0.35), transparent)` }} />
        <div className="absolute -bottom-24 -right-24 h-96 w-[40rem] rounded-full blur-3xl opacity-60 md:opacity-80"
             style={{ background: `radial-gradient(closest-side, rgb(var(--grad-b) / 0.35), transparent)` }} />
      </div>

      <Header active={active} onChange={setActive} theme={theme} setTheme={setTheme} />
      <HeroLogin active={active} onChange={setActive} />
    </div>
  )
}

export default App
