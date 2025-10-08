import type { NavKey } from '../App'

type Props = {
  active: NavKey
  onChange: (key: NavKey) => void
}

export default function Header({ active, onChange }: Props) {
  const navItems: { key: NavKey; label: string }[] = [
    { key: 'home', label: 'Home' },
    { key: 'services', label: 'Services' },
    { key: 'about', label: 'About us' },
    { key: 'contact', label: 'Contact us' },
  ]

  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-wider">LOGO</div>

        <nav className="rounded-full border border-white/20 bg-white/10 backdrop-blur-lg p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <ul className="flex items-center gap-1">
            {navItems.map((item) => {
              const isActive = item.key === active
              return (
                <li key={item.key}>
                  <button
                    type="button"
                    onClick={() => onChange(item.key)}
                    className={[
                      'block rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                      isActive
                        ? 'bg-white text-gray-900'
                        : 'text-white/90 hover:bg-white/20'
                    ].join(' ')}
                  >
                    {item.label}
                  </button>
                </li>
              )
            })}
          </ul>
        </nav>
      </div>
    </header>
  )
}