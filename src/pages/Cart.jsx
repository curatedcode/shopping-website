import { GoLocation } from "react-icons/go"
import { BiTrash } from "react-icons/bi"
import CartItemCard from "../components/CartItemCard"
import { v4 as uuidv4 } from "uuid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import handleQuantityChange from "../api/handleQuantityChange"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { removeItem, updateCartItemQuantity } from "../api/cartData"

function Cart(){
  const [allItemsTotal, setAllItemsTotal] = useState(0)
  const queryClient = useQueryClient()
  const { status, error, data } = useQuery({
    queryKey: ['cartItems'],
    queryFn: ()=>JSON.parse(localStorage.getItem('cartItems')),
  })
  const editQuantity = useMutation({
    mutationFn: updateCartItemQuantity,
    onSuccess: () => queryClient.invalidateQueries(['cartItems'])
  })
  const deleteItem = useMutation({
    mutationFn: removeItem,
    onSuccess: () => queryClient.invalidateQueries(['cartItems'])
  })
  function handleChange(e, itemId, currItemQuantity){
    const newQuantity = handleQuantityChange(e, currItemQuantity)
    editQuantity.mutate({id: itemId, quantity: newQuantity})
    updateCartTotal()
  }
  function storeOrderTotal(){
    localStorage.setItem('orderTotal', JSON.stringify(allItemsTotal))
  }
  function updateCartTotal(){
    let totalPrice = 0
    if(status === 'success') data.map(item => totalPrice += item.price)
    setAllItemsTotal(totalPrice)
  }
  useEffect(()=>{
    updateCartTotal()
  })

  if(status === 'loading') return <h1>Loading Your Cart...</h1>
  if(status === 'error') return <h1>{JSON.parse(error)}</h1>
  return(
    <>
      <div className="h-screen">
        {data?.length > 0 ? (
          <>
          <Link to="/checkout">
            <button onClick={storeOrderTotal} className="bg-red-700 text-gray-200 py-2 px-6 rounded-full font-semibold w-full" type="button" name="checkout">Proceed to checkout</button>
          </Link>
          {data.map(item => 
            <div key={uuidv4()}>
              <CartItemCard data={item}/>
              <div className="flex gap-2">
                <BiTrash className={`${ Number(item.stock) > 1 ? 'hidden':''}`} onClick={()=>deleteItem.mutate(item.id)}  />
                <button className={`${ Number(item.stock) > 1 ? '':'hidden'}`} onClick={(e)=>handleChange(e, item.id, item.quantity)} name="decrease-quantity" type="button">-</button>
                <span>{item.quantity}</span>
                <button onClick={(e)=>handleChange(e, item.id, item.quantity)} name="increase-quantity" type="button">+</button>
                <button onClick={()=>deleteItem.mutate(item.id)} type={'button'}>Delete</button>
              </div>
            </div>
          )}
          <div>
            <span>Subtotal</span>
            <span>$</span>
            <span>{allItemsTotal}</span>
          </div>
          </>
        ) : (
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