import { useEffect, useMemo, useRef, useState } from 'react'
import type { NavKey } from '../App'

type Props = {
  active: NavKey
  onChange?: (key: NavKey) => void
}

export default function HeroLogin({ active, onChange }: Props) {
  return (
    <section id="home" className="relative">
      <BackgroundFX />

      <div className="relative z-10 container mx-auto px-4 py-8 md:py-10">
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

  // Typing animation (más lento)
  useEffect(() => {
    if (doneAll) return
    const current = lines[lineIdx] ?? ''
    const speed = 40
    const delayBetweenLines = 450

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
    <div className="relative glass-card overflow-hidden md:self-center h-[400px] md:h-[460px] flex">
      <div aria-hidden className="absolute inset-0">
        <div className={bgClass} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/0 via-black/10 to-black/40" />
      </div>

      <div className="relative p-6 md:p-8 w-full my-auto">
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
        <div className="mt-6 flex items-center justify-end gap-2">
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
              {b.replace(/^•\s?/, '')}
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

const gradosBase = ['1','2','3','4','5','6']

function AuthCard() {
  const [mode, setMode] = useState<AuthMode>('login')
  const [role, setRole] = useState<Role>('alumno')

  // Login
  const [correoL, setCorreoL] = useState('')
  const [contrasenaL, setContrasenaL] = useState('')
  const [showL, setShowL] = useState(false)

  // Registro Alumno
  const [nombreA, setNombreA] = useState('')
  const [correoA, setCorreoA] = useState('')
  const [contrasenaA, setContrasenaA] = useState('')
  const [contrasenaA2, setContrasenaA2] = useState('')
  const [showA, setShowA] = useState(false)
  const [showA2, setShowA2] = useState(false)
  const [gradoA, setGradoA] = useState('')
  const [seccionA, setSeccionA] = useState('')
  const [docenteCode, setDocenteCode] = useState('')

  // Registro Docente
  const [nombreD, setNombreD] = useState('')
  const [correoD, setCorreoD] = useState('')
  const [contrasenaD, setContrasenaD] = useState('')
  const [contrasenaD2, setContrasenaD2] = useState('')
  const [showD, setShowD] = useState(false)
  const [showD2, setShowD2] = useState(false)
  const [especialidad, setEspecialidad] = useState('')

  const eye = (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  )
  const eyeOff = (
    <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M3 3l18 18" />
      <path d="M10.58 10.58A3 3 0 0 0 12 15a3 3 0 0 0 2.12-.88" />
      <path d="M9.88 4.54A10.91 10.91 0 0 1 12 5c7 0 11 7 11 7a19.51 19.51 0 0 1-3.34 4.46" />
      <path d="M6.12 6.12A19.5 19.5 0 0 0 1 12s4 7 11 7a10.9 10.9 0 0 0 4.12-.78" />
    </svg>
  )

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

        {/* Slider horizontal con altura adaptativa */}
        <AdaptiveSlider mode={mode}>
          {/* Slide Login */}
          <div data-slide="login" className="w-1/2 pr-2">
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
              <div className="relative">
                <input
                  aria-label="contrasena"
                  type={showL ? 'text' : 'password'}
                  placeholder="••••••••"
                  value={contrasenaL}
                  onChange={(e) => setContrasenaL(e.target.value)}
                  className="w-full rounded-full border bg-white/10 px-5 py-3 pr-10 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                  style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                  required
                  minLength={8}
                />
                <button type="button" onClick={() => setShowL((s) => !s)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                  {showL ? eyeOff : eye}
                </button>
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
          <div data-slide="register" className="w-1/2 pl-2">
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

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="relative">
                      <input
                        aria-label="contrasena"
                        type={showA ? 'text' : 'password'}
                        placeholder="Contraseña (8+ caracteres)"
                        value={contrasenaA}
                        onChange={(e) => setContrasenaA(e.target.value)}
                        className="w-full rounded-xl border bg-white/10 px-5 py-3 pr-10 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                        style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                        required
                        minLength={8}
                      />
                      <button type="button" onClick={() => setShowA((s) => !s)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                        {showA ? eyeOff : eye}
                      </button>
                    </div>

                    <div className="relative">
                      <input
                        aria-label="repetir-contrasena"
                        type={showA2 ? 'text' : 'password'}
                        placeholder="Repetir contraseña"
                        value={contrasenaA2}
                        onChange={(e) => setContrasenaA2(e.target.value)}
                        className="w-full rounded-xl border bg-white/10 px-5 py-3 pr-10 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                        style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                        required
                        minLength={8}
                      />
                      <button type="button" onClick={() => setShowA2((s) => !s)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                        {showA2 ? eyeOff : eye}
                      </button>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <select
                      aria-label="grado"
                      value={gradoA}
                      onChange={(e) => setGradoA(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                    >
                      <option value="" className="text-gray-900">Grado (1 a 6)</option>
                      {gradosBase.map((g) => (
                        <option key={g} value={g} className="text-gray-900">{g}</option>
                      ))}
                    </select>
                    <input
                      aria-label="seccion"
                      type="text"
                      placeholder="Sección (ej: A)"
                      value={seccionA}
                      onChange={(e) => setSeccionA(e.target.value.toUpperCase().slice(0, 1))}
                      className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                    />
                  </div>

                  <input
                    aria-label="codigo docente"
                    type="text"
                    placeholder="Código Docente / Colegio (opcional)"
                    value={docenteCode}
                    onChange={(e) => setDocenteCode(e.target.value)}
                    className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                    style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                  />

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
                    <div className="relative">
                      <input
                        aria-label="contrasena"
                        type={showD ? 'text' : 'password'}
                        placeholder="Contraseña (8+ caracteres)"
                        value={contrasenaD}
                        onChange={(e) => setContrasenaD(e.target.value)}
                        className="w-full rounded-xl border bg-white/10 px-5 py-3 pr-10 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                        style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                        required
                        minLength={8}
                      />
                      <button type="button" onClick={() => setShowD((s) => !s)}
                              className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                        {showD ? eyeOff : eye}
                      </button>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      aria-label="repetir-contrasena"
                      type={showD2 ? 'text' : 'password'}
                      placeholder="Repetir contraseña"
                      value={contrasenaD2}
                      onChange={(e) => setContrasenaD2(e.target.value)}
                      className="w-full rounded-xl border bg-white/10 px-5 py-3 pr-10 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
                      style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
                      required
                      minLength={8}
                    />
                    <button type="button" onClick={() => setShowD2((s) => !s)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/80 hover:text-white">
                      {showD2 ? eyeOff : eye}
                    </button>
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

                  <DocenteAsignaciones />

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

function DocenteAsignaciones() {
  const [gradoD, setGradoD] = useState('')
  const [seccionD, setSeccionD] = useState('')
  type Asignacion = { grado: string; seccion: string }
  const [asignaciones, setAsignaciones] = useState<Asignacion[]>([])

  const addAsignacion = () => {
    const sec = seccionD.toUpperCase().slice(0, 1)
    if (!gradoD || !sec) return
    const exists = asignaciones.some((a) => a.grado === gradoD && a.seccion === sec)
    if (exists) return
    setAsignaciones((prev) => [...prev, { grado: gradoD, seccion: sec }])
    setSeccionD('')
  }

  const removeAsignacion = (idx: number) => {
    setAsignaciones((prev) => prev.filter((_, i) => i !== idx))
  }

  return (
    <div className="space-y-3">
      <span className="text-sm opacity-90">Grados y secciones asignados</span>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <select
          aria-label="grado-docente"
          value={gradoD}
          onChange={(e) => setGradoD(e.target.value)}
          className="w-full rounded-xl border bg-white/10 px-4 py-3 text-white outline-none backdrop-blur focus:ring-2"
          style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
        >
          <option value="" className="text-gray-900">Grado (1 a 6)</option>
          {gradosBase.map((g) => (
            <option key={g} value={g} className="text-gray-900">{g}</option>
          ))}
        </select>

        <input
          aria-label="seccion-docente"
          type="text"
          placeholder="Sección (ej: A)"
          value={seccionD}
          onChange={(e) => setSeccionD(e.target.value.toUpperCase().slice(0, 1))}
          className="w-full rounded-xl border bg-white/10 px-5 py-3 text-white placeholder:text-white/70 outline-none backdrop-blur focus:ring-2"
          style={{ borderColor: 'var(--panel-border)', ['--tw-ring-color' as any]: 'rgb(var(--ring))' }}
        />

        <button
          type="button"
          onClick={addAsignacion}
          disabled={!gradoD || !seccionD}
          className={[
            'rounded-xl px-4 py-3 font-semibold transition-all',
            !gradoD || !seccionD
              ? 'bg-white/20 text-white/60 cursor-not-allowed'
              : 'bg-white text-gray-900 hover:bg-white/90'
          ].join(' ')}
        >
          Agregar
        </button>
      </div>

      <div className="rounded-xl border bg-white/10 p-3 backdrop-blur"
           style={{ borderColor: 'var(--panel-border)' }}>
        {asignaciones.length === 0 ? (
          <p className="text-sm opacity-80">Ninguno agregado aún.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {asignaciones.map((a, idx) => (
              <div key={`${a.grado}-${a.seccion}-${idx}`} className="flex items-center justify-between rounded-lg px-3 py-2 bg-white/80 text-gray-900">
                <span className="text-sm font-medium">Grado {a.grado} - {a.seccion}</span>
                <button
                  type="button"
                  aria-label="remove"
                  onClick={() => removeAsignacion(idx)}
                  className="ml-2 h-5 w-5 rounded-full bg-gray-900/10 hover:bg-gray-900/20 flex items-center justify-center"
                  title="Quitar"
                >
                  ×
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

/* Slider con altura adaptativa a slide actual */
function AdaptiveSlider({ mode, children }: { mode: 'login' | 'register'; children: React.ReactNode }) {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const innerRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number | undefined>(undefined)

  const measure = () => {
    const inner = innerRef.current
    if (!inner) return
    const selector = mode === 'login' ? '[data-slide=\"login\"]' : '[data-slide=\"register\"]'
    const slide = inner.querySelector(selector) as HTMLElement | null
    if (!slide) return
    setHeight(slide.offsetHeight)
  }

  useEffect(() => {
    const r = requestAnimationFrame(measure)
    const onResize = () => measure()
    window.addEventListener('resize', onResize)
    return () => {
      cancelAnimationFrame(r)
      window.removeEventListener('resize', onResize)
    }
  }, [mode])

  useEffect(() => {
    measure()
  }, [])

  return (
    <div className="mt-6 overflow-hidden relative" ref={containerRef} style={{ height: height ? `${height}px` : undefined }}>
      <div
        ref={innerRef}
        className="flex w-[200%] transition-transform duration-500 ease-out"
        style={{ transform: mode === 'login' ? 'translateX(0%)' : 'translateX(-50%)' }}
      >
        {children}
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