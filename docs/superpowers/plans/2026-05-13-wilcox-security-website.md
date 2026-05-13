# Wilcox Security Website Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a 4-page React+Vite marketing website for Wilcox Security with cream/green branding, deployed as a static site.

**Architecture:** Single-page app using React Router for client-side navigation across Home, About, Services, and Contact pages. Shared Nav and Footer components wrap all routes. Framer Motion handles page transitions and scroll animations. Tailwind CSS with a custom theme handles all styling.

**Tech Stack:** React 18, Vite, React Router 6, Tailwind CSS 3, Framer Motion, Vitest + React Testing Library, Google Fonts (Oswald + Inter)

**Design Spec:** `docs/superpowers/specs/2026-05-13-wilcox-security-website-design.md`

---

## File Map

```
src/
├── main.jsx                 — React entry point, mounts App
├── App.jsx                  — BrowserRouter, AnimatePresence, route definitions, Nav+Footer layout
├── index.css                — Tailwind directives, Google Fonts import, base body styles
├── components/
│   ├── Logo.jsx             — SVG shield diamond mark + wordmark, accepts variant prop (light/dark)
│   ├── Nav.jsx              — Sticky nav, logo left, links right, hamburger on mobile, transparent variant for Home
│   └── Footer.jsx           — Simple footer with small logo, copyright, domain
├── pages/
│   ├── Home.jsx             — Full-viewport hero with background image, overlay, headline, CTAs
│   ├── About.jsx            — Bio, photo placeholder, trust signal boxes
│   ├── Services.jsx         — Three service cards with icons
│   └── Contact.jsx          — Contact form + sidebar info
└── assets/
    └── hero-bg.png          — Home office background photo (already in project root)

public/
└── favicon.svg              — Shield diamond mark only

tests/
├── setup.js                 — Testing library config
├── Nav.test.jsx             — Nav renders links, active state
├── Home.test.jsx            — Hero renders headline and CTAs
├── About.test.jsx           — About renders bio and trust boxes
├── Services.test.jsx        — Service cards render
└── Contact.test.jsx         — Form fields render, validation
```

---

### Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `vite.config.js`, `index.html`, `tailwind.config.js`, `postcss.config.js`, `src/main.jsx`, `src/App.jsx`, `src/index.css`

- [ ] **Step 1: Initialize Vite project**

```bash
cd /home/nyx/Projects/WilcoxSec
npm create vite@latest . -- --template react
```

Select "React" and "JavaScript" if prompted. If the directory isn't empty, allow overwrite.

- [ ] **Step 2: Install dependencies**

```bash
npm install react-router-dom framer-motion
npm install -D tailwindcss @tailwindcss/postcss postcss autoprefixer vitest @testing-library/react @testing-library/jest-dom jsdom
```

- [ ] **Step 3: Configure Tailwind**

Create `tailwind.config.js`:

```js
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: '#faf8f5',
        accent: '#22c55e',
        'highlight-bg': '#f0fdf4',
        'text-primary': '#1a1a1a',
        'text-body': '#475569',
        'text-muted': '#64748b',
        'text-faint': '#94a3b8',
        border: '#e8e4df',
        'border-button': '#cbd5e1',
      },
      fontFamily: {
        oswald: ['Oswald', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
```

Create `postcss.config.js`:

```js
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    autoprefixer: {},
  },
}
```

- [ ] **Step 4: Set up index.css with Tailwind directives and font imports**

Replace `src/index.css`:

```css
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600&family=Oswald:wght@300;400;600;700&display=swap');

@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  font-family: 'Inter', sans-serif;
  background-color: #faf8f5;
  color: #1a1a1a;
  margin: 0;
}
```

- [ ] **Step 5: Set up minimal App.jsx**

Replace `src/App.jsx`:

```jsx
export default function App() {
  return (
    <div className="min-h-screen bg-cream">
      <h1 className="font-oswald text-4xl text-text-primary p-8">Wilcox Security</h1>
    </div>
  )
}
```

- [ ] **Step 6: Set up main.jsx**

Replace `src/main.jsx`:

```jsx
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
```

- [ ] **Step 7: Update index.html**

Replace `index.html`:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="description" content="Wilcox Security — network security made simple for homes and small businesses in McLean, VA." />
    <title>Wilcox Security</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.jsx"></script>
  </body>
</html>
```

- [ ] **Step 8: Configure Vitest**

Add to `vite.config.js`:

```js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: './tests/setup.js',
  },
})
```

Create `tests/setup.js`:

```js
import '@testing-library/jest-dom'
```

- [ ] **Step 9: Verify dev server starts**

```bash
npm run dev
```

Expected: Vite dev server starts, browser shows "Wilcox Security" in Oswald font on cream background.

- [ ] **Step 10: Commit**

```bash
git add -A
git commit -m "Scaffold Vite + React project with Tailwind, Router, and Framer Motion"
```

---

### Task 2: Logo Component

**Files:**
- Create: `src/components/Logo.jsx`
- Create: `public/favicon.svg`

- [ ] **Step 1: Write the failing test**

Create `tests/Logo.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { Logo } from '../src/components/Logo'

describe('Logo', () => {
  it('renders the WILCOX text', () => {
    render(<Logo />)
    expect(screen.getByText('WILCOX')).toBeInTheDocument()
  })

  it('renders the SECURITY text', () => {
    render(<Logo />)
    expect(screen.getByText('SECURITY')).toBeInTheDocument()
  })

  it('renders the shield diamond SVG', () => {
    render(<Logo />)
    expect(document.querySelector('svg')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/Logo.test.jsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Logo component**

Create `src/components/Logo.jsx`:

```jsx
function ShieldDiamond({ size = 30, dark = true }) {
  const outer = dark ? '#1a1a1a' : '#ffffff'
  const inner = dark ? '#94a3b8' : '#64748b'

  return (
    <svg width={size} height={size} viewBox="0 0 30 30" fill="none">
      <rect
        x="15" y="1.5"
        width="19" height="19"
        rx="4"
        transform="rotate(45 15 1.5)"
        stroke={outer}
        strokeWidth="1.5"
        fill="none"
      />
      <rect
        x="15" y="6.5"
        width="12" height="12"
        rx="2"
        transform="rotate(45 15 6.5)"
        stroke={inner}
        strokeWidth="1"
        fill="none"
      />
      <circle cx="15" cy="15" r="2.5" fill="#22c55e" />
    </svg>
  )
}

export function Logo({ dark = true, size = 'default' }) {
  const textColor = dark ? 'text-text-primary' : 'text-gray-100'
  const mutedColor = dark ? 'text-text-muted' : 'text-gray-400'
  const svgSize = size === 'small' ? 20 : 30

  return (
    <div className="flex items-center gap-2.5">
      <ShieldDiamond size={svgSize} dark={dark} />
      <div className="flex items-center gap-2">
        <span className={`font-oswald text-[20px] font-bold tracking-[0.06em] ${textColor}`}>
          WILCOX
        </span>
        <span className={`font-oswald text-[12px] font-light tracking-[0.2em] ${mutedColor}`}>
          SECURITY
        </span>
      </div>
    </div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/Logo.test.jsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Create favicon SVG**

Create `public/favicon.svg`:

```svg
<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32" fill="none">
  <rect x="16" y="1.5" width="20.5" height="20.5" rx="4" transform="rotate(45 16 1.5)" stroke="#1a1a1a" stroke-width="1.5" fill="none"/>
  <rect x="16" y="7" width="12.7" height="12.7" rx="2" transform="rotate(45 16 7)" stroke="#94a3b8" stroke-width="1" fill="none"/>
  <circle cx="16" cy="16" r="3" fill="#22c55e"/>
</svg>
```

- [ ] **Step 6: Commit**

```bash
git add src/components/Logo.jsx public/favicon.svg tests/Logo.test.jsx
git commit -m "Add Logo component with shield diamond SVG and favicon"
```

---

### Task 3: Nav Component

**Files:**
- Create: `src/components/Nav.jsx`
- Create: `tests/Nav.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/Nav.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Nav } from '../src/components/Nav'

function renderNav(route = '/') {
  return render(
    <MemoryRouter initialEntries={[route]}>
      <Nav />
    </MemoryRouter>
  )
}

describe('Nav', () => {
  it('renders all navigation links', () => {
    renderNav()
    expect(screen.getByRole('link', { name: /home/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /about/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /services/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /contact/i })).toBeInTheDocument()
  })

  it('renders the logo', () => {
    renderNav()
    expect(screen.getByText('WILCOX')).toBeInTheDocument()
  })

  it('highlights the active link', () => {
    renderNav('/about')
    const aboutLink = screen.getByRole('link', { name: /about/i })
    expect(aboutLink).toHaveClass('text-text-primary')
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/Nav.test.jsx
```

Expected: FAIL — module not found.

- [ ] **Step 3: Implement Nav component**

Create `src/components/Nav.jsx`:

```jsx
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

  const bg = transparent ? 'bg-transparent' : 'bg-cream border-b border-border'

  return (
    <nav className={`sticky top-0 z-50 ${bg}`}>
      <div className="flex items-center justify-between px-6 py-5 md:px-12">
        <Link to="/">
          <Logo />
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex gap-9">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              className={`font-oswald text-[15px] tracking-[0.08em] transition-colors hover:text-text-primary ${
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
        <div className="md:hidden border-t border-border bg-cream px-6 py-4 flex flex-col gap-4">
          {links.map(({ to, label }) => (
            <Link
              key={to}
              to={to}
              onClick={() => setMenuOpen(false)}
              className={`font-oswald text-[15px] tracking-[0.08em] ${
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
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/Nav.test.jsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/components/Nav.jsx tests/Nav.test.jsx
git commit -m "Add Nav component with responsive hamburger menu"
```

---

### Task 4: Footer Component

**Files:**
- Create: `src/components/Footer.jsx`

- [ ] **Step 1: Implement Footer**

Create `src/components/Footer.jsx`:

```jsx
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
```

- [ ] **Step 2: Commit**

```bash
git add src/components/Footer.jsx
git commit -m "Add Footer component"
```

---

### Task 5: App Shell with Routing

**Files:**
- Modify: `src/App.jsx`
- Create: `src/pages/Home.jsx`, `src/pages/About.jsx`, `src/pages/Services.jsx`, `src/pages/Contact.jsx` (stubs)

- [ ] **Step 1: Create stub pages**

Create `src/pages/Home.jsx`:

```jsx
export function Home() {
  return <div>Home</div>
}
```

Create `src/pages/About.jsx`:

```jsx
export function About() {
  return <div>About</div>
}
```

Create `src/pages/Services.jsx`:

```jsx
export function Services() {
  return <div>Services</div>
}
```

Create `src/pages/Contact.jsx`:

```jsx
export function Contact() {
  return <div>Contact</div>
}
```

- [ ] **Step 2: Wire up App.jsx with routing and layout**

Replace `src/App.jsx`:

```jsx
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { Nav } from './components/Nav'
import { Footer } from './components/Footer'
import { Home } from './pages/Home'
import { About } from './pages/About'
import { Services } from './pages/Services'
import { Contact } from './pages/Contact'

function AnimatedRoutes() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  return (
    <>
      <Nav transparent={isHome} />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </AnimatePresence>
      {!isHome && <Footer />}
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-cream">
        <AnimatedRoutes />
      </div>
    </BrowserRouter>
  )
}
```

- [ ] **Step 3: Verify in browser**

```bash
npm run dev
```

Expected: Nav shows on all pages with working links. Footer shows on all pages except Home. Navigating between routes works.

- [ ] **Step 4: Commit**

```bash
git add src/App.jsx src/pages/
git commit -m "Wire up React Router with Nav, Footer, and stub pages"
```

---

### Task 6: Home Page

**Files:**
- Modify: `src/pages/Home.jsx`
- Create: `src/assets/hero-bg.png` (copy from project root)
- Create: `tests/Home.test.jsx`

- [ ] **Step 1: Copy the background image into assets**

```bash
cp /home/nyx/Projects/WilcoxSec/Gemini_Generated_Image_d4ennvd4ennvd4en.png /home/nyx/Projects/WilcoxSec/src/assets/hero-bg.png
```

- [ ] **Step 2: Write the failing test**

Create `tests/Home.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Home } from '../src/pages/Home'

describe('Home', () => {
  it('renders the headline', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByText(/network security/i)).toBeInTheDocument()
    expect(screen.getByText(/made simple/i)).toBeInTheDocument()
  })

  it('renders both CTA buttons', () => {
    render(<MemoryRouter><Home /></MemoryRouter>)
    expect(screen.getByRole('link', { name: /get protected/i })).toBeInTheDocument()
    expect(screen.getByRole('link', { name: /our services/i })).toBeInTheDocument()
  })
})
```

- [ ] **Step 3: Run test to verify it fails**

```bash
npx vitest run tests/Home.test.jsx
```

Expected: FAIL.

- [ ] **Step 4: Implement Home page**

Replace `src/pages/Home.jsx`:

```jsx
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import heroBg from '../assets/hero-bg.png'

export function Home() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="relative h-screen -mt-[73px] flex items-center overflow-hidden"
    >
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${heroBg})` }}
      />

      {/* Cream gradient overlay */}
      <div
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(90deg, rgba(250,248,245,0.96) 0%, rgba(250,248,245,0.88) 38%, rgba(250,248,245,0.45) 65%, rgba(250,248,245,0.15) 100%)',
        }}
      />

      {/* Hero content */}
      <div className="relative z-10 px-6 md:px-12 pt-[73px] max-w-3xl">
        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="font-oswald text-[40px] md:text-[68px] font-bold leading-[1.05] tracking-[0.02em] text-text-primary mb-5"
        >
          NETWORK SECURITY<br />MADE SIMPLE.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.35, duration: 0.5 }}
          className="text-text-body text-[17px] max-w-[480px] leading-relaxed mb-9"
        >
          Professional security for your home network and small business — so you can focus on what matters.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="flex gap-4"
        >
          <Link
            to="/contact"
            className="px-8 py-3.5 bg-accent text-white font-oswald text-[16px] font-semibold tracking-[0.1em] rounded-md hover:bg-green-600 transition-colors"
          >
            GET PROTECTED
          </Link>
          <Link
            to="/services"
            className="px-8 py-3.5 border-[1.5px] border-border-button text-text-body font-oswald text-[16px] tracking-[0.1em] rounded-md hover:border-text-muted transition-colors"
          >
            OUR SERVICES
          </Link>
        </motion.div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 5: Run test to verify it passes**

```bash
npx vitest run tests/Home.test.jsx
```

Expected: 2 tests PASS.

- [ ] **Step 6: Verify in browser**

```bash
npm run dev
```

Expected: Full-viewport hero with background image bleeding through on the right, headline, subtitle, two CTA buttons. Nav overlays the hero with transparent background.

- [ ] **Step 7: Commit**

```bash
git add src/pages/Home.jsx src/assets/hero-bg.png tests/Home.test.jsx
git commit -m "Implement Home page with full-viewport hero and background image"
```

---

### Task 7: About Page

**Files:**
- Modify: `src/pages/About.jsx`
- Create: `tests/About.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/About.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { About } from '../src/pages/About'

describe('About', () => {
  it('renders the page title', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('ABOUT')).toBeInTheDocument()
  })

  it('renders the section heading', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText(/security engineer/i)).toBeInTheDocument()
  })

  it('renders all three trust signal boxes', () => {
    render(<MemoryRouter><About /></MemoryRouter>)
    expect(screen.getByText('3+')).toBeInTheDocument()
    expect(screen.getByText('100%')).toBeInTheDocument()
    expect(screen.getByText('Local')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/About.test.jsx
```

Expected: FAIL.

- [ ] **Step 3: Implement About page**

Replace `src/pages/About.jsx`:

```jsx
import { motion } from 'framer-motion'

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.5 },
}

const trustSignals = [
  { value: '3+', label: 'Services Offered' },
  { value: '100%', label: 'Hands-On Approach' },
  { value: 'Local', label: 'Community Focused' },
]

export function About() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        ABOUT
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-10" />

      <div className="flex flex-col md:flex-row gap-12">
        {/* Bio */}
        <div className="flex-1">
          <h2 className="font-oswald text-[27px] font-semibold text-text-primary mb-4">
            Security Engineer.<br />Problem Solver.
          </h2>
          <p className="text-text-body text-[18px] leading-[1.7] mb-4">
            I'm Alex Wilcox — a security engineer focused on making network and device security
            accessible to everyone, not just enterprise IT teams.
          </p>
          <p className="text-text-body text-[18px] leading-[1.7] mb-8">
            Whether it's your home network or your first office setup, I bring the same rigor
            and attention to detail that protects large organizations — scaled to fit your needs
            and budget.
          </p>

          {/* Trust signals */}
          <div className="flex flex-wrap gap-5">
            {trustSignals.map(({ value, label }) => (
              <motion.div
                key={label}
                {...fadeUp}
                className="text-center px-5 py-4 bg-highlight-bg rounded-lg"
              >
                <div className="font-oswald text-[27px] font-bold text-accent">{value}</div>
                <div className="text-sm text-text-body mt-1">{label}</div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Photo placeholder */}
        <div className="md:w-[280px] flex items-center justify-center">
          <div className="w-full h-[340px] bg-[#f0ede8] rounded-xl flex items-center justify-center">
            <span className="font-oswald text-[16px] tracking-[0.1em] text-text-faint text-center">
              YOUR PHOTO
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/About.test.jsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/About.jsx tests/About.test.jsx
git commit -m "Implement About page with bio and trust signals"
```

---

### Task 8: Services Page

**Files:**
- Modify: `src/pages/Services.jsx`
- Create: `tests/Services.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/Services.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Services } from '../src/pages/Services'

describe('Services', () => {
  it('renders the page title', () => {
    render(<MemoryRouter><Services /></MemoryRouter>)
    expect(screen.getByText('SERVICES')).toBeInTheDocument()
  })

  it('renders all three service cards', () => {
    render(<MemoryRouter><Services /></MemoryRouter>)
    expect(screen.getByText('Network Hardening')).toBeInTheDocument()
    expect(screen.getByText('Device Hardening')).toBeInTheDocument()
    expect(screen.getByText('Security Assessments')).toBeInTheDocument()
  })

  it('renders descriptions for each service', () => {
    render(<MemoryRouter><Services /></MemoryRouter>)
    expect(screen.getByText(/secure your router/i)).toBeInTheDocument()
    expect(screen.getByText(/patch, configure/i)).toBeInTheDocument()
    expect(screen.getByText(/full evaluation/i)).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/Services.test.jsx
```

Expected: FAIL.

- [ ] **Step 3: Implement Services page**

Replace `src/pages/Services.jsx`:

```jsx
import { motion } from 'framer-motion'

const services = [
  {
    title: 'Network Hardening',
    description: 'Secure your router, set up firewalls, segment your network, and lock down access points.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <circle cx="11" cy="11" r="9" stroke="#22c55e" strokeWidth="2" />
        <circle cx="11" cy="11" r="3.5" fill="#22c55e" />
      </svg>
    ),
  },
  {
    title: 'Device Hardening',
    description: 'Patch, configure, and lock down every device on your network — laptops, phones, smart home, and more.',
    icon: (
      <svg width="18" height="22" viewBox="0 0 18 22" fill="none">
        <rect x="1" y="1" width="16" height="20" rx="3" stroke="#22c55e" strokeWidth="2" />
        <line x1="5" y1="6" x2="13" y2="6" stroke="#22c55e" strokeWidth="1.5" />
        <line x1="5" y1="10" x2="11" y2="10" stroke="#22c55e" strokeWidth="1.5" opacity="0.5" />
      </svg>
    ),
  },
  {
    title: 'Security Assessments',
    description: 'A full evaluation of your current setup — what\'s working, what\'s vulnerable, and what to fix first.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none">
        <rect x="11" y="1" width="14" height="14" rx="3" transform="rotate(45 11 1)" stroke="#22c55e" strokeWidth="2" />
      </svg>
    ),
  },
]

export function Services() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        SERVICES
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-3" />
      <p className="text-text-body text-[18px] mb-10">
        Security solutions tailored to your needs — no jargon, no complexity.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        {services.map(({ title, description, icon }, i) => (
          <motion.div
            key={title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            className="bg-white border border-border rounded-xl p-7 hover:shadow-md hover:-translate-y-1 transition-all"
          >
            <div className="w-11 h-11 bg-highlight-bg rounded-lg flex items-center justify-center mb-4">
              {icon}
            </div>
            <h3 className="font-oswald text-[21px] font-semibold text-text-primary mb-2">
              {title}
            </h3>
            <p className="text-text-muted text-[16px] leading-relaxed mb-4">
              {description}
            </p>
            <span className="font-oswald text-[15px] text-accent tracking-[0.08em] cursor-pointer hover:underline">
              LEARN MORE →
            </span>
          </motion.div>
        ))}
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/Services.test.jsx
```

Expected: 3 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Services.jsx tests/Services.test.jsx
git commit -m "Implement Services page with three service cards"
```

---

### Task 9: Contact Page

**Files:**
- Modify: `src/pages/Contact.jsx`
- Create: `tests/Contact.test.jsx`

- [ ] **Step 1: Write the failing test**

Create `tests/Contact.test.jsx`:

```jsx
import { render, screen } from '@testing-library/react'
import { MemoryRouter } from 'react-router-dom'
import { Contact } from '../src/pages/Contact'

describe('Contact', () => {
  it('renders the page title', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByText('CONTACT')).toBeInTheDocument()
  })

  it('renders all form fields', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByPlaceholderText(/your name/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/you@email.com/i)).toBeInTheDocument()
    expect(screen.getByPlaceholderText(/tell me about/i)).toBeInTheDocument()
  })

  it('renders the send button', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByRole('button', { name: /send message/i })).toBeInTheDocument()
  })

  it('renders contact info sidebar', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByText('alexjwilcox@proton.me')).toBeInTheDocument()
    expect(screen.getByText('McLean, VA')).toBeInTheDocument()
    expect(screen.getByText('Within 24 hours')).toBeInTheDocument()
  })

  it('renders the free consultation callout', () => {
    render(<MemoryRouter><Contact /></MemoryRouter>)
    expect(screen.getByText('Free Consultation')).toBeInTheDocument()
  })
})
```

- [ ] **Step 2: Run test to verify it fails**

```bash
npx vitest run tests/Contact.test.jsx
```

Expected: FAIL.

- [ ] **Step 3: Implement Contact page**

Replace `src/pages/Contact.jsx`:

```jsx
import { useState } from 'react'
import { motion } from 'framer-motion'

const serviceOptions = [
  'Select a service...',
  'Network Hardening',
  'Device Hardening',
  'Security Assessment',
  'Not sure yet',
]

const contactInfo = [
  { label: 'EMAIL', value: 'alexjwilcox@proton.me' },
  { label: 'LOCATION', value: 'McLean, VA' },
  { label: 'RESPONSE TIME', value: 'Within 24 hours' },
]

export function Contact() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    service: '',
    message: '',
  })

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.28 }}
      className="px-6 py-16 md:px-12 md:py-20"
    >
      <h1 className="font-oswald text-[45px] font-bold tracking-[0.02em] text-text-primary mb-2">
        CONTACT
      </h1>
      <div className="w-12 h-[3px] bg-accent rounded-sm mb-3" />
      <p className="text-text-body text-[18px] mb-10">
        Have a question or ready to get started? Reach out — I'd love to hear from you.
      </p>

      <div className="flex flex-col md:flex-row gap-12">
        {/* Form */}
        <form onSubmit={handleSubmit} className="flex-1">
          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              NAME
            </label>
            <input
              name="name"
              value={form.name}
              onChange={handleChange}
              placeholder="Your name"
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              EMAIL
            </label>
            <input
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@email.com"
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors"
            />
          </div>

          <div className="mb-5">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              SERVICE INTERESTED IN
            </label>
            <select
              name="service"
              value={form.service}
              onChange={handleChange}
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-muted font-inter outline-none focus:border-accent transition-colors appearance-none"
            >
              {serviceOptions.map((opt) => (
                <option key={opt} value={opt === serviceOptions[0] ? '' : opt}>
                  {opt}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-6">
            <label className="block font-oswald text-[14px] tracking-[0.06em] text-text-primary mb-1.5">
              MESSAGE
            </label>
            <textarea
              name="message"
              value={form.message}
              onChange={handleChange}
              placeholder="Tell me about your setup or what you need help with..."
              rows={4}
              className="w-full px-4 py-3.5 bg-white border border-border rounded-lg text-[16px] text-text-primary font-inter outline-none focus:border-accent transition-colors resize-none"
            />
          </div>

          <button
            type="submit"
            className="px-9 py-3.5 bg-accent text-white font-oswald text-[16px] font-semibold tracking-[0.1em] rounded-md hover:bg-green-600 transition-colors"
          >
            SEND MESSAGE
          </button>
        </form>

        {/* Sidebar */}
        <div className="md:w-[280px]">
          {contactInfo.map(({ label, value }) => (
            <div key={label} className="mb-8">
              <div className="font-oswald text-[15px] tracking-[0.08em] text-accent mb-2">
                {label}
              </div>
              <p className="text-text-primary text-[17px]">{value}</p>
            </div>
          ))}

          <div className="bg-highlight-bg rounded-xl p-5">
            <div className="font-oswald text-[16px] font-semibold text-text-primary mb-1.5">
              Free Consultation
            </div>
            <p className="text-text-body text-[15px] leading-relaxed">
              Not sure what you need? Let's talk — no commitment, no pressure.
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
```

- [ ] **Step 4: Run test to verify it passes**

```bash
npx vitest run tests/Contact.test.jsx
```

Expected: 5 tests PASS.

- [ ] **Step 5: Commit**

```bash
git add src/pages/Contact.jsx tests/Contact.test.jsx
git commit -m "Implement Contact page with form and sidebar info"
```

---

### Task 10: Run Full Test Suite and Verify in Browser

**Files:** None (verification only)

- [ ] **Step 1: Run all tests**

```bash
npx vitest run
```

Expected: All tests pass (Logo 3, Nav 3, Home 2, About 3, Services 3, Contact 5 = 19 total).

- [ ] **Step 2: Full browser walkthrough**

```bash
npm run dev
```

Verify each page in the browser:
- **Home:** Full-viewport hero, background image, gradient overlay, headline, subtitle, two CTAs
- **About:** Title with green bar, bio text, trust signals, photo placeholder
- **Services:** Title with green bar, three cards with icons, hover effects
- **Contact:** Form with all fields, sidebar info with correct email/location, free consultation box
- **Nav:** Sticky on all pages, transparent on Home, hamburger on mobile (resize browser)
- **Footer:** Shows on About, Services, Contact — not on Home
- **Routing:** All links work, page transitions animate

- [ ] **Step 3: Test responsive at mobile width**

Resize browser to ~375px width. Verify:
- Nav collapses to hamburger
- Service cards stack vertically
- Contact form stacks above sidebar
- About photo stacks above/below bio
- Hero headline scales down

- [ ] **Step 4: Commit any fixes**

If any fixes were needed during verification, commit them:

```bash
git add -A
git commit -m "Fix issues found during browser verification"
```

---

### Task 11: Add .gitignore and Clean Up

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Create .gitignore**

Create `.gitignore`:

```
node_modules/
dist/
.superpowers/
*.local
.env
```

- [ ] **Step 2: Remove generated images from repo root**

```bash
rm /home/nyx/Projects/WilcoxSec/Gemini_Generated_Image_*.png
```

The image is already copied into `src/assets/hero-bg.png`.

- [ ] **Step 3: Commit**

```bash
git add .gitignore
git commit -m "Add .gitignore and clean up generated files"
```
