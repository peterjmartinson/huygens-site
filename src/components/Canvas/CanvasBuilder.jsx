// @ts-check

import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { isFunction, isObject } from '@/utils/is'

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
 * @typedef  {(ctx: CanvasRenderingContext2D, config?: DrawFactoryConfig) => { draw: DrawFunction, abort?: () => void }} DrawFactory
 */

export class CanvasBuilder {
  #height = 0
  #width = 0
  #drawFactory = null
  #initialDrawState = {}

  /**
   * Sets the canvas height and width
   * @param {number} height Defaults to 100px
   * @param {number} [width] Optional. Defaults to height value (square canvas).
   * @returns {CanvasBuilder}
   */
  withHeightAndWidth (height = 100, width) {
    this.#height = height
    this.#width = width ?? height
    return this
  }

  /**
   * @returns {number}
   */
  get height () {
    return this.#height
  }

  /**
   * @returns {number}
   */
  get width () {
    return this.#width
  }

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
    const height = this.height
    const width = this.width

    function Canvas (props) {
      /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
      const canvasRef = useRef(null)
      /** @type {React.MutableRefObject<CanvasRenderingContext2D | null>} */
      const canvasCtxRef = useRef(null)
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
          const pixelRatio = window.devicePixelRatio ?? 1

          // Set display size (css pixels)
          canvas.style.height = `${height}px`
          canvas.style.width = `${width}px`

          // Set actual size in memory (scaled to account for extra pixel density).
          canvas.width = Math.floor(width * pixelRatio)
          canvas.height = Math.floor(height * pixelRatio)

          // store ctx in a ref
          canvasCtxRef.current = canvas.getContext('2d')
          const ctx = canvasCtxRef.current
          ctx.scale(pixelRatio, pixelRatio)

          const { draw, abort } = drawFactory(ctx, {
            scale: pixelRatio, // provided to normalize canvas coordinate system to use CSS pixes
            drawState,
            setDrawState
          })

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
          height={height}
          width={width}
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
