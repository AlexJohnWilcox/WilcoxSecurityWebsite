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
