

function handleQuantityChange(e,quantity){
  let newQuantity;
  if(e.target.type === 'button'){
    e.target.name === 'increase-quantity' ? (
      quantity+1 > 99 ? newQuantity = 99 : newQuantity = quantity+1
    ) : (
      quantity-1 < 1 ? newQuantity = 1 : newQuantity = quantity-1
    )
  } else {
    if(isNaN(e.target.value)){ newQuantity = quantity } 
    else { 
      e.target.value > 0 && e.target.value < 100 ? newQuantity = e.target.value : newQuantity = quantity
    }
  }
  return newQuantity
}

export default handleQuantityChange