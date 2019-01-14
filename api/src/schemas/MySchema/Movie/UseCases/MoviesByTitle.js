import { neo4jgraphql } from "neo4j-graphql-js";
import { ApolloError } from "apollo-server"

export default async (obj, params, ctx, resolveInfo) => {
  /* Only those who are admin can delete */
    return neo4jgraphql(obj, params, ctx, resolveInfo, true)
}