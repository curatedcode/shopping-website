import { AiOutlineStar, AiFillStar } from "react-icons/ai"
import { v4 as uuidv4 } from 'uuid'


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
  return allStarsArray
}

export default colorReviewStars