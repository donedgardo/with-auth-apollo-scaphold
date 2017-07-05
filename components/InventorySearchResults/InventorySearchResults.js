import React from 'react';

const InventorySearchResults = ({ inventory }) => {
  // return inventory.map(i =>
  //   (<div>{ i.description }</div>),
  // );
  return (<p>{inventory.length}</p>)
};

export default InventorySearchResults;
