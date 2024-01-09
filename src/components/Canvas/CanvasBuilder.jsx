// @ts-check

import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.css'

/**
 * @typedef  {Object} DrawFactoryConfig
 * @property {number} [scale] Calculated from device's pixel ratio
 * @property {number} [interval] Some iteration index
 * @property {(i: number) => void} [updateInterval] Function to update the iteration index
 *
 * @typedef  {(props?: Record<string, any>) => void} DrawFunction
 *
 * @typedef  {(canvas: HTMLCanvasElement, config?: DrawFactoryConfig) => { draw: DrawFunction, abort?: () => void }} DrawFactory
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
      const intervalRef = useRef(0)

      function updateInterval (i) {
        intervalRef.current = i
      }

      useEffect(() => {
        let abortFn

        if (canvasRef.current != null) {
          const canvas = canvasRef.current
          const interval = intervalRef.current

          const width = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('width'))
          const height = Number.parseInt(getComputedStyle(canvas)
            .getPropertyValue('height'))

          // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
          const scale = window.devicePixelRatio ?? 1
          canvas.width = width * scale
          canvas.height = height * scale

          const { draw, abort } = drawFactory(canvas, { scale, interval, updateInterval })

          abortFn = abort
          draw(props)
        }

        return () => {
          console.log('unmounting')
          abortFn?.()
        }
      }, [props])

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
