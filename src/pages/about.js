import Head from 'next/head'
import styles from '@/styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <h2>ABOUT!</h2>
      </main>
    </div>
  )
}
