import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo';
import { Cookies } from 'react-cookie';

import prettyError from '../../lib/prettyfyGraphqlError';
import Login from './Login';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      username: '',
      password: '',
      errors: [],
    };
    this.handleUsernameChange = this.handleUsernameChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);
    this.handleLogin = this.handleLogin.bind(this);
  }
  // Handles any changes in the username
  handleUsernameChange(e) {
    this.setState({
      username: e.target.value,
    });
  }
  // Handles any changes in the password
  handlePasswordChange(e) {
    this.setState({
      password: e.target.value,
    });
  }
  // Handles Login on form sumbit.
  // eslint-disable-next-line
  async handleLogin(e) {
    e.preventDefault();
    const { loginUser } = this.props;
    const { username, password } = this.state;
    const cookies = new Cookies();
    if (username === '' || password === '') {
      this.state({
        errors: ['Username and Password are required.'],
      });
    }
    try {
      this.setState({ loading: true });
      const { data, errors } = await loginUser(username, password);
      if (!errors) {
        const token = data.loginUser && data.loginUser.token;
        cookies.set('user-token', token);
        this.setState({ loading: false });
      }
    } catch (error) {
      if (error.message) {
        this.setState({
          errors: [prettyError(error.message)],
          loading: false,
        });
      }
    }
  }
  render() {
    const { loading, errors } = this.state;
    return (
      <Login
        errors={errors}
        handleLogin={this.handleLogin}
        handlePasswordChange={this.handlePasswordChange}
        handleUsernameChange={this.handleUsernameChange}
        loading={loading}
      />
    );
  }
}

const loginUser = gql`
mutation Login($input:LoginUserInput!){
  loginUser(input:$input){
    token
  }
}
`;

LoginContainer.propTypes = {
  loginUser: PropTypes.func.isRequired,
};

export default graphql(loginUser, {
  props: ({ mutate }) => ({
    loginUser: (username, password) => mutate({
      variables: { input: { username, password } },
    }),
  }),
})(LoginContainer);
