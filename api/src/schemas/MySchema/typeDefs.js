import { directives } from './Directives'
import { User, UsersByFirstName, CreateUser, UpdateUser, SoftDeleteUser, LoginUser, UserInputs } from './User/schema'
import { Role } from './Role/schema'

export const typeDefs = `
${directives}

${User}
${Role}

type Query {
  ${UsersByFirstName}
}

type Mutation {
  ${CreateUser}
  ${UpdateUser}
  ${LoginUser}
  ${SoftDeleteUser}
}

${UserInputs}

`