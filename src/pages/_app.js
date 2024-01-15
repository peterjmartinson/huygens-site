import PropTypes from 'prop-types'
import { Header } from '@/components/Header'
import { Footer } from '@/components/Footer'
import { navLinks } from '@/config/routes'

import '@/styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header navLinks={navLinks} />
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
