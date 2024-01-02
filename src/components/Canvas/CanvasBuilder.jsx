// @ts-check

import React, { useEffect, useRef } from 'react'
import styles from './Canvas.module.css'

/**
 * @typedef {(canvas: HTMLCanvasElement) => { render: () => void, abort?: () => void }} RenderFactory
 */

export class CanvasBuilder {
  #renderFactory = null

  /**
   * A function that returns an object of functions:
   *  - render() -- does the actual drawing on a provided canvas.
   *  - abort() -- [optional] cancels any animation.
   * @param {RenderFactory} renderFactory
   * @returns {CanvasBuilder}
   */
  withRenderFactory (renderFactory) {
    this.#renderFactory = renderFactory
    return this
  }

  /**
   * @returns {RenderFactory}
   */
  get renderFactory () {
    return this.#renderFactory
  }

  /**
   * Ensures the builder has required parameters
   */
  validateParamsToBuild () {
    if (this.#renderFactory == null) {
      throw new Error('A render function is required')
    }
  }

  build () {
    this.validateParamsToBuild()

    const renderFactory = this.renderFactory

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

          const { render, abort } = renderFactory(canvas)

          abortFn = abort
          render()
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
