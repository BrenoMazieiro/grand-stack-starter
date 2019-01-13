import React, { Suspense } from 'react';
import { render } from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Users from './users'
import { API } from './config'

// const token = localStorage.getItem('token'); 
const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjUzNjk5YzkyLWM3ZGUtNDAzNy05YzZkLWExODA2ZTJiYzI2YSIsImVtYWlsIjoiYnJlbm8ubWF6aWVpcm9AZ21haWwuY29tIiwiZmlyc3RfbmFtZSI6IkJyZW5vIG91dHJvIiwibGFzdF9uYW1lIjoiTWF6aWVpcm8iLCJyb2xlIjpbIkFETUlOIl0sImlhdCI6MTU0NzQxMDM5OSwiZXhwIjoxNTQ3NTgzMTk5fQ.hxQugMHf-X_3ijdfHN9LeTKxfSxgLpppiwFbkqspBqI"
const client = new ApolloClient({
  uri: API,
  headers: {
          authorization: token ? token : "",
        }
});

const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
   </ApolloHooksProvider>
  </ApolloProvider>
);

render(<App />, document.getElementById('root'));