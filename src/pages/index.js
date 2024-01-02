import Head from 'next/head'
import { CanvasExample } from '@/components/Canvas/CanvasExample'
import { Circle } from '@/components/Canvas/Circle'
import styles from '@/styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <Circle />
        <CanvasExample />
      </main>
    </div>
  )
}
