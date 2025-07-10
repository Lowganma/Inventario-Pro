
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styled, { ThemeProvider } from 'styled-components'
import {
  AuthContextProvider,
  MyRoutes,
  Light,
  Dark,
  Sidebar,
  Menuhambur,
  Login,
} from './index'
import { useState, createContext, useEffect } from 'react'
import { Device } from './styles/breackpoints'
import { useLocation } from 'react-router-dom'

export const ThemeContext = createContext(null)

const TABLET_WIDTH = 768 

function App() {

  const [themeuse, setTheme] = useState('dark')
  const theme = themeuse === 'light' ? 'light' : 'dark'
  const themeStyles = theme === 'light' ? Light : Dark

  const [sidebarOpen, setSidebarOpen] = useState(false)


  useEffect(() => {
    const mq = window.matchMedia(`(min-width: ${TABLET_WIDTH}px)`)

    const onChange = (e) => {
      if (!e.matches) setSidebarOpen(false)
    }

    mq.addEventListener('change', onChange)


    return () => mq.removeEventListener('change', onChange)
  }, [])

  const { pathname } = useLocation()

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ThemeProvider theme={themeStyles}>
        <AuthContextProvider>
          {pathname === "/login" ? (
            <Login />
          ) : (
            <Container $open={sidebarOpen} className={sidebarOpen ? 'active' : ''}>
              <section className='ContenSidebar'>
                <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
              </section>
              <section className='ContenMenuambur'>
                <Menuhambur onClick={() => setSidebarOpen(!sidebarOpen)} />
              </section>
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
