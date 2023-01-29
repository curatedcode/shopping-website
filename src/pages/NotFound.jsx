import { useEffect } from "react"
import { Link, useNavigate } from "react-router-dom"

function NotFound(){
  localStorage.removeItem('checkoutStage')
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/', {replace: true})
    },2000)
  })
  return(
    <div className="grid place-items-center py-8 gap-8 font-semibold ">
      <span className="text-xl">404 Page Not Found</span>
      <Link to="/" >
        <button className="bg-red-700 text-gray-200 py-2 px-6 my-4 rounded-md w-72">Take me home</button>
      </Link>
    </div>
  )
}

export default NotFound