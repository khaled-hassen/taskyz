import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import "./assets/index.css";
import {
  ApolloClient,
  ApolloLink,
  ApolloProvider,
  concat,
  HttpLink,
  InMemoryCache,
} from "@apollo/client";
import { getAuthToken } from "./utils/token.utils";

const httpLink = new HttpLink({
  uri: process.env.REACT_APP_API,
  credentials: "include",
});

const authMiddleware = new ApolloLink((operation, forward) => {
  operation.setContext({ headers: { authorization: getAuthToken() } });
  return forward(operation);
});

const client = new ApolloClient({
  link: concat(authMiddleware, httpLink),
  cache: new InMemoryCache(),
});

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
