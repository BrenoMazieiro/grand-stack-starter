import React, { Suspense } from 'react';
import { render } from 'react-dom';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from 'react-apollo';
import { ApolloProvider as ApolloHooksProvider } from 'react-apollo-hooks';
import Users from './users'

const client = new ApolloClient({
  uri: "http://mycompany-api.local.com/"
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