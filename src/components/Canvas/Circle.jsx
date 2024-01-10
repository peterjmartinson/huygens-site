// @ts-check

import { CanvasBuilder } from './CanvasBuilder'

const initialState = {
  i: 0,
  delta: 0.05
}

/** @type {import('./CanvasBuilder').DrawFactory} */
function drawAnimatedCircle (canvas, { drawState, setDrawState }) {
  let requestId
  let { i, delta } = drawState

  /** @type {import('./CanvasBuilder').DrawFunction} */
  function draw ({ isPaused }) {
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
  .withDrawFactory(drawAnimatedCircle)
  .withInitialDrawState(initialState)
  .build()
