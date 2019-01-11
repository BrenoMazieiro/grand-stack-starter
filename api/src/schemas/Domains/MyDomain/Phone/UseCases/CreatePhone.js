import { neo4jgraphql } from 'neo4j-graphql-js'

export default (obj, params, ctx, resolveInfo) => {
  return neo4jgraphql(obj, params, ctx, resolveInfo, true)
}
