import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"
import crypto from 'crypto'

export default async (obj, params, ctx, resolveInfo) => {
  if (ctx.user.role.includes('ADMIN') || ctx.user.email === params.searchUserInput.email) {
    params.updateUserInput.password = crypto.createHmac('sha256', process.env.JWT_SECRET).update(params.updateUserInput.password).digest('hex')
    return neo4jgraphql(obj, params, ctx, resolveInfo, true)
  } else {
    throw new ApolloError('not_authorized', 405, ['You are not allowed to do that']);
  }
}