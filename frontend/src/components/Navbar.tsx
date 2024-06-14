import { Link } from "react-router-dom"
import { Avatar } from "./Avatar"

export const Navbar = () => {
    return <div className="flex justify-between px-10 py-5 border-b">
        <Link to={"/blogs"} className="flex flex-col justify-center">
            <div >
                Medium
            </div>
        </Link>
        <div className="flex">
            <Link to="/publish" className="flex flex-col justify-center pt-3">
                <button type="button" className="text-white bg-green-700 hover:bg-green-800 focus:outline-none focus:ring-4 focus:ring-green-300 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800">Publish</button>
            </Link>
            <div>
                <Avatar name="Dhairya" />
            </div>
        </div>
    </div>
}