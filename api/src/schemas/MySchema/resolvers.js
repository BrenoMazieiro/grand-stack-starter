import CreateUser from './User/UseCases/CreateUser'
import UpdateUser from './User/UseCases/UpdateUser'
import SoftDeleteUser from './User/UseCases/SofDeleteUser'
import LoginUser from './User/UseCases/LoginUser'
import CreatePhone from './Phone/UseCases/CreatePhone'
import UsersByFirstName from './User/UseCases/UsersByFirstName'

export const resolvers = {
  Query: {
    UsersByFirstName
  },
  Mutation: {
    CreateUser,
    UpdateUser,
    SoftDeleteUser,
    LoginUser,
    CreatePhone
  }
};