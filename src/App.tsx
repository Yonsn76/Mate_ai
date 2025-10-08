import Sections from './components/Sections'

function App() {
  return (
    <div className="min-h-screen relative bg-[#0a0a0f] text-white overflow-hidden">
      {/* Background gradients and subtle texture */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[680px] w-[680px] rounded-full opacity-30 blur-3xl bg-[conic-gradient(at_center,_#ec4899_0%,_#f59e0b_25%,_#06b6d4_50%,_#8b5cf6_75%,_#ec4899_100%)]" />
        <div className="absolute -bottom-48 -right-48 h-[680px] w-[680px] rounded-full opacity-30 blur-3xl bg-[conic-gradient(at_center,_#06b6d4_0%,_#10b981_25%,_#f59e0b_50%,_#ef4444_75%,_#06b6d4_100%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%),radial-gradient(ellipse_at_bottom,rgba(255,255,255,0.05),transparent_60%)] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />
      </div>

      {/* Navbar */}
      <nav className="relative z-10 container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-wider">Mate_AI</div>
        <ul className="hidden md:flex items-center gap-2 rounded-full border border-white/10 bg-white/10 p-1 backdrop-blur-xl shadow-lg">
          <li><a className="nav-link" href="#home">Home</a></li>
          <li><a className="nav-link" href="#services">Services</a></li>
          <li><a className="nav-link" href="#about">About us</a></li>
          <li><a className="nav-link" href="#contact">Contact us</a></li>
        </ul>
      </nav>

      {/* Hero: two glass cards matching the reference */}
      <section id="home" className="relative z-10 container mx-auto px-4 pb-12 md:pb-20">
        <div className="grid md:grid-cols-2 gap-6 md:gap-10 items-stretch">
          {/* Left information card */}
          <div className="glass-card relative overflow-hidden p-6 md:p-8">
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-wide">
              GLASSMORPHISM
              <span className="block text-xl md:text-2xl font-semibold mt-1">Login Page</span>
            </h2>

            <p className="mt-4 text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>
            <p className="mt-3 text-white/80 leading-relaxed">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida. Risus commodo viverra maecenas accumsan lacus vel facilisis.
            </p>

            <button
              type="button"
              className="mt-6 inline-flex items-center rounded-full bg-white/90 text-gray-900 px-5 py-2.5 font-semibold shadow hover:bg-white transition"
            >
              Learn More
            </button>

            {/* Decorative color wash to emulate background streaks */}
            <div aria-hidden className="pointer-events-none absolute -inset-16 bg-[radial-gradient(ellipse_at_center,_rgba(236,72,153,0.18),transparent_40%),radial-gradient(ellipse_at_bottom_left,_rgba(234,88,12,0.12),transparent_40%),radial-gradient(ellipse_at_top_right,_rgba(99,102,241,0.14),transparent_40%)]" />

            {/* Slider dots */}
            <div className="absolute right-6 bottom-6 flex gap-2">
              <span className="h-2.5 w-2.5 rounded-full bg-white/80" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
              <span className="h-2.5 w-2.5 rounded-full bg-white/40" />
            </div>
          </div>

          {/* Right login card */}
          <div className="glass-card relative overflow-hidden p-6 md:p-8">
            <h3 className="text-2xl md:text-3xl font-semibold text-center">Login</h3>

            <form className="mt-6 space-y-4">
              <input className="pill-input" type="text" placeholder="Username" />
              <input className="pill-input" type="password" placeholder="Password" />
              <button
                type="button"
                className="w-full rounded-full bg-white/90 text-gray-900 font-semibold py-3 shadow hover:bg-white transition"
              >
                Login
              </button>
            </form>

            {/* Decorative color wash */}
            <div aria-hidden className="pointer-events-none absolute -inset-16 bg-[radial-gradient(ellipse_at_top_right,_rgba(245,158,11,0.12),transparent_40%),radial-gradient(ellipse_at_bottom_left,_rgba(139,92,246,0.18),transparent_40%)]" />
          </div>
        </div>
      </section>

      {/* Content sections using provided copy */}
      <Sections />
    </div>
  )
}

export default App
