import { render } from '@testing-library/react'
import { navLinks } from './Header'
import { Header } from '.'

describe('Header component', () => {
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
    const { Links } = renderHeader()
    expect(Links()).toHaveLength(5)
  })

  it('should render home link correctly', () => {
    const { Home } = renderHeader()
    expect(Home()).toBeInTheDocument()
    expect(Home()).toHaveTextContent(/huygens pendulum clock/iu)
    expect(Home()).toHaveAttribute('href', '/')
  })

  // assert that each defined nav link is in the rendered document
  it.each(navLinks)('should have a link to: $label', ({ label, href }) => {
    const pattern = new RegExp(`^${label}$`, 'iu')
    const { LinkByName } = renderHeader()
    expect(LinkByName(pattern)).toBeInTheDocument()
    expect(LinkByName(pattern)).toHaveAttribute('href', href)
  })
})
