import { useQuery } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'
import { IoArrowBack, IoArrowForward } from "react-icons/io5"
import { GoLocation } from "react-icons/go"
import colorReviewStars from "../components/colorReviewStars"
import getProduct from "../api/getProduct"
import addItemToCart from "../api/addItemToCart"
import handleQuantityChange from "../api/handleQuantityChange"
import getDate from "../api/getDate"

function Product() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [stars, setStars] = useState([])
  const [isInStock, setIsInStock] = useState()
  const params = useParams()
  const [ quantity, setQuantity] = useState(1)
  const { status, error, data } = useQuery({
    queryKey: [`product${params.id}`],
    queryFn: ()=>getProduct(params.id)
  })
  const [isItemAddedToCart, setIsItemAddedToCart] = useState(false)

  useEffect(()=>{
    if(status === 'loading' || status === 'error') return
    setStars(colorReviewStars(data.rating))
    setIsInStock(Number(data.stock) > 0 ? true : false)
    setTimeout(()=>{setIsItemAddedToCart(false)},4000)
  // eslint-disable-next-line react-hooks/exhaustive-deps
  },[status,isItemAddedToCart])
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>

  const handleSlide = (operation)=>{
    if(operation === 'slide-forward'){
      currentSlide+1 < data.images.length ? setCurrentSlide(currentSlide+1) : setCurrentSlide(0) 
    } else {
      currentSlide-1 >= 0 ? setCurrentSlide(currentSlide-1) : setCurrentSlide(data.images.length-1)
    }
  }
  return(
    <>
    <div className="text-gray-200 bg-red-700 py-3 text-sm flex justify-center gap-2 items-center font-semibold mb-4"><GoLocation className="text-xl fill-gray-200" /> Select a location to see product availability</div>
    <div className="h-screen px-4 md:grid md:place-items-center">
      <div className="flex justify-between items-center text-sm md:w-1/3">
        <span>{data.title}</span>
        <span className="flex">{stars}</span>
      </div>
      <div className="grid grid-cols-2 text-xl border-b-2 border-gray-300 pb-2 mb-4 md:w-fit">
        <button aria-label="slide-previous" className="row-start-2 place-self-center" name="slide-previous" type="button" onClick={()=>handleSlide('slide-previous')}><IoArrowBack /></button>
        {data.images.map((img, index) => <img className={`${currentSlide === index ? '':'hidden'} col-span-full my-2 md:w-96`} src={img} alt={data.title} key={uuidv4()}></img>)}
        <button aria-label="slide-forward" className="place-self-center" name="slide-forward" type="button" onClick={()=>handleSlide('slide-forward')}><IoArrowForward /></button>
      </div>
      <div className="grid gap-4">
        <div className="flex gap-2">
          <span className="text-gray-500 font-semibold">Price:</span>
            <span className="text-red-700">${data.price}</span>
        </div>
        <div className="flex gap-2">
          <span className="text-gray-500 font-semibold">Delivery:</span>
          <span className="font-bold text-black">{getDate()}</span>
        </div>  
      </div>
      <div className="grid gap-6 mt-6 mb-6 border-b-2 border-gray-300 pb-6">
        <span className={`${isInStock ? '':'hidden'} text-green-700 font-semibold -mb-4`}>In Stock.</span>
        <span className={`${isInStock ? 'hidden':''} text-red-600 font-semibold -mb-4`}>Out of Stock.</span>
        <div className="border-2 border-gray-300 rounded-lg shadow-lg shadow-gray-300 flex justify-evenly w-fit px-2 items-center">
          <button className="mx-3" name="decrease-quantity" type="button" onClick={(e)=>setQuantity(handleQuantityChange(e, quantity))}>-</button>
          <label className="border-l-2 border-gray-300 pl-1 mr-1" htmlFor="quantity">Qty:</label>
          <input className="w-7 text-center border-r-2 border-gray-300 focus-within:outline-gray-500" name="quantity" type="number" value={quantity} onChange={(e)=>setQuantity(handleQuantityChange(e, quantity))} data-testid="quantity"></input>
          <button className="mx-3" name="increase-quantity" type="button" onClick={(e)=>setQuantity(handleQuantityChange(e, quantity))}>+</button>
        </div>
        <button className="bg-red-700 text-gray-200 py-2 px-6 rounded-full font-semibold w-full transition-all duration-300" onClick={()=>{
          setIsItemAddedToCart(true)
          addItemToCart(data,quantity)
        }}  name="add-to-cart" type="button" >{isItemAddedToCart ? '+ Added to cart' : 'Add to Cart'}</button> 
      </div>
      <div className="grid grid-cols-2 gap-y-2">
        <span className="text-gray-500 font-semibold">Brand</span>
        <span>{data.brand}</span>
        <span className="text-gray-500 font-semibold">Title</span>
        <span>{data.title}</span>
        <span className="text-gray-500 font-semibold">Description</span>
        <p>{data.description}</p>
      </div>
    </div>
  </>
  )
}

export default Product