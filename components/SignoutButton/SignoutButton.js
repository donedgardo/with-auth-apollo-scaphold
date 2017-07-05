import React from 'react';
import PropTypes from 'prop-types';

const SignoutButton = ({ onSignout }) =>
  (<button onClick={onSignout}>Sign out</button>);

SignoutButton.propTypes = {
  onSignout: PropTypes.func.isRequired,
};

export default SignoutButton;
