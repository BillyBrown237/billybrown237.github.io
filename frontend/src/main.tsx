import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ReactClientProvider} from "@/providers/QueryClientProvider.tsx";
import { router } from "./routes/appRoutes"
import {RouterProvider} from "react-router";
import { Toaster } from "@/components/ui/sonner"

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ReactClientProvider>
          <RouterProvider router={router} />
          <Toaster />
      </ReactClientProvider>
  </StrictMode>,
)
