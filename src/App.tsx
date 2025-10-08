import AuthForms from './components/AuthForms'

function App() {
  return (
    <div className="min-h-screen relative bg-slate-950 text-white">
      {/* Subtle grid/gradient background */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.18),transparent_40%)]" />
      <div className="relative z-10 container mx-auto px-4 py-12 md:py-16">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Mate AI
          </h1>
          <p className="mt-2 text-white/80">
            Plataforma de matemáticas con IA
          </p>
        </header>

        <AuthForms />
      </div>
    </div>
  )
}

export default App
