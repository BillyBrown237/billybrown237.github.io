import { createBrowserRouter } from "react-router"
import { NotFoundPage } from "@/pages/not-found-page"
import {ClientLayout} from "@/pages/client/clientLayout.tsx";
import {clientRoutes} from "@/routes/clientRoutes.tsx";
import {dashboardRoutes} from "@/routes/dashboardRoutes.tsx";
import {Login} from "@/pages/client/auth/login.tsx";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <ClientLayout />,
        children: clientRoutes,
    },
    {
        path:'/login',
        element: <Login />
    },
    dashboardRoutes,
    {
        path: "*",
        element: <NotFoundPage />,
    },
])
