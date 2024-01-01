import Head from 'next/head'
import Footer from '@/components/Footer/Footer'
import CanvasExample from '@/components/Canvas/CanvasExample'
import styles from '@/styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <main className={styles.main}>
        <CanvasExample />
      </main>

      <Footer />
    </div>
  )
}
