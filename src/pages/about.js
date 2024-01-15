import React, { useState } from 'react'
import Head from 'next/head'
import { PageContainer, MainContainer, ContentContainer } from '@/components/Layout'
import { ActionSpan } from '@/components/Typography'
import { Circle } from '@/drawings/circle'
import { Example } from '@/drawings/example'

export default function About () {
  const [isPaused, setIsPaused] = useState(true)

  const actionProps = {
    onClick: () => setIsPaused(paused => !paused),
    onMouseEnter: () => setIsPaused(false),
    onMouseLeave: () => setIsPaused(true)
  }

  return (
    <PageContainer>
      <Head>
        <title>Huygens Pendulum Clock</title>
        <link href='/favicon.ico' rel='icon' />
      </Head>

      <MainContainer>
        <ContentContainer>
          <Circle isPaused={isPaused} />
          <Example />
        </ContentContainer>

        <ContentContainer>
          <h2>ABOUT</h2>

          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor <ActionSpan text='incididunt' {...actionProps} /> ut
            labore et dolore magna aliqua. Ornare lectus sit amet est placerat in egestas erat imperdiet. Volutpat maecenas volutpat blandit
            aliquam etiam. Luctus venenatis lectus magna fringilla. Nunc non blandit massa enim nec dui nunc mattis enim. Sed risus ultricies
            tristique nulla aliquet. Luctus venenatis lectus magna fringilla. Id donec ultrices tincidunt arcu non sodales. Dictum sit amet justo
            donec enim diam vulputate. Senectus et netus et malesuada fames ac turpis. Porta lorem mollis aliquam ut porttitor leo a. Duis at
            tellus at urna. Proin sed libero enim sed. Posuere urna nec tincidunt praesent semper feugiat nibh. Ullamcorper velit sed ullamcorper
            morbi tincidunt ornare massa eget. Nisi scelerisque eu ultrices vitae auctor. Vitae tempus quam pellentesque nec.
          </p>

          <p>
            Consequat nisl vel pretium lectus quam id leo in. Feugiat vivamus at augue eget <ActionSpan text='arcu' {...actionProps} /> dictum varius
            duis at. Hendrerit dolor magna eget est lorem ipsum dolor. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum.
            Pharetra diam sit amet nisl. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Non curabitur gravida arcu ac tortor
            dignissim. Pellentesque id nibh tortor id. Ac turpis egestas maecenas pharetra. In massa tempor nec feugiat. In eu mi bibendum neque
            egestas congue quisque egestas diam. Habitant morbi tristique senectus et netus et. Sit amet nulla facilisi morbi. Imperdiet dui accumsan
            sit amet. Commodo nulla facilisi nullam vehicula ipsum a. Pharetra et ultrices neque ornare.
          </p>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  )
}
