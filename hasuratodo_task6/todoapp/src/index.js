import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  ApolloClient,
  ApolloProvider,
  gql,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { Todos } from "./todo";

export const client = new ApolloClient({
  link: new HttpLink({
    uri: "https://sahil-firstproject.hasura.app/v1/graphql",
    headers: {
      "x-hasura-admin-secret":
        "zfzk7e4yAENhUT7RYhuWYWaul5AXt5uAPd38Jzd2CyJQz7GJrutVOAsDSQGCU3z6",
    },
  }),
  cache: new InMemoryCache(),
});

const App = () => (
  <ApolloProvider client={client}>
    <Todos />
  </ApolloProvider>
);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
