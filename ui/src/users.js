import gql from 'graphql-tag';
import React from 'react';
import { useQuery } from 'react-apollo-hooks';

const GET_USERS = gql`
  {
    User {
      id
      name
    }
  }
`;

const Users = () => {
  const { data, error } = useQuery(GET_USERS);
  if (error) return `Error! ${error.message}`;
  console.log(data);

  return (
      <ul>
        {data.User.map(user => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
  );
};

export default Users;