import './App.css'
import {NavLink} from "react-router";

function App() {


    return (
        <>
            <h1 className={'text-3xl'}>Hello World</h1>
            <nav>
                {/* NavLink makes it easy to show active states */}
                <NavLink
                    to="/login"
                    className={({isActive}) =>
                        isActive ? "active" : ""
                    }
                >
                    Home
                </NavLink>
            </nav>
        </>
    )
}

export default App
