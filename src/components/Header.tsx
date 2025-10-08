export default function Header() {
  const navItems = [
    { label: 'Home', href: '#home' },
    { label: 'Services', href: '#services' },
    { label: 'About us', href: '#about' },
    { label: 'Contact us', href: '#contact' },
  ]

  return (
    <header className="relative z-20">
      <div className="container mx-auto px-4 py-6 flex items-center justify-between">
        <div className="text-2xl font-extrabold tracking-wider">LOGO</div>

        <nav className="rounded-full border border-white/20 bg-white/10 backdrop-blur-lg p-1 shadow-[inset_0_0_0_1px_rgba(255,255,255,0.05)]">
          <ul className="flex items-center gap-1">
            {navItems.map((item, idx) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={[
                    'block rounded-full px-4 py-2 text-sm font-semibold transition-colors',
                    idx === 0
                      ? 'bg-white text-gray-900'
                      : 'text-white/90 hover:bg-white/20'
                  ].join(' ')}
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </header>
  )
}