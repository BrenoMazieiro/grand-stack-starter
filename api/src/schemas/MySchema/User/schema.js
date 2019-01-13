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
    token: String
    roles: [Role] @relation(name: "IS_A", direction: "OUT")
    phones: [Phone] @relation(name: "HAS_PHONE", direction: "OUT")
    friends: [User] @relation(name: "FRIENDS", direction: "BOTH")
  }
`
/* Queries */
export const UsersByFirstName = `
  UsersByFirstName(substring: String): [User]
    @cypher(
      statement: "MATCH (u:User) WHERE u.first_name CONTAINS $substring RETURN u"
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
export const UserInputs = `
input searchUserInput {
  email: String!
}

input dataUserInput {
  first_name: String!
  last_name: String!
  password: String!
}
`
