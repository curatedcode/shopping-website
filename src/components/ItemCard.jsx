import { Link } from "react-router-dom"
import { useEffect, useState } from "react"
import colorReviewStars from "./colorReviewStars"

function ItemCard(props){
  const [stars, setStars] = useState([])
  useEffect(()=>{
    setStars(colorReviewStars(props.data.rating))
  },[props.data.rating])
  return(
    <Link to={`/product/${props.data.id}`} className="grid grid-cols-2 gap-x-3 px-4">
      <img className="rounded-lg" src={props.data.thumbnail} alt={props.data.title}></img>
      <div className="text-lg">
        <span className="">{props.data.title}</span>
        <div className="flex items-center">{stars}</div>
        <div className="flex items-center font-semibold">
          <span className="text-sm">$</span>
          <span>{props.data.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard