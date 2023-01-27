

function addItemToCart(itemId){
  if(JSON.parse(localStorage.getItem('cartItems')).length > 0){
    const oldData = JSON.parse(localStorage.getItem('cartItems'))
    oldData.push(itemId)
    localStorage.setItem('cartItems',JSON.stringify(oldData))
  } else {
    localStorage.setItem('cartItems',JSON.stringify([itemId]))
  }
}

export default addItemToCart