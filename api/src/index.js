
import { ApolloServer } from "apollo-server"
import { driver } from './config/database'
import { schema } from './schemas'
/*
 * Create a new ApolloServer instance, serving the GraphQL schema
 * created using makeAugmentedSchema above and injecting the Neo4j driver
 * instance into the context object so it is available in the
 * generated resolvers to connect to the database.
 */
const server = new ApolloServer({
  context: ({ req }) => {
    // get the user token from the headers
    const token = req.headers.authorization || ''
   
    // try to retrieve a user with the token
    // TODO:  GET USER BY TOKEN
    const user = {
      id: '1',
      name: 'Breno Mazieiro',
      email: 'breno.mazieiro@gmail.com'
    }
    if(user) {
      // add the user and driver to the context
      return { user, driver }
    }
  },
  schema: schema
})

server.listen(process.env.GRAPHQL_LISTEN_PORT, "0.0.0.0").then(({ url }) => {
  console.log(`GraphQL API ready at ${url}`);
})
