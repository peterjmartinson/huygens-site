// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Color, Physics } from '@/config'

const HEIGHT = 200
const WIDTH = 500
const radius = WIDTH / (2 + 2 * Math.PI)

const initialState = {
  rollingCircle: {
    theta: Math.PI / 2,
    direction: 1,
    speed: Physics.VELOCITY,
    centerX: radius + 1,
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
  .withId('DrawRollingCircle')
  .withHeightAndWidth(HEIGHT, WIDTH)
  .withInitialDrawState(initialState)
  .withDrawFactory(drawFactory)
  .build()

// - Draw Factory

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFactory (ctx, { drawState, setDrawState }) {
  const rollingCircle = { ...drawState.rollingCircle }
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
    ctx.fillRect(0, 0, WIDTH, HEIGHT)

    // draw the base circle
    ctx.beginPath()
    ctx.arc(rollingCircle.centerX, rollingCircle.centerY, radius, 0, 2 * Math.PI, false)

    ctx.lineWidth = 5
    ctx.strokeStyle = Color.YELLOW
    ctx.stroke()

    ctx.fillStyle = Color.BLUE
    ctx.fill()

    // draw the line
    const pointX = rollingCircle.centerX + radius * Math.cos(rollingCircle.theta)
    const pointY = rollingCircle.centerY + radius * Math.sin(rollingCircle.theta)
    ctx.beginPath()
    ctx.moveTo(rollingCircle.centerX, rollingCircle.centerY)
    ctx.lineTo(pointX, pointY)
    ctx.closePath()
    ctx.strokeStyle = Color.RED
    ctx.stroke()

    // draw the cycloid
    ctx.beginPath()
    ctx.moveTo(rollingCircle.cycloid.plot[0].x, rollingCircle.cycloid.plot[0].y)
    for (let i = 1; i < rollingCircle.cycloid.i; i++) {
      ctx.lineTo(rollingCircle.cycloid.plot[i].x, rollingCircle.cycloid.plot[i].y)
    }
    ctx.stroke()

    ctx.restore()
    if (!isRollingCirclePaused) {
      rollingCircle.theta += rollingCircle.speed * rollingCircle.direction
      rollingCircle.centerX += rollingCircle.speed * radius * rollingCircle.direction
      rollingCircle.cycloid.i++
      rollingCircle.cycloid.plot.push({ x: pointX, y: pointY })
      rollingCircle.cycloid.plot = [...new Set(rollingCircle.cycloid.plot)] // removes all duplicates, to save memory!
    }

    setDrawState({ rollingCircle })

    requestId = requestAnimationFrame(() => draw(drawArgs))
  }

  return {
    draw,
    abort: () => cancelAnimationFrame(requestId)
  }
}
