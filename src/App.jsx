// Importa la herramienta de depuración de React Query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// styled‑components para theming CSS‑in‑JS y ThemeProvider
import styled, { ThemeProvider } from 'styled-components'

// Importaciones centralizadas (proveedor de auth, rutas, temas, componentes de UI)
import {
  AuthContextProvider,
  MyRoutes,
  Light,
  Dark,
  Sidebar,
  Menuhambur,
  Login,
} from './index'

// React hooks
import { useState, createContext, useEffect } from 'react'

// Media‑queries definidas en styles/breackpoints.jsx
import { Device } from './styles/breackpoints'

// Hook de React Router para conocer la ruta actual
import { useLocation } from 'react-router-dom'

/**
 * Contexto global para exponer el tema (light/dark) y su setter.
 */
export const ThemeContext = createContext(null)

/**
 * BREAKPOINT numérico (px) equivalente a Device.tablet
 * 👉 Se usa en JS para detectar cuándo pasamos a «modo móvil»
 */
const TABLET_WIDTH = 768 // ajusta si tu Device.tablet es diferente

/**
 * Componente raíz de la SPA: theming + auth + rutas + layout + devtools.
 */
function App() {
  /* ---------------- Tema ---------------- */
  const [themeuse, setTheme] = useState('dark')
  const theme = themeuse === 'light' ? 'light' : 'dark'
  const themeStyles = theme === 'light' ? Light : Dark

  /* ---------------- Sidebar ---------------- */
  const [sidebarOpen, setSidebarOpen] = useState(false)

  // Al cambiar de escritorio ➜ móvil cerramos la sidebar automáticamente
  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TABLET_WIDTH}px)`)

    // Cuando min‑width deja de cumplirse (e.matches === false) entramos a móvil
    const onChange = (e) => {
      if (!e.matches) setSidebarOpen(false)
    }

    // Escuchamos cambios de tamaño
    mq.addEventListener('change', onChange)

    // Limpieza
    return () => mq.removeEventListener('change', onChange)
  }, [])

  /* ---------------- Ruta actual ---------------- */
  const { pathname } = useLocation()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyles}>
        <AuthContextProvider>
          {pathname.toLowerCase() === "/login" ? (
            <Login />
          ) : (
            <Container $open={sidebarOpen} className={sidebarOpen ? 'active' : ''}>
              {/* Sidebar (drawer en móvil, mini / completa en desktop) */}
              <section className='ContenSidebar'>
                <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
              </section>

              {/* Botón hamburguesa (solo visible en móvil) */}
              <section className='ContenMenuambur'>
                <Menuhambur onClick={() => setSidebarOpen(!sidebarOpen)} />
              </section>

              {/* Contenido principal (rutas) */}
              <section className='ContenRoutes'>
                <MyRoutes />
              </section>
            </Container>
          )}
          <ReactQueryDevtools initialIsOpen={false} />
        </AuthContextProvider>
      </ThemeProvider>
    </ThemeContext.Provider>
  )
}

/* --------------------------------------------------------------------- */
/*                             styled‑components                          */
/* --------------------------------------------------------------------- */
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr; /* móvil */
  background-color: ${(props) => props.theme.bgtotal};
  transition: padding-left 0.3s;

  /* ---------------- Sidebar (móvil) ---------------- */
  .ContenSidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    z-index: 1001;
    background: ${(props) => props.theme.bg4};
    transform: translateX(-100%);
    transition: transform 0.3s;
    display: flex;
  }
  &.active .ContenSidebar {
    transform: translateX(0);
  }

  /* ---------------- Botón hamburguesa ---------------- */
  .ContenMenuambur {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1100;
    display: block; /* visible en móvil */
  }

  /* ---------------- Contenedor de Rutas ---------------- */
  .ContenRoutes {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    margin-left: 0;
    transition: margin-left 0.3s;
    background: ${(props) => props.theme.bgtotal};
  }
  &.active .ContenRoutes {
    margin-left: 220px;
  }

  /* ---------------- Tablet / Desktop ---------------- */
  @media ${Device.tablet} {
    /* 👈 Cambiamos el ancho de la columna cuando se pliega (220 ↔ 65 px) */
    grid-template-columns: ${(props) => (props.$open ? '220px 1fr' : '65px 1fr')};

    /* Sidebar fija: mini o completa */
    .ContenSidebar {
      position: relative;
      transform: none; /* anulamos translateX */
      width: ${(props) => (props.$open ? '220px' : '65px')};
      height: auto;
      background: none;
    }

    /* Ocultamos el botón hamburguesa en escritorio */
    .ContenMenuambur {
      display: none;
    }

    /* El contenido no necesita margen en desktop */
    .ContenRoutes,
    &.active .ContenRoutes {
      margin-left: 0;
      width: 100%;
    }
  }
`

export default App
