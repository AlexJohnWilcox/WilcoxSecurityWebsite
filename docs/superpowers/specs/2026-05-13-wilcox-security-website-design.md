# Wilcox Security — Marketing Website Design Spec

## Overview

Frontend-only marketing website for Wilcox Security, a cybersecurity business offering network and device hardening services to homes and small non-tech businesses in the McLean, VA area. The site serves as a professional web presence for resume credibility and future client acquisition.

**Domain:** wilcoxsecurity.com
**Deployment:** Netlify (static build)

## Tech Stack

- **React 18** + **Vite** — SPA with fast builds
- **React Router** — client-side routing (4 pages)
- **Tailwind CSS** — utility-first styling
- **Framer Motion** — page transitions and scroll-triggered animations
- **Google Fonts** — Oswald (headings/logo), Inter (body text)

No backend. Contact form is frontend-only for now (can add EmailJS or Netlify Forms later).

## Branding

### Logo

Shield diamond mark: outer diamond (rotated square, rounded corners), slate grey inner diamond, green center dot. Paired with "WILCOX" in Oswald bold and "SECURITY" in Oswald light with wide letter-spacing.

Two color variants:
- **On cream (site):** outer diamond #1a1a1a, inner #94a3b8, dot #22c55e, text dark
- **On dark (favicon/alt):** outer diamond #ffffff, inner #64748b, dot #22c55e, text light

The logo mark works standalone as a favicon.

### Color Palette

| Token          | Value     | Usage                              |
|----------------|-----------|-------------------------------------|
| bg-primary     | #faf8f5   | Page background (cream)             |
| text-primary   | #1a1a1a   | Headings, nav active state          |
| text-body      | #475569   | Body text                           |
| text-muted     | #64748b   | Secondary text, nav links           |
| text-faint     | #94a3b8   | Tertiary text, footer               |
| accent         | #22c55e   | CTAs, labels, icons, green accent   |
| surface        | #ffffff   | Cards, form inputs                  |
| border         | #e8e4df   | Borders, dividers                   |
| highlight-bg   | #f0fdf4   | Green tinted backgrounds (trust boxes, icon containers) |
| border-button  | #cbd5e1   | Secondary button borders            |

### Typography

| Element        | Font    | Size  | Weight | Tracking     |
|----------------|---------|-------|--------|--------------|
| Page title     | Oswald  | 45px  | 700    | 0.02em       |
| Hero headline  | Oswald  | 68px  | 700    | 0.02em       |
| Section heading| Oswald  | 27px  | 600    | —            |
| Card heading   | Oswald  | 21px  | 600    | —            |
| Nav links      | Oswald  | 15px  | 400    | 0.08em       |
| Nav logo       | Oswald  | 20px  | 700    | 0.06em       |
| Body text      | Inter   | 18px  | 400    | —            |
| Card body      | Inter   | 16px  | 400    | —            |
| CTA buttons    | Oswald  | 16px  | 600    | 0.1em        |
| Form labels    | Oswald  | 14px  | 400    | 0.06em       |
| Form inputs    | Inter   | 16px  | 400    | —            |

## Project Structure

```
wilcoxsecurity/
├── index.html
├── package.json
├── vite.config.js
├── tailwind.config.js
├── public/
│   └── favicon.svg
├── src/
│   ├── main.jsx
│   ├── App.jsx
│   ├── components/
│   │   ├── Nav.jsx
│   │   ├── Footer.jsx
│   │   └── Logo.jsx
│   ├── pages/
│   │   ├── Home.jsx
│   │   ├── About.jsx
│   │   ├── Services.jsx
│   │   └── Contact.jsx
│   ├── assets/
│   │   ├── logo.svg
│   │   └── hero-bg.png
│   └── index.css
```

## Pages

### Home (/)

Full-viewport hero section:

- **Background:** Home office photograph (dual monitors, router, warm lighting) covering the full viewport
- **Overlay:** Left-to-right cream gradient — opaque on the left (96% opacity) fading to transparent on the right (15% opacity) so the image bleeds through
- **Nav:** Sticky top bar. Logo left (shield diamond + "WILCOX SECURITY"). Links right: HOME, ABOUT, SERVICES, CONTACT
- **Content (left-aligned):**
  - Headline: "NETWORK SECURITY MADE SIMPLE." (Oswald 68px bold)
  - Subtitle: "Professional security for your home network and small business — so you can focus on what matters." (Inter 17px, muted)
  - Two buttons: "GET PROTECTED" (green filled) and "OUR SERVICES" (ghost/outline)
- Hero fills 100vh. No scroll content on the home page.

### About (/about)

- Page title: "ABOUT" with green underline bar
- Two-column layout:
  - **Left:** Heading "Security Engineer. Problem Solver." followed by two paragraphs of bio text. Below that, three trust signal boxes on a green-tinted background: "3+ Services Offered", "100% Hands-On Approach", "Local Community Focused"
  - **Right:** Photo placeholder (or graphic element) — 280px wide, rounded corners

### Services (/services)

- Page title: "SERVICES" with green underline bar
- Subtitle: "Security solutions tailored to your needs — no jargon, no complexity."
- Three white cards in a row, each with:
  - Green icon in a light green container
  - Card heading (Oswald 21px)
  - Description (Inter 16px, muted)
  - "LEARN MORE →" link in green (scrolls to expanded description below the cards, or opens a simple detail modal — keep it lightweight)

**Cards:**

1. **Network Hardening** — "Secure your router, set up firewalls, segment your network, and lock down access points."
2. **Device Hardening** — "Patch, configure, and lock down every device on your network — laptops, phones, smart home, and more."
3. **Security Assessments** — "A full evaluation of your current setup — what's working, what's vulnerable, and what to fix first."

### Contact (/contact)

- Page title: "CONTACT" with green underline bar
- Subtitle: "Have a question or ready to get started? Reach out — I'd love to hear from you."
- Two-column layout:
  - **Left:** Form with fields: Name, Email, Service Interested In (dropdown: Network Hardening, Device Hardening, Security Assessment, Not sure yet), Message (textarea). Green "SEND MESSAGE" button.
  - **Right (sidebar):**
    - Email: alexjwilcox@proton.me
    - Location: McLean, VA
    - Response Time: Within 24 hours
    - Green "Free Consultation" callout box: "Not sure what you need? Let's talk — no commitment, no pressure."

## Shared Components

### Nav

- Sticky top, cream background, bottom border (#e8e4df)
- Logo left: shield diamond mark + "WILCOX" (20px bold) + "SECURITY" (12px light)
- Links right: HOME, ABOUT, SERVICES, CONTACT (Oswald 15px)
- Active link is #1a1a1a, inactive is #64748b
- On Home page: no bottom border, transparent background (overlaid on hero)

### Footer

- Top border (#e8e4df)
- Left: small logo mark + "© 2026 Wilcox Security"
- Right: "wilcoxsecurity.com"
- Font size 14px, muted colors

## Responsive Behavior

All pages must be responsive for laptops and phones:

- **Desktop (1024px+):** Full layouts as designed — multi-column, side-by-side cards
- **Tablet (768–1023px):** Service cards stack to 2+1 or single column. About page stacks photo above bio.
- **Mobile (<768px):** Single column everything. Nav collapses to hamburger menu. Hero headline scales down (~40px). Service cards stack vertically. Contact form takes full width, sidebar stacks below.

## Animations

- Page transitions: fade + slight Y-axis shift (Framer Motion AnimatePresence)
- Scroll-triggered fade-in on About trust boxes, Service cards
- Subtle hover effects on nav links, buttons, service cards (slight lift/shadow)

## Assets Needed

- `hero-bg.png` — Home office photo (already generated, in project directory)
- `favicon.svg` — Shield diamond mark only
- `logo.svg` — Full logo (mark + wordmark)
- About page photo or graphic — placeholder for now

## Out of Scope

- Backend / form submission handling
- Blog or case studies
- Authentication
- CMS integration
- SEO meta tags beyond basics (title, description, viewport)
