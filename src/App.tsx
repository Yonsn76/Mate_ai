import { useEffect, useState } from 'react'
import Header from './components/auth/Header'
import HeroLogin from './components/auth/HeroLogin'
import Footer from './components/Footer'

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
    <div className="min-h-screen relative flex flex-col overflow-x-hidden">
      {/* global background uses theme gradients */}
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -top-12 sm:-top-24 -left-12 sm:-left-24 h-64 w-64 sm:h-96 sm:w-[40rem] rounded-full blur-3xl opacity-40 sm:opacity-60 md:opacity-80"
             style={{ background: `radial-gradient(closest-side, rgb(var(--grad-a) / 0.35), transparent)` }} />
        <div className="absolute -bottom-12 sm:-bottom-24 -right-12 sm:-right-24 h-64 w-64 sm:h-96 sm:w-[40rem] rounded-full blur-3xl opacity-40 sm:opacity-60 md:opacity-80"
             style={{ background: `radial-gradient(closest-side, rgb(var(--grad-b) / 0.35), transparent)` }} />
      </div>

      <Header active={active} onChange={setActive} theme={theme} setTheme={setTheme} />
      <main className="flex-1 w-full">
        <HeroLogin active={active} onChange={setActive} />
      </main>
      <Footer />
    </div>
  )
}

export default App
