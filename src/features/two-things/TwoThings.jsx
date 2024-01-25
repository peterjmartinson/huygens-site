import React, { useState, useCallback } from 'react'
import { produce } from 'immer'
import { MainContainer, ContentContainer } from '@/components/Layout'
import { ActionSpan } from '@/components/Typography'
import { Drawing } from './Drawing'

export default function TwoThings () {
  const [animationState, setAnimationState] = useState({
    circle: { isPaused: true },
    square: { isPaused: true }
  })

  const togglePause = useCallback((event) => {
    setAnimationState(produce((draft) => {
      draft[event.target.id].isPaused = !draft[event.target.id].isPaused
    }))
  }, [])

  return (
    <MainContainer>
      <ContentContainer>
        <Drawing
          isCirclePaused={animationState.circle.isPaused}
          isSquarePaused={animationState.square.isPaused}
        />
      </ContentContainer>

      <ContentContainer>
        <h2>ANIMATING TWO THINGS</h2>

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
