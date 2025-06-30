import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styled, { ThemeProvider } from 'styled-components'
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar, Menuhambur, Login } from './index'
import { useState, createContext } from 'react';
import { Device } from './styles/breackpoints';
import { useLocation } from 'react-router-dom';

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");
  const theme = themeuse === "light" ? "light" : "dark";
  const themeStyles = theme === "light" ? Light : Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { pathname } = useLocation();

  return (
    <>
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <ThemeProvider theme={themeStyles}>
          <AuthContextProvider>
            {pathname === "/Login" ? (
              <Login />
            ) : (
              <Container className={sidebarOpen ? "active" : ""}>
                <section className="ContenSidebar">
                  <Sidebar state={sidebarOpen} setState={() => setSidebarOpen(!sidebarOpen)} />
                </section>
                <section className="ContenMenuambur">
                  <Menuhambur onClick={() => setSidebarOpen(!sidebarOpen)} />
                </section>
                <section className="ContenRoutes">
                  <MyRoutes />
                </section>
              </Container>
            )}
            <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider>
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  );
}

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.bgtotal};
  transition: padding-left 0.3s;

  .ContenSidebar {
    position: fixed;
    top: 0;
    left: 0;
    height: 100vh;
    width: 220px;
    z-index: 1001;
    background: ${props => props.theme.bg4};
    transform: translateX(-100%);
    transition: transform 0.3s;
    display: flex;
  }
  &.active .ContenSidebar {
    transform: translateX(0);
  }

  .ContenMenuambur {
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 1100;
    display: block;
  }

  .ContenRoutes {
    position: relative;
    width: 100vw;
    min-height: 100vh;
    margin-left: 0;
    transition: margin-left 0.3s;
    background: ${props=> props.theme.bgtotal};
  }

  &.active .ContenRoutes {
    margin-left: 220px;
  }

  @media ${Device.tablet} {
    grid-template-columns: 220px 1fr;
    .ContenSidebar {
      position: relative;
      transform: none;
      width: 220px;
      height: auto;
      background: none;
    }
    .ContenMenuambur {
      display: none;
    }
    .ContenRoutes, 
    &.active .ContenRoutes{  
    margin-left: 0;
    width: 100%;
    }
  }
`;

export default App