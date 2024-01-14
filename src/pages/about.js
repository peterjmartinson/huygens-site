import React, { useState } from 'react'
import Head from 'next/head'
import { PageContainer, MainContainer, ContentContainer } from '@/components/Layout'
import { Circle } from '@/drawings/circle'
import { Example } from '@/drawings/example'

export default function About () {
  const [isPaused, setIsPaused] = useState(true)

  const togglePause = () => setIsPaused(paused => !paused)

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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
            {' '}
            <span
              onClick={togglePause}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(true)}
              style={{ color: 'teal', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              incididunt
            </span>
            {' '}
            ut  labore et dolore magna aliqua. Ornare lectus sit amet est placerat in egestas erat imperdiet. Volutpat maecenas volutpat blandit aliquam etiam. Luctus venenatis lectus magna fringilla. Nunc non blandit massa enim nec dui nunc mattis enim. Sed risus ultricies tristique nulla aliquet. Luctus venenatis lectus magna fringilla. Id donec ultrices tincidunt arcu non sodales. Dictum sit amet justo donec enim diam vulputate. Senectus et netus et malesuada fames ac turpis. Porta lorem mollis aliquam ut porttitor leo a. Duis at tellus at urna. Proin sed libero enim sed. Posuere urna nec tincidunt praesent semper feugiat nibh. Ullamcorper velit sed ullamcorper morbi tincidunt ornare massa eget. Nisi scelerisque eu ultrices vitae auctor. Vitae tempus quam pellentesque nec.
          </p>
          <p>
            Consequat nisl vel pretium lectus quam id leo in. Feugiat vivamus at augue eget
            {' '}
            <span
              onClick={togglePause}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(true)}
              style={{ color: 'teal', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              arcu
            </span>
            {' '}
            dictum  varius duis at. Hendrerit dolor magna eget est lorem ipsum dolor. Maecenas pharetra convallis posuere morbi leo urna molestie at elementum. Pharetra diam sit amet nisl. Tristique et egestas quis ipsum suspendisse ultrices gravida dictum. Non curabitur gravida arcu ac tortor dignissim. Pellentesque id nibh tortor id. Ac turpis egestas maecenas pharetra. In massa tempor nec feugiat. In eu mi bibendum neque egestas congue quisque egestas diam. Habitant morbi tristique senectus et netus et. Sit amet nulla facilisi morbi. Imperdiet dui accumsan sit amet. Commodo nulla facilisi nullam vehicula ipsum a. Pharetra et ultrices neque ornare.
          </p>
          <p>
            Enim blandit volutpat maecenas volutpat blandit aliquam etiam. Suspendisse
            {' '}
            <span
              onClick={togglePause}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(true)}
              style={{ color: 'teal', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              interdum
            </span>
            {' '}
            consectetur libero id faucibus nisl. Enim diam vulputate ut pharetra sit amet. Vitae aliquet nec ullamcorper sit amet risus. Et netus et malesuada fames ac turpis. Volutpat blandit aliquam etiam erat velit scelerisque. Condimentum mattis pellentesque id nibh tortor. Lacinia quis vel eros donec ac odio tempor orci dapibus. Rutrum tellus pellentesque eu tincidunt tortor aliquam. Imperdiet dui accumsan sit amet nulla. Duis ut diam quam nulla porttitor. Sed vulputate mi sit amet mauris commodo quis.
          </p>
          <p>
            Tincidunt tortor aliquam nulla facilisi. Eu lobortis elementum nibh tellus
            {' '}
            <span
              onClick={togglePause}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(true)}
              style={{ color: 'teal', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              molestie
            </span>
            {' '}
            nunc.  Morbi tristique senectus et netus et malesuada fames ac. Turpis massa sed elementum tempus. Non quam lacus suspendisse faucibus interdum posuere lorem ipsum dolor. Dignissim diam quis enim lobortis scelerisque fermentum. Viverra maecenas accumsan lacus vel facilisis volutpat est velit egestas. Mattis ullamcorper velit sed ullamcorper morbi tincidunt. Dapibus ultrices in iaculis nunc sed augue lacus. Sollicitudin aliquam ultrices sagittis orci a. Dui sapien eget mi proin sed libero enim. Lectus nulla at volutpat diam ut venenatis. Tellus cras adipiscing enim eu turpis egestas pretium aenean. Vitae et leo duis ut diam quam nulla porttitor massa. Tristique risus nec feugiat in. Quam elementum pulvinar etiam non. Diam maecenas sed enim ut sem. Sodales ut eu sem integer vitae justo eget magna fermentum.
          </p>
          <p>
            Mauris in aliquam sem fringilla ut. Id faucibus nisl tincidunt eget nullam non
            {' '}
            <span
              onClick={togglePause}
              onMouseEnter={() => setIsPaused(false)}
              onMouseLeave={() => setIsPaused(true)}
              style={{ color: 'teal', fontWeight: 'bold', textDecoration: 'underline' }}
            >
              nisi
            </span>
            {' '}
            est.  Faucibus a pellentesque sit amet porttitor eget dolor morbi non. Nec dui nunc mattis enim ut tellus elementum. Sagittis vitae et leo duis ut. Scelerisque purus semper eget duis at tellus at. Viverra tellus in hac habitasse platea dictumst vestibulum. Velit dignissim sodales ut eu sem integer vitae justo eget. Convallis convallis tellus id interdum velit laoreet id donec. Lorem ipsum dolor sit amet consectetur adipiscing elit ut. Mi ipsum faucibus vitae aliquet nec ullamcorper sit amet. Purus semper eget duis at. Id aliquet risus feugiat in ante metus dictum. In tellus integer feugiat scelerisque varius morbi enim nunc faucibus. Mi tempus imperdiet nulla malesuada pellentesque elit. Ac turpis egestas sed tempus urna et pharetra. Et malesuada fames ac turpis egestas sed tempus urna. Rhoncus dolor purus non enim praesent elementum. Nisl suscipit adipiscing bibendum est ultricies integer quis. Tempor commodo ullamcorper a lacus.
          </p>
        </ContentContainer>
      </MainContainer>
    </PageContainer>
  )
}
