import { useLocation } from "react-router-dom"
import { v4 as uuidv4 } from 'uuid'

function Product() {
  const date = new Date()
  const deliveryDate = `${date.getDay()} , ${date.getMonth() + date.getDate()}`
  const location = useLocation()
  const data = location.state
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