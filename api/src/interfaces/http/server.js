import { ApolloServer } from "apollo-server"
import { ApolloError } from "apollo-server"
import { driver } from '../../infra/databases/database'
import { schema } from '../../schemas'
import jwt from 'jsonwebtoken'
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
    let user = null
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
  schema: schema,
  formatError: error => {
    // console.log(error)
    // console.log(error.extensions.exception)
    console.log('\x1b[31m%s%s%s%s%s%s%s\x1b[0m', '[', Date(), "]", " - ERROR Message: ", error.message, " ERROR Detail: ", error.extensions.exception[0])
    return {
      "message": error.message,
      "code": error.extensions.code,
      "Detail": error.extensions.exception[0],
      "Path": error.path ? error.path[0] : null,
    }
  },
  formatResponse: response => {
    return response
  },
})

server.init = function () {
  server.listen(process.env.GRAPHQL_LISTEN_PORT, "0.0.0.0").then(({ url }) => {
    console.log('\x1b[33m%s\x1b[0m', `👍  GraphQL API ready at http://${process.env.VIRTUAL_HOST} 👍`)
  })
}

// Export the module
export default server
