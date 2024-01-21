// @ts-check

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isFunction, isObject } from '@/utils/is'
import styles from './Canvas.module.css'

/**
 * @typedef  {Record<string, any>} DrawState
 *
 * @typedef  {Object} DrawFactoryConfig
 * @property {number}              [scale] Calculated from device's pixel ratio
 * @property {DrawState}           [drawState] An object representing canvas draw state
 * @property {(DrawState) => void} [setDrawState] Function to update the canvas draw state
 *
 * @typedef  {(props?: Record<string, any>) => void} DrawFunction
 *
 * @typedef  {(canvas: HTMLCanvasElement, config?: DrawFactoryConfig) => { draw: DrawFunction, abort?: () => void }} DrawFactory
 */

export class CanvasBuilder {
  #drawFactory = null
  #initialDrawState = {}

  /**
   * A function that returns an object of functions:
   *  - draw() - does the actual drawing on a provided canvas.
   *  - abort() - [optional] cancels any animation.
   * @param {DrawFactory} drawFactory
   * @returns {CanvasBuilder}
   */
  withDrawFactory (drawFactory) {
    if (!isFunction(drawFactory)) throw new TypeError('drawFactory must be a function')
    this.#drawFactory = drawFactory
    return this
  }

  /**
   * @returns {DrawFactory}
   */
  get drawFactory () {
    return this.#drawFactory
  }

  /**
   * Provides an initial state to the canvas draw function
   * @param {DrawState} initialState An initial canvas drawing state
   * @returns CanvasBuilder
   */
  withInitialDrawState (initialState) {
    if (!isObject(initialState)) throw new TypeError('initialState must be a plain object')
    this.#initialDrawState = initialState
    return this
  }

  /**
   * @returns {DrawState} An initial canvas drawing state
   */
  get initialDrawState () {
    return this.#initialDrawState
  }

  /**
   * Ensures the builder has required parameters
   */
  validateParamsToBuild () {
    if (this.#drawFactory == null) {
      throw new Error('A drawFactory function is required to build')
    }
  }

  build () {
    this.validateParamsToBuild()

    const drawFactory = this.drawFactory
    const initialDrawState = this.initialDrawState

    function Canvas (props) {
      /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
      const canvasRef = useRef(null)
      const drawStateRef = useRef(initialDrawState)

      /**
       * Updates draw state.
       * @param {Record<string, any>} newState An object with any/all updated properties to set
       */
      function setDrawState (newState) {
        if (!isObject(newState)) return

        for (const key in newState) {
          drawStateRef.current[key] = newState[key]
        }
      }

      useEffect(() => {
        let abortFn

        if (canvasRef.current != null) {
          const canvas = canvasRef.current
          const drawState = drawStateRef.current

          const width = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('width'))
          const height = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('height'))

          // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
          const scale = window.devicePixelRatio ?? 1
          canvas.width = width * scale
          canvas.height = height * scale

          const { draw, abort } = drawFactory(canvas, { scale, drawState, setDrawState })

          abortFn = abort
          draw(props)
        }

        return () => {
          abortFn?.()
        }
      }, [props])

      return (
        <canvas
          ref={canvasRef}
          className={styles.canvas}
        />
      )
    }

    Canvas.propTypes = {
      // debug: PropTypes.bool, // @TODO
      isPaused: PropTypes.bool
    }

    return Canvas
  }
}
