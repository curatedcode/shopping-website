import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useRef, useState } from "react"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function Product() {
  const date = new Date()
  const deliveryDate = `${date.getDay()} , ${date.getMonth() + date.getDate()}`
  const params = useParams()
  const [ quantity, setQuantity] = useState(1)
  const { status, error, data } = useQuery([`product-${params.id}`],()=>{
    return(
      axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then(res => res.data)
    )
  })
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
  const handleChange = (e)=>{
    const initialValue = quantity
    if(e.target.type === 'button'){
      e.target.name === 'increase-quantity' ? (
        quantity+1 > 99 ? setQuantity(99) : setQuantity(quantity+1)
      ) : (
        quantity-1 < 1 ? setQuantity(1) : setQuantity(quantity-1)
      )
    } else {
      if(isNaN(e.target.value)){ setQuantity(initialValue) } 
      else { 
        e.target.value > 0 && e.target.value < 100 ? setQuantity(e.target.value) : setQuantity(initialValue)
      }
    }
  }
  return(
    <div>
      <div>
        {data.images.map(img => <img src={img} alt={data.title} key={uuidv4()}></img>)}
      </div>
      <div>
        <span>{data.title}</span>
        <span>{data.price}</span>
        <span>{data.description}</span>
      </div>
      <div>
        <span>{data.price}</span>
        <span>{deliveryDate}</span>
        <div>
          <button name="increase-quantity" type="button" onClick={handleChange}>+</button>
          <input name="quantity" type="number" value={quantity} onChange={handleChange} data-testid="quantity"></input>
          <button name="decrease-quantity" type="button" onClick={handleChange}>-</button>
        </div>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}

export default Product