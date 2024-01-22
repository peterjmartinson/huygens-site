import { render, screen } from '@testing-library/react'
import { CanvasBuilder } from './index'

describe('CanvasBuilder', () => {
  const mockId = 'TestCanvas'
  const mockWidth = 123
  const mockHeight = 456
  const mockDrawFn = jest.fn()
  const mockDrawFactory = jest.fn().mockReturnValue({
    draw: mockDrawFn
  })

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should construct an object with correct methods', () => {
    const {
      withId,
      withHeightAndWidth,
      withDrawFactory,
      withInitialDrawState
    } = new CanvasBuilder()

    expect(typeof withId).toBe('function')
    expect(typeof withHeightAndWidth).toBe('function')
    expect(typeof withDrawFactory).toBe('function')
    expect(typeof withInitialDrawState).toBe('function')
  })

  it('should build a react component when provided valid builder parameters', () => {
    const TestCanvas = new CanvasBuilder()
      .withId(mockId)
      .withHeightAndWidth(mockHeight, mockWidth)
      .withDrawFactory(mockDrawFactory)
      .build()

    expect(TestCanvas.ariaRole).toBe('img')
    expect(TestCanvas.id).toBe(mockId)
    expect(TestCanvas.dataTestId).toBe('Canvas_' + mockId)

    render(<TestCanvas />)

    // should be accessible by role
    expect(screen.getByRole(TestCanvas.ariaRole)).toBeInTheDocument()

    // should be accessible by data-testid
    expect(screen.getByTestId(TestCanvas.dataTestId)).toBeInTheDocument()
    expect(mockDrawFactory).toHaveBeenCalledTimes(1)
    expect(mockDrawFn).toHaveBeenCalledTimes(1)
  })

  it('should error on build when `id` is omitted', () => {
    expect(
      () => new CanvasBuilder()
        .withDrawFactory(mockDrawFactory)
        .build()
    ).toThrow(/`id` {string} is required to build/gi)
  })

  it('should error on build when `id` is an empty string', () => {
    expect(
      () => new CanvasBuilder()
        .withId('')
        .withDrawFactory(mockDrawFactory)
        .build()
    ).toThrow(/`id` {string} is required to build/gi)
  })

  it('should error on build when `drawFactory` is omitted', () => {
    expect(
      () => new CanvasBuilder()
        .withId(mockId)
        .build()
    ).toThrow(/`drawFactory` {function} is required to build/gi)
  })

  it('should error on build when `drawFactory` is not a function', () => {
    expect(
      () => new CanvasBuilder()
        .withId(mockId)
        .withDrawFactory('not a function')
        .build()
    ).toThrow(/`drawFactory` {function} is required to build/gi)
  })
})
