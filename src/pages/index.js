import React from 'react'
import Head from 'next/head'
import { PageContainer, MainContainer, ContentContainer } from '@/components/Layout'
import { FallingBall } from '@/drawings/falling-ball'

export default function Home () {
  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <MainContainer>
        <ContentContainer>
          <FallingBall />
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  )
}
