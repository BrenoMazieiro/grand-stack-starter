import { directives } from './Directives'
import { User, UsersByFirstName, Myself, CreateUser, UpdateUser, SoftDeleteUser, LoginUser, UserInputs } from './User/schema'
import { Movie, MoviesByTitle, CreateMovie, UpdateMovie, SoftDeleteMovie, MovieInputs } from './Movie/schema'
import { Role } from './Role/schema'

export const typeDefs = `
${directives}

${User}
${Role}
${Movie}

type Query {
  ${UsersByFirstName}
  ${Myself}
  ${MoviesByTitle}
}

type Mutation {
  ${CreateUser}
  ${UpdateUser}
  ${SoftDeleteUser}
  ${LoginUser}
  ${CreateMovie}
  ${UpdateMovie}
  ${SoftDeleteMovie}
}

${UserInputs}
${MovieInputs}

`