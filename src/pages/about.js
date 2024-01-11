import React, { useState } from 'react'
import Head from 'next/head'
import { Circle } from '@/drawings/circle'
import { Example } from '@/drawings/example'
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
        <h2>ABOUT!</h2>

        <button onClick={togglePause}>
          {isPaused ? 'Unpause' : 'Pause'}
        </button>

        <Circle isPaused={isPaused} />
        <Example />
      </main>
    </div>
  )
}
