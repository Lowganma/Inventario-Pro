import styled from "styled-components";
import { Btnsave } from "../moleculas/Btnsave";
import { useAuthStore } from "../../store/AuthStore";

export function HomeTemplate() {
  const {signOut} = useAuthStore();
  return (
    <Container>
      <h1>Home Template</h1>
      <Btnsave titulo="Cerrar sesion"
      bgcolor="#fff" funcion={signOut}/>
    </Container>
  );
}
const Container = styled.div`
display: grid;
justify-content: center;
align-items: center;
height: 100vh;
background-color: ${props => props.theme.bgtotal};
color: ${props => props.theme.text};
width: 100%;
`