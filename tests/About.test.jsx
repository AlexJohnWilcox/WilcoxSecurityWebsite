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
