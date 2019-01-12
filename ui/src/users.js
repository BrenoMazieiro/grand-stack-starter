import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';

let firstName = 'B'

const GET_USERS = gql`
{
  UsersByFirstName(substring: "${firstName}") {
    id
    first_name
    last_name
    email
    password
  }
}
`;

const Users = () => {
  const { data, error } = useQuery(GET_USERS);
  if (error) return `Error! ${error.message}`;
  
  if(data.UsersByFirstName.length > 0) {
    return (
      <div>
        <ul>
          {
            data.UsersByFirstName.map(user => (
              <div key={user.id}>
                <li>Id: {user.id} </li>
                <li>First Name: {user.first_name} </li>
                <li>Last Name: {user.last_name}</li>
              </div>
            ))
          }
        </ul>
      </div>
    );
  } else {
    return (
      <ul>
        there is no user yet!
      </ul>
  );
  }
};

export default Users;