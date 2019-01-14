import CreateUser from './User/UseCases/CreateUser'
import UpdateUser from './User/UseCases/UpdateUser'
import SoftDeleteUser from './User/UseCases/SofDeleteUser'
import LoginUser from './User/UseCases/LoginUser'
import UsersByFirstName from './User/UseCases/UsersByFirstName'
import CreateMovie from './Movie/UseCases/CreateMovie'
import UpdateMovie from './Movie/UseCases/UpdateMovie'
import SoftDeleteMovie from './Movie/UseCases/SofDeleteMovie'
import MoviesByTitle from './Movie/UseCases/MoviesByTitle'

export const resolvers = {
  Query: {
    UsersByFirstName,
    MoviesByTitle
    
  },
  Mutation: {
    CreateUser,
    UpdateUser,
    SoftDeleteUser,
    CreateMovie,
    UpdateMovie,
    SoftDeleteMovie,
    LoginUser
  }
};