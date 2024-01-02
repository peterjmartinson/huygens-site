// @ts-check

import { CanvasBuilder } from './CanvasBuilder'

/**
 * @type {import('./CanvasBuilder').RenderFactory}
 */
function renderExample (canvas) {
  return {
    render () {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = 'green'
      ctx.fillRect(0, 0, 100, 100)
    }
  }
}

export const CanvasExample = new CanvasBuilder()
  .withRenderFactory(renderExample)
  .build()
