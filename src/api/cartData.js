import getProduct from "./getProduct"


function getCartData(){
  if(localStorage.getItem('cartData')){
    const fetchedData = fetchCartProducts()
    const storedData = JSON.parse(localStorage.getItem('cartData'))
    if(fetchedData === storedData) { return storedData }
    else {
      localStorage.setItem('cartData',JSON.stringify(fetchedData))
      return fetchedData
    }
  } else {
    localStorage.setItem('cartData',JSON.stringify([]))
    return []
  }
}

async function fetchCartProducts(){
  let allItems = [];
  if(!localStorage.getItem('cartItems')){
    localStorage.setItem('cartItems',JSON.stringify([]))
  }
  const itemIds = JSON.parse(localStorage.getItem('cartItems'))
  for(let i=0; i<itemIds.length; i++){
    allItems.push(await getProduct(itemIds[i]))
  }
  allItems.forEach(item => item.quantity = 1)
  return allItems
}

function removeItem(removeId){
  const data = getCartData()
  let newItemsData = []
  let newIds = []
  data.forEach(item => {
    if (item.id !== removeId) newItemsData.push(item)
  })
  JSON.parse(localStorage.getItem('cartItems')).forEach(id => {
    if (id !== removeId) newIds.push(id)
  })
  localStorage.setItem('cartItems',JSON.stringify(newIds))
  localStorage.setItem('cartData',JSON.stringify(newItemsData))
}

export {
  removeItem,
  getCartData
}