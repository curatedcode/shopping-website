import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import getCheckoutStage from "../api/checkoutStage"
import CheckoutAddressSection from "../components/CheckoutAddressSection"
import CheckoutCardSection from "../components/CheckoutCardSection"

function Checkout(){
  const [stage, setStage] = useState('')
  const { status, error, data } = useQuery({
    queryKey: ['checkoutStage'],
    queryFn: getCheckoutStage,
  })
  useEffect(()=>{
    if(status === 'success') setStage(data)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status])
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
  return(
    <div>
      <div className={stage === 'address-section' ? '':'hidden'}>
        <CheckoutAddressSection />
      </div>
      <div className={stage === 'card-section' ? '':'hidden'}>
        <CheckoutCardSection />
      </div>
    </div>
  )
}

export default Checkout