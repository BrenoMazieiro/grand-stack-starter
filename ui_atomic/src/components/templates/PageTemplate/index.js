// https://github.com/diegohaz/arc/wiki/Atomic-Design#templates
import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const Wrapper = styled.div`
  display: grid;
  min-height: 100%;
  grid-template-columns: repeat(12, 1fr);
  grid-template-areas:
    "nav nav nav nav nav nav nav nav nav nav nav nav "
    "hero hero hero hero hero hero hero hero hero hero hero hero "
    "main main main main main main main main main main main main"
    "footer footer footer footer footer footer footer footer footer footer footer footer";
`

const PageTemplate = ({
  header, hero, children, footer, ...props
  // header, hero, children, footer, ...props
}) => {
  return (
    <Wrapper {...props}>
      {header}
      {hero}
      {children}
      {footer}
    </Wrapper>
  )
}

PageTemplate.propTypes = {
  header: PropTypes.node,
  hero: PropTypes.node,
  footer: PropTypes.node,
  children: PropTypes.any,
}

export default PageTemplate
