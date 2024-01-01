import PropTypes from 'prop-types'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import '@/styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
      <Footer />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({})
}

export default MyApp
