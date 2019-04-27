/* Definition */
export const User = `
type User {
  id: String
  first_name: String!
  last_name: String!
  email: String!
  password: String! @hideTheField
  created: Date
  updated: Date
  softDeleted: Boolean
  roles: [Role] @relation(name: "PLAYS", direction: "OUT")
  friends: [User] @relation(name: "FRIENDS", direction: "BOTH")
}

type DeletedUser {
  deleted: Boolean
}

type LoginUser {
  token: String
}
`
/* Queries */
export const UsersByFirstName = `
  UsersByFirstName(substring: String): [User]
    @cypher(
      statement: "MATCH (u:User) WHERE u.first_name CONTAINS $substring and u.softDeleted=false RETURN u"
    )
`
export const Myself = `
  Myself(searchUserInput: searchUserInput) : User
  @cypher(
    statement: "Match (u:User {email: $searchUserInput.email}) return u"
  )
`
/* Mutations */
export const CreateUser = `
  CreateUser (
    searchUserInput: searchUserInput
    dataUserInput: dataUserInput
  ): User
    @cypher(
      statement: 
        "MERGE (u:User {email: $searchUserInput.email}) \
        ON CREATE SET \
          u.id = apoc.create.uuid(), \
          u.first_name = $dataUserInput.first_name, \
          u.last_name = $dataUserInput.last_name, \
          u.email = $searchUserInput.email, \
          u.password = $dataUserInput.password, \
          u.created = datetime(), \
          u.softDeleted = false \
        ON MATCH SET \
          u.first_name = $dataUserInput.first_name, \
          u.last_name = $dataUserInput.last_name, \
          u.password = $dataUserInput.password, \
          u.updated = datetime() \
        MERGE (r:Role {name: 'SUBSCRIBER'}) \
        CREATE (u)-[p:PLAYS]->(r) \
        RETURN u"
    )
`

export const UpdateUser = `
  UpdateUser (
    searchUserInput: searchUserInput
    dataUserInput: dataUserInput
  ): User
    @cypher(
      statement: 
        "MERGE (u:User {email: $searchUserInput.email}) \
        ON CREATE SET \
          u.id = apoc.create.uuid(), \
          u.first_name = $dataUserInput.first_name, \
          u.last_name = $dataUserInput.last_name, \
          u.email = $searchUserInput.email, \
          u.password = $dataUserInput.password, \
          u.created = datetime(), \
          u.softDeleted = false \
        ON MATCH SET \
          u.first_name = $dataUserInput.first_name, \
          u.last_name = $dataUserInput.last_name, \
          u.password = $dataUserInput.password, \
          u.updated = datetime() \
        RETURN u"
    )
`
export const SoftDeleteUser = `
  SoftDeleteUser (
    searchUserInput: searchUserInput
  ): DeletedUser
    @cypher(
      statement: 
        "MATCH (u:User {email: $searchUserInput.email}) \
        SET u.softDeleted = true \
        RETURN {deleted: true}"
    )
`

export const LoginUser = `
  LoginUser (
    loginUserInput: loginUserInput
  ): LoginUser
`

export const UserInputs = `
input searchUserInput {
  email: String!
}

input dataUserInput {
  first_name: String!
  last_name: String!
  password: String!
}

input loginUserInput {
  email: String!
  password: String!
}
`
