import React from 'react';
import cookie from 'cookie';
import PropTypes from 'prop-types';

import redirect from '../../lib/redirect';
import SignoutButton from './SignoutButton';

class SignoutButtonContainer extends React.Component {
  constructor(props){
    super(props);
    this.signout = this.signout.bind(this);
  }
  signout() {
    const { resetStore } = this.props;
    // eslint-disable-next-line
    document.cookie = cookie.serialize('user-token', '', {
      maxAge: -1, // Expire the cookie immediately
    });
    // Force a reload of all the current queries now that the user is
    // logged in, so we don't accidentally leave any state around.
    resetStore();
    redirect({}, '/signin');
  }
  render() {
    return (
      <SignoutButton onSignout={this.signout} />
    );
  }
}

SignoutButtonContainer.propTypes = {
  // eslint-disable-next-line
  resetStore: PropTypes.func.isRequired,
};

export default SignoutButtonContainer;
