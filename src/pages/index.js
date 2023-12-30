import Image from 'next/image'
import Header from '@/components/Header/Header'
import CanvasExample from '@/components/Canvas/CanvasExample'
import styles from '@/styles/Home.module.css'

const Main = () => {
  return (
    <main className={styles.main}>
      <CanvasExample />
    </main>
  )
}

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <a
        href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
        rel="noopener noreferrer"
        target="_blank"
      >
        Powered by{' '}
        <span className={styles.logo}>
          <Image
            alt="Vercel Logo"
            height={16}
            src="/vercel.svg"
            width={72}
          />
        </span>
      </a>
    </footer>
  )
}

export default function Home () {
  return (
    <div className={styles.container}>
      <Header title='Huygens' />
      <Main />
      <Footer />
    </div>
  )
}
