import { useEffect, useState } from "react"

function CartItemCard(props){
  const [isInStock, setIsInStock] = useState()
  useEffect(()=>{
    Number(props.data.stock) > 0 ? setIsInStock(true) : setIsInStock(false)
  },[props.data.stock])
  return(
    <div className="flex">
      <img src={props.data.thumbnail} alt={props.data.title}></img>
      <div>
        <span>{props.data.title}</span>
        <span>{props.data.price}</span>
        <span className={`${isInStock ? '':'hidden'} text-green-700 font-semibold -mb-4`}>In Stock.</span>
        <span className={`${isInStock ? 'hidden':''} text-red-600 font-semibold -mb-4`}>Out of Stock.</span>
      </div>
    </div>
  )
}

export default CartItemCard