export default function Footer() {
  return (
    <footer className="relative z-10 py-4 sm:py-6 mt-auto">
      <div className="container mx-auto px-4">
        <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-between gap-3 sm:gap-4">
          {/* Logo y nombre */}
          <div className="flex items-center gap-3 px-3 py-2 rounded-full border backdrop-blur-md order-1"
               style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <div
              aria-hidden
              className="h-5 w-5 sm:h-6 sm:w-6 rounded-md"
              style={{ background: `linear-gradient(135deg, rgb(var(--grad-a)), rgb(var(--grad-b)))` }}
            />
            <span className="text-xs sm:text-sm font-bold tracking-wide opacity-90">Mate_AI</span>
          </div>

          {/* Copyright */}
          <div className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-full border backdrop-blur-md order-2 sm:order-2"
               style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <span className="text-xs sm:text-sm opacity-80 text-center">© 2025 Mate_AI. Todos los derechos reservados.</span>
          </div>

          {/* Links opcionales */}
          <div className="flex items-center gap-3 sm:gap-4 text-xs opacity-70 order-3 px-3 py-2 rounded-full border backdrop-blur-md"
               style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            <a href="#" className="hover:opacity-100 transition-opacity">Términos</a>
            <span className="hidden sm:inline">•</span>
            <a href="#" className="hover:opacity-100 transition-opacity">Privacidad</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

