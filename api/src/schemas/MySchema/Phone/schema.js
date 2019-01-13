export const Phone =`
type Phone {
    id: String!
    phone_country: String!
    phone_number: String!
    pincode: String! @hideTheField
    validated: Boolean
    user: User @relation(name: "WROTE", direction: "IN")
  }
`

export const CreatePhone = `
  CreatePhone(
    searchPhoneInput: searchPhoneInput
  ): Phone 
    @cypher(
      statement: "MERGE (p:Phone {phone_country: $searchPhoneInput.phone_country, phone_number: $searchPhoneInput.phone_number } ) ON CREATE SET  p.id = apoc.create.uuid(), p.phone_country = $searchPhoneInput.phone_country, p.phone_number = $searchPhoneInput.phone_number, p.pincode = apoc.text.random(5) ON MATCH SET p.pincode = apoc.text.random(5) RETURN p"
    )
`

export const PhoneInputs = `
input searchPhoneInput {
  phone_country: String!
  phone_number: String!
}
`