import '@testing-library/jest-dom'

// globally mock the `getContext` method during tests
HTMLCanvasElement.prototype.getContext = () => ({
  // return whatever getContext has to return
  arc: jest.fn(),
  fill: jest.fn(),
  beginPath: jest.fn(),
  clearRect: jest.fn(),
  fillRect: jest.fn(),
  fillStyle: null
})
