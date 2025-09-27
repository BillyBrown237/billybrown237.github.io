import {Link} from "react-router";

export const Logo = () => {
    return (
        <Link to={'/'}>
            <h3 className="text-2xl font-black tracking-widest text-gray-900 dark:text-white drop-shadow-md">ANIKI</h3>
        </Link>
    )
}