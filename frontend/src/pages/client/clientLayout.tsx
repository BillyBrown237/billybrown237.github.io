import {Outlet} from "react-router";

export const ClientLayout = () => {
    return (
        <>
            <header className="auth-layout">header if any</header>
            <main className="auth-layout">
                <Outlet />
            </main>
            <footer className="auth-layout">footer if any
            </footer>
        </>
    )
}