import React, { Suspense } from "react";
import { render } from "react-dom";
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import { ApolloProvider as ApolloHooksProvider } from "react-apollo-hooks";
import Movies from "./movies";
import { API } from "./config";

// const token = localStorage.getItem('token');
const token = false;
const client = new ApolloClient({
  uri: API,
  headers: {
    authorization: token ? token : ""
  }
});

const App = () => (
  <ApolloProvider client={client}>
    <ApolloHooksProvider client={client}>
      <Suspense fallback={<div>Loading...</div>}>
        <Movies />
      </Suspense>
    </ApolloHooksProvider>
  </ApolloProvider>
);

render(<App />, document.getElementById("root"));
