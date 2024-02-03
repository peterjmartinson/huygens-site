// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color } from '@/config'

const HEIGHT = 100
const WIDTH = 100

const initialState = {
  circle: {
    i: 0,
    delta: 0.05
  },
  square: {
    theta: 0,
    rotation: 1
  }
}

// - React Component

export const Drawing = new CanvasBuilder()
  .withId('TwoThings')
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withInitialDrawState(initialState)
  .withDrawFactory(drawFactory)
  .build()

// - Draw Factory

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFactory (ctx, { drawState, setDrawState }) {
  const circle = { ...drawState.circle }
  const square = { ...drawState.square }
  let requestId

  function draw (drawArgs) {
    const { isCirclePaused, isSquarePaused } = drawArgs

    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.save()
    ctx.translate(WIDTH / 2, HEIGHT / 2)
    ctx.rotate(square.theta * (Math.PI / 180))
    ctx.beginPath()
    ctx.arc(
      0,
      0,
      (WIDTH / 2) * Math.abs(Math.cos(circle.i)),
      0,
      2 * Math.PI
    )
    ctx.fillStyle = Color.BLUE
    ctx.fill()

    ctx.fillStyle = Color.YELLOW
    ctx.fillRect(
      -25,
      -25,
      50,
      50
    )

    ctx.restore()

    if (!isSquarePaused) {
      square.theta += square.rotation
    }

    if (!isCirclePaused) {
      circle.i += circle.delta
    }

    setDrawState({ circle, square })

    requestId = requestAnimationFrame(() => draw(drawArgs))
  }

  return {
    draw,
    abort: () => cancelAnimationFrame(requestId)
  }
}
