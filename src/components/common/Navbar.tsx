import { useAuth } from '../../contexts/AuthContext'

interface NavbarProps {
  activeSection: string
  onNavigate: (section: string) => void
}

export default function Navbar({ activeSection, onNavigate }: NavbarProps) {
  const { user, logout } = useAuth()

  // Secciones del navbar según el rol
  const navItems = user?.rol === 'alumno' 
    ? [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'buscar-docente', label: 'Buscar Docente' },
        { id: 'mis-solicitudes', label: 'Mis Solicitudes' },
        { id: 'anuncios', label: 'Anuncios' },
        { id: 'perfil', label: 'Perfil' }
      ]
    : [
        { id: 'dashboard', label: 'Dashboard' },
        { id: 'solicitudes', label: 'Solicitudes' },
        { id: 'mis-alumnos', label: 'Mis Alumnos' },
        { id: 'grupos', label: 'Grupos' },
        { id: 'anuncios', label: 'Anuncios' },
        { id: 'plantillas', label: 'Plantillas' },
        { id: 'perfil', label: 'Perfil' }
      ]

  return (
    <nav className="sticky top-0 z-50 backdrop-blur-2xl border-b border-white/[0.08]" 
         style={{ 
           background: 'linear-gradient(180deg, rgba(255, 255, 255, 0.08) 0%, rgba(255, 255, 255, 0.02) 100%)',
           boxShadow: '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px 0 rgba(0, 0, 0, 0.06)'
         }}>
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo - Cursor.com inspired */}
          <div className="flex items-center gap-3 group cursor-pointer">
            <div className="relative">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center shadow-lg transition-all group-hover:scale-105 group-hover:shadow-violet-500/50">
                <span className="text-white font-bold text-lg">M</span>
              </div>
              <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-violet-600 to-purple-500 blur opacity-30 group-hover:opacity-50 transition-all" />
            </div>
            <div>
              <h1 className="font-bold text-white text-lg tracking-tight">Mate_AI</h1>
              <p className="text-[10px] text-white/60 font-medium tracking-wide uppercase">{user?.rol === 'alumno' ? 'Estudiante' : 'Docente'}</p>
            </div>
          </div>

          {/* Nav Items - Desktop with Cursor.com style */}
          <div className="hidden md:flex items-center gap-1 bg-white/[0.04] rounded-full p-1 backdrop-blur-sm border border-white/[0.08]">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={[
                  'px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 relative',
                  activeSection === item.id
                    ? 'text-white'
                    : 'text-white/60 hover:text-white'
                ].join(' ')}
              >
                {activeSection === item.id && (
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 shadow-lg" 
                       style={{ animation: 'fade-in 0.2s ease-out' }} />
                )}
                <span className="relative z-10">{item.label}</span>
              </button>
            ))}
          </div>

          {/* User Menu - Cursor.com style */}
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-3 px-3 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08]">
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-600 to-purple-500 flex items-center justify-center text-white text-xs font-bold">
                {user?.nombre?.charAt(0)}
              </div>
              <div className="text-right pr-2">
                <p className="text-sm font-medium text-white leading-tight">{user?.nombre?.split(' ')[0]}</p>
                <p className="text-xs text-white/50 leading-tight">{user?.correo?.split('@')[0]}</p>
              </div>
            </div>
            <button
              onClick={logout}
              className="px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 bg-red-500/10 text-red-300 hover:bg-red-500/20 border border-red-500/20 hover:border-red-500/30"
            >
              Salir
            </button>
          </div>
        </div>

        {/* Nav Items - Mobile with improved style */}
        <div className="md:hidden pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => onNavigate(item.id)}
              className={[
                'px-4 py-2 rounded-full text-xs font-medium whitespace-nowrap transition-all duration-200 border',
                activeSection === item.id
                  ? 'bg-gradient-to-br from-violet-600 to-purple-500 text-white border-transparent shadow-lg'
                  : 'bg-white/[0.04] text-white/60 hover:text-white border-white/[0.08] hover:bg-white/[0.08]'
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </nav>
  )
}

