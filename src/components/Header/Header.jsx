import Link from 'next/link'

export function Header () {
  return (
    <header className=''>
      <Link href='/'>
        <h1>Huygens Pendulum Clock</h1>
      </Link>
    </header>
  )
}
