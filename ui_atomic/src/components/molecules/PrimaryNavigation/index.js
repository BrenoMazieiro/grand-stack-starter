import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { palette } from 'styled-theme'

import { Link } from 'components'

const Menu = styled.menu`
  grid-area: menu;
  justify-self: start;
  > :not(:first-child) {
    margin-left: 1rem;
  }
  a {
    font-weight: 300;
    color: ${palette('grayscale', 2)};
    font-size: 1.25rem;
    &.active {
      color: ${palette('grayscale', 0)};
    }
  }
`

const PrimaryNavigation = (props) => {
  return (
    <Menu {...props}>
      <Link to="/" exact activeClassName="active">Movies</Link>
      <Link to="/series" activeClassName="active">Series</Link>
    </Menu>
  )
}

PrimaryNavigation.propTypes = {
  reverse: PropTypes.bool,
}

export default PrimaryNavigation
