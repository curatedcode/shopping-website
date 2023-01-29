

function CheckoutSubmittedSection(){
  const orderData = JSON.parse(localStorage.getItem('orderData'))
  const shipTo = JSON.parse(localStorage.getItem('shippingAddress')).fullName

  return(
    <div className="grid grid-cols-2">
      <span>Order Placed</span>
      <span>{orderData.submitted}</span>
      <span>Total</span>
      <span>{orderData.orderTotal}</span>
      <span>Ship To</span>
      <span>{shipTo}</span>
      <span>Order # {orderData.number}</span>
    </div>
  )
}

export default CheckoutSubmittedSection