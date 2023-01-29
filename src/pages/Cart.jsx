import { BiTrash } from "react-icons/bi"
import CartItemCard from "../components/CartItemCard"
import { v4 as uuidv4 } from "uuid"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import handleQuantityChange from "../api/handleQuantityChange"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { removeItem, updateCartItemQuantity } from "../api/cartData"

function Cart(){
  localStorage.removeItem('checkoutStage')
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
    if(status === 'success') data.map(item => totalPrice += item.price*item.quantity)
    setAllItemsTotal(totalPrice)
  }
  useEffect(()=>{
    updateCartTotal()
  })

  if(status === 'loading') return <h1>Loading Your Cart...</h1>
  if(status === 'error') return <h1>{JSON.parse(error)}</h1>
  return(
    <>
      <div className="h-screen flex flex-col px-4 py-8 gap-6">
        {data?.length > 0 ? (
          <>
          <div className="text-xl flex items-center font-semibold">
            <span className="font-normal">Subtotal</span>
            <span className="text-sm ml-2">$</span>
            <span>{allItemsTotal}</span>
          </div>
          <Link to="/checkout">
            <button onClick={storeOrderTotal} className="bg-red-700 text-gray-200 py-2 px-6 rounded-md font-semibold w-full" type="button" name="checkout">Proceed to checkout ({data.length} item{data.length > 1 ? 's':''})</button>
          </Link>
          <div className="w-full border-b-2 border-gray-300 my-3"></div>
          {data.map(item => 
            <div className="grid px-2 grid-cols-2" key={uuidv4()}>
              <CartItemCard data={item} />
              <div className="text-xl my-6 border-2 border-gray-300 rounded-lg shadow-lg shadow-gray-300 flex justify-evenly w-fit items-center row-start-2">
                <BiTrash className={`${ Number(item.quantity) > 1 ? 'hidden':''} mx-3`} onClick={()=>deleteItem.mutate(item.id)}  />
                <button className={`${ Number(item.quantity) > 1 ? '':'hidden'} mx-3`} onClick={(e)=>handleChange(e, item.id, item.quantity)} name="decrease-quantity" type="button">-</button>
                <span className="w-10 text-base text-center border-x-2 border-gray-300">{item.quantity}</span>
                <button className="mx-3" onClick={(e)=>handleChange(e, item.id, item.quantity)} name="increase-quantity" type="button">+</button>
              </div>
              <button className="my-6 border-2 border-gray-300 rounded-md shadow-lg shadow-gray-300 w-fit px-3 row-start-2" onClick={()=>deleteItem.mutate(item.id)} type={'button'}>Delete</button>
            </div>
          )}
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