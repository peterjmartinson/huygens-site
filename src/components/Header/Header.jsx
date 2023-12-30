import Head from 'next/head'

export const Header = ({ title }) => {
  return (
    <Head>
      <title>{title}</title>
      <meta content="Generated by create next app" name="description" />
      <link href="/favicon.ico" rel="icon" />
    </Head>
  )
}

export default Header
