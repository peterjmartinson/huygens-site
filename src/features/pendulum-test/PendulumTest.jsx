import React, { useState, useCallback } from 'react'
import { MainContainer, ContentContainer } from '@/components/Layout'
import { produce } from 'immer'
import { ActionSpan } from '@/components/Typography'
import { Drawing } from './Drawing'

export default function PendulumTest () {
  const [animationState, setAnimationState] = useState({
    pendulum: { isPaused: true }
  })

  const togglePause = useCallback((event) => {
    setAnimationState(produce((draft) => {
      draft[event.target.id].isPaused = !draft[event.target.id].isPaused
    }))
  }, [])

  return (
    <MainContainer>
      <ContentContainer>
        <p>
          <ActionSpan id='pendulum' text='Clicking here' onClick={togglePause} /> will animate the pendulum.
        </p>

        <Drawing
          isPendulumPaused={animationState.pendulum.isPaused}
        />
      </ContentContainer>
    </MainContainer>
  )
}
