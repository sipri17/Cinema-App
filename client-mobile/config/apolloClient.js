
import { ApolloClient, InMemoryCache, ApolloProvider, gql } from '@apollo/client';
const BASE_URL_ORCHESTRATOR = "http://13.212.52.47"

export const client = new ApolloClient({
    uri: BASE_URL_ORCHESTRATOR,
    cache: new InMemoryCache(),
});
