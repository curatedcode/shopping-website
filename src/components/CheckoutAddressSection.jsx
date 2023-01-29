import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

function CheckoutAddressSection(){
  const [country, setCountry] = useState('')
  const [fullName, setFullName] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [address, setAddress] = useState('')
  const [addressOptional, setAddressOptional] = useState('')
  const [city, setCity] = useState('')
  const [state, setState] = useState('')
  const [zipCode, setZipCode] = useState('')
  const queryClient = useQueryClient()

  const handleSubmit = useMutation({
    mutationFn: (e)=>{
      e.preventDefault()
      const formData = {
        country: country,
        fullName: fullName,
        phoneNumber: phoneNumber,
        address: address,
        addressOptional: addressOptional,
        city: city,
        state: state,
        zipCode: zipCode
      }
      localStorage.setItem('shippingAddress',JSON.stringify(formData))
      localStorage.setItem('checkoutStage','card-section')
    },
    onSuccess: () => queryClient.invalidateQueries(['checkoutStage'])
  })
  return(
    <div className="px-2 py-6">
      <h1 className="mb-8 text-center">Add your shipping address</h1>
      <form onSubmit={(e)=>handleSubmit.mutate(e)} className="grid">
        <label htmlFor="country" className="font-bold ml-1">Country</label>
        <input title="Country" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 py-2 mb-4" type="text" name="country" required value={country} onChange={(e)=>setCountry(e.target.value)}></input>
        
        <label htmlFor="full-name" className="font-bold ml-1">Full name (First and Last name)</label>
        <input title="Full Name (First and last name)" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 py-2 mb-4" type="text" name="full-name" required value={fullName} onChange={(e)=>setFullName(e.target.value)}></input>
        
        <label htmlFor="phone-number" className="font-bold ml-1">Phone number</label>
        <input title="Phone Number" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 py-2 mb-4" type="number" name="phone-number" required value={phoneNumber} onChange={(e)=>setPhoneNumber(e.target.value)}></input>
        
        <label htmlFor="address" className="font-bold ml-1">Address</label>
        <div className="rounded-md border-2 border-gray-400 border-opacity-70 mb-4">
          <input title="Address" className="focus-within:outline-gray-500 px-2 py-2 w-full" type="text" name="address_1" placeholder="Street address or P.O. Box" required value={address} onChange={(e)=>setAddress(e.target.value)}></input>
          <div className="border-y-2 border-gray-400 border-opacity-70"></div>
          <input title="Address Apt, Suite, Unit, Building (optional)" className="focus-within:outline-gray-500 focus-within:shadow-xl shadow-red-600 px-2 py-2 w-full" type="text" name="address_2" placeholder="Apt, Suite, Unit, Building (optional)" value={addressOptional} onChange={(e)=>setAddressOptional(e.target.value)}></input>
        </div>
        
        <label htmlFor="city" className="font-bold ml-1">City</label>
        <input title="City" className="rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mb-4" type="text" name="city" required value={city} onChange={(e)=>setCity(e.target.value)}></input>
        
        <div className="grid grid-cols-2 mb-8">
          <label htmlFor="state" className="font-bold ml-1">State</label>
          <input title="State" className="row-start-2 rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2 mr-4" type="text" name="state" required value={state} onChange={(e)=>setState(e.target.value)}></input>
          
          <label htmlFor="zip-code" className="font-bold ml-1">ZIP Code</label>
          <input title="ZIP Code" className="row-start-2 rounded-md border-2 border-gray-400 border-opacity-70 focus-within:outline-gray-500 px-2 pb-1 py-2" type="number" name="zip-code" required value={zipCode} onChange={(e)=>setZipCode(e.target.value)}></input>
        </div>

        <button className="bg-red-700 text-gray-200 py-2 px-6 rounded-full font-semibold w-full" type="submit" name="submit">Use this address</button>
      </form>
    </div>
  )
}

export default CheckoutAddressSection