import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Logo } from './Logo'

const links = [
  { to: '/', label: 'HOME' },
  { to: '/about', label: 'ABOUT' },
  { to: '/services', label: 'SERVICES' },
  { to: '/contact', label: 'CONTACT' },
]

export function Nav({ transparent = false }) {
  const { pathname } = useLocation()
  const [menuOpen, setMenuOpen] = useState(false)

  const bg = transparent ? 'bg-transparent' : 'bg-[#f5f0e8] border-b border-border'

  return (
    <nav className={`sticky top-0 z-50 ${bg}`}>
      <div className="flex items-center justify-between px-6 py-6 md:px-12">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-9">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-oswald text-[17px] tracking-[0.08em] transition-colors hover:text-text-primary ${
                pathname === to ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col gap-1.5 p-2"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-opacity ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-text-primary transition-transform ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden border-t border-border bg-[#f5f0e8] px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`font-oswald text-[17px] tracking-[0.08em] ${
                pathname === to ? 'text-text-primary' : 'text-text-muted'
              }`}
            >
              {label}
            </Link>
          ))}
        </div>
      )}
    </nav>
  )
}
