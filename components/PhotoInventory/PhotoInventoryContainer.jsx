import React, { Component } from 'react';

import react-dropzone from 'react-dropzone';

import PhotoInventory from './PhotoInventory.jsx';

export default class PhotoInventoryContainer extends Component {
  constructor(props){
    super(props)
    this.state = { files: [] }
  }

  parseSku(fileName){
    createOrFindInventory(sku){
      
    }
  }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...
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
