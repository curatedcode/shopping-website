import { Link } from "react-router-dom"
import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { useEffect, useState } from "react"
import { v4 as uuidv4 } from 'uuid'

function ItemCard(props){
  const [stars, setStars] = useState()
  function colorReviewStars(rating){
    const numToColor = Math.floor(rating)
    let allStarsArray = []
    for(let i=0; i<numToColor; i++){
      allStarsArray.push(<AiFillStar key={uuidv4()} className="fill-orange-500" />)
    }
    if(allStarsArray.length !== 5){
      const leftToFill = 5 - allStarsArray.length
      for(let i=0; i<leftToFill; i++){
        allStarsArray.push(<AiOutlineStar key={uuidv4()} className="fill-gray-600" />)
      }
    }
    setStars(allStarsArray)
  }
  useEffect(()=>{
    colorReviewStars(props.data.rating)
  },[props.data.rating])
  return(
    <Link to={`/product/${props.data.id}`} className="grid grid-cols-2 gap-x-3 px-4">
      <img className="aspect-square rounded-lg" src={props.data.thumbnail} alt={props.data.title}></img>
      <div className="text-lg">
        <span className="">{props.data.title}</span>
        <div data-testid="stars" className="flex items-center">{stars}</div>
        <div className="flex items-center font-semibold">
          <span className="text-sm">$</span>
          <span>{props.data.price}</span>
        </div>
      </div>
    </Link>
  )
}

export default ItemCard