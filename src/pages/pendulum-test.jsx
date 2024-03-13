// @ts-check

import React from 'react'
import Head from 'next/head'
import { PageContainer } from '@/components/Layout'
import { PendulumTest } from '@/features/pendulum-test'

export default function PendulumTestPage () {
  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <PendulumTest />
    </PageContainer>
  )
}
