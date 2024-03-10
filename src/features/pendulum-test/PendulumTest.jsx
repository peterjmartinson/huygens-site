// @ts-check

import React from 'react'
import { MainContainer, ContentContainer } from '@/components/Layout'
import { Drawing } from './Drawing'

export default function PendulumTest () {
  // add useState, etc hooks

  return (
    <MainContainer>
      <ContentContainer>
        <Drawing />
      </ContentContainer>

      <ContentContainer>
        {/* text content */}
      </ContentContainer>
    </MainContainer>
  )
}
