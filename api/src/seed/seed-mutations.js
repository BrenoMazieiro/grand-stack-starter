export default /* GraphQL */ `
  mutation {
    u1: CreateUser(
    searchUserInput: {email: "administrator@mycompany.com"}
    dataUserInput: {
      first_name: "Administrator"
      last_name: "My Company"
      password: "mysecretpassword"
    }
    ){
      id,
      first_name,
      last_name,
      email,
      password
    }
  }
`;
