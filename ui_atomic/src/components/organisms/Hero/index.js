import React from 'react'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import {
  Block,
  Paragraph,
  IconButton,
  LogoImage,
  Tooltip,
} from 'components'

const Wrapper = styled(Block)`
  display: grid;
  grid-area: hero;
  background: #181818;
  height: 310px;
  grid-gap: 10px;
  grid-template-columns: repeat(6, 1fr);
  grid-template-areas: ". heroImage heroDescription heroDescription heroDescription .";
`

const HeroImage = styled.div`
  grid-area: heroImage;
  display: block;
  padding: 20px
`
const HeroDescription = styled.div`
  font-size: 25px;
  grid-area: heroDescription;
  display: block;
  padding: 20px;
  align-self:center;
`

const Text = styled(Paragraph)`
  color: ${palette('grayscale', 3, true)};
  font-weight: 300;
  font-size: 1.35rem;
  line-height: 1.35em;
  width: 100%;
  letter-spacing: 0.05em;
  @media screen and (max-width: 640px) {
    text-align: center;
    font-size: 1rem;
  }
`

const ButtonGroup = styled.div`
  display: flex;
  > :not(:first-child) {
    margin-left: 0.5rem;
  }
`

const Hero = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      <HeroImage>
        <LogoImage height={210} />
        <ButtonGroup>
          <Tooltip reverse data-title="Check it out! 😄">
            <IconButton icon="github" href="https://github.com/grand-stack/grand-stack-starter">GitHub</IconButton>
          </Tooltip>
          <Tooltip reverse data-title="Read the docs! ¯\_(ツ)_/¯" align="end" position="bottom">
            <IconButton icon="docs" href="https://grandstack.io/docs/getting-started.html">Docs</IconButton>
          </Tooltip>
        </ButtonGroup>
      </HeroImage>
      <HeroDescription>
        <Text>
          This is a movies example using <strong>GRANDStack</strong>!
        </Text>
      </HeroDescription>
    </Wrapper>
  )
}

export default Hero
