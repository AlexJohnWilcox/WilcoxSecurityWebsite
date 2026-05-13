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
