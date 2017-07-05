import React from 'react';
import cookie from 'cookie';
import { withApollo, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import withData from '../lib/withData';
import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { username } = await checkLoggedIn(context, apolloClient);

    if (!username) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin');
    }

    return { username };
  }

  signout = () => {
    // eslint-disable-next-line
    document.cookie = cookie.serialize('user-token', '', {
      maxAge: -1, // Expire the cookie immediately
    });

    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    console.log(this.props.client);
    this.props.client.resetStore();
    redirect({}, '/signin');
  }

  render() {
    return (
      <div>
        Hello {this.props.username}!<br />
        <button onClick={this.signout}>Sign out</button>
      </div>
    );
  }
}

Index.propTypes = {
  username: PropTypes.string.isRequired,
  // eslint-disable-next-line
  client: PropTypes.object.isRequired,
};

export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
)(Index);
