// @ts-check

import React from 'react'
import Head from 'next/head'
import { PageContainer } from '@/components/Layout'
import { DrawRollingCircle } from '@/features/draw-rolling-circle'

export default function DrawRollingCirclePage () {
  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <DrawRollingCircle />
    </PageContainer>
  )
}
