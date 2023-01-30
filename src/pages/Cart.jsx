import { BiTrash } from "react-icons/bi"
import CartItemCard from "../components/CartItemCard"
import { v4 as uuidv4 } from "uuid"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import handleQuantityChange from "../api/handleQuantityChange"
import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import { removeItem, updateCartItemQuantity } from "../api/cartData"
import { MdOutlineRemoveShoppingCart } from "react-icons/md"

function Cart(){
  localStorage.removeItem('checkoutStage')
  const [allItemsTotal, setAllItemsTotal] = useState()
  const data = JSON.parse(localStorage.getItem('cartItems'))

  const queryClient = useQueryClient()
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
    if(data && data.length > 0) {
      data.map(item => totalPrice += item.price*item.quantity)
    }
    setAllItemsTotal(totalPrice)
  }
  useEffect(()=>{
    updateCartTotal()
  })
  return(
    <>
      <div className="flex flex-col px-4 py-8 gap-6 h-screen">
        { data?.length > 0 && data ? (
          <>
          <div className="text-xl flex items-center font-semibold md:place-self-center">
            <span className="font-normal">Subtotal</span>
            <span className="text-sm ml-2">$</span>
            <span>{allItemsTotal}</span>
          </div>
          <Link to="/checkout" className="bg-red-700 text-gray-200 py-2 px-6 rounded-md font-semibold w-full md:w-fit md:px-16 place-self-center text-center">
            <button onClick={storeOrderTotal} type="button" aria-label="proceed-to-checkout" name="checkout">Proceed to checkout ({data.length} item{data.length > 1 ? 's':''})</button>
          </Link>
          <div className="w-full border-b-2 border-gray-300 my-3"></div>
          <div className="grid md:grid-cols-2">
            {data.map(item => 
              <div className="grid px-2 grid-cols-2 w-fit md:place-self-center" key={uuidv4()}>
                <CartItemCard data={item} />
                <div className="text-xl my-6 border-2 border-gray-300 rounded-lg shadow-lg shadow-gray-300 flex justify-evenly w-fit items-center row-start-2 md:my-10">
                  <BiTrash className={`${ Number(item.quantity) > 1 ? 'hidden':''} mx-3`} onClick={()=>deleteItem.mutate(item.id)} title="delete" />
                  <button className={`${ Number(item.quantity) > 1 ? '':'hidden'} mx-3`} onClick={(e)=>handleChange(e, item.id, item.quantity)} name="decrease-quantity" type="button">-</button>
                  <span className="w-10 text-base text-center border-x-2 border-gray-300">{item.quantity}</span>
                  <button className="mx-3" onClick={(e)=>handleChange(e, item.id, item.quantity)} name="increase-quantity" type="button">+</button>
                </div>
                <button className="my-6 border-2 border-gray-300 rounded-md shadow-lg shadow-gray-300 w-fit px-3 row-start-2 md:my-10" onClick={()=>deleteItem.mutate(item.id)} type={'button'} name={`delete ${item.title}`}>Delete</button>
              </div>
            )}
          </div>
          </>
        ) : (
          <div className="font-semibold grid place-items-center gap-y-8">
            <div className="flex items-center gap-4">
              <MdOutlineRemoveShoppingCart className="text-xl" />
              <span>No Items In Your Cart.</span>
            </div>
            <Link to="/">
              <button className="bg-red-700 text-gray-200 py-2 px-6 rounded-md w-full" type="button">Keep Shopping</button>
            </Link>
          </div>
        )}
      </div>
    </>
  )
}

export default Cart