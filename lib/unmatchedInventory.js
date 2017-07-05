

export default function unmatchedInventory(sku, image){

  // Add to scaphold on unmatched inventory schema

  createInventory(sku);

  if(image) {
    imageInventory(sku, image);
  }

}

function createInventory(sku){
  // Call Scaphold inventory creation method
}

// Mutate Scaphold inventory to add the latest image
imageInventory(sku, image)
