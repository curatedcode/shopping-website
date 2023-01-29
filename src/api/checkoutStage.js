
function getCheckoutStage(){
  if(!localStorage.getItem('checkoutStage')){
    localStorage.setItem('checkoutStage','address-section')
  }
  return localStorage.getItem('checkoutStage')
}

export default getCheckoutStage