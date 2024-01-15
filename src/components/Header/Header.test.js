import { render } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  const mockNavLinks = [
    { href: '/a/b/c', label: 'A B C', id: 'ABC' },
    { href: '/d/e/f', label: 'D E F', id: 'DEF' }
  ]

  function renderHeader (props) {
    const result = render(
      <Header {...props} />
    )

    const Links = () => result.getAllByRole('link')
    const LinkByName = (name) => result.getByRole('link', { name: new RegExp(name, 'iu') })
    const Home = () => LinkByName('huygens')

    return {
      Home,
      LinkByName,
      Links,
      debug: result.debug
    }
  }

  it('should render correct number of navigation links', () => {
    const { Links } = renderHeader({ navLinks: mockNavLinks })
    expect(Links()).toHaveLength(mockNavLinks.length + 1) // +1 because of the home/index link
  })

  it('should render home link correctly', () => {
    const { Home } = renderHeader({ navLinks: mockNavLinks })
    expect(Home()).toBeInTheDocument()
    expect(Home()).toHaveTextContent(/huygens pendulum clock/iu)
    expect(Home()).toHaveAttribute('href', '/')
  })

  // assert that each defined nav link is in the rendered document
  it.each(mockNavLinks)('should have a link to: $label', ({ label, href }) => {
    const pattern = new RegExp(`^${label}$`, 'iu')
    const { LinkByName } = renderHeader({ navLinks: mockNavLinks })
    expect(LinkByName(pattern)).toBeInTheDocument()
    expect(LinkByName(pattern)).toHaveAttribute('href', href)
  })
})
