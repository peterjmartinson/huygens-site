import React, { useState, useCallback } from 'react'
import { MainContainer, ContentContainer } from '@/components/Layout'
import { produce } from 'immer'
import { ActionSpan } from '@/components/Typography'
import { Drawing } from './Drawing'

export default function DrawRollingCircle () {
  const [animationState, setAnimationState] = useState({
    rollingCircle: { isPaused: true }
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
          isRollingCirclePaused={animationState.rollingCircle.isPaused}
        />
      </ContentContainer>

      <ContentContainer>
        <p>
          <ActionSpan id='rollingCircle' text='Clicking here' onClick={togglePause} /> will animate the circle.
        </p>
      </ContentContainer>
    </MainContainer>
  )
}
