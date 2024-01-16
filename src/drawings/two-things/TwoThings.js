// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color } from '@/constants'

const initialState = {
  circle: {
    i: 0,
    delta: 0.05
  },
  square: {
    theta: 0,
    rotation: 0.05
  }
}

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFactory (canvas, { scale, drawState, setDrawState }) {
  let requestId

  const { circle, square } = drawState

  function draw (drawArgs) {
    const { isCirclePaused, isSquarePaused } = drawArgs

    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(
      canvas.width / 2,
      canvas.height / 4,
      (canvas.width / 2) * Math.abs(Math.cos(circle.i)),
      0,
      2 * Math.PI
    )
    ctx.fillStyle = Color.BLUE
    ctx.fill()

    ctx.fillStyle = Color.YELLOW
    ctx.fillRect(
      0,
      canvas.height / 2,
      70 * scale,
      70 * scale
    )

    if (!isSquarePaused) {
      ctx.rotate((Math.PI / 180) * square.rotation)
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
    abort () {
      cancelAnimationFrame(requestId)
    }
  }
}

export const TwoThings = new CanvasBuilder()
  .withInitialDrawState(initialState)
  .withDrawFactory(drawFactory)
  .build()
