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
