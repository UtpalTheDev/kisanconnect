import {Link} from "react-router-dom";
import {BiUser,BiHome,BiBell,BiSearch} from "react-icons/bi"
export default function Navigator(){

    return(
        <div className="fixed bottom-0 bg-white w-full flex z-10 h-8 justify-between px-3 items-center rounded-t-xl py-6 border border-gray-100">
        <Link to="/user">
            <BiUser className="text-2xl"/>
        </Link>
        <Link to="/">
            <BiHome className="text-2xl"/>
        </Link>
        <Link to="/notification">
            <BiBell className="text-2xl"/>
        </Link>
        <Link to="/search">
            <BiSearch className="text-2xl"/>
        </Link>
        </div>
    )
}