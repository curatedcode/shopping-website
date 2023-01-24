import { Link } from "react-router-dom"

function ItemCard(props){
  return(
    <div className="">
      <Link to={`/product/${props.data.title}`} state={props.data}>
        <img className="w-32 aspect-square" src={props.data.thumbnail} alt={props.data.title}></img>
        <span>{props.data.title}</span>
        <span>{props.data.price}</span>
        <span>{props.data.rating}</span>
      </Link>
    </div>
  )
}

export default ItemCard