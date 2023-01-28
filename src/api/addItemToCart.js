

function addItemToCart(item,quantity){
  if(localStorage.getItem('cartItems') && JSON.parse(localStorage.getItem('cartItems')).length > 0){
    const oldData = JSON.parse(localStorage.getItem('cartItems'))
    let wasItemPreviouslyStored = false;
    oldData.forEach(obj => {
      if(obj.id === item.id){
        obj.quantity += quantity
        wasItemPreviouslyStored = true
      }
    })
    if(!wasItemPreviouslyStored){
      item.quantity = quantity
      oldData.push(item)
    }
    localStorage.setItem('cartItems',JSON.stringify(oldData))
  } else {
    item.quantity = quantity
    localStorage.setItem('cartItems',JSON.stringify([item]))
  }
}

export default addItemToCart