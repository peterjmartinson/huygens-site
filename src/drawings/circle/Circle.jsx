// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color } from '@/config'

const HEIGHT = 100
const WIDTH = 100
const initialState = {
  i: 0,
  delta: 0.05
}

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawAnimatedCircle (ctx, { drawState, setDrawState }) {
  let requestId
  let { i, delta } = drawState

  /** @type {import('@/components/Canvas/CanvasBuilder').DrawFunction} */
  function draw ({ isPaused }) {
    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.beginPath()
    ctx.arc(
      WIDTH / 2,
      HEIGHT / 2,
      (WIDTH / 2) * Math.abs(Math.cos(i)),
      0,
      2 * Math.PI
    )
    ctx.fillStyle = Color.BLUE
    ctx.fill()

    // if we're NOT paused, update i locally and in parent component
    if (!isPaused) {
      i += delta
      setDrawState({ i })
    }

    requestId = requestAnimationFrame(() => draw({ isPaused }))
  }

  function abort () {
    cancelAnimationFrame(requestId)
  }

  return {
    draw,
    abort
  }
}

export const Circle = new CanvasBuilder()
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withDrawFactory(drawAnimatedCircle)
  .withInitialDrawState(initialState)
  .build()
