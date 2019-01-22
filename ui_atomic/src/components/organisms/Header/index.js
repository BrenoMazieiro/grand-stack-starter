import React from 'react'
import styled from 'styled-components'

import { IconLink, PrimaryNavigation, Block } from 'components'
// import { UserButton } from 'containers'

const Wrapper = styled(Block)`
  grid-area: nav;
  display: grid;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas: "icon menu menu menu menu menu search search search search register register";
  background: #212121;
  height: 50px;
`

const StyledIconLink = styled(IconLink)`
  grid-area: icon;
  padding: 10px;
  text-align: start;
  justify-self: end;
`

const Header = (props) => {
  return (
    <Wrapper opaque reverse {...props}>
      <StyledIconLink to="/" icon="grandstack" height={100} />
      <PrimaryNavigation reverse />
    </Wrapper>
  )
}

export default Header
