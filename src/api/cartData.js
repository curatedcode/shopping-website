
function removeItem(removeId){
  const data = JSON.parse(localStorage.getItem('cartItems'))
  let newItemsData = []
  data.forEach(item => {
    if (item.id !== removeId) newItemsData.push(item)
  })
  localStorage.setItem('cartItems',JSON.stringify(newItemsData))
}

function updateCartItemQuantity(itemData){
  const data = JSON.parse(localStorage.getItem('cartItems'))
  data.forEach(item => {
    if(item.id === itemData.id) item.quantity = itemData.quantity
  })
  localStorage.setItem('cartItems',JSON.stringify(data))
}

export {
  removeItem,
  updateCartItemQuantity
}