import { ApolloClient, createNetworkInterface } from 'react-apollo';
import fetch from 'isomorphic-fetch';

const apolloClient = null;

// Polyfill fetch() on the server (used by apollo-client)
if (!process.browser) {
  global.fetch = fetch;
}

function create(token = '') {
  const networkInterface = createNetworkInterface({ uri: 'https://us-west-2.api.scaphold.io/graphql/migo-iq-test' });
  networkInterface.use([{
    applyMiddleware(req, next) {
      if (!req.options.headers) {
        req.options.headers = {};
      }
      if (token) {
        req.options.headers.authorization = token;
      }
      next();
    },
  }]);
  return new ApolloClient({
    ssrMode: !process.browser, // Disables forceFetch on the server (so queries are only run once)
    networkInterface,
  });
}

export default function initApollo(cookies) {
  // Make sure to create a new client for every server-side request so that data
  // isn't shared between connections (which would be bad)
  if (!process.browser) {
    return create(cookies['user-token']);
  }

  // Reuse client on the client-side
  if (!apolloClient) {
    return create(cookies['user-token']);
  }

  return apolloClient;
}
