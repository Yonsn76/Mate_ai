import { useEffect, useMemo, useState } from 'react'
import type { NavKey } from '../App'

type Props = {
  active: NavKey
  onChange?: (key: NavKey) => void
}

export default function HeroLogin({ active, onChange }: Props) {
  return (
    <section id="home" className="relative">
      <BackgroundFX />

      <div className="relative z-10 container mx-auto px-4 py-10 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-10 items-stretch">
          <InfoCard active={active} onChange={onChange} />
          <AuthCard />
        </div>
      </div>
    </section>
  )
}

function nextKey(k: NavKey): NavKey {
  const order: NavKey[] = ['home', 'services', 'about', 'contact']
  const idx = order.indexOf(k)
  return order[(idx + 1) % order.length]
}

/* ----- Copy por sección ----- */
const COPY: Record<NavKey, { kicker: string; lines: string[] }> = {
  home: {
    kicker: 'GLASSMORPHISM',
    lines: [
      'Login Page',
      'Mate_AI es una plataforma educativa para practicar y crear ejercicios con IA.',
      '• Ejercicios dinámicos y pistas adaptativas.',
      '• Seguimiento en tiempo real para docentes.',
      '• Basado en IA generativa y análisis del progreso.',
    ],
  },
  services: {
    kicker: 'SERVICES',
    lines: [
      'Qué ofrecemos',
      'Práctica personalizada impulsada por IA.',
      '• Generación automática de ejercicios.',
      '• Control de progreso y dashboards en tiempo real.',
      '• Soporte multiplataforma.',
    ],
  },
  about: {
    kicker: 'ABOUT',
    lines: [
      'Quiénes somos',
      'Hacemos del aprendizaje matemático una experiencia interactiva e inclusiva.',
      '• Pistas adaptativas y retroalimentación inteligente.',
      '• Pensado para estudiantes y docentes.',
    ],
  },
  contact: {
    kicker: 'CONTACT',
    lines: [
      'Contáctanos',
      '¿Tienes preguntas o quieres unirte?',
      '• Email: contacto@mateai.com',
      '• WhatsApp: +51 987 654 321',
      '• Huánuco, Perú',
    ],
  },
}

function InfoCard({ active, onChange }: Props) {
  // Fondo dinámico con gradientes de tema
  const bgClass =
    'absolute -inset-24 bg-[conic-gradient(from_210deg_at_50%_50%,rgb(var(--grad-a)/0.30),rgb(var(--grad-b)/0.27),rgba(255,255,255,0.08),rgb(var(--grad-a)/0.30))] blur-2xl'

  // Typing state
  const [lineIdx, setLineIdx] = useState(0)
  const [charIdx, setCharIdx] = useState(0)
  const [doneAll, setDoneAll] = useState(false)

  const { kicker, lines } = COPY[active]!

  useEffect(() => {
    // Reset typing on section change
    setLineIdx(0)
    setCharIdx(0)
    setDoneAll(false)
  }, [active])

  // Typing animation
  useEffect(() => {
    if (doneAll) return
    const current = lines[lineIdx] ?? ''
    const speed = 14
    const delayBetweenLines = 300

    if (charIdx < current.length) {
      const t = setTimeout(() => setCharIdx((c) => c + 1), speed)
      return () => clearTimeout(t)
    }

    // End of current line
    if (lineIdx < lines.length - 1) {
      const t = setTimeout(() => {
        setLineIdx((i) => i + 1)
        setCharIdx(0)
      }, delayBetweenLines)
      return () => clearTimeout(t)
    } else {
      // Finished all lines -> wait and auto advance
      const t = setTimeout(() => {
        setDoneAll(true)
        onChange?.(nextKey(active))
      }, 1200)
      return () => clearTimeout(t)
    }
  }, [charIdx, lineIdx, lines, doneAll, active, onChange])

  // Compute visible content
  const titleFull = lineIdx > 0 ? lines[0] : lines[0].slice(0, charIdx)
  const bodyFull = lineIdx <= 0 ? [] : lines.slice(1, Math.min(lineIdx + 1, lines.length))
  const showPartialOnLast = lineIdx > 0 && charIdx < (lines[lineIdx]?.length ?? 0)
  if (showPartialOnLast) {
    bodyFull[bodyFull.length - 1] = lines[lineIdx].slice(0, charIdx)
  }

  return (
    <div className="relative glass-card overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <div className={bgClass} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        {/* Kicker */}
        <div className="mb-2 text-xs md:text-sm font-semibold uppercase tracking-[0.22em] opacity-90">
          {kicker}
        </div>

        {/* Title with caret */}
        <h2 className="text-4xl md:text-5xl font-black tracking-tight">
          {titleFull}
          {lineIdx === 0 && (
            <span className="ml-1 inline-block w-[2px] h-[1.1em] align-[-0.2em] bg-white/90 animate-pulse" />
          )}
        </h2>

        {/* Body renderer */}
        <div className="mt-5 space-y-3 text-white/90">
          <TypedBody lines={bodyFull} showCaret={lineIdx > 0 && !doneAll && showPartialOnLast} />
        </div>

        {/* dots indicator */}
        <div className="mt-8 flex items-center justify-end gap-2">
          {[0, 1, 2, 3].map((i) => (
            <span key={i} className={['h-2.5 w-2.5 rounded-full', i === 0 ? 'bg-white/70' : 'bg-white/35'].join(' ')} />
          ))}
        </div>
      </div>
    </div>
  )
}

function TypedBody({ lines, showCaret }: { lines: string[]; showCaret: boolean }) {
  const out: React.ReactNode[] = []
  let bullets: string[] = []

  const flushBullets = () => {
    if (bullets.length > 0) {
      out.push(
        <ul key={`ul-${out.length}`} className="list-disc pl-5 space-y-1">
          {bullets.map((b, idx) => (
            <li key={idx} className="opacity-95">
              {b.replace(/^•\\s?/, '')}
              {showCaret && idx === bullets.length - 1 && <Caret />}
            </li>
          ))}
        </ul>
      )
      bullets = []
    }
  }

  lines.forEach((ln, i) => {
    if (ln?.startsWith('•')) {
      bullets.push(ln)
    } else {
      flushBullets()
      out.push(
        <p key={`p-${i}`} className="opacity-95">
          {ln}
          {showCaret && i === lines.length - 1 && <Caret />}
        </p>
      )
    }
  })
  flushBullets()

  return <>{out}</>
}

function Caret() {
  return <span className="ml-1 inline-block w-[2px] h-[1.05em] align-[-0.2em] bg-white/90 animate-pulse" />
}

/* -------------------- Auth Card (Login / Registro con animación) -------------------- */

type AuthMode = 'login' | 'register'
type Role = 'alumno' | 'docente'

const gradosBase = [
  '1ro A', '1ro B', '2do A', '2do B',
  '3ro A', '3ro B', '4to A', '4to B', '5to A', '5to B'
]

function AuthCard() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [role, setRole] = useState<Role>('alumno')

  // Login
  const [correoL, setCorreoL] = useState('')
  const [contrasenaL, setContrasenaL] = useState('')

  // Registro Alumno
  const [nombreA, setNombreA] = useState('')
  const [correoA, setCorreoA] = useState('')
  const [contrasenaA, setContrasenaA] = useState('')
  const [gradoA, setGradoA] = useState('')
  const [docenteCode, setDocenteCode] = useState('')

  // Registro Docente
  const [nombreD, setNombreD] = useState('')
  const [correoD, setCorreoD] = useState('')
  const [contrasenaD, setContrasenaD] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [gradosAsignados, setGradosAsignados] = useState<string[]>([])

  const toggleGrado = (g: string) => {
    setGradosAsignados((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
  }

  return (
    <div className="relative glass-card overflow-hidden">
      <div aria-hidden className="absolute inset-0">
        <div className="absolute -inset-28 bg-[conic-gradient(at_30%_60%,rgb(var(--grad-a)/0.25),rgb(var(--grad-b)/0.30),rgb(var(--grad-a)/0.25))] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">Auth</h3>

          {/* Tabs pill */}
          <div className="relative">
            <div className="flex rounded-full border backdrop-blur p-1"
                 style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
              <button
                type="button"
                onClick={() => setMode('login')}
                className={[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                  mode === 'login' ? 'bg-white text-gray-900' : 'hover:bg-white/20'
                ].join(' ')}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                  mode === 'register' ? 'bg-white text-gray-900' : 'hover:bg-white/20'
                ].join(' ')}
              >
                Registro
              </button>
            </div>
          </div>
        </div>

        {/* Slider horizontal */}
        <div className="mt-6 overflow-hidden">
          <div
            className="flex w-[200%] transition-transform duration-500 ease-out"
            style={{ transform: mode === 'login' ? 'translateX(0%)' : 'translateX(-50%)' }}
          >
            {/* Slide Login */}
            <div className="w-1/2 pr-2">
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <input
                    aria-label="correo"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={correoL}
                    onChange={(e) => setCorreoL(e.target.value)}
                    className="w-full rounded-full border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                  />
                </div>
                <div>
                  <input
                    aria-label="contrasena"
                    type="password"
                    placeholder="••••••••"
                    value={contrasenaL}
                    onChange={(e) => setContrasenaL(e.target.value)}
                    className="w-full rounded-full border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                    minLength={8}
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-white/90 active:scale-[0.99] transition-all"
                >
                  Login
                </button>
              </form>

              <p className="mt-4 text-center text-sm/relaxed opacity-90">
                ¿No tienes cuenta?{' '}
                <button
                  type="button"
                  onClick={() => setMode('register')}
                  className="font-semibold underline-offset-4 hover:underline"
                >
                  Regístrate
                </button>
              </p>
            </div>

            {/* Slide Registro */}
            <div className="w-1/2 pl-2">
              {/* Selector de rol */}
              <div className="mb-4 flex items-center justify-between">
                <span className="text-sm opacity-90">Tipo de cuenta</span>
                <div className="flex rounded-full border backdrop-blur p-1"
                     style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
                  <button
                    type="button"
                    onClick={() => setRole('alumno')}
                    className={[
                      'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                      role === 'alumno' ? 'bg-white text-gray-900' : 'hover:bg-white/20'
                    ].join(' ')}
                  >
                    Alumno
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('docente')}
                    className={[
                      'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                      role === 'docente' ? 'bg-white text-gray-900' : 'hover:bg-white/20'
                    ].join(' ')}
                  >
                    Docente
                  </button>
                </div>
              </div>

              {role === 'alumno' ? (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    aria-label="nombre"
                    type="text"
                    placeholder="Nombre completo"
                    value={nombreA}
                    onChange={(e) => setNombreA(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                  />
                  <input
                    aria-label="correo"
                    type="email"
                    placeholder="correo@colegio.edu"
                    value={correoA}
                    onChange={(e) => setCorreoA(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                  />
                  <input
                    aria-label="contrasena"
                    type="password"
                    placeholder="Contraseña (8+ caracteres)"
                    value={contrasenaA}
                    onChange={(e) => setContrasenaA(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                    minLength={8}
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      aria-label="grado"
                      value={gradoA}
                      onChange={(e) => setGradoA(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                    >
                      <option value="" className="text-gray-900">Selecciona tu grado</option>
                      {gradosBase.map((g) => (
                        <option key={g} value={g} className="text-gray-900">{g}</option>
                      ))}
                    </select>
                    <input
                      aria-label="codigo docente"
                      type="text"
                      placeholder="Código Docente / Colegio (opcional)"
                      value={docenteCode}
                      onChange={(e) => setDocenteCode(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    />
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-sky-400 active:scale-[0.99] transition-all"
                  >
                    Crear cuenta de alumno
                  </button>
                </form>
              ) : (
                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <input
                    aria-label="nombre"
                    type="text"
                    placeholder="Nombre completo"
                    value={nombreD}
                    onChange={(e) => setNombreD(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                  />
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <input
                      aria-label="correo"
                      type="email"
                      placeholder="correo@colegio.edu"
                      value={correoD}
                      onChange={(e) => setCorreoD(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                    />
                    <input
                      aria-label="contrasena"
                      type="password"
                      placeholder="Contraseña (8+ caracteres)"
                      value={contrasenaD}
                      onChange={(e) => setContrasenaD(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                      minLength={8}
                    />
                  </div>
                  <input
                    aria-label="especialidad"
                    type="text"
                    placeholder='Especialidad (ej: "Matemática")'
                    value={especialidad}
                    onChange={(e) => setEspecialidad(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                    required
                  />

                  <div className="space-y-2">
                    <span className="text-sm opacity-90">Grados asignados</span>
                    <div className="rounded-xl border bg-white/10 p-3 backdrop-blur"
                         style={{ borderColor: 'var(--panel-border)' }}>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {gradosBase.map((g) => {
                          const active = gradosAsignados.includes(g)
                          return (
                            <button
                              type="button"
                              key={g}
                              onClick={() => toggleGrado(g)}
                              className={[
                                'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                                active ? 'bg-white/80 text-gray-900 shadow'
                                       : 'bg-white/10 hover:bg-white/20'
                              ].join(' ')}
                            >
                              {g}
                            </button>
                          )
                        })}
                      </div>
                      {gradosAsignados.length > 0 && (
                        <p className="mt-3 text-xs opacity-90">
                          Seleccionados: {gradosAsignados.join(', ')}
                        </p>
                      )}
                    </div>
                  </div>

                  <button
                    type="submit"
                    className="mt-2 w-full rounded-xl bg-gradient-to-r from-pink-500 via-violet-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg hover:from-pink-400 hover:via-violet-400 hover:to-sky-400 active:scale-[0.99] transition-all"
                  >
                    Crear cuenta de docente
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

function BackgroundFX() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
      {/* subtle vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.05),transparent_60%)]" />
      {/* blobs using theme gradients */}
      <div className="absolute -left-1/4 top-10 h-72 md:h-80 w-[130%] -rotate-6 blur-3xl opacity-70 md:opacity-80"
           style={{ background: 'linear-gradient(90deg, rgb(var(--grad-a)/0.22), rgb(var(--grad-b)/0.22))' }} />
      <div className="absolute -right-1/3 bottom-0 h-72 md:h-80 w-[130%] rotate-6 blur-3xl opacity-70 md:opacity-80"
           style={{ background: 'linear-gradient(90deg, rgb(var(--grad-b)/0.20), rgb(var(--grad-a)/0.22))' }} />
    </div>
  )
}