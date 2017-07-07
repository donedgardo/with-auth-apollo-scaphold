import React from 'react';

// eslint-disable-next-line
const SearchBar = ({ search }) => {
  return (
    <input
      onChange={e => search(e.target.value)}
      placeholder="Search"
      type="text"
    />
  );
};

// SearchBar.propTypes = {
//
// }

export default SearchBar;
