import { directives } from './Directives'
import { Phone, CreatePhone, PhoneInputs } from './Phone/schema'
import { User, UsersBySubstring, CreateUser, MergeUser, UserInputs } from './User/schema'
import { Role } from './Role/schema'

export const typeDefs = `
${directives}

${Phone}
${User}
${Role}

type Query {
  ${UsersBySubstring}
}

type Mutation {
  ${CreatePhone}
  ${CreateUser}
  ${MergeUser}
}

${PhoneInputs}
${UserInputs}

`