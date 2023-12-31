import { render } from '@testing-library/react'
import { Header } from '.'

describe('Header component', () => {
  function renderHeader (props) {
    const result = render(
      <Header {...props} />
    )

    const Links = () => result.getAllByRole('link')
    const Home = () => result.getByRole('link', { name: /Huygens/u })

    return {
      Home,
      Links,
      debug: result.debug
    }
  }

  it('should render correct number of navigation links', () => {
    const { Links } = renderHeader()
    expect(Links()).toHaveLength(1)
  })

  it('should render home link correctly', () => {
    const { Home } = renderHeader()
    expect(Home()).toBeInTheDocument()
    expect(Home()).toHaveTextContent(/huygens pendulum clock/iu)
    expect(Home()).toHaveAttribute('href', '/')
  })
})
