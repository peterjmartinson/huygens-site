// @ts-check

import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.css'

/**
 * @typedef {(canvas: HTMLCanvasElement) => { draw: () => void, abort?: () => void }} DrawFactory
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

          const width = Number(getComputedStyle(canvas)
            .getPropertyValue('width')
            .slice(0, -2))
          const height = Number(getComputedStyle(canvas)
            .getPropertyValue('height')
            .slice(0, -2))

          // https://developer.mozilla.org/en-US/docs/Web/API/Window/devicePixelRatio
          const ratio = window.devicePixelRatio ?? 1
          canvas.width = width * ratio
          canvas.height = height * ratio
          canvas.style.width = `${width}px`
          canvas.style.height = `${height}px`

          const { draw, abort } = drawFactory(canvas)

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
