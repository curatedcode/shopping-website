import { AiOutlineShoppingCart } from "react-icons/ai"
import { RiBearSmileLine } from "react-icons/ri"
import { RxHamburgerMenu } from "react-icons/rx"
import { Outlet, Link } from "react-router-dom"

function NavBar(){
  return(
    <>
    <nav className="px-5 py-3">
      <ul className="grid grid-cols-3 items-center text-2xl">
        <li>
          <RxHamburgerMenu />
        </li>
        <li className="title-font place-self-center">
          <Link to="/">
            <RiBearSmileLine className="fill-red-700 text-3xl" />
          </Link>
        </li>
        <li className="place-self-end">
          <Link className="" to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
    <Outlet />
    </>
  )
}

export default NavBar