import {Link} from "react-router-dom";
export default function Navigator(){

    return(
        <div className="fixed bottom-0 bg-white w-full flex z-10 h-8 justify-between px-3 items-center rounded-t-xl py-6 border border-gray-100">
        <Link to="/user"><span class="material-icons-outlined">
            person_outline
            </span>
        </Link>
        <Link to="/"><span class="material-icons-outlined">
             home
            </span>
        </Link>
        <Link to="/notification"><span class="material-icons-outlined">
            notifications
            </span>
        </Link>
        <Link to="/search"> <span class="material-icons-outlined">
            search
            </span>
        </Link>
        </div>
    )
}