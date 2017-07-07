import PropTypes from 'prop-types';
import React from 'react';
import { gql, graphql } from 'react-apollo';

// import CurrentUser from './CurrentUser';

const CurrentUserContainer = ({ loading, username }) =>{
  if (loading) {
    return (<span>Loading</span>);
  } else {
    return (<span>{username}</span>);
  }
}

const currentUserQuery = gql`
query currentUser {
  viewer{
    user{
      username
    }
  }
}
`;

CurrentUserContainer.propTypes = {
  username: PropTypes.string.isRequired,
  loading: PropTypes.bool.isRequired,
};

export default graphql(currentUserQuery, {
  props: ({ data: { viewer: { user }, loading } }) =>
    ({
      username: user ? user.username : '',
      loading,
    }),
})(CurrentUserContainer);
