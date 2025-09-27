import { Route} from "react-router";
import App from "@/App.tsx";

export const useDashboardRoutes = () => {
    return (
        <>
            <Route path={'/dashboard'} element={<App />} />

        </>
    )
}