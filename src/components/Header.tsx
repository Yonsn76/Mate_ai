import type { NavKey, ThemeName } from '../App'

type Props = {
  active: NavKey
  onChange: (key: NavKey) => void
  theme: ThemeName
  setTheme: (t: ThemeName) => void
}

export default function Header({ active, onChange, theme, setTheme }: Props) {
  const navItems: { key: NavKey; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'about', label: 'About us' },
    { key: 'contact', label: 'Contact us' },
  ]

  const themes: ThemeName[] = ['light','dark','pink','green','red','sky']

  return (
    <header className="sticky top-0 z-40 border-b border-[color:var(--panel-border)]/50 bg-[color:var(--bg)]/60 backdrop-blur">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo simple: cuadro con gradiente */}
        <div className="flex items-center gap-3">
          <div
            aria-hidden
            className="h-7 w-7 rounded-md"
            style={{ background: `linear-gradient(135deg, rgb(var(--grad-a)), rgb(var(--grad-b)))` }}
          />
          <div className="text-lg font-extrabold tracking-wide">Mate_AI</div>
        </div>

        <div className="flex items-center gap-4">
          {/* Navbar pills */}
          <nav className="hidden sm:block">
            <ul className="flex items-center gap-1 p-1 rounded-full border backdrop-blur-md"
                style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
              {navItems.map((item) => {
                const isActive = item.key === active
                return (
                  <li key={item.key}>
                    <button
                      type="button"
                      onClick={() => onChange(item.key)}
                      className={[
                        'px-4 py-2 text-sm font-semibold rounded-full transition-all',
                        isActive
                          ? 'bg-white text-gray-900 shadow-sm'
                          : 'hover:bg-white/20'
                      ].join(' ')}
                    >
                      {item.label}
                    </button>
                  </li>
                )
              })}
            </ul>
          </nav>

          {/* Theme selector */}
          <div className="flex items-center gap-2 rounded-full border px-2 py-1"
               style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
            {themes.map((t) => (
              <button
                key={t}
                aria-label={`theme-${t}`}
                onClick={() => setTheme(t)}
                className={[
                  'h-7 w-7 rounded-full border transition-transform active:scale-95',
                  theme === t ? 'ring-2' : ''
                ].join(' ')}
                style={{
                  background:
                    t === 'light' ? '#f6f7fb' :
                    t === 'dark' ? '#0b0d12' :
                    t === 'pink' ? 'linear-gradient(135deg,#ec4899,#f43f5e)' :
                    t === 'green' ? 'linear-gradient(135deg,#22c55e,#06b6d4)' :
                    t === 'red' ? 'linear-gradient(135deg,#f43f5e,#fb923c)' :
                    'linear-gradient(135deg,#0ea5e9,#6366f1)',
                  borderColor: 'var(--panel-border)',
                  // Tailwind ring color via CSS var
                  // @ts-ignore
                  '--tw-ring-color': 'rgb(var(--ring))',
                } as React.CSSProperties}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Mobile navbar */}
      <div className="sm:hidden px-4 pb-3">
        <ul className="flex items-center justify-between gap-2 p-1 rounded-full border"
            style={{ backgroundColor: 'var(--panel)', borderColor: 'var(--panel-border)' }}>
          {navItems.map((item) => {
            const isActive = item.key === active
            return (
              <li key={item.key} className="flex-1">
                <button
                  type="button"
                  onClick={() => onChange(item.key)}
                  className={[
                    'w-full px-3 py-2 text-xs font-semibold rounded-full transition-all',
                    isActive
                      ? 'bg-white text-gray-900 shadow-sm'
                      : 'hover:bg-white/20'
                  ].join(' ')}
                >
                  {item.label}
                </button>
              </li>
            )
          })}
        </ul>
      </div>
    </header>
  )
}