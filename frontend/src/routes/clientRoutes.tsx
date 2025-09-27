import { Route} from "react-router";
import App from "@/App.tsx";
import { ClientLayout} from "@/pages/client/clientLayout.tsx";
import {Login} from "@/pages/client/auth/login.tsx";

export const useClientRoutes = () => {
    return (
        <>
            <Route element={<ClientLayout />}>
                <Route path={'/'} element={<App />} />
                <Route path={'/login'} element={<Login />} />
            </Route>
        </>
    )
}