import React from 'react';
import { graphql, withApollo, compose } from 'react-apollo';
import cookie from 'cookie';
import gql from 'graphql-tag';
import PropTypes from 'prop-types';

import withData from '../lib/withData';
import redirect from '../lib/redirect';
import checkLoggedIn from '../lib/check-logged-in';

class Signin extends React.Component {
  static async getInitialProps(context, apolloClient) {
    const data = await checkLoggedIn(context, apolloClient);

    if (data) {
      // Already signed in? No need to continue.
      // Throw them back to the main page
      redirect(context, '/');
    }

    return {};
  }
  static propTypes = {
    // eslint-disable-next-line
    client: PropTypes.object.isRequired,
    signin: PropTypes.func.isRequired,
    // loading: PropTypes.bool.isRequired,
  }
  constructor(props) {
    super(props);
    this.signIn = this.signIn.bind(this);
    this.state = {
      loading: false,
    };
  }

  async signIn(event) {
    event.preventDefault();
    event.stopPropagation();
    /* global FormData */
    console.log('Clicked logged in');
    const form = new FormData(event.target);
    try {
      this.setState({ loading: true })
      console.log('Getting sign data');
      const { data, errors } = await this.props.signin(form.get('username'), form.get('password'));
      if (!errors) {
        console.log('No errors in login');
        const token = data.loginUser && data.loginUser.token;
        console.log('Setting token in cookie ', token);
        // Store the token in cookie
        // eslint-disable-next-line
        document.cookie = cookie.serialize('user-token', token, {
          maxAge: 30 * 24 * 60 * 60, // 30 days
        });
        console.log('cookie set');
        this.props.client.resetStore().then(() => {
          // Now redirect to the homepage
          console.log('client reset');
          redirect({}, '/');
        });
      }
    } catch (error) {
      this.setState({ loading: false });
      console.log(error);
    }
  }
  render() {
    return (
      <div>
        {
          this.state.loading ?
            <p>Loading</p> :
            <form onSubmit={this.signIn}>
              <input type="username" placeholder="Username" name="username" /><br />
              <input type="password" placeholder="Password" name="password" /><br />
              <button>Sign in</button>
            </form>
        }
      </div>
    );
  }
}

const loginUserMutation = gql`
mutation Login($input:LoginUserInput!){
  loginUser(input:$input){
    token
  }
}
`;
const withMutation = graphql(loginUserMutation, {
  props: ({ mutate, ownProps: { client } }) => ({
    client,
    signin: (username, password) => mutate({
      variables: { input: { username, password } },
    }),
  }),
});
export default compose(
  // withData gives us server-side graphql queries before rendering
  withData,
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withMutation,
)(Signin);
