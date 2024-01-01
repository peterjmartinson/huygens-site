import PropTypes from 'prop-types'
import { Header } from '@/components/Header'
import '@/styles/globals.css'

function MyApp ({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

MyApp.propTypes = {
  Component: PropTypes.elementType.isRequired,
  pageProps: PropTypes.shape({})
}

export default MyApp
