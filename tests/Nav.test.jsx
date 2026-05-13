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
