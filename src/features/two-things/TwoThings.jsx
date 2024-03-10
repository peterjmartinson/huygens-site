import React, { useState, useCallback } from 'react'
import { produce } from 'immer'
import { MainContainer, ContentContainer } from '@/components/Layout'
import { ActionSpan } from '@/components/Typography'
import { Drawing } from './Drawing'

const initialAnimationState = {
  circle: { isPaused: true },
  square: { isPaused: true }
}

export default function TwoThings () {
  const [animationState, setAnimationState] = useState(initialAnimationState)
  const [shouldResetCanvasState, setShouldResetCanvasState] = useState(false)

  const togglePause = useCallback((event) => {
    setAnimationState(produce((draft) => {
      draft[event.target.id].isPaused = !draft[event.target.id].isPaused
    }))
  }, [])

  const resetAnimationState = () => {
    setAnimationState(initialAnimationState)
    setShouldResetCanvasState(true)
  }

  return (
    <MainContainer>
      <ContentContainer>
        <Drawing
          isCirclePaused={animationState.circle.isPaused}
          isSquarePaused={animationState.square.isPaused}
          shouldResetCanvasState={shouldResetCanvasState}
        />
      </ContentContainer>

      <ContentContainer>
        <h2>ANIMATING TWO THINGS</h2>

        <button onClick={resetAnimationState}>
          Reset
        </button>

        <p>
          <ActionSpan id='circle' text='Clicking here' onClick={togglePause} /> will animate the circle.
        </p>

        <p>
          <ActionSpan id='square' text='Clicking here' onClick={togglePause} /> will animate the square.
        </p>
      </ContentContainer>
    </MainContainer>
  )
}
