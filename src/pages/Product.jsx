import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { useParams } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function Product() {
  const date = new Date()
  const deliveryDate = `${date.getDay()} , ${date.getMonth() + date.getDate()}`
  const params = useParams()
  const { status, error, data } = useQuery([`product-${params.id}`],()=>{
    return(
      axios
      .get(`https://dummyjson.com/products/${params.id}`)
      .then(res => res.data)
    )
  })
  if(status === 'loading') return <h1>Loading...</h1>
  if(status === 'error') return <h1>{JSON.stringify(error)}</h1>
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
        <span>Quantity</span>
        <button>Add to Cart</button>
      </div>
    </div>
  )
}

export default Product