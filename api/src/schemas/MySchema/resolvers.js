import { neo4jgraphql } from "neo4j-graphql-js";
import CreateUser from './User/UseCases/CreateUser'
import UpdateUser from './User/UseCases/UpdateUser'
import SoftDeleteUser from './User/UseCases/SofDeleteUser'
import CreatePhone from './Phone/UseCases/CreatePhone'

export const resolvers = {
  Query: {
    UsersByFirstName: neo4jgraphql
  },
  Mutation: {
    CreateUser,
    UpdateUser,
    SoftDeleteUser,
    CreatePhone
  }
};