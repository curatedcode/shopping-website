import { useState } from "react"
import { AiOutlineHome, AiOutlineShoppingCart } from "react-icons/ai"
import { RiBearSmileLine } from "react-icons/ri"
import { RxHamburgerMenu } from "react-icons/rx"
import { IoClose } from "react-icons/io5"
import { Outlet, Link } from "react-router-dom"

function NavBar(){
  const [isNavOpen, setIsNavOpen] = useState(false)
  return(
    <>
    <nav className="px-5 py-3">
      <ul className="grid grid-cols-3 text-2xl">
        <li className="place-self-start grid self-center">
          <RxHamburgerMenu onClick={()=>setIsNavOpen(true)}/>
        </li>
        <li className="title-font place-self-center grid self-center">
          <Link to="/">
            <RiBearSmileLine className="fill-red-700 text-3xl" />
          </Link>
        </li>
        <li className="place-self-end grid self-center">
          <Link className="" to="/cart">
            <AiOutlineShoppingCart />
          </Link>
        </li>
      </ul>
    </nav>
    <div className={`${isNavOpen ? 'left-0 bg-black bg-opacity-80':'bg-opacity-0 -left-full'} top-0 overscroll-y-none overflow-y-scroll transition-all duration-300 w-full h-screen fixed pr-20`}>
      <div className="bg-red-800 pt-10 pb-4 pl-6 grid text-lg text-white">
        <span className="font-semibold -mb-2">Browse</span>
        <span className="text-2xl">Shop-R-Us</span>
      </div>
      <nav className="bg-gray-300 h-screen">
        <div className="py-4 pl-6 pr-4 w-full bg-gray-200 mb-1 flex items-center justify-between font-semibold">
          <span>Shop-R-Us Home</span>
          <Link to="/" onClick={()=>setIsNavOpen(false)}>
            <AiOutlineHome className="text-2xl" />
          </Link>
        </div>
        <ul className="py-6 pl-6 bg-gray-200 h-screen flex flex-col gap-8 text-sm">
          <span className="font-semibold text-lg">Trending</span>
          <Link to="/" onClick={()=>setIsNavOpen(false)}>
            <li>Best Sellers</li>
          </Link>
          <Link to="/" onClick={()=>setIsNavOpen(false)}>
            <li>New Releases</li>
          </Link>
          <Link to="/" onClick={()=>setIsNavOpen(false)}>
            <li>On The Rise</li>
          </Link>
        </ul>
      </nav>
      <button className="absolute right-6 top-6 text-4xl" type="button" onClick={()=>setIsNavOpen(false)}><IoClose className="fill-gray-200" /></button>
    </div>
    <Outlet />
    </>
  )
}

export default NavBar