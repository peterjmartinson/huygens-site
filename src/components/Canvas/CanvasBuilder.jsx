// @ts-check

import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.css'

/**
 * @typedef  {Object} DrawFunctionConfig
 * @property {number} scale Calculated from device's pixel ratio
 *
 * @typedef  {(canvas: HTMLCanvasElement, config?: DrawFunctionConfig) => { draw: () => void, abort?: () => void }} DrawFactory
 */

export class CanvasBuilder {
  #drawFactory = null

  /**
   * A function that returns an object of functions:
   *  - draw() - does the actual drawing on a provided canvas.
   *  - abort() - [optional] cancels any animation.
   * @param {DrawFactory} drawFactory
   * @returns {CanvasBuilder}
   */
  withDrawFactory (drawFactory) {
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

    return function Canvas (props) {
      /** @type {React.MutableRefObject<HTMLCanvasElement | null>} */
      const canvasRef = useRef(null)

      useEffect(() => {
        let abortFn

        if (canvasRef.current != null) {
          const canvas = canvasRef.current

          const width = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('width'))
          const height = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('height'))

          // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
          const scale = window.devicePixelRatio ?? 1
          canvas.width = width * scale
          canvas.height = height * scale

          const { draw, abort } = drawFactory(canvas, { scale })

          abortFn = abort
          draw()
        }

        return () => {
          abortFn?.()
        }
      }, [])

      return (
        <div>
          <canvas
            ref={canvasRef}
            className={styles.canvas}
          />
        </div>
      )
    }
  }
}
