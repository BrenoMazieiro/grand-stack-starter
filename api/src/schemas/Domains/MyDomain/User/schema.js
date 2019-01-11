/* Definition */
export const User = `
type User {
    id: String
    first_name: String!
    last_name: String!
    email: String!
    password: String! @hideTheField
    token: String
    roles: [Role] @relation(name: "IS_A", direction: "OUT")
    phones: [Phone] @relation(name: "HAS_PHONE", direction: "OUT")
    friends: [User] @relation(name: "FRIENDS", direction: "BOTH")
  }
`
/* Queries */
export const UsersBySubstring = `
  usersBySubstring(substring: String): [User]
    @cypher(
      statement: "MATCH (u:User) WHERE u.name CONTAINS $substring RETURN u"
    )
`

/* Mutations */
export const CreateUser = `
  CreateUser (
    searchUserInput: searchUserInput
    updateUserInput: updateUserInput
  ): User
    @cypher(
      statement: "MERGE (u:User {email: $searchUserInput.email}) ON CREATE SET u.id = apoc.create.uuid(), u.name = $updateUserInput.name, u.email = $updateUserInput.email, u.password = $updateUserInput.password ON MATCH SET u.name = $updateUserInput.name, u.password = $updateUserInput.password RETURN u"
    )
`

export const MergeUser = `
  MergeUser (
    searchUserInput: searchUserInput
    updateUserInput: updateUserInput
  ): User
    @cypher(
      statement: "MERGE (u:User {email: $searchUserInput.email}) ON CREATE SET u.id = apoc.create.uuid(), u.name = $updateUserInput.name, u.email = $updateUserInput.email, u.password = $updateUserInput.password ON MATCH SET u.name = $updateUserInput.name, u.password = $updateUserInput.password RETURN u"
    )
`
export const UserInputs = `
input searchUserInput {
  email: String!
}

input updateUserInput {
  first_name: String!
  last_name: String!
  email: String!
  password: String!
}
`
