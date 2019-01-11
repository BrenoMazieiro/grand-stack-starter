import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"
import crypto from 'crypto'

export default async (obj, params, ctx, resolveInfo) => {
  params.updateUserInput.password = crypto.createHmac('sha256', process.env.JWT_SECRET).update(params.updateUserInput.password).digest('hex')
  return neo4jgraphql(obj, params, ctx, resolveInfo, true)
}