// @ts-check

export const isObject = val => Object.prototype.toString.call(val) === '[object Object]'

export const isFunction = val => (
  Object.prototype.toString.call(val) === '[object Function]' ||
  Object.prototype.toString.call(val) === '[object AsyncFunction]'
)
