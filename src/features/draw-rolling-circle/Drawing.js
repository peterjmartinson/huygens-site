// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color, Physics } from '@/config'

const HEIGHT = 100
const WIDTH = 500
const radius = 30
let pointX, pointY

const initialState = {
  rollingCircle: {
    theta: -1 * Math.PI / 2,
    direction: 1,
    speed: Physics.VELOCITY,
    centerX: WIDTH / 2,
    centerY: HEIGHT / 2
  },
  cycloid: {
    x: [WIDTH / 2 + radius * Math.cos(-1 * Math.PI / 2)],
    y: [WIDTH / 2 + radius * Math.sin(-1 * Math.PI / 2)],
    i: 0
  }
}

// - React Component

export const Drawing = new CanvasBuilder()
  .withId('DrawRollingCircle')
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withInitialDrawState(initialState)
  .withDrawFactory(drawFactory)
  .build()

// - Draw Factory

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFactory (ctx, { drawState, setDrawState }) {
  const rollingCircle = { ...drawState.rollingCircle }
  const cycloid = { ...drawState.cycloid }
  let requestId

  function draw (drawArgs) {
    const { isRollingCirclePaused } = drawArgs

    if (rollingCircle.centerX >= WIDTH - radius || rollingCircle.centerX <= radius) {
      rollingCircle.direction *= -1
    }

    ctx.clearRect(0, 0, WIDTH, HEIGHT)
    ctx.save()

    // fill in background, just for reference
    ctx.fillStyle = Color.BLACK
    ctx.strokeRect(0, 0, WIDTH, HEIGHT)

    // draw the base circle
    ctx.beginPath()
    ctx.arc(rollingCircle.centerX, rollingCircle.centerY, radius, 0, 2 * Math.PI, false)

    ctx.lineWidth = 5
    ctx.strokeStyle = Color.YELLOW
    ctx.stroke()

    ctx.fillStyle = Color.BLUE
    ctx.fill()

    // draw the line
    pointX = rollingCircle.centerX + radius * Math.cos(rollingCircle.theta)
    pointY = rollingCircle.centerY + radius * Math.sin(rollingCircle.theta)
    ctx.beginPath()
    ctx.moveTo(rollingCircle.centerX, rollingCircle.centerY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = Color.RED
    ctx.stroke()

    // draw the cycloid
    ctx.beginPath()
    ctx.moveTo(cycloid.x[0], cycloid.y[0])
    for (let i = 1; i < cycloid.i; i++) {
      ctx.lineTo(cycloid.x[i], cycloid.y[i])
    }
    ctx.strokeStyle = Color.Yellow
    ctx.stroke()

    // text box
    ctx.fillText(`cycloid.x:  ${cycloid.x}`, 5, 10)

    ctx.restore()
    if (!isRollingCirclePaused) {
      rollingCircle.theta += rollingCircle.speed * rollingCircle.direction
      rollingCircle.centerX += rollingCircle.speed * radius * rollingCircle.direction
      cycloid.i++
      cycloid.x.push(pointX)
      cycloid.Y.push(pointY)
    }

    setDrawState({ rollingCircle })

    requestId = requestAnimationFrame(() => draw(drawArgs))
  }

  return {
    draw,
    abort: () => cancelAnimationFrame(requestId)
  }
}
