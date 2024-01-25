import React from 'react'
import Head from 'next/head'
import { PageContainer } from '@/components/Layout'
import { TwoThings } from '@/features/two-things'

export default function About () {
  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <TwoThings />
    </PageContainer>
  )
}
