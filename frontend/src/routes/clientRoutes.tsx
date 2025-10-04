import { type RouteObject} from "react-router";
import App from "@/App.tsx";


export const clientRoutes: RouteObject[] = [
    {
        index:true,
        element: <App />
    },
]