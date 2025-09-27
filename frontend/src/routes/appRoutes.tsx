import {BrowserRouter, Routes} from "react-router";
import { useClientRoutes} from "@/routes/clientRoutes.tsx";
import {useDashboardRoutes} from "@/routes/dashboardRoutes.tsx";

export const AppRoutes = () => {
    const ClientRoutes = useClientRoutes();
    const DashboardRoutes = useDashboardRoutes();

    return (
        <BrowserRouter>
        <Routes>
            {ClientRoutes}
            {DashboardRoutes}
        </Routes>
        </BrowserRouter>
    )

}