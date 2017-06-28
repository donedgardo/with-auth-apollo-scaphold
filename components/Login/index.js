import { gql, graphql } from 'react-apollo'
import { Cookies } from 'react-cookie';

import Login from './Login';

const LoginContainer  = ({ loginUser }) => {
  async function handleLogin (e) {
    e.preventDefault();
    const cookies = new Cookies();
    console.log(sup);

    let username = e.target.elements.username.value;
    let password = e.target.elements.password.value;

    if (username === '' || password === '') {
      // TODO better errors
      window.alert('Both fields are required.')
      return false
    }

    // prepend http if missing from url
    // try {
    //   const { data, errors } = await loginUser(username, password);
    //   if(!errors){
    //     const token = data.loginUser && data.loginUser.token;
    //     cookies.set('user-token', token);
    //   }
    // } catch(e){
    //   console.error(e);
    // }
  }

  return (
    <Login handleLogin={handleLogin} />
  )
}

const loginUser = gql`
mutation Login($input:LoginUserInput!){
  loginUser(input:$input){
    token
  }
}
`

export default graphql(loginUser, {
  props: ({ mutate }) => ({
    loginUser: (username, password) => mutate({
      variables: { input: { username, password }},
    })
  })
})(Login)
