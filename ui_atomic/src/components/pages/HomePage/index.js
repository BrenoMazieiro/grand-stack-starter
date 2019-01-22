// https://github.com/diegohaz/arc/wiki/Atomic-Design
import React from 'react'

import { PageTemplate, Header, Hero, MovieList, Footer } from 'components'

const HomePage = () => {
  return (
    <PageTemplate
      header={<Header />}
      hero={<Hero />}
      footer={<Footer />}
    >
      <MovieList />
    </PageTemplate>
  )
}

export default HomePage
