// @ts-check

import { CanvasBuilder } from './CanvasBuilder'

/**
 * @type {import('./CanvasBuilder').DrawFactory}
 */
function drawExample (canvas, { scale }) {
  return {
    draw () {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'green'
      ctx.fillRect(
        0,
        0,
        100 * scale,
        100 * scale
      )
    }
  }
}

export const CanvasExample = new CanvasBuilder()
  .withDrawFactory(drawExample)
  .build()
