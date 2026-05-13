import { Logo } from './Logo'

export function Footer() {
  return (
    <footer className="border-t border-border px-6 py-6 md:px-12 flex justify-between items-center">
      <div className="flex items-center gap-2">
        <Logo size="small" />
        <span className="text-sm text-text-muted ml-2">&copy; 2026 Wilcox Security</span>
      </div>
      <span className="text-sm text-text-faint">wilcoxsecurity.com</span>
    </footer>
  )
}
