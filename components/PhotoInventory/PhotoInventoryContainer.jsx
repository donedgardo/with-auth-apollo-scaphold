import React, { Component } from 'react';

import react-dropzone from 'react-dropzone';

import PhotoInventory from './PhotoInventory.jsx';

class PhotoInventoryContainer extends Component {
  constructor(props){
    super(props)
    this.state = { files: [] }
  }

  parseSku(fileName){
    const sku = filename.split() //Get sku from filename
    found = findInventory(sku); // Verify inventory

    if (found) {
      imageInventory(sku, image)
    } else {
      unmatchedInventory(sku, image);
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...

    acceptedFiles.forEach( file => parseSku())
  }

  onDropAccepted() {

  }

  onDropRejected() {

  }

  render(){


    return (
      <PhotoInventory onDrop={this.onDrop} onDropAccepted={this.onDropAccepted} onDropRejected={this.onDropRejected} />
    )
  }
}

export default class PhotoInventoryContainerWithData = {

}
