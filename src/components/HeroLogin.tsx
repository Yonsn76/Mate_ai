import { useMemo, useState } from 'react'
import type { NavKey } from '../App'

type Props = {
  active: NavKey
}

export default function HeroLogin({ active }: Props) {
  return (
    <section id="home" className="relative">
      <BackgroundFX />

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <InfoCard active={active} />
          <LoginCard />
        </div>
      </div>
    </section>
  )
}

function InfoCard({ active }: Props) {
  const variants = useMemo(() => {
    const map: Record<
      NavKey,
      {
        title: string
        subtitle: string
        text: string
        bg: string
        accentDots?: number
      }
    > = {
      home: {
        title: 'GLASSMORPHISM',
        subtitle: 'Login Page',
        text:
          'Explora una experiencia moderna con tarjetas translúcidas, gradientes vivos y animaciones sutiles. Todo optimizado para cualquier dispositivo.',
        bg:
          'absolute -inset-24 bg-[conic-gradient(from_210deg_at_50%_50%,rgba(236,72,153,0.35),rgba(59,130,246,0.30),rgba(16,185,129,0.28),rgba(236,72,153,0.35))] blur-2xl',
        accentDots: 3,
      },
      services: {
        title: 'Servicios Mate_AI',
        subtitle: 'Práctica y generación con IA',
        text:
          'Práctica personalizada, generación automática de ejercicios y dashboards en tiempo real para alumnos y docentes.',
        bg:
          'absolute -inset-24 bg-[conic-gradient(at_30%_60%,rgba(14,165,233,0.35),rgba(168,85,247,0.32),rgba(251,191,36,0.28),rgba(14,165,233,0.35))] blur-2xl',
        accentDots: 4,
      },
      about: {
        title: 'Sobre Mate_AI',
        subtitle: 'Aprendizaje inteligente',
        text:
          'Nuestra misión es hacer del aprendizaje matemático una experiencia interactiva, inclusiva y relevante, para todos los niveles.',
        bg:
          'absolute -inset-24 bg-[conic-gradient(from_90deg_at_60%_40%,rgba(99,102,241,0.34),rgba(236,72,153,0.32),rgba(6,182,212,0.28),rgba(99,102,241,0.34))] blur-2xl',
        accentDots: 2,
      },
      contact: {
        title: 'Contáctanos',
        subtitle: 'Estamos para ayudarte',
        text:
          'Escríbenos a contacto@mateai.com o vía WhatsApp. Resolvemos dudas y te guiamos para iniciar con la plataforma.',
        bg:
          'absolute -inset-24 bg-[conic-gradient(at_40%_60%,rgba(34,197,94,0.34),rgba(244,63,94,0.32),rgba(250,204,21,0.30),rgba(34,197,94,0.34))] blur-2xl',
        accentDots: 5,
      },
    }
    return map
  }, [])

  const v = variants[active]

  return (
    <div className="relative glass-card overflow-hidden">
      {/* dynamic colorful gradient */}
      <div aria-hidden className="absolute inset-0">
        <div className={v.bg} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <h2 className="text-2xl md:text-3xl font-extrabold tracking-wide mb-1">{v.title}</h2>
        <p className="text-lg md:text-xl font-medium text-white/90">{v.subtitle}</p>

        <p className="mt-5 text-white/80 leading-relaxed">{v.text}</p>

        <div className="mt-8 flex items-center justify-between">
          <a
            href="#about"
            className="inline-flex items-center rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-gray-900 shadow hover:bg-white/90 transition-colors"
          >
            Learn More
          </a>

          <div className="flex items-center gap-2">
            {Array.from({ length: v.accentDots ?? 3 }).map((_, i) => (
              <span
                key={i}
                className={[
                  'h-2.5 w-2.5 rounded-full',
                  i === 0 ? 'bg-white/70' : 'bg-white/35'
                ].join(' ')}
              />
            ))}
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

        <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
          <div>
            <input
              aria-label="Username"
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
            />
          </div>
          <div>
            <input
              aria-label="Password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
            />
          </div>

          <button
            type="submit"
            className="mt-2 w-full rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-white/90 active:scale-[0.99] transition-all"
          >
            Login
          </button>
        </form>
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
      <div className="absolute -left-1/4 top-10 h-72 md:h-80 w-[130%] -rotate-6 bg-[linear-gradient(90deg,rgba(236,72,153,0.20),rgba(59,130,246,0.22),rgba(250,204,21,0.18))] blur-3xl opacity-70" />
      <div className="absolute -right-1/3 bottom-0 h-72 md:h-80 w-[130%] rotate-6 bg-[linear-gradient(90deg,rgba(34,197,94,0.20),rgba(168,85,247,0.22),rgba(244,63,94,0.20))] blur-3xl opacity-70" />
    </div>
  )
}