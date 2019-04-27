import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"

export default (obj, params, ctx, resolveInfo) => {
  /* Is user authenticated ? */
  if(!ctx.user.id) {throw new ApolloError('not_authorized', 405, ['You are not allowed to do that'])}
  params.email = ctx.user.email
  return neo4jgraphql(obj, params, ctx, resolveInfo, true)
}