import gql from 'graphql-tag'

export default (ctx, apolloClient) => {
  console.log('Fetching whos logged in');
  return apolloClient.query({
    query: gql`
      query currentUser {
        viewer {
          user {
            username
          }
        }
      }
    `,
  }).then((result) => {
    if(result){
      const { user } =  result.data.viewer;
      if (user && user.username) {
        return({username: user.username});
      }
    }
    return null;
  }).catch((e) => {
    // Fail gracefully
    console.log(e);
    return {};
  })
};
