import { render } from '@testing-library/react'
import { navLinks, socialLinks } from './Footer'
import { Footer } from '.'

function renderFooter (props) {
  const result = render(
    <Footer {...props} />
  )

  const Links = () => result.getAllByRole('link')
  const LinkByName = (name) => result.getByRole('link', { name: new RegExp(name, 'iu') })

  return {
    Links,
    LinkByName,
    debug: result.debug
  }
}

describe('Footer component', () => {
  it('should render correct number of links', () => {
    const { Links } = renderFooter()
    expect(Links()).toHaveLength(navLinks.length + socialLinks.length)
  })

  it.each(navLinks)('should have a nav link to: $label', ({ label, href }) => {
    const pattern = new RegExp(`^${label}$`, 'iu')
    const { LinkByName } = renderFooter()
    expect(LinkByName(pattern)).toBeInTheDocument()
    expect(LinkByName(pattern)).toHaveAttribute('href', href)
  })

  it.each(socialLinks)('should have a social link to: $aria', ({ aria, href }) => {
    const pattern = new RegExp(`^${aria}$`, 'iu')
    const { LinkByName } = renderFooter()
    expect(LinkByName(pattern)).toBeInTheDocument()
    expect(LinkByName(pattern)).toHaveAttribute('href', href)
  })
})
