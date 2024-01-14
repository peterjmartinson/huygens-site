import React, { useState } from 'react'
import Head from 'next/head'
import { Circle } from '@/drawings/circle'
import styles from '@/styles/Home.module.css'

export default function Home () {
  const [isPaused, setIsPaused] = useState(true)

  const togglePause = () => setIsPaused(paused => !paused)

  return (
    <div className={styles.container}>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h2>Section 2. Hypotheses</h2>

        <section>
          <h3>I.</h3>
          <p> This is a statement of what we now call "Newton's First Law", which was first stated by Newton in his 1687 <it>Principia Mathematica</it>, 14 years after Huygens published his <it>Horologium Oscillatorium</it>.  </p>
          <p> Here, Huygens only states that gravity or air resistance will cause a body to deviate from a straight line, constant velocity path.  Otherwise, this thing never changes direction or speed. </p>
        </section>
        <section>
          <h3>II.</h3>
          <p> Now Huygens proposes a way to think about a moving body that is also acted on by a constant acceleration, like gravity.  He states that the new motion will be a linear combination of the uniform motion and the motion due to acceleration.  The two parts of the motion - one due to constant velocity, and one due to acceleration - do not interact.  This will be developed below and in the propositions that follow, so don't worry if it doesn't make sense yet.</p> 
        </section>
        <section>
          <h3>III.</h3>
          <p> Huygens restates Hypotheses II here, and provides a way to visualize it.</p>
          <p> The image shows several paths of our body starting its motion at point
          <action id="HighlightPointC">C</action>.  First consider the motion straight down, from
          <action id="HighlightLineCE">C to E</action>.  </p>
          <p>
            If the body is
            <action id="AnimateBodyCtoBUnderGravity">released from C at rest</action>
            , and is acted on by gravity, it will reach point B in an amount of time Huygens calls
            <action id="HighlightF">F</action>.
            If there is no gravity, and it given some initial speed downward,
            <action id="AnimateBodyCtoDWithConstantVelocity">it will reach point D</action>
            in time F.  If there is both an initial speed (BD) and gravity,
            <action id="AnimateBodyCtoEUnderGravityAndWithConstantVelocity">the body will travel</action>
            a distance that's equal to
            <action id="HighlightLineCB">CB</action>
            +
            <action id="HighlightLineBD">BD</action>
            =
            <action id="HightlightLineCE">CE</action>.
          </p>
        </section>

        <figure>
          <img src="Assets/Section_II_Hypothesis_III.png">
          <button onClick={togglePause}>
            {isPaused ? 'Unpause' : 'Pause'}
          </button>
          <Circle isPaused={isPaused} />
        </figure>

      </main>
    </div>
  )
}

