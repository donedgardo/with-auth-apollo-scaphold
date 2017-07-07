import React from 'react';
import { PropTypes } from 'prop-types';

const Login = ({
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
  loading,
  errors,
}) => (
  <form onSubmit={handleLogin}>
    <h1>Login</h1>
    <p>{ errors.length > 0 ? `${errors[0]}` : null }</p>
    <p>{ loading ? 'Loading' : null }</p>
    <input
      placeholder="username"
      name="username"
      onChange={handleUsernameChange}
    />
    <input
      placeholder="password"
      name="password"
      type="password"
      onChange={handlePasswordChange}
    />
    <button type="submit">Login</button>
    <style jsx>{`
      `}</style>
  </form>
);

Login.defaultProps = {
  loading: false,
  errors: [],
};

Login.propTypes = {
  handleLogin: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  errors: PropTypes.arrayOf(PropTypes.string),
};

export default Login;
