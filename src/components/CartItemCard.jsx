
function CartItemCard(props){
  return(
    <div className="grid grid-cols-2 grid-rows-3 gap-x-2 p-0 m-0 col-span-2 md:text-lg">
      <img className="grid row-span-full rounded-md md:w-72" src={props.data.thumbnail} alt={props.data.title}></img>
      <span className="overflow-hidden text-ellipsis leading-tight">{props.data.title}</span>
      <div className="font-semibold flex items-center -mt-2 mb-1">
        <span className="text-xs md:text-sm">$</span>
        <span>{props.data.price}</span>
      </div>
      <span className={`${Number(props.data.stock) > 0 ? '':'hidden'} text-green-700 font-semibold -mt-2 text-sm md:text-base`}>In Stock.</span>
      <span className={`${Number(props.data.stock) > 0 ? 'hidden':''} text-red-600 font-semibold -mt-2 text-sm md:text-base`}>Out of Stock.</span>
    </div>
  )
}

export default CartItemCard