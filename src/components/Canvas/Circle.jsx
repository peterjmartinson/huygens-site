// @ts-check

import { CanvasBuilder } from './CanvasBuilder'

/**
 * @type {import('./CanvasBuilder').DrawFactory}
 */
function drawAnimatedCircle (canvas) {
  let requestId
  let i = 0

  function draw () {
    const ctx = canvas.getContext('2d')

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()
    ctx.arc(
      canvas.width / 2,
      canvas.height / 2,
      (canvas.width / 2) * Math.abs(Math.cos(i)),
      0,
      2 * Math.PI
    )
    ctx.fill()
    i += 0.05
    requestId = requestAnimationFrame(draw)
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
  .withDrawFactory(drawAnimatedCircle)
  .build()
