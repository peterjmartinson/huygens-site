import React, { useState } from 'react'
import Head from 'next/head'
import Image from 'next/image'
import { PageContainer, MainContainer, ContentContainer } from '@/components/Layout'
import { ActionSpan } from '@/components/Typography'
import { Circle } from '@/drawings/circle'

export default function Home () {
  const [isPaused, setIsPaused] = useState(true)

  const togglePause = () => setIsPaused(paused => !paused)

  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <MainContainer>
        <ContentContainer>
          <figure>
            <Image
              src='/Assets/Section_II_Hypothesis_III.PNG'
              width={208}
              height={375}
              alt='Diagram: path of an object is a combination of its instantaneous beginning velocity, and its acceleration.'
            />
            <button onClick={togglePause}>
              {isPaused ? 'Unpause' : 'Pause'}
            </button>
            <Circle isPaused={isPaused} />
          </figure>
        </ContentContainer>

        <ContentContainer>
          <h2>Section 2. Hypotheses</h2>

          <section>
            <h3>I.</h3>
            <p>
              This is a statement of what we now call 'Newton's First Law', which was first stated by Newton in his 1687 <em>Principia Mathematica</em>, 14
              years after Huygens published his <em>Horologium Oscillatorium</em>.
            </p>
            <p>
              Here, Huygens only states that gravity or air resistance will cause a body to deviate from a straight line, constant velocity path.
              Otherwise, this thing never changes direction or speed.
            </p>
          </section>
          <section>
            <h3>II.</h3>
            <p>
              Now Huygens proposes a way to think about a moving body that is also acted on by a constant acceleration, like gravity.
              He states that the new motion will be a linear combination of the uniform motion and the motion due to acceleration.
              The two parts of the motion - one due to constant velocity, and one due to acceleration - do not interact.
              This will be developed below and in the propositions that follow, so don't worry if it doesn't make sense yet.
            </p>
          </section>
          <section>
            <h3>III.</h3>
            <p>Huygens restates Hypotheses II here, and provides a way to visualize it.</p>
            <p>
              The image shows several paths of our body starting its motion at point <ActionSpan text='C' id='HighlightPointC' />. First
              consider the motion straight down, from <ActionSpan text='C to E' id='HighlightLineCE' />.
            </p>
            <p>
              If the body is <ActionSpan text='released from C at rest' id='AnimateBodyCtoBUnderGravity' />, and is acted on by gravity, it will reach
              point B in an amount of time Huygens calls <ActionSpan text='F' id='HighlightF' />. If there is no gravity, and it given some initial
              speed downward, <ActionSpan text='it will reach point D' id='AnimateBodyCtoDWithConstantVelocity' /> in time F.  If there is both an
              initial speed (BD) and gravity, <ActionSpan text='the body will travel' id='AnimateBodyCtoEUnderGravityAndWithConstantVelocity' /> a distance
              that's equal to <ActionSpan text='CB' id='HighlightLineCB' /> + <ActionSpan text='BD' id='HighlightLineBD' /> = <ActionSpan text='CE' id='HightlightLineCE' />.
            </p>
          </section>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  )
}
