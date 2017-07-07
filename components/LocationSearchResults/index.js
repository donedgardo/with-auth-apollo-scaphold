import React from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { gql, graphql, compose, withApollo } from 'react-apollo';

import LocationSearchResults from './LocationSearchResults';
import debounce from '../../lib/debounce';

class LocationSearchResultsContainer extends React.Component {
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
    const { locations, nHits, loading } = this.props;
    if (loading) {
      return <p>loading</p>;
    }
    return (
      <LocationSearchResults locations={locations} hits={nHits} />
    );
  }
}

LocationSearchResultsContainer.propTypes = {
  // eslint-disable-next-line
  locations: PropTypes.array.isRequired,
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

const algoliaSearchLocations = gql`
query LocationsSearch($query:String!){
  viewer {
    searchAlgoliaLocations(query:$query){
      nbHits
      hits {
        node{
          name
          id
        }
      }
    }
  }
}
`;
const withSearch = graphql(algoliaSearchLocations, {
  props: ({
    data: {
      viewer,
      loading,
      refetch,
    },
  }) => {
    if (viewer && viewer.searchAlgoliaLocations && viewer.searchAlgoliaLocations) {
      return {
        nHits: viewer.searchAlgoliaLocations.nbHits,
        locations: (
          viewer.searchAlgoliaLocations.hits.length > 0 ?
          viewer.searchAlgoliaLocations.hits.map(i => (i.node)) : []
         ),
        loading,
        refetch,
      };
    }
    return {
      nHits: 0,
      locations: [],
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
)(LocationSearchResultsContainer);
