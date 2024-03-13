// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color, Physics } from '@/config'

const HEIGHT = 300
const WIDTH = 600
const radius = 20
const LENGTH = 200

const initialState = {
  pendulum: {
    pivotX: WIDTH / 2,
    pivotY: 0,
    angle: Math.PI / 2,
    angularSpeed: 0
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
    let { isPendulumPaused } = drawArgs

    // First stage: draw pendulum, which depends only on LENGTH and angle
    const x = pendulum.pivotX + LENGTH * Math.sin(pendulum.angle)
    const y = pendulum.pivotY + LENGTH * Math.cos(pendulum.angle)

    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.save()

    ctx.beginPath()
    ctx.moveTo(pendulum.pivotX, pendulum.pivotY)
    ctx.lineTo(x, y)
    ctx.closePath()
    ctx.strokeStyle = Color.BLACK
    ctx.stroke()

    ctx.fillStyle = Color.BLACK
    ctx.strokeRect(0, 0, WIDTH, HEIGHT)

    ctx.beginPath()
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false)

    ctx.fillStyle = Color.YELLOW
    ctx.fill()

    ctx.lineWidth = 3
    ctx.strokeStyle = Color.BLUE
    ctx.stroke()

    // Second stage: Calculate new angular acceleration, then set angularSpeed, angle
    if (!isPendulumPaused) {
      const alpha = Physics.GRAVITY.y / 100 * Math.sin(pendulum.angle)
      pendulum.angularSpeed += alpha
      pendulum.angle -= pendulum.angularSpeed // note the minus.  Otherwise, gravity works UP in Canvas!
      isPendulumPaused = true
    }

    setDrawState({ pendulum })

    requestId = requestAnimationFrame(() => draw(drawArgs))
  }

  return {
    draw,
    abort: () => cancelAnimationFrame(requestId)
  }
}
