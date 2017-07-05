import React, { Component } from 'react';
import Dropzone from 'react-dropzone';

const PhotoInventory = ({onDrop, files}) => (
  <div className="">
    <Dropzone onDrop={onDrop} disablePreview="true" multiple="true" >
      <p>
        Try dropping.
      </p>
    </Dropzone>
    <aside>
      <h2>Dropped files</h2>
      <ul>
        {
          files.map(f => <li>{f.name} - {f.size} bytes</li>)
        }
      </ul>
    </aside>
  </div>
)

export default PhotoInventory;
