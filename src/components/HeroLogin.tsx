import { useState } from 'react'

export default function HeroLogin() {
  return (
    <section id="home" className="relative">
      <BackgroundFX />

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <InfoCard />
          <LoginCard />
        </div>
      </div>
    </section>
  )
}

function InfoCard() {
  return (
    <div className="relative glass-card overflow-hidden">
      {/* colorful gradient behind content to emulate the image */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -inset-24 bg-[conic-gradient(from_210deg_at_50%_50%,rgba(236,72,153,0.30),rgba(99,102,241,0.25),rgba(6,182,212,0.25),rgba(236,72,153,0.30))] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-2">GLASSMORPHISM</h2>
        <p className="text-lg md:text-xl font-medium text-white/90">Login Page</p>

        <p className="mt-5 text-white/80 leading-relaxed">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
          incididunt ut labore et dolore magna aliqua. Quis ipsum suspendisse ultrices gravida.
          Risus commodo viverra maecenas accumsan lacus vel facilisis.
        </p>

        <div className="mt-8 flex items-center justify-between">
          <a
            href="#about"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow"
          >
            Learn More
          </a>

          <div className="flex items-center gap-2">
            <span className="h-2.5 w-2.5 rounded-full bg-white/60" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
            <span className="h-2.5 w-2.5 rounded-full bg-white/30" />
          </div>
        </div>
      </div>
    </div>
  )
}

function LoginCard() {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  return (
    <div className="relative glass-card overflow-hidden">
      {/* colorful gradient behind content to emulate the image's right card */}
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -inset-28 bg-[conic-gradient(at_30%_60%,rgba(250,204,21,0.25),rgba(244,63,94,0.30),rgba(99,102,241,0.25),rgba(250,204,21,0.25))] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <h3 className="text-2xl font-semibold mb-6 text-white">Login</h3>

        <div className="space-y-4">
          <div>
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
            />
          </div>
          <div>
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
            />
          </div>

          <button
            type="button"
            className="mt-2 w-full rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-white/90 active:scale-[0.99] transition-all"
          >
            Login
          </button>
        </div>
      </div>
    </div>
  )
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      {/* flowing bands behind cards */}
      <div className="absolute -left-1/4 top-10 h-80 w-[120%] -rotate-6 bg-[linear-gradient(90deg,rgba(236,72,153,0.20),rgba(59,130,246,0.22),rgba(250,204,21,0.18))] blur-3xl opacity-70" />
      <div className="absolute -right-1/3 bottom-0 h-80 w-[120%] rotate-6 bg-[linear-gradient(90deg,rgba(34,197,94,0.20),rgba(168,85,247,0.22),rgba(244,63,94,0.20))] blur-3xl opacity-70" />
    </div>
  )
}