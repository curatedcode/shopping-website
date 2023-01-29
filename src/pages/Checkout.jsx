import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import getCheckoutStage from "../api/checkoutStage"
import CheckoutAddressSection from "../components/CheckoutAddressSection"
import CheckoutCardSection from "../components/CheckoutCardSection"
import CheckoutSubmittedSection from "../components/CheckoutSubmittedSection"

function Checkout(){
  const [stage, setStage] = useState('')
  const { status, error, data } = useQuery({
    queryKey: ['checkoutStage'],
    queryFn: getCheckoutStage,
  })
  useEffect(()=>{
    if(status === 'success') setStage(data)
  },[status,data])
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
  return(
    <div>
      {
        stage === 'address-section' ? (
          <CheckoutAddressSection />
        ) : ( '' )
      }
      {
        stage === 'card-section' ? (
          <CheckoutCardSection />
        ) : ( '' )
      }
      {
        stage === 'submitted-section' ? (
          <CheckoutSubmittedSection />
        ) : ( '' )
      }
    </div>
  )
}

export default Checkout