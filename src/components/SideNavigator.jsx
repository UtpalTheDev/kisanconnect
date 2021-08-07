import {Link} from "react-router-dom";
import {BiUser,BiHome,BiBell,BiSearch} from "react-icons/bi"
export default function SideNavigator(){

    return(
        <div className="sm:flex bg-white w-full flex-col px-3  py-16  ">
        <Link to="/user" className="block flex items-center py-2">
            <BiUser className="text-2xl"/>
            <div className="text-xl pl-1">User</div>
        </Link>
        <Link to="/" className="block flex items-center py-2">
            <BiHome className="text-2xl"/>
            <div className="text-xl pl-1">Home</div>
        </Link>
        <Link to="/notification" className="block flex items-center py-2">
            <BiBell className="text-2xl"/>
            <div className="text-xl pl-1">Notification</div>
        </Link>
        <Link to="/search" className="block flex items-center py-2">
            <BiSearch className="text-2xl"/>
            <div className="text-xl pl-1">Search</div>
        </Link>
        </div>
    )
}