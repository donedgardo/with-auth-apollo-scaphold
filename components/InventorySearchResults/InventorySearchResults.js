import React from 'react';

const InventorySearchResults = ({ inventory }) => {
  return (
    <div>
      <h2>Inventory</h2>
      {inventory.map(i => <p key={i.id}>{i.description}</p>)}
    </div>
  );
}

export default InventorySearchResults;
