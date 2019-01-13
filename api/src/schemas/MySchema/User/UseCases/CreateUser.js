import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"
import crypto from 'crypto'

export default async (obj, params, ctx, resolveInfo) => {
  params.dataUserInput.password = crypto.createHmac('sha256', process.env.JWT_SECRET).update(params.dataUserInput.password).digest('hex')
  const findUser = await ctx.driver.session().run(
    `MATCH (u:User {email: "${params.searchUserInput.email}"}) return u`
  )
  if (findUser.records.length > 0) {
    throw new ApolloError('user_already_exists', 200, 'This user already exists');
  } else {
    return neo4jgraphql(obj, params, ctx, resolveInfo, true)
  }
}