import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { changeQuery } from '../../lib/actions/searchActions';
import SearchBar from './SearchBar';

class SearchBarContainer extends Component {
  render() {
    const { query, search } = this.props;
    return (
      <SearchBar search={search} query={query} />
    );
  }
}

SearchBarContainer.propTypes = {
  search: PropTypes.func.isRequired,
  query: PropTypes.string.isRequired,
};

const mapStateToProps = state =>
  ({
    query: state.query,
  });

const mapDispatchToProps = dispatch =>
  ({
    search: (q) => {
      dispatch(changeQuery(q));
    },
  });

export default connect(mapStateToProps, mapDispatchToProps)(SearchBarContainer);
