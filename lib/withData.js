import React from 'react';
import PropTypes from 'prop-types';
import cookie from 'cookie';
import { ApolloProvider, getDataFromTree } from 'react-apollo';

import initApollo from './initApollo';
import initRedux from './initRedux';

function parseCookies(ctx = {}, options = {}) {
  if (ctx.req && ctx.req.headers){
    if(ctx.req.headers.cookie){
      return cookie.parse(
        ctx.req.headers.cookie,
        options,
      );
    }
    console.log('no cookies');
    return { };
  } else {
    return cookie.parse(
      document.cookie,
      options,
    );
  }
}

// eslint-disable-next-line
export default ComposedComponent => {
  return class WithData extends React.Component {
    static displayName = `WithData(${ComposedComponent.displayName})`;
    static propTypes = {
      // eslint-disable-next-line
      serverState: PropTypes.object.isRequired,
    }


    static async getInitialProps(ctx) {
      let serverState = {};

      const apollo = initApollo({}, {
        getToken: () => parseCookies(ctx)['user-token'],
      });
      const redux = initRedux(apollo);

      // Evaluate the composed component's getInitialProps()
      let composedInitialProps = {};
      if (ComposedComponent.getInitialProps) {
        composedInitialProps = await ComposedComponent.getInitialProps(ctx, apollo);
      }


      // Run all graphql queries in the component tree
      // and extract the resulting data
      if (!process.browser) {
        if (ctx.res && ctx.res.finished) {
          // When redirecting, the response is finished.
          // No point in continuing to render
          return
        }
        // Provide the `url` prop data in case a graphql query uses it
        const url = { query: ctx.query, pathname: ctx.pathname };

        // Run all graphql queries
        const app = (
          // No need to use the Redux Provider
          // because Apollo sets up the store for us
          <ApolloProvider client={apollo} store={redux}>
            <ComposedComponent url={url} {...composedInitialProps} />
          </ApolloProvider>
        );
        await getDataFromTree(app);

        // Extract query data from the store
        const state = apollo.getInitialState();

        // No need to include other initial Redux state because when it
        // initialises on the client-side it'll create it again anyway
        serverState = {
          apollo: { // Make sure to only include Apollo's data state
            data: state.data,
          },
        };
      }

      return {
        serverState,
        ...composedInitialProps,
      };
    }

    constructor(props) {
      super(props);
      this.apollo = initApollo(this.props.serverState, {
        getToken: () => parseCookies()['user-token'],
      });
      this.redux = initRedux(this.apollo, this.props.serverState);
    }

    render() {
      return (
        // No need to use the Redux Provider
        // because Apollo sets up the store for us
        <ApolloProvider client={this.apollo} store={this.redux}>
          <ComposedComponent {...this.props} />
        </ApolloProvider>
      );
    }
  };
};
