import { neo4jgraphql } from "neo4j-graphql-js";
import CreateUser from './use_case/CreateUser'
import MergeUser from './use_case/MergeUser'

export const resolvers = {
  Query: {
    usersBySubstring: neo4jgraphql
  },
  Mutation: {
    CreateUser,
    MergeUser,
    CreatePhone: neo4jgraphql
  }
};