import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"
import crypto from 'crypto'

export default async (obj, params, ctx, resolveInfo) => {
  /* Only the user or those who are admin can make changes */
  if (ctx.user.role.includes('ADMIN') || ctx.user.email === params.searchUserInput.email) {
    params.dataUserInput.password = crypto.createHmac('sha256', process.env.HASH_SECRET).update(params.dataUserInput.password).digest('hex')
    return neo4jgraphql(obj, params, ctx, resolveInfo, true)
  } else {
    throw new ApolloError('not_authorized', 405, ['You are not allowed to do that']);
  }
}