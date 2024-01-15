// @ts-check

import { CanvasBuilder } from '@/components/Canvas'
import { Physics, Color } from '@/config'

/** @type {import('@/components/Canvas/CanvasBuilder').DrawFactory} */
function drawFallingBall (canvas) {
  const ctx = canvas.getContext('2d')
  let requestId

  const ground = ctx.canvas.height
  const ball = {
    radius: 10,
    color: Color.BLUE,
    position: { x: ctx.canvas.width / 2, y: 10 },
    velocity: { x: 0, y: 0 },
    update () {
      this.velocity.x += Physics.GRAVITY.x
      this.velocity.y += Physics.GRAVITY.y
      this.position.x += this.velocity.x
      this.position.y += this.velocity.y
      const g = ground - this.radius
      if (this.position.y >= g) { // if ball is below the ground
        this.position.y = g - (this.position.y - g)
        this.velocity.y = -Math.abs(this.velocity.y)
      }
    },
    create () {
      ctx.beginPath()
      ctx.arc(this.position.x, this.position.y, this.radius, 0, 2 * Math.PI, false)
      ctx.fillStyle = this.color
      ctx.fill()
    }
  }

  /** @type {import('@/components/Canvas/CanvasBuilder').DrawFunction} */
  function draw () {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    ball.update()
    ball.create()
    requestId = requestAnimationFrame(() => draw())
  }

  function abort () {
    cancelAnimationFrame(requestId)
  }

  return {
    draw,
    abort
  }
}

export const FallingBall = new CanvasBuilder()
  .withDrawFactory(drawFallingBall)
  .build()
