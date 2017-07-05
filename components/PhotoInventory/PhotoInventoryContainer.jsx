import React, { Component } from 'react';

import PhotoInventory from './PhotoInventory.jsx';

export default class PhotoInventoryContainer extends Component {
  constructor(props){
    super(props)
    this.state = { files: [] }
  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  componentWillReceiveProps(nextProps) {

  }

  // parseSku(file){
  //   const sku = file.split() //Get sku from filename
  //   found = findInventory(sku); // Verify inventory
  //
  //   if (found) {
  //   } else {
  //   }
  // }

  onDrop(acceptedFiles, rejectedFiles) {
    // do stuff with files...

    console.log(acceptedFiles, rejectedFiles);

    // acceptedFiles.forEach( file => {
    //   file.parseSku(file)
    // })
  }

  onDropAccepted() {

  }

  onDropRejected() {

  }

  render(){


    return (
      <PhotoInventory
        onDrop={this.onDrop}
        onDropAccepted={this.onDropAccepted}
        onDropRejected={this.onDropRejected}
        files={this.state.files}
      />
    )
  }
}
