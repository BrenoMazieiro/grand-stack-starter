/* Definition */
export const Movie = `
type Movie {
  id: ID!
  title: String
  year: Int
  plot: String
  poster: String
  imdbRating: Float
  created: Date
  updated: Date
  softDeleted: Boolean
  genres: [String]
  similar(first: Int=3, offset:Int=0): [Movie]
}
type DeletedMovie {
  deleted: Boolean
}
`
/* Queries */
export const MoviesByTitle = `
  MoviesByTitle(substring: String): [Movie]
    @cypher(
      statement: "MATCH (u:Movie) WHERE u.title CONTAINS $substring and u.softDeleted=false RETURN u"
    )
`

/* Mutations */
export const CreateMovie = `
  CreateMovie (
    searchMovieInput: searchMovieInput
    dataMovieInput: dataMovieInput
  ): Movie
  @cypher(
    statement: 
      "MERGE (m:Movie {title: $searchMovieInput.title, year: $searchMovieInput.year}) \
      ON CREATE SET \
        m.id = apoc.create.uuid(), \
        m.title = $searchMovieInput.title, \
        m.year = $searchMovieInput.year, \
        m.plot = $dataMovieInput.plot, \
        m.poster = $dataMovieInput.poster, \
        m.imdbRating = $dataMovieInput.imdbRating, \
        m.created = datetime(), \
        m.softDeleted = false \
      ON MATCH SET \
        m.title = $searchMovieInput.title, \
        m.year = $searchMovieInput.year, \
        m.plot = $dataMovieInput.plot, \
        m.poster = $dataMovieInput.poster, \
        m.imdbRating = $dataMovieInput.imdbRating, \
        m.password = $dataMovieInput.password, \
        m.updated = datetime() \
      RETURN m"
    )
`

export const UpdateMovie = `
  UpdateMovie (
    searchMovieInput: searchMovieInput
    dataMovieInput: dataMovieInput
  ): Movie
  @cypher(
    statement: 
      "MERGE (m:Movie {title: $searchMovieInput.title, year: $searchMovieInput.year}) \
      ON CREATE SET \
        m.id = apoc.create.uuid(), \
        m.title = $searchMovieInput.title, \
        m.year = $searchMovieInput.year, \
        m.plot = $dataMovieInput.plot, \
        m.poster = $dataMovieInput.poster, \
        m.imdbRating = $dataMovieInput.imdbRating, \
        m.created = datetime(), \
        m.softDeleted = false \
      ON MATCH SET \
        m.title = $searchMovieInput.title, \
        m.year = $searchMovieInput.year, \
        m.plot = $dataMovieInput.plot, \
        m.poster = $dataMovieInput.poster, \
        m.imdbRating = $dataMovieInput.imdbRating, \
        m.password = $dataMovieInput.password, \
        m.updated = datetime() \
      RETURN m"
    )
`
export const SoftDeleteMovie = `
  SoftDeleteMovie (
    searchMovieInput: searchMovieInput
  ): DeletedMovie
    @cypher(
      statement: 
        "MATCH (m:Movie {title: $searchMovieInput.title, year: $searchMovieInput.year}) \
        SET m.softDeleted = true \
        RETURN {deleted: true}"
    )
`

export const MovieInputs = `
input searchMovieInput {
  title: String!
  year: Int!
}

input dataMovieInput {
  plot: String
  poster: String
  imdbRating: Float
}

input loginMovieInput {
  email: String!
  password: String!
}
`
