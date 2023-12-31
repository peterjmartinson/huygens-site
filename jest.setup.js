import '@testing-library/jest-dom'

// globally mock the `getContext` method during tests
HTMLCanvasElement.prototype.getContext = () => ({
  // return whatever getContext has to return
  fillRect: jest.fn(),
  fillStyle: null
})
