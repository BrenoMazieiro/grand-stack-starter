import { neo4jgraphql } from "neo4j-graphql-js";

export const resolvers = {
    Query: {
      usersBySubstring: neo4jgraphql
    },
    Mutation: {
      CreateUser: neo4jgraphql,
      CreatePhone: neo4jgraphql
    }
  };