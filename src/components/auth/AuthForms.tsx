import { useMemo, useState } from 'react'
import { apiService } from '../../services/api'

type Mode = 'login' | 'alumno' | 'docente'

const gradosBase = [
  '1ro A', '1ro B', '2do A', '2do B',
  '3ro A', '3ro B', '4to A', '4to B', '5to A', '5to B'
]

export default function AuthForms() {
  const [mode, setMode] = useState<Mode>('login')

  return (
    <div className="relative min-h-[80vh] w-full flex items-center justify-center">
      {/* Background gradient + shapes */}
      <BackgroundDecor />

      <div className="relative w-full max-w-4xl">
        <div className="mx-auto mb-6 w-full max-w-[820px]">
          <Tabs current={mode} onChange={setMode} />
        </div>

        <div className="glass-card mx-auto w-full max-w-[820px]">
          {mode === 'login' && <LoginForm />}
          {mode === 'alumno' && <AlumnoForm />}
          {mode === 'docente' && <DocenteForm />}
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

  return (
    <div className="flex gap-2 rounded-2xl border border-white/20 bg-white/10 p-1 backdrop-blur-lg shadow-[0_0_1px_0_rgba(255,255,255,0.5)_inset]">
      {items.map((item) => {
        const active = current === item.key
        return (
          <button
            key={item.key}
            onClick={() => onChange(item.key)}
            className={[
              'flex-1 rounded-xl px-5 py-3 text-sm font-semibold transition-all',
              active
                ? 'bg-white/80 text-gray-900 shadow-lg'
                : 'text-white/80 hover:text-white hover:bg-white/20'
            ].join(' ')}
          >
            {item.label}
          </button>
        )
      })}
    </div>
  )
}

function LoginForm() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleLogin = async () => {
    setError('')
    setSuccess('')
    
    if (!email || !password) {
      setError('Por favor completa todos los campos')
      return
    }

    setLoading(true)
    try {
      const response = await apiService.login({
        correo: email,
        contrasena: password
      })
      
      setSuccess(`¡Bienvenido ${response.usuario.nombre}!`)
      
      // Redirigir o actualizar la UI después de 1.5 segundos
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Error al iniciar sesión')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormShell
      title="Bienvenido a Mate AI"
      subtitle="Accede a tu cuenta para continuar"
    >
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-200 text-sm">
          {success}
        </div>
      )}
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
      <PrimaryButton onClick={handleLogin} disabled={loading}>
        {loading ? 'Iniciando sesión...' : 'Iniciar sesión'}
      </PrimaryButton>
    </FormShell>
  )
}

function AlumnoForm() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [grado, setGrado] = useState('')
  const [docenteCode, setDocenteCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const handleRegistro = async () => {
    setError('')
    setSuccess('')
    
    if (!nombre || !email || !password) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      const response = await apiService.registro({
        nombre,
        correo: email,
        contrasena: password,
        rol: 'alumno',
        grado: grado || undefined
      })
      
      setSuccess(`¡Cuenta creada exitosamente! Bienvenido ${response.usuario.nombre}`)
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormShell
      title="Registro de Alumno"
      subtitle="Crea tu cuenta para empezar a aprender"
    >
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-200 text-sm">
          {success}
        </div>
      )}
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

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Grado/Sección"
          value={grado}
          onChange={setGrado}
          options={['', ...gradosBase]}
          placeholder="Selecciona tu grado"
        />
        <Input
          label="Código/Referencia Docente (opcional)"
          value={docenteCode}
          onChange={setDocenteCode}
          placeholder="Ej: ABCD123 o Nombre del colegio"
        />
      </div>

      <PrimaryButton onClick={handleRegistro} disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta de alumno'}
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
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState('')

  const toggleGrado = (g: string) => {
    setGradosAsignados((prev) =>
      prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]
    )
  }

  const handleRegistro = async () => {
    setError('')
    setSuccess('')
    
    if (!nombre || !email || !password) {
      setError('Por favor completa todos los campos obligatorios')
      return
    }

    if (password.length < 6) {
      setError('La contraseña debe tener al menos 6 caracteres')
      return
    }

    setLoading(true)
    try {
      const response = await apiService.registro({
        nombre,
        correo: email,
        contrasena: password,
        rol: 'docente',
        especialidad: especialidad || undefined,
        gradosAsignados: gradosAsignados.length > 0 ? gradosAsignados : undefined
      })
      
      setSuccess(`¡Cuenta creada exitosamente! Bienvenido ${response.usuario.nombre}`)
      
      // Redirigir después de 1.5 segundos
      setTimeout(() => {
        window.location.reload()
      }, 1500)
    } catch (err: any) {
      setError(err.message || 'Error al crear la cuenta')
    } finally {
      setLoading(false)
    }
  }

  return (
    <FormShell
      title="Registro de Docente"
      subtitle="Organiza y guía a tus alumnos con IA"
    >
      {error && (
        <div className="rounded-xl bg-red-500/10 border border-red-500/20 px-4 py-3 text-red-200 text-sm">
          {error}
        </div>
      )}
      {success && (
        <div className="rounded-xl bg-green-500/10 border border-green-500/20 px-4 py-3 text-green-200 text-sm">
          {success}
        </div>
      )}
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Input
          label="Especialidad"
          value={especialidad}
          onChange={setEspecialidad}
          placeholder='Ej: "Matemática"'
        />
        <div className="space-y-2">
          <Label>Grados asignados</Label>
          <div className="rounded-xl border border-white/20 bg-white/10 p-3 backdrop-blur">
            <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
              {gradosBase.map((g) => {
                const active = gradosAsignados.includes(g)
                return (
                  <button
                    type="button"
                    key={g}
                    onClick={() => toggleGrado(g)}
                    className={[
                      'rounded-lg px-3 py-2 text-sm font-medium transition-all',
                      active
                        ? 'bg-white/80 text-gray-900 shadow'
                        : 'bg-white/10 text-white/80 hover:bg-white/20'
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
      </div>

      <PrimaryButton onClick={handleRegistro} disabled={loading}>
        {loading ? 'Creando cuenta...' : 'Crear cuenta de docente'}
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
    <div className="p-6 md:p-8">
      <div className="mb-6 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white drop-shadow-sm">
          {title}
        </h2>
        {subtitle && (
          <p className="mt-1 text-white/80">
            {subtitle}
          </p>
        )}
      </div>

      <div className="space-y-4">
        {children}
      </div>
    </div>
  )
}

function Label({ children }: { children: React.ReactNode }) {
  return <label className="block text-sm font-medium text-white/90">{children}</label>
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
        className="w-full rounded-xl border border-white/20 bg-white/10 px-4 py-3 text-white placeholder:text-white/50 outline-none backdrop-blur focus:ring-2 focus:ring-white/40"
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
          className="w-full appearance-none rounded-xl border border-white/20 bg-white/10 px-4 py-3 pr-10 text-white outline-none backdrop-blur focus:ring-2 focus:ring-white/40"
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
  onClick,
  disabled
}: {
  children: React.ReactNode
  onClick?: () => void
  disabled?: boolean
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      className={[
        "mt-2 w-full rounded-xl bg-gradient-to-r from-indigo-500 to-sky-500 px-6 py-3 font-semibold text-white shadow-lg shadow-indigo-500/20 transition-all",
        disabled 
          ? "opacity-50 cursor-not-allowed" 
          : "hover:from-indigo-400 hover:to-sky-400 hover:shadow-indigo-400/30 active:scale-[0.99]"
      ].join(' ')}
    >
      {children}
    </button>
  )
}

/* Global glass style hook (utility) */
declare module 'react' {
  // no-op to keep TS happy if needed
}