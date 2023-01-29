import { useMutation, useQueryClient } from "@tanstack/react-query";
import { v4 as uuidv4 } from "uuid"
import { useState } from "react";
import getDate from "../api/getDate";

function CheckoutCardSection(){
  const orderTotal = localStorage.getItem('orderTotal')
  const [cardNumber, setCardNumber] = useState('')
  const [billingAddress, setBillingAddress] = useState()
  const [expirationDate, setExpirationDate] = useState('')
  
  const [isAddressAndBillingSame, setIsAddressAndBillingSame] = useState(false)
  const [address, setAddress] = useState('')
  const [addressOptional, setAddressOptional] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const [canShowFinalButton, setCanShowFinalButton] = useState(false)

  const queryClient = useQueryClient()
  const handleSubmit = useMutation({
    mutationFn: (e)=>{
      e.preventDefault()
      const cardData = {
        cardNumber: cardNumber,
        billingAddress: isAddressAndBillingSame ? undefined : billingAddress,
        expirationDate: expirationDate,
      }
      const orderData = {
        number: uuidv4(),
        submitted: getDate(),
        orderTotal: orderTotal
      }
      localStorage.setItem('cardData',JSON.stringify(cardData))
      localStorage.setItem('orderData',JSON.stringify(orderData))
      localStorage.setItem('checkoutStage','submitted-section')
    },
    onSuccess: queryClient.invalidateQueries(['checkout-stage'])
  })

  function handleBillingAddressSubmit(e){
    e.preventDefault()
    const addressData = {
      address: address,
      addressOptional: addressOptional,
      city: city,
      state: state,
      zipCode: zipCode
    }
    canShowFinalButton(true)
    setBillingAddress(addressData)
  }
  return(
    <div className="px-2 py-6">
      <h1 className="mb-8 text-center">Add your card</h1>
      <form onSubmit={(e)=>handleSubmit.mutate(e)}  className="grid">
        <label className="font-bold ml-1" htmlFor="card-number">Card number</label>
        <input title="Card Number" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mb-4" type="text" name="card-number" required value={cardNumber} onChange={(e)=>setCardNumber(e.target.value)}></input>
        <label className="font-bold ml-1" htmlFor="exp-date">Exp. date</label>
        <input title="Expiration Date" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mb-4" type="text" name="exp-date" required value={expirationDate} onChange={(e)=>setExpirationDate(e.target.value)}></input>
        <label className="font-bold ml-1 place-self-center" htmlFor="billing-address">Billing Address</label>
        <div className="flex gap-2 my-4">
          <label htmlFor="billing-same-as-address">Billing address same as delivery address</label>
          <input name="billing-same-as-address" className="w-8" type="checkbox" onChange={(e)=>{
            const currentState = e.target.checked
            setCanShowFinalButton(currentState)
            setIsAddressAndBillingSame(currentState)}} title="Billing address is the same as delivery address">
          </input>
        </div>
        <div className={isAddressAndBillingSame ? 'hidden':'grid'}>
          <label htmlFor="address" className="font-bold ml-1">Address</label>
          <div className="rounded-md border-2 border-gray-400 border-opacity-70 mb-4">
            <input title="Address" className="focus-within:outline-gray-500 px-2 py-2 w-full" type="text" name="address_1" placeholder="Street address or P.O. Box" value={address} onChange={(e)=>setAddress(e.target.value)}></input>
            <div className="border-y-2 border-gray-400 border-opacity-70"></div>
            <input title="Address Apt, Suite, Unit, Building (optional)" className="focus-within:outline-gray-500 focus-within:shadow-xl shadow-red-600 px-2 py-2 w-full" type="text" name="address_2" placeholder="Apt, Suite, Unit, Building (optional)" value={addressOptional} onChange={(e)=>setAddressOptional(e.target.value)}></input>
          </div>
          
          <label htmlFor="city" className="font-bold ml-1">City</label>
          <input title="City" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mb-4" type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)}></input>
          
          <div className="grid grid-cols-2 mb-8">
            <label htmlFor="state" className="font-bold ml-1">State</label>
            <input title="State" className="row-start-2 rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mr-4" type="text" name="state" required value={state} onChange={(e)=>setState(e.target.value)}></input>
            
            <label htmlFor="zip-code" className="font-bold ml-1">ZIP Code</label>
            <input title="ZIP Code" className="row-start-2 rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2" type="number" name="zip-code" required value={zipCode} onChange={(e)=>setZipCode(e.target.value)}></input>
          </div>

          <button className="bg-red-700 text-gray-200 py-2 px-6 rounded-full font-semibold w-full mb-8" onSubmit={handleBillingAddressSubmit} type="submit" name="submit">Use this address</button>
        </div>
        <div>
          <span>Order Total</span>
          <span>{orderTotal}</span>
        </div>
        <button className={`bg-red-700 text-gray-200 py-2 px-6 rounded-full font-semibold w-full ${canShowFinalButton ? '':'hidden'}`} type="submit" name="submit">Submit my order</button>
      </form>
    </div>
  )
}

export default CheckoutCardSection