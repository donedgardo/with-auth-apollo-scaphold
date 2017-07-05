import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { gql, withApollo, compose, graphql } from 'react-apollo';

import InventorySearchResults from './InventorySearchResults';
import withData from '../../lib/withData';

class InventorySearchResultsContainer extends React.Component {
  render() {
    const { inventory, nHits, loading } = this.props;
    if (loading) {
      return <p>loading</p>
    }
    return (
      <InventorySearchResults inventory={inventory} hits={nHits} />
    );
  }
}

InventorySearchResultsContainer.propTypes = {
  // eslint-disable-next-line
  inventory: PropTypes.array.isRequired,
  nHits: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
};


const mapStateToProps = state =>
  ({
    query: state.query,
  });
const withReduxData = connect(mapStateToProps)(InventorySearchResultsContainer);

const algoliaSearchInventory = gql`
query InventorySearch{
  viewer {
    searchAlgoliaInventories(query:"mower"){
      nbHits
      hits {
        node{
          description
        }
      }
    }
  }
}
`;

const withQuery = graphql(algoliaSearchInventory, {
  props: ({ data: { viewer: { searchAlgoliaInventories: { nbHits, hits } }, loading, query } }) =>
    ({
      nHits: nbHits,
      inventory: (hits.length > 0 ? hits.map(i => (i.node)) : []),
      loading,
    }),
});

export default compose(
  // withData gives us server-side graphql queries before rendering
  // withApollo exposes `this.props.client` used when logging out
  withApollo,
  withQuery,
)(withReduxData);
