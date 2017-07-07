import React from 'react';

const LocationSearchResults = ({ locations }) => {
  return (
    <div>
      <h2>Locations</h2>
      {locations.map(l => <p key={l.id}>{l.name}</p>)}
    </div>
  );
}

export default LocationSearchResults;
