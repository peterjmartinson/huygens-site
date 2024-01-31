// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color } from '@/config'

const HEIGHT = 100
const WIDTH = 100

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawExample (ctx) {
  return {
    draw () {
      ctx.fillStyle = Color.YELLOW
      ctx.fillRect(
        0,
        0,
        100,
        100
      )
    }
  }
}

export const Example = new CanvasBuilder()
  .withId('ExampleSquare')
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withDrawFactory(drawExample)
  .build()
