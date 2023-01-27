import { GoLocation } from "react-icons/go"
import { BiTrash } from "react-icons/bi"
import CartItemCard from "../components/CartItemCard"
import { v4 as uuidv4 } from "uuid"
import { useMutation, useQuery } from "@tanstack/react-query"
import handleQuantityChange from "../components/handleQuantityChange"
import { Link } from "react-router-dom"
import { useState } from "react"
import { getCartData, removeItem } from "../api/cartData"

function Cart(){
  // localStorage.removeItem('cartItems')
  //need to calculate the items total
  const [allItemsTotal, setAllItemsTotal] = useState(0)
  const { status, error, data } = useQuery({
    queryKey: ['cartData'],
    queryFn: getCartData,
  })
  const editQuantityMutation = useMutation({
    mutationFn: (e, id)=>{
      const products = data.forEach(item => {
        if(item.id === id){
          item.quantity = handleQuantityChange(e, Number(item.stock))
        }
      })
      localStorage.setItem('cartData',JSON.stringify(products))
    },
  })
  
  if(status === 'loading') return <h1>Loading Your Cart...</h1>
  if(status === 'error') return <h1>{JSON.parse(error)}</h1>
  return(
    <>
      <div className="text-gray-200 bg-red-700 py-3 text-sm flex justify-center gap-2 items-center font-semibold mb-4"><GoLocation className="text-xl fill-gray-200" /> Select a location to see product availability</div>
      <div>
        <span>Subtotal</span>
        <span>$</span>
        <span>{allItemsTotal}</span>
      </div>
      <div className="h-screen">
        {data?.length > 0 ? (
          data.map(item => 
          <div key={uuidv4()}>
            <CartItemCard data={item}/>
            <div className="flex gap-2">
              <BiTrash className={`${ Number(item.stock) > 1 ? 'hidden':''}`} onClick={()=>removeItem(item.id)} />
              <button className={`${ Number(item.stock) > 1 ? '':'hidden'}`} onClick={(e)=>editQuantityMutation(e, item.id)} type="button">-</button>
              <span>{item.quantity}</span>
              <button onClick={(e)=>editQuantityMutation(e, item.id)} type="button">+</button>
              <button onClick={()=>removeItem(item.id)} type={'button'}>Delete</button>
            </div>
          </div>
        )) : (
          <div>
            <div>No Items In Your Cart.</div>
            <Link to="/">
              <button type="button">Keep Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart