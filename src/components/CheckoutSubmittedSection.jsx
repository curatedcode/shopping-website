

function CheckoutSubmittedSection(){
  const orderData = JSON.parse(localStorage.getItem('orderData'))
  const shipTo = JSON.parse(localStorage.getItem('shippingAddress')).fullName
  localStorage.removeItem('cartItems')
  return(
    <div className="grid grid-cols-2 text-lg px-2 py-6 h-screen auto-rows-min md:w-96 md:m-auto md:text-xl">
      <span>Order Placed</span>
      <span className="mb-6">{orderData.submitted}</span>
      <span>Total</span>
      <div className="font-semibold flex items-center mb-6">
        <span className="text-sm md:text-base">$</span>
        <span>{orderData.orderTotal}</span>
      </div>
      <span>Ship To</span>
      <span className="mb-6">{shipTo}</span>
      <span>Order #</span>
      <span>{orderData.number}</span>
    </div>
  )
}

export default CheckoutSubmittedSection