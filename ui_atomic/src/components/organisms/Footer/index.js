import React from 'react'
import styled from 'styled-components'

import { Paragraph, IconLink } from 'components'

const Wrapper = styled.div`
  grid-area: footer;
  background: #212121;
  
`

const InnerWrapper = styled.div`
  text-align:center;
`
const StyledIconLink = styled(IconLink)`
  padding:30px;
`
const Footer = (props) => {
  return (
    <Wrapper {...props}>
      <InnerWrapper>
        <Paragraph reverse>
          Powered by<br />
          <StyledIconLink icon="graphql" href="https://graphql.org/" Right height={100} >GraphQl</StyledIconLink>
          <StyledIconLink icon="react" href="https://reactjs.org/" Right height={100} >React</StyledIconLink>
          <StyledIconLink icon="apollo" href="https://www.apollographql.com/" Right height={100} >Apollo</StyledIconLink>
          <StyledIconLink icon="neo4j" href="https://neo4j.com/" Right height={100} >Neo4j Database</StyledIconLink>
          <StyledIconLink icon="arc" href="https://arc.js.org/" Right height={100} >ARc</StyledIconLink>
        </Paragraph>
      </InnerWrapper>
    </Wrapper>
  )
}

export default Footer
