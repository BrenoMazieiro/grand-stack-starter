import { ApolloServer } from "apollo-server"
import { ApolloError } from "apollo-server"
import { driver } from '../../infra/databases/database'
import { schema } from '../../schemas'
import jwt from 'jsonwebtoken'
import { decode } from "punycode";
/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
const server = new ApolloServer({
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization
    let user = false
    let decoded = false

    // try to retrieve a user with the token
    if (token) {
      try {
        decoded = jwt.verify(token, process.env.JWT_SECRET)
      } catch(e) {
        throw new ApolloError('invalid_token', 401, ['Token is not valid!']);
      }
      if (!decoded.id) {
        throw new ApolloError('invalid_token', 401, ['Token is not valid!']);
      } else {
        user = decoded
      }
    } else {
      user = {
        role: ['ANONYMOUS']
      }
    }
    return { user, driver }
  },
  schema: schema
})

server.init = function () {
  server.listen(process.env.GRAPHQL_LISTEN_PORT, "0.0.0.0").then(({ url }) => {
    console.log('\x1b[36m%s\x1b[0m', `👍 GraphQL API ready at http://${process.env.VIRTUAL_HOST} 👍`)
  })
}

// Export the module
export default server
