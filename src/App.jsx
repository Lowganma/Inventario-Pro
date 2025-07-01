// Importa la herramienta de depuración de React Query
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'

// styled-components para theming CSS‑in‑JS y ThemeProvider
import styled, { ThemeProvider } from 'styled-components'

// Importaciones centralizadas de nuestro proyecto: proveedor de auth, rutas, temas, y componentes de UI
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar, Menuhambur, Login } from './index'

// React hooks necesarios
import { useState, createContext } from 'react';

// Objeto con media‑queries definidos en styles/breackpoints.jsx
import { Device } from './styles/breackpoints';

// Hook de React Router para conocer la ruta actual
import { useLocation } from 'react-router-dom';

/**
 * Contexto global para exponer el tema (light/dark) y su setter.
 * Se inicializa en null y se provee en <ThemeContext.Provider>.
 */
export const ThemeContext = createContext(null);

/**
 * Componente raíz de la SPA. Enlaza:
 *  - Theming (ThemeProvider + ThemeContext)
 *  - Autenticación (AuthContextProvider)
 *  - Ruteo protegido (MyRoutes + useLocation)
 *  - Layout responsivo (Sidebar colapsable + Menuhambur)
 *  - Devtools de React Query
 */
function App() {
  /** Estado que guarda el nombre del tema actual ("light" o "dark"). */
  const [themeuse, setTheme] = useState("dark");

  /** Normalizamos el valor del tema por si en el futuro admitimos más variantes. */
  const theme = themeuse === "light" ? "light" : "dark";

  /** Objeto de estilos que consumirá ThemeProvider. */
  const themeStyles = theme === "light" ? Light : Dark;

  /** Controla si la Sidebar está abierta (true) o colapsada (false). */
  const [sidebarOpen, setSidebarOpen] = useState(false);

  /** Extraemos la ruta actual para decidir si estamos en la pantalla de Login. */
  const { pathname } = useLocation();

  return (
    <>
      {/* Proveemos tema y setter a quien los necesite */}
      <ThemeContext.Provider value={{ theme, setTheme }}>
        {/* Inyectamos variables de tema a styled-components */}
        <ThemeProvider theme={themeStyles}>
          {/* Proveedor de autenticación basado en Supabase */}
          <AuthContextProvider>
            {/* Si la ruta es /Login mostramos exclusivamente la página de Login */}
            {pathname === "/Login" ? (
              <Login />
            ) : (
              /* Layout principal con Sidebar, botón hamburguesa y rutas. 
                 La clase .active se añade cuando sidebarOpen === true para desplazar el contenido. */
              <Container className={sidebarOpen ? "active" : ""}>
                {/* Sidebar fija a la izquierda */}
                <section className="ContenSidebar">
                  <Sidebar
                    state={sidebarOpen}
                    setState={() => setSidebarOpen(!sidebarOpen)}
                  />
                </section>

                {/* Botón hamburguesa flotante (solo se muestra en móvil) */}
                <section className="ContenMenuambur">
                  <Menuhambur onClick={() => setSidebarOpen(!sidebarOpen)} />
                </section>

                {/* Rutas internas de la aplicación */}
                <section className="ContenRoutes">
                  <MyRoutes />
                </section>
              </Container>
            )}
            {/* Herramientas de depuración de React Query (solo en dev) */}
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

/* Styled‑component que define el grid y la lógica de desplazamiento cuando la Sidebar está abierta.
   Utiliza las variables del tema (props.theme) y los breakpoints definidos en Device. */
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.bgtotal};
  transition: padding-left 0.3s;

  /* ----- Sidebar ----- */
  .ContenSidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    z-index: 1001;
    background: ${props => props.theme.bg4};
    transform: translateX(-100%); /* Oculta la Sidebar fuera de pantalla */
    transition: transform 0.3s;
    display: flex;
  }
  /* Cuando .active está presente desplazamos la Sidebar a la vista */
  &.active .ContenSidebar {
    transform: translateX(0);
  }

  /* ----- Botón hamburguesa ----- */
  .ContenMenuambur {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1100;
    display: block;
  }

  /* ----- Contenedor de rutas ----- */
  .ContenRoutes {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    margin-left: 0;
    transition: margin-left 0.3s;
    background: ${props => props.theme.bgtotal};
  }
  /* Cuando Sidebar está abierta desplazamos el contenido para dejar espacio */
  &.active .ContenRoutes {
    margin-left: 220px;
  }

  /* ----- Versión tablet / desktop ----- */
  @media ${Device.tablet} {
    grid-template-columns: 220px 1fr;

    .ContenSidebar {
      position: relative;
      transform: none;      /* Sidebar siempre visible */
      width: 220px;
      height: auto;
      background: none;
    }
    .ContenMenuambur {
      display: none;        /* Se oculta el botón hamburguesa */
    }
    .ContenRoutes,
    &.active .ContenRoutes {
      margin-left: 0;
      width: 100%;
    }
  }
`;

export default App;
