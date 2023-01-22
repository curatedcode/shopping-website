import { AiOutlineShoppingCart } from "react-icons/ai"
import { Outlet, Link } from "react-router-dom"

function NavBar(){
  return(
    <>
    <nav>
      <ul>
        <li>
          <Link to="/">Shop-R-Us</Link>
        </li>
        <li>
          <Link to="/cart">{<AiOutlineShoppingCart />}Cart</Link>
          {/* make sure to put text around any icon for accessability */}
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  )
}

export default NavBar