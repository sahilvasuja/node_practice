import {ApolloClient,HttpLink,ApolloProvider,InMemoryCache,from} from "@apollo/client";
import { onError } from "apollo-link-error";
import './index.css';
import Data from './pages/data';
const Errorlink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
  graphQLErrors.forEach(({ message, locations, path }) =>
  console.log(
    `[GraphQL error]: Message: ${message}`
    )
    );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  });
  const link= from([
    Errorlink,
    new HttpLink({uri: "http://localhost:3015/graphql"}),
  ])
  const client = new ApolloClient({
    cache: new InMemoryCache(),
    link: link,
  });
  
  function App() {
     
  return (
    <ApolloProvider client={client}>
    <div className="todo-app">
      <Data />
    </div>
  </ApolloProvider>
  );
}

export default App;
