import Head from 'next/head'
import { FallingBall } from '@/components/Canvas/FallingBall'
import styles from '@/styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <FallingBall />
      </main>
    </div>
  )
}
