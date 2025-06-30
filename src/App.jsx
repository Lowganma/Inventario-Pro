
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import styled, { ThemeProvider } from 'styled-components'
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar,Menuhambur, Login } from './index'
import { useState,createContext } from 'react';
import { Device }  from './styles/breackpoints';
import {useLocation} from 'react-router-dom'; // asdasddas

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");  
  const theme = themeuse==="light" ? "light" : "dark";
  const themeStyles = theme==="light"?Light:Dark;
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const {pathname} = useLocation();
  return (
    <>
      <ThemeContext.Provider value={{theme, setTheme }}>
        <ThemeProvider theme={themeStyles}>
          <AuthContextProvider>
            {
             pathname =="/Login"?(<Login/>):( 
             <Container className ={sidebarOpen?"active":""}>
              <section className="ContenSidebar">
                <Sidebar state={sidebarOpen} setState={()=> setSidebarOpen(!sidebarOpen)} />
                  </section>
              <section className="ContenMenuambur"><Menuhambur/></section>
              <section className="ContenRoutes">
              <MyRoutes />
              </section>
            </Container>
              
            )
            }  
           
             <ReactQueryDevtools initialIsOpen={false} />
          </AuthContextProvider> 
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}
const Container = styled.div`
  display:relative;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.bgtotal};
  .ContenSidebar {
  display: none;  
  }
  .ContenMenuambur {
    display: block;
    position: fixed;
  }

@media ${Device.tablet} { 
  grid-template-columns: 65fr 1fr;  
  &.active{
  grid-template-columns: 220fr 1fr;
  }
  .ContenSidebar {
    display: flex;
    position: fixed; //este es el valor que hace que desaparezca el fondo invisible// 
    }
  .ContenMenuambur {
    display: none;
  }
  .ContentRoutes {
    grid-column: 1;
    width: 100%;
    @media ${Device.tablet} {
      grid-column: 2;
    }
    }
  }
  `;
export default App
