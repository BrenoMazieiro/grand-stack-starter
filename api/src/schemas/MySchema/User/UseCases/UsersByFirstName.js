import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"

export default async (obj, params, ctx, resolveInfo) => {
  /* Only the user or those who are admin can delete */
  if (ctx.user.role.includes('ADMIN')) {
    return neo4jgraphql(obj, params, ctx, resolveInfo, true)
  } else {
    throw new ApolloError('not_authorized', 405, ['You are not allowed to do that']);
  }
}