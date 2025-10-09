import { useEffect, useState } from 'react'
import Header from './components/auth/Header'
import HeroLogin from './components/auth/HeroLogin'
import Footer from './components/Footer'
import Layout from './components/common/Layout'
import { AuthProvider, useAuth } from './contexts/AuthContext'

// Componentes de Alumno
import AlumnoDashboard from './components/alumno/Dashboard'
import BuscarDocente from './components/alumno/BuscarDocente'
import MisSolicitudes from './components/alumno/MisSolicitudes'
import AnunciosAlumno from './components/alumno/AnunciosAlumno'
import PerfilAlumno from './components/alumno/PerfilAlumno'

// Componentes de Docente
import DashboardDocente from './components/docente/DashboardDocente'
import SolicitudesDocente from './components/docente/Solicitudes'
import MisAlumnosDocente from './components/docente/MisAlumnos'
import GruposDocente from './components/docente/Grupos'
import AnunciosDocente from './components/docente/AnunciosDocente'
import PlantillasDocente from './components/docente/Plantillas'
import PerfilDocente from './components/docente/PerfilDocente'

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

function AppContent() {
  const [active, setActive] = useState<NavKey>('home')
  const { theme, setTheme } = useTheme()
  const { isAuthenticated, loading, user } = useAuth()
  const [activeSection, setActiveSection] = useState('dashboard')

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-white mx-auto mb-4"></div>
          <p className="text-white text-lg">Cargando...</p>
        </div>
      </div>
    )
  }

  // Si está autenticado, mostrar el panel correspondiente
  if (isAuthenticated && user) {
    const renderContent = () => {
      if (user.rol === 'alumno') {
        switch (activeSection) {
          case 'dashboard':
            return <AlumnoDashboard />
          case 'buscar-docente':
            return <BuscarDocente />
          case 'mis-solicitudes':
            return <MisSolicitudes />
          case 'anuncios':
            return <AnunciosAlumno />
          case 'perfil':
            return <PerfilAlumno />
          default:
            return <AlumnoDashboard />
        }
      } else {
        switch (activeSection) {
          case 'dashboard':
            return <DashboardDocente />
          case 'solicitudes':
            return <SolicitudesDocente />
          case 'mis-alumnos':
            return <MisAlumnosDocente />
          case 'grupos':
            return <GruposDocente />
          case 'anuncios':
            return <AnunciosDocente />
          case 'plantillas':
            return <PlantillasDocente />
          case 'perfil':
            return <PerfilDocente />
          default:
            return <DashboardDocente />
        }
      }
    }

    return (
      <Layout activeSection={activeSection} onNavigate={setActiveSection}>
        {renderContent()}
      </Layout>
    )
  }

  // Si no está autenticado, mostrar página de login
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

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  )
}

export default App
