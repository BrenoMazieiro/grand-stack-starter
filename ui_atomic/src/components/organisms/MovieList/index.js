import React from 'react'
import styled from 'styled-components'

import { Block } from 'components'

const Wrapper = styled.div`
  grid-area: main;
  display: grid;
  align-content: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas:
      "filter filter"
      "movies movies";

`
const StyledBlock = styled(Block)`
  grid-area: filter;
  background: #212121;
  padding: 10px;
  display: grid;
  align-self: center;
  grid-template-columns: repeat(2, 1fr);
  grid-template-areas: "filterperpage filterstars";

`

const Movies = styled.div`
  grid-area: movies;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(4, 2fr);
  background: #ccc !important;
  align-self: center;
`
const Movie = styled.div`
  width: 20px;
  background: #777;
  width: 300px;
  height: 400px;
  justify-self: center;
`
const MovieList = ({ ...props }) => (
  <Wrapper {...props}>
    <StyledBlock reverse>
      Filter
    </StyledBlock>
    <Movies>
      <Movie>
        1
      </Movie>
      <Movie>
        2
      </Movie>
      <Movie>
        3
      </Movie>
      <Movie>
        4
      </Movie>
      <Movie>
        5
      </Movie>
      <Movie>
        6
      </Movie>
      <Movie>
        7
      </Movie>
      <Movie>
        8
      </Movie>
      <Movie>
        9
      </Movie>
      <Movie>
        10
      </Movie>
      <Movie>
        11
      </Movie>
      <Movie>
        12
      </Movie>
    </Movies>
  </Wrapper>
)

export default MovieList
