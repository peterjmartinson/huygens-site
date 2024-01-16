import React, { useState } from 'react'
import Head from 'next/head'
import { PageContainer, MainContainer, ContentContainer } from '@/components/Layout'
import { ActionSpan } from '@/components/Typography'
import { TwoThings } from '@/drawings/two-things'

export default function About () {
  const [animationState, setAnimationState] = useState({
    circle: { isPaused: true },
    square: { isPaused: true }
  })

  const onClick = (event) => setAnimationState(prevState => ({
    ...prevState,
    [event.target.id]: {
      ...prevState[event.target.id],
      isPaused: !prevState[event.target.id].isPaused
    }
  }))

  const onMouseEnter = (event) => setAnimationState(prevState => ({
    ...prevState,
    [event.target.id]: {
      ...prevState[event.target.id],
      isPaused: false
    }
  }))

  const onMouseLeave = (event) => setAnimationState(prevState => ({
    ...prevState,
    [event.target.id]: {
      ...prevState[event.target.id],
      isPaused: true
    }
  }))

  const actionProps = { onClick, onMouseEnter, onMouseLeave }

  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <MainContainer>
        <ContentContainer>
          <TwoThings
            isCirclePaused={animationState.circle.isPaused}
            isSquarePaused={animationState.square.isPaused}
          />
        </ContentContainer>

        <ContentContainer>
          <h2>ANIMATING TWO THINGS</h2>

          <p>
            Hovering or clicking on <ActionSpan id='circle' text='circle' {...actionProps} /> should
            animate the circle.
          </p>

          <p>
            Hovering or clicking on <ActionSpan id='square' text='square' {...actionProps} /> should
            animate the square.
          </p>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  )
}
