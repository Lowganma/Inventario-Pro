import styled, { ThemeProvider } from 'styled-components'
import { AuthContextProvider, MyRoutes, Light, Dark, Sidebar,Menuhambur } from './index'
import { useState,createContext } from 'react';
import { Device }  from './styles/breackpoints';
;

export const ThemeContext = createContext(null);

function App() {
  const [themeuse, setTheme] = useState("dark");  
  const theme = themeuse==="light" ? "light" : "dark";
  const themeStyles = theme==="light"?Light:Dark;
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <>
      <ThemeContext.Provider value={{theme, setTheme }}>
        <ThemeProvider theme={themeStyles}>
          <AuthContextProvider>  
            <Container classname ={sidebarOpen?"active":""}>
              <section className="ContenSidebar">
                <Sidebar state={sidebarOpen} setState={setSidebarOpen} />
                  </section>
              <section className="ContenMenuambur"><Menuhambur/></section>
              <section className="ContenRoutes">Routes</section>
              <MyRoutes />
            </Container>
          </AuthContextProvider> 
        </ThemeProvider>
      </ThemeContext.Provider>
    </>
  )
}
const Container = styled.main`
  display:grid;
  grid-template-columns: 1fr;
  background-color: ${props => props.theme.bgtotal};
  .ContenSidebar {
  display: none;  
  }
  .ContenMenuambur {
    display: block;
    position: adsolute;
    left: 20px;
  }

@media ${Device.tablet} { 
  grid-template-columns: 65fr 1fr;  
  &.active{
  grid-template-columns: 220fr 1fr;
  }
  .ContenSidebar {
    display: initial
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
  `;
export default App
