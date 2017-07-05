import gql from 'graphql-tag'

export default (context, apolloClient) => (
  apolloClient.query({
    query: gql`
      query currentUser {
        viewer {
          user {
            username
          }
        }
      }
    `,
  }).then(({ data: { viewer: user } }) => {
    return ({ username: user.user ? user.user.username : '' });
  }).catch((e) => {
    // Fail gracefully
    return { username: '' };
  })
);
