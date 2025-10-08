import AuthForms from './components/AuthForms'
import Sections from './components/Sections'

function App() {
  return (
    <div className="min-h-screen relative bg-slate-950 text-white">
      {/* Subtle grid/gradient background */}
      <div aria-hidden className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,rgba(14,165,233,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_right,rgba(99,102,241,0.18),transparent_40%)]" />

      <NavBar />

      <main id="home" className="relative z-10 container mx-auto px-4 pt-28 md:pt-32">
        <AuthForms />
      </main>

      <Sections />
    </div>
  )
}

function NavBar() {
  return (
    <div className="fixed top-0 inset-x-0 z-20">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        <div className="text-xl font-extrabold tracking-tight">Mate_AI</div>
        <nav className="glass-card rounded-full px-2 py-1">
          <ul className="flex items-center gap-1">
            <li><a className="nav-pill" href="#home">Home</a></li>
            <li><a className="nav-pill" href="#services">Services</a></li>
            <li><a className="nav-pill" href="#about">About us</a></li>
            <li><a className="nav-pill" href="#contact">Contact us</a></li>
          </ul>
        </nav>
      </div>
    </div>
  )
}

export default App
