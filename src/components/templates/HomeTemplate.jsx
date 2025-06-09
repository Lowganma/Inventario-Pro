import styled from "styled-components";

export function HomeTemplate() {
  return (
    <Container>
      <h1>Home
      </h1>
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