import React from 'react';
import { withApollo, compose } from 'react-apollo';
import PropTypes from 'prop-types';

import withData from '../lib/withData';
import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

import SearchBar from '../components/SearchBar';
import SignoutButton from '../components/SignoutButton';
import InventorySearchResults from '../components/InventorySearchResults';

class Index extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const { username } = await checkLoggedIn(context, apolloClient);
    if (!username) {
      // If not signed in, send them somewhere more useful
      redirect(context, '/signin');
    }
    return { username };
  }
  render() {
    const { username } = this.props;
    return (
      <div>
        Hello {username}!
        <SearchBar />
        <SignoutButton resetStore={this.props.client.resetStore} />
        <InventorySearchResults />
        {/* <LocationSearchResult  /> */}
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
