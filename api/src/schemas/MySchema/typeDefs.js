import { directives } from './Directives'
import { Phone, CreatePhone, PhoneInputs } from './Phone/schema'
import { User, UsersByFirstName, CreateUser, UpdateUser, SoftDeleteUser, LoginUser, UserInputs } from './User/schema'
import { Role } from './Role/schema'

export const typeDefs = `
${directives}

${Phone}
${User}
${Role}

type Query {
  ${UsersByFirstName}
}

type Mutation {
  ${CreatePhone}
  ${CreateUser}
  ${UpdateUser}
  ${LoginUser}
  ${SoftDeleteUser}
}

${PhoneInputs}
${UserInputs}

`