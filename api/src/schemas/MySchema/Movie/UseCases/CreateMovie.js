import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"

export default async (obj, params, ctx, resolveInfo) => {
  if (ctx.user.role.includes('ADMIN')) {
    return ctx.driver.session().run(
      `MATCH (m:Movie {title: "${params.searchMovieInput.title}", year: "${params.searchMovieInput.year}"}) return m`
    )
    .then(async data => {
      if (data.records.length) {
        throw new ApolloError('This movie already exists', 'movie_already_exists');
      } else {
        return neo4jgraphql(obj, params, ctx, resolveInfo)
      }
    })
    .catch(e => { throw new ApolloError(`There was an error: ${e}`, 'movie_already_exists')} )
  } else {
    throw new ApolloError('not_authorized', 405, ['You are not allowed to do that']);
  }
}