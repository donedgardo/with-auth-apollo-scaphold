import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { gql, graphql, compose, withApollo } from 'react-apollo';

import InventorySearchResults from './InventorySearchResults';
import debounce from '../../lib/debounce';

class InventorySearchResultsContainer extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.search = this.search.bind(this);
    this.search = debounce(this.search, 200);
  }
  componentWillReceiveProps(nextProps) {
    const { query } = this.props;
    const newQuery = nextProps.query;
    if (newQuery.length > 1 && newQuery !== query) {
      this.search(newQuery);
    }
  }
  search(query) {
    const { refetch } = this.props;
    refetch({
      query,
    });
  }
  render() {
    const { inventory, nHits, loading } = this.props;
    if (loading) {
      return <p>loading</p>;
    }
    return (
      <InventorySearchResults inventory={inventory} hits={nHits} />
    );
  }
}

InventorySearchResultsContainer.propTypes = {
  // eslint-disable-next-line
  inventory: PropTypes.array.isRequired,
  // eslint-disable-next-line
  client: PropTypes.object.isRequired,
  nHits: PropTypes.number.isRequired,
  loading: PropTypes.bool.isRequired,
  query: PropTypes.string.isRequired,
  refetch: PropTypes.func.isRequired,
};


const mapStateToProps = state =>
  ({
    query: state.query,
  });
const withReduxData = connect(mapStateToProps);

const algoliaSearchInventory = gql`
query InventorySearch($query:String!){
  viewer {
    searchAlgoliaInventories(query:$query){
      nbHits
      hits {
        node{
          description
          id
        }
      }
    }
  }
}
`;
const withSearch = graphql(algoliaSearchInventory, {
  props: ({
    data: {
      viewer,
      loading,
      refetch,
    },
  }) => {
    if (viewer && viewer.searchAlgoliaInventories && viewer.searchAlgoliaInventories) {
      return {
        nHits: viewer.searchAlgoliaInventories.nbHits,
        inventory: (
          viewer.searchAlgoliaInventories.hits.length > 0 ?
          viewer.searchAlgoliaInventories.hits.map(i => (i.node)) : []
         ),
        loading,
        refetch,
      };
    }
    return {
      nHits: 0,
      inventory: [],
      loading,
      refetch: () => null,
    };
  },
  options: ({ client }) => {
    return {
      variables: {
        query: '',
      },
    };
  },
});

export default compose(
  withApollo,
  withReduxData,
  withSearch,
)(InventorySearchResultsContainer);
