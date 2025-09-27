import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {ReactClientProvider} from "@/providers/QueryClientProvider.tsx";
import {AppRoutes} from "@/routes/appRoutes.tsx";

createRoot(document.getElementById('root')!).render(
  <StrictMode>
      <ReactClientProvider>
          <AppRoutes />
      </ReactClientProvider>
  </StrictMode>,
)
