import {
  isFunction,
  isObject,
  isString
} from './is'

describe('isFunction', () => {
  it.each([
    [true, () => {}],
    [true, async () => {}],
    [true, function () {}],
    [true, async function () {}],
    [false, true],
    [false, new Error()],
    [false, []],
    [false, 'anything'],
    [false, 1],
    [false, null],
    [false, undefined]
  ])('should return %p when passed %p', (expected, val) => {
    expect(isFunction(val)).toBe(expected)
  })
})

describe('isObject', () => {
  it.each([
    [true, Object.freeze({})],
    [true, {}],
    [false, new Error()],
    [false, []],
    [false, 'anything'],
    [false, 1],
    [false, null],
    [false, () => {}],
    [false, async () => {}],
    [false, function () {}],
    [false, async function () {}],
    [false, undefined]
  ])('should return %p when passed %p', (expected, val) => {
    expect(isObject(val)).toBe(expected)
  })
})

describe('isString', () => {
  it.each([
    [true, 'some string'],
    [true, JSON.stringify({})],
    [false, {}],
    [false, new Error()],
    [false, []],
    [false, 1],
    [false, null],
    [false, () => {}],
    [false, async () => {}],
    [false, function () {}],
    [false, async function () {}],
    [false, undefined]
  ])('should return %p when passed %p', (expected, val) => {
    expect(isString(val)).toBe(expected)
  })
})
