import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { gql, graphql } from 'react-apollo'
import { Cookies } from 'react-cookie';

import Login from './Login';

class LoginContainer extends Component {

  constructor(props, context){
    super(props);
    this.state = {
      loading: false
    }
    this.handleLogin = this.handleLogin.bind(this);
  }

  async handleLogin(e){
    e.preventDefault();
    const { loginUser } = this.props;
    const cookies = new Cookies();

    console.log('happening');
    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;

    if (username === '' || password === '') {
      // TODO better errors
      window.alert('Both fields are required.')
      return false
    }

    try {
      this.setState({loading : true});
      const { data, errors } = await loginUser(username, password);
      if(!errors) {
        const token = data.loginUser && data.loginUser.token;
        cookies.set('user-token', token);
        this.setState({loading : false});
      }
    } catch(e) {
      this.setState({loading : false});
      console.error(e);
    }
  }
  render() {
    const { loading } = this.state;
    return (
      <Login handleLogin={this.handleLogin} loading={loading} />
    )
  }
}

const loginUser = gql`
mutation Login($input:LoginUserInput!){
  loginUser(input:$input){
    token
  }
}
`

LoginContainer.propTypes = {
  loginUser: PropTypes.func.isRequired
}

export default graphql(loginUser, {
  props: ({ mutate }) => ({
    loginUser: (username, password) => mutate({
      variables: { input: { username, password }},
    })
  })
})(LoginContainer)
