import { AiOutlineShoppingCart } from "react-icons/ai"
import { Outlet, Link } from "react-router-dom"

function NavBar(){
  return(
    <>
    <nav>
      <ul>
        <li className="title-font font-bold">
          <Link to="/">Shop-R-Us</Link>
        </li>
        <li>
          <Link to="/cart">{<AiOutlineShoppingCart />}Cart</Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  )
}

export default NavBar