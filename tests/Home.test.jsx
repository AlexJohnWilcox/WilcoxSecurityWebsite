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
