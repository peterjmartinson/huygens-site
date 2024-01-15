import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ActionSpan } from '.'

const words = 'he who shall'

function renderActionSpan (props) {
  const user = userEvent.setup()

  const result = render(<ActionSpan {...props} />)

  const Span = () => result.getByText(props.text)

  return {
    user,
    Span,
    debug: result.debug
  }
}

describe('ActionSpan component', () => {
  beforeEach(() => jest.clearAllMocks())

  it('should render with `text` and default CSS class', () => {
    const { Span } = renderActionSpan({ text: words })

    expect(Span()).toBeInTheDocument()
    expect(Span()).toHaveTextContent(words)
    expect(Span()).toHaveClass('action_span')
  })

  it('should render with optional `id` when provided', () => {
    const mockId = 'buttery_style'

    const { Span } = renderActionSpan({ text: words, id: mockId })

    expect(Span()).toBeInTheDocument()
    expect(Span()).toHaveAttribute('id', mockId)
  })

  it('should append optional `className` when provided', () => {
    const mockClass = 'buttery_style'

    const { Span } = renderActionSpan({ text: words, className: mockClass })

    expect(Span()).toBeInTheDocument()
    expect(Span()).toHaveClass('action_span', mockClass)
  })

  it('should call optional `onClick` when clicked', async () => {
    const onClick = jest.fn()

    const { user, Span } = renderActionSpan({ text: words, onClick })

    expect(Span()).toBeInTheDocument()

    await user.click(Span())
    expect(onClick).toHaveBeenCalledTimes(1)
  })

  it('should call optional `onMouseEnter` and `onMouseLeave` functions on hover', async () => {
    const onMouseEnter = jest.fn()
    const onMouseLeave = jest.fn()

    const { user, Span } = renderActionSpan({ text: words, onMouseEnter, onMouseLeave })

    expect(Span()).toBeInTheDocument()

    await user.hover(Span())
    expect(onMouseEnter).toHaveBeenCalledTimes(1)

    await user.unhover(Span())
    expect(onMouseLeave).toHaveBeenCalledTimes(1)
  })
})
