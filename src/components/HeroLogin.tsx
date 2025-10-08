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

function InfoCard({ active, onChange }: Props) {
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
  const [typedDone, setTypedDone] = useState(false)

  // Reiniciar estado de tipeo cuando cambia la sección
  useEffect(() => {
    setTypedDone(false)
  }, [active])

  // Avanzar automáticamente al terminar de escribir
  useEffect(() => {
    if (!typedDone) return
    const t = setTimeout(() => {
      onChange?.(nextKey(active))
    }, 900)
    return () => clearTimeout(t)
  }, [typedDone, active, onChange])

  return (
    <div className="relative glass-card overflow-hidden">
      {/* dynamic colorful gradient */}
      <div aria-hidden className="absolute inset-0">
        <div className={v.bg} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <TypewriterTitle
          key={active}
          text={v.title}
          className="text-4xl md:text-5xl font-extrabold tracking-tight mb-2"
          onDone={() => setTypedDone(true)}
        />
        <p className="text-2xl md:text-3xl font-semibold text-white/90">{v.subtitle}</p>

        <p className="mt-5 text-white/85 leading-relaxed">{v.text}</p>

        <div className="mt-8 flex items-center justify-end">
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

function TypewriterTitle({
  text,
  className,
  speed = 12,
  onDone,
}: {
  text: string
  className?: string
  speed?: number
  onDone?: () => void
}) {
  const [idx, setIdx] = useState(0)
  useEffect(() => {
    setIdx(0)
    const iv = setInterval(() => {
      setIdx((n) => {
        const next = Math.min(text.length, n + 1)
        if (next === text.length) {
          clearInterval(iv)
          onDone?.()
        }
        return next
      })
    }, speed)
    return () => clearInterval(iv)
  }, [text, speed, onDone])

  const visible = text.slice(0, idx)
  return (
    <h2 className={['text-white', className].join(' ')}>
      <span>{visible}</span>
      <span className="ml-1 inline-block w-[2px] h-[1.05em] align-[-0.2em] bg-white/90 animate-pulse" />
    </h2>
  )
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
        <div className="absolute -inset-28 bg-[conic-gradient(at_30%_60%,rgba(250,204,21,0.25),rgba(244,63,94,0.30),rgba(99,102,241,0.25),rgba(250,204,21,0.25))] blur-2xl" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold text-white">
            {mode === 'login' ? 'Login' : 'Registro'}
          </h3>

          {/* Selector de modo con animación */}
          <div className="relative">
            <div className="flex rounded-full border border-white/20 bg-white/10 backdrop-blur p-1">
              <button
                type="button"
                onClick={() => setMode('login')}
                className={[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                  mode === 'login' ? 'bg-white text-gray-900' : 'text-white/90 hover:bg-white/20'
                ].join(' ')}
              >
                Login
              </button>
              <button
                type="button"
                onClick={() => setMode('register')}
                className={[
                  'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                  mode === 'register' ? 'bg-white text-gray-900' : 'text-white/90 hover:bg-white/20'
                ].join(' ')}
              >
                Registro
              </button>
            </div>
          </div>
        </div>

        {/* Contenedor adaptable: alterna paneles y ajusta altura automáticamente */}
        <div className="mt-6">
          {/* Panel Login */}
          <div
            className={[
              'transition-all duration-500',
              mode === 'login'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 -translate-y-2 hidden'
            ].join(' ')}
            aria-hidden={mode !== 'login'}
          >
            <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
              <div>
                <input
                  aria-label="correo"
                  type="email"
                  placeholder="correo@ejemplo.com"
                  value={correoL}
                  onChange={(e) => setCorreoL(e.target.value)}
                  className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
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
                  className="w-full rounded-full border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                  minLength={8}
                />
              </div>

              <button
                type="submit"
                className="mt-2 w-full rounded-full bg-white px-6 py-3 font-semibold text-gray-900 shadow hover:bg-white/90 active:scale-[0.99] transition-all"
              >
                Iniciar sesión
              </button>
            </form>

            <p className="mt-4 text-center text-sm text-white/80">
              ¿No tienes cuenta?{' '}
              <button
                type="button"
                onClick={() => setMode('register')}
                className="font-semibold text-white hover:underline"
              >
                Regístrate
              </button>
            </p>
          </div>

          {/* Panel Registro */}
          <div
            className={[
              'transition-all duration-500',
              mode === 'register'
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-2 hidden'
            ].join(' ')}
            aria-hidden={mode !== 'register'}
          >
            {/* Selector de rol */}
            <div className="mb-4 flex items-center justify-between">
              <span className="text-sm text-white/80">Tipo de cuenta</span>
              <div className="flex rounded-full border border-white/20 bg-white/10 backdrop-blur p-1">
                <button
                  type="button"
                  onClick={() => setRole('alumno')}
                  className={[
                    'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                    role === 'alumno' ? 'bg-white text-gray-900' : 'text-white/90 hover:bg-white/20'
                  ].join(' ')}
                >
                  Alumno
                </button>
                <button
                  type="button"
                  onClick={() => setRole('docente')}
                  className={[
                    'px-3 py-1.5 text-xs font-semibold rounded-full transition-colors',
                    role === 'docente' ? 'bg-white text-gray-900' : 'text-white/90 hover:bg-white/20'
                  ].join(' ')}
                >
                  Docente
                </button>
              </div>
            </div>

            {/* Formularios condicionados */}
            {role === 'alumno' ? (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  aria-label="nombre"
                  type="text"
                  placeholder="Nombre completo"
                  value={nombreA}
                  onChange={(e) => setNombreA(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                />
                <input
                  aria-label="correo"
                  type="email"
                  placeholder="correo@colegio.edu"
                  value={correoA}
                  onChange={(e) => setCorreoA(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                />
                <input
                  aria-label="contrasena"
                  type="password"
                  placeholder="Contraseña (8+ caracteres)"
                  value={contrasenaA}
                  onChange={(e) => setContrasenaA(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                  minLength={8}
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <select
                    aria-label="grado"
                    value={gradoA}
                    onChange={(e) => setGradoA(e.target.value)}
                    className="w-full rounded-xl border border-white/30 bg-white/10 px-4 py-3 text-white outline-none backdrop-blur focus:border-white/50"
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
                    className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  />
                </div>

                <button
                  type="submit"
                  className="mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 hover:from-indigo-400 hover:to-sky-400 active:scale-[0.99] transition-all"
                >
                  Crear cuenta de alumno
                </button>

                <p className="text-center text-sm text-white/80">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-semibold text-white hover:underline"
                  >
                    Inicia sesión
                  </button>
                </p>
              </form>
            ) : (
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <input
                  aria-label="nombre"
                  type="text"
                  placeholder="Nombre completo"
                  value={nombreD}
                  onChange={(e) => setNombreD(e.target.value)}
                  className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                />
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <input
                    aria-label="correo"
                    type="email"
                    placeholder="correo@colegio.edu"
                    value={correoD}
                    onChange={(e) => setCorreoD(e.target.value)}
                    className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                    required
                  />
                  <input
                    aria-label="contrasena"
                    type="password"
                    placeholder="Contraseña (8+ caracteres)"
                    value={contrasenaD}
                    onChange={(e) => setContrasenaD(e.target.value)}
                    className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
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
                  className="w-full rounded-xl border border-white/30 bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:border-white/50"
                  required
                />

                <div className="space-y-2">
                  <span className="text-sm text-white/90">Grados asignados</span>
                  <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
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
                                     : 'bg-white/10 text-white/85 hover:bg-white/20'
                            ].join(' ')}
                          >
                            {g}
                          </button>
                        )
                      })}
                    </div>
                    {gradosAsignados.length > 0 && (
                      <p className="mt-3 text-xs text-white/70">
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

                <p className="text-center text-sm text-white/80">
                  ¿Ya tienes cuenta?{' '}
                  <button
                    type="button"
                    onClick={() => setMode('login')}
                    className="font-semibold text-white hover:underline"
                  >
                    Inicia sesión
                  </button>
                </p>
              </form>
            )}
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
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(255,255,255,0.06),transparent_60%)]" />
      {/* flowing bands behind cards */}
      <div className="absolute -left-1/4 top-10 h-72 md:h-80 w-[130%] -rotate-6 bg-[linear-gradient(90deg,rgba(236,72,153,0.20),rgba(59,130,246,0.22),rgba(250,204,21,0.18))] blur-3xl opacity-70" />
      <div className="absolute -right-1/3 bottom-0 h-72 md:h-80 w-[130%] rotate-6 bg-[linear-gradient(90deg,rgba(34,197,94,0.20),rgba(168,85,247,0.22),rgba(244,63,94,0.20))] blur-3xl opacity-70" />
    </div>
  )
}