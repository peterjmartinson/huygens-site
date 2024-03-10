// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color, Physics } from '@/config'

const HEIGHT = 600
const WIDTH = 300
const radius = 20
const LENGTH = 200

const initialState = {
  pendulum: {
    theta: Math.PI / 4,
    speedX: 0,
    speedY: 0,
    pivotX: WIDTH / 2,
    pivotY: HEIGHT,
    centerX: pivotX + LENGTH * Math.Sin(:,
    centerY: HEIGHT - radius,
    cycloid: {
      plot: [{
        x: radius,
        y: HEIGHT
      }],
      i: 0
    }
  }
}

// - React Component

export const Drawing = new CanvasBuilder()
  .withId('PendulumTest')
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withInitialDrawState(initialState)
  .withDrawFactory(drawFactory)
  .build()

// - Draw Factory

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFactory (ctx, { drawState, setDrawState }) {
  const pendulum = { ...drawState.pendulum }
  let requestId

  function draw (drawArgs) {
    // implement
  }

  return {
    draw,
    abort: () => cancelAnimationFrame(requestId)
  }
}
