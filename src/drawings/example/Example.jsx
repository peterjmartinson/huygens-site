// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color } from '@/constants'

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawExample (canvas, { scale }) {
  return {
    draw () {
      const ctx = canvas.getContext('2d')
      ctx.fillStyle = Color.YELLOW
      ctx.fillRect(
        0,
        0,
        100 * scale,
        100 * scale
      )
    }
  }
}

export const Example = new CanvasBuilder()
  .withDrawFactory(drawExample)
  .build()
