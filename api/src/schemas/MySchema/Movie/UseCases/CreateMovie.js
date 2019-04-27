import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"

export default async (obj, params, ctx, resolveInfo) => {
  if (ctx.user.role.includes('ADMIN')) {
    return ctx.driver.session().run(
      `MATCH (m:Movie {title: "${params.searchMovieInput.title}", year: "${params.searchMovieInput.year}"}) return m`
    ).then(async data => {
      if (data.records.length) {
        throw new ApolloError('movie_already_exists', 200, 'This movie already exists');
      } else {
        return neo4jgraphql(obj, params, ctx, resolveInfo)
      }
    }).catch(e =>{console.log('===>',e)})
  } else {
    throw new ApolloError('not_authorized', 405, ['You are not allowed to do that']);
  }
}