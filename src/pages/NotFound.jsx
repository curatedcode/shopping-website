import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

function NotFound(){
  localStorage.removeItem('checkoutStage')
  const navigate = useNavigate()
  useEffect(()=>{
    setTimeout(()=>{
      navigate('/', {replace: true})
    },2000)
  })
  return(
    <span>Not Found</span>
  )
}

export default NotFound