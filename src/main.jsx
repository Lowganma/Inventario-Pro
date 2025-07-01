// ============================================================
// main.jsx (comentado línea a línea)
// ============================================================

// React núcleo
import React from 'react'
// Nuevo API de ReactDOM (desde v18) para crear el root
import ReactDOM from 'react-dom/client'

// Componente raíz de la aplicación
import App from './App.jsx'

// Estilos globales
import './index.css'

// Enrutamiento del lado del cliente
import { BrowserRouter } from 'react-router-dom'

// Cliente y proveedor de React Query
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

// Instanciamos una sola vez el QueryClient para caché y deduplicación de queries
const queryClient = new QueryClient()

// Creamos el nodo raíz en el elemento con id="root" y renderizamos la app
ReactDOM.createRoot(document.getElementById('root')).render(
  // StrictMode activa verificaciones adicionales en desarrollo
  <React.StrictMode>
    {/* Habilitamos el enrutamiento */}
    <BrowserRouter>
      {/* Proveemos QueryClient a toda la app para usar useQuery / useMutation */}
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>, // La coma final es opcional y no afecta la ejecución
)
