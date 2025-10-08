import { useMemo, useState } from 'react'

type Mode = 'login' | 'alumno' | 'docente'

// Desplegable de grado: 1 a 6
const grados = ['1', '2', '3', '4', '5', '6']

export default function AuthForms() {
  const [mode, setMode] = useState<Mode>('login')

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center px-3">
      {/* Background gradient + shapes */}
      <BackgroundDecor />

      <div className="relative w-full max-w-5xl">
        <div className="mx-auto mb-6 w-full max-w-[880px]">
          <Tabs current={mode} onChange={setMode} />
        </div>

        <div className="glass-card relative mx-auto w-full max-w-[880px] overflow-hidden">
          {/* Animated Panels */}
          <Panel active={mode === 'login'}>
            <LoginForm />
          </Panel>
          <Panel active={mode === 'alumno'}>
            <AlumnoForm />
          </Panel>
          <Panel active={mode === 'docente'}>
            <DocenteForm />
          </Panel>
        </div>
      </div>
    </div>
  )
}

function Tabs({ current, onChange }: { current: Mode; onChange: (m: Mode) => void }) {
  const items: Array<{ key: Mode; label: string }> = useMemo(
    () => [
      { key: 'login', label: 'Iniciar sesión' },
      { key: 'alumno', label: 'Registro Alumno' },
      { key: 'docente', label: 'Registro Docente' }
    ],
    []
  )

  const idx = items.findIndex(i => i.key === current)

  return (
    <div className="relative rounded-2xl border border-white/20 bg-white/10 p-1 backdrop-blur-lg shadow-[0_0_1px_0_rgba(255,255,255,0.5)_inset]">
      <div
        className="absolute top-1 bottom-1 w-1/3 rounded-xl bg-white/80 shadow-lg transition-transform duration-300"
        style={{ transform: `translateX(${idx * 100}%)` }}
      />
      <div className="relative grid grid-cols-3 gap-1">
        {items.map((item) => {
          const active = current === item.key
          return (
            <button
              key={item.key}
              onClick={() => onChange(item.key)}
              className={[
                'rounded-xl px-5 py-3 text-sm font-semibold transition-colors',
                active ? 'text-gray-900' : 'text-white/85 hover:text-white'
              ].join(' ')}
            >
              {item.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  return (
    <FormShell
      title="Bienvenido a Mate AI"
      subtitle="Accede a tu cuenta para continuar"
    >
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Correo"
          type="email"
          placeholder="tucorreo@colegio.edu"
          value={email}
          onChange={setEmail}
        />
        <Input
          label="Contraseña"
          type="password"
          placeholder="••••••••"
          value={password}
          onChange={setPassword}
        />
      </div>
      <PrimaryButton onClick={() => { /* manejar login */ }}>
        Iniciar sesión
      </PrimaryButton>
    </FormShell>
  )
}

function AlumnoForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [grado, setGrado] = useState('')
  const [seccion, setSeccion] = useState('')
  const [docenteCode, setDocenteCode] = useState('')

  return (
    <FormShell
      title="Registro de Alumno"
      subtitle="Crea tu cuenta para empezar a aprender"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre completo"
          value={nombre}
          onChange={setNombre}
          placeholder="Nombre y apellidos"
        />
        <Input
          label="Correo"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="tucorreo@colegio.edu"
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Crea una contraseña segura"
        />
        <Select
          label="Grado"
          value={grado}
          onChange={setGrado}
          options={['', ...grados]}
          placeholder="Selecciona tu grado (1-6)"
        />
      </div>

      <Textarea
        label="Sección"
        value={seccion}
        onChange={setSeccion}
        placeholder='Ej: "A" o detalles de tu sección'
        rows={3}
      />

      <Input
        label="Código/Referencia Docente (opcional)"
        value={docenteCode}
        onChange={setDocenteCode}
        placeholder="Ej: ABCD123 o Nombre del colegio"
      />

      <PrimaryButton onClick={() => { /* manejar registro alumno */ }}>
        Crear cuenta de alumno
      </PrimaryButton>
    </FormShell>
  )
}

function DocenteForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [especialidad, setEspecialidad] = useState('')
  const [gradosAsignados, setGradosAsignados] = useState<string[]>([])
  const [secciones, setSecciones] = useState('')

  const toggleGrado = (g: string) => {
    setGradosAsignados((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
  }

  return (
    <FormShell
      title="Registro de Docente"
      subtitle="Organiza y guía a tus alumnos con IA"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Nombre completo"
          value={nombre}
          onChange={setNombre}
          placeholder="Nombre y apellidos"
        />
        <Input
          label="Correo"
          type="email"
          value={email}
          onChange={setEmail}
          placeholder="tucorreo@colegio.edu"
        />
        <Input
          label="Contraseña"
          type="password"
          value={password}
          onChange={setPassword}
          placeholder="Crea una contraseña segura"
        />
        <Input
          label="Especialidad"
          value={especialidad}
          onChange={setEspecialidad}
          placeholder='Ej: "Matemática"'
        />
      </div>

      <div className="space-y-2">
        <Label>Grados asignados (elige 1 a 6)</Label>
        <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
          <div className="grid grid-cols-3 md:grid-cols-6 gap-2">
            {grados.map((g) => {
              const active = gradosAsignados.includes(g)
              return (
                <button
                  type="button"
                  key={g}
                  onClick={() => toggleGrado(g)}
                  className={[
                    'rounded-lg px-3 py-2 text-sm font-semibold transition-all',
                    active
                      ? 'bg-white/85 text-gray-900 shadow'
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

      <Textarea
        label="Secciones (opcional)"
        value={secciones}
        onChange={setSecciones}
        placeholder='Ej: "A, B" o detalles de tus secciones'
        rows={3}
      />

      <PrimaryButton onClick={() => { /* manejar registro docente */ }}>
        Crear cuenta de docente
      </PrimaryButton>
    </FormShell>
  )
}

/* ---------- UI primitives ---------- */

function BackgroundDecor() {
  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden">
      <div className="pointer-events-none absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-indigo-400/40 via-sky-400/40 to-emerald-400/40 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-40 -right-40 h-[520px] w-[520px] rounded-full bg-gradient-to-br from-fuchsia-400/40 via-pink-400/40 to-orange-400/40 blur-3xl" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(255,255,255,0.06),transparent_60%)]" />
    </div>
  )
}

function Panel({ active, children }: { active: boolean; children: React.ReactNode }) {
  return (
    <div
      className={[
        'absolute inset-0 transition-all duration-500',
        active
          ? 'opacity-100 translate-y-0 pointer-events-auto relative'
          : 'opacity-0 -translate-y-3 pointer-events-none'
      ].join(' ')}
    >
      <div className="p-1 md:p-2">
        {children}
      </div>
    </div>
  )
}

function FormShell({
  title,
  subtitle,
  children
}: {
  title: string
  subtitle?: string
  children: React.ReactNode
}) {
  return (
    <div className="p-6 md:p-10">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-extrabold text-white drop-shadow-sm tracking-tight">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-white/80">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-5">
        {children}
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm md:text-[0.95rem] font-semibold text-white/90">{children}</label>
}

function Input({
  label,
  value,
  onChange,
  placeholder,
  type = 'text'
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  type?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/40"
      />
    </div>
  )
}

function Textarea({
  label,
  value,
  onChange,
  placeholder,
  rows = 4
}: {
  label: string
  value: string
  onChange: (v: string) => void
  placeholder?: string
  rows?: number
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full resize-y rounded-2xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/40"
      />
    </div>
  )
}

function Select({
  label,
  value,
  onChange,
  options,
  placeholder
}: {
  label: string
  value: string
  onChange: (v: string) => void
  options: string[]
  placeholder?: string
}) {
  return (
    <div className="space-y-1.5">
      <Label>{label}</Label>
      <div className="relative">
        <select
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="w-full appearance-none rounded-2xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-white outline-none backdrop-blur focus:ring-2 focus:ring-white/40"
        >
          {placeholder !== undefined && <option value="" className="text-gray-900">{placeholder}</option>}
          {options.filter(Boolean).map((opt) => (
            <option key={opt} value={opt} className="text-gray-900">
              {opt}
            </option>
          ))}
        </select>
        <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-white/70">▾</span>
      </div>
    </div>
  )
}

function PrimaryButton({
  children,
  onClick
}: {
  children: React.ReactNode
  onClick?: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="mt-2 w-full rounded-2xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all hover:from-indigo-400 hover:to-sky-400 hover:shadow-indigo-400/30 active:scale-[0.99]"
    >
      {children}
    </button>
  )
}

/* Global glass style hook (utility) */
declare module 'react' {
  // no-op to keep TS happy if needed
}