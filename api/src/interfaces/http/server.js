import { ApolloServer } from "apollo-server"
import { driver } from '../../infra/databases/database'
import { schema } from '../../schemas'
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
    console.log(token)
   
    // try to retrieve a user with the token
    // TODO:  GET USER BY TOKEN
    const user = {
      id: '1',
      name: 'Breno Mazieiro',
      email: 'breno.mazieiro@gmail.com',
      role: ['SUBSCRIBER']
    }
    if(user) {
      // add the user and driver to the context
      return { user, driver }
    }
  },
  schema: schema
})

server.init = function(){
  server.listen(process.env.GRAPHQL_LISTEN_PORT, "0.0.0.0").then(({ url }) => {
    console.log('\x1b[36m%s\x1b[0m',`👍 GraphQL API ready at http://${process.env.VIRTUAL_HOST} 👍`)
  })
}

 // Export the module
 export default server
