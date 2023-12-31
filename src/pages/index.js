import Header from '@/components/Header/Header'
import Footer from '@/components/Footer/Footer'
import CanvasExample from '@/components/Canvas/CanvasExample'
import styles from '@/styles/Home.module.css'

export default function Home () {
  return (
    <div className={styles.container}>
      <Header title='Huygens' />

      <main className={styles.main}>
        <CanvasExample />
      </main>

      <Footer />
    </div>
  )
}
