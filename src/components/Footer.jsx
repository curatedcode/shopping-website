import { Link, Outlet } from "react-router-dom";


function Footer(){
  return(
    <>
    <Outlet />
    <footer className="bg-red-700 sticky w-full mt-12">
      <ul className="flex justify-evenly py-4 text-sm text-white">
        <Link to='/contact'>
          <li>Contact Us</li>
        </Link>
        <Link to='/privacy-policy'>
          <li>Privacy Policy</li>
        </Link>
        <Link to='/about'>
          <li>About Us</li>
        </Link>
      </ul>
    </footer>
    </>
  )
}

export default Footer