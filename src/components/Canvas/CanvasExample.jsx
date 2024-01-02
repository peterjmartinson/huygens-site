// @ts-check

import { CanvasBuilder } from './CanvasBuilder'

/**
 * @type {import('./CanvasBuilder').DrawFactory}
 */
function drawExample (canvas) {
  return {
    draw () {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'green'
      ctx.fillRect(0, 0, 100, 100)
    }
  }
}

export const CanvasExample = new CanvasBuilder()
  .withDrawFactory(drawExample)
  .build()
