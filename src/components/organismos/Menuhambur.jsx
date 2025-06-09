import styled from "styled-components";
import {LinksArray, SecondarylinksArray , ToggleTema}  from "../../index";
import {NavLink} from "react-router-dom"
import {v} from "../../styles/variables";
import { useState } from "react";
export function Menuhambur() {
    const [click, setClick] = useState(false);
  return (
    <Container>
        <NavBar>
        <section>
            <HamburguerMenu onClick={() => setClick(!click)}>
        <label className={click?"toggle active":"toggle"}>
             <div className="bars" id="bar1"></div>
             <div className="bars" id="bar2"></div>
             <div className="bars" id="bar3"></div>
         </label>
            </HamburguerMenu>
        </section>
            <Menu $click={click.toString()}>
        {LinksArray.map(({ icon, label, to }) => (
          <div onClick={() => setClick(!click)}
            className="LinkContainer"
            key={label}
          >
            <NavLink to={to} className="Links">
              <div className="Linkicon">{icon}</div>
                <span>{label}</span>
            </NavLink>
          </div>
        ))}
        <Divider />
        {SecondarylinksArray.map(({ icon, label, to }) => (
          <div nClick={() => setClick(!click)}
            className="LinkContainer"
            key={label}
          >
            <NavLink
              to={to}
              className="Links"
            >
              <div className="Linkicon">{icon}</div>
                <span>{label}</span>
             
            </NavLink>
          </div>
        ))}
        <ToggleTema/>
        <Divider />
    </Menu>
        </NavBar>
    </Container>
  );
} const Container = styled.div`
  background-color: ${props => props.theme.body};`
    
const NavBar = styled.nav`
        display: flex;
        justify-content: space-between;
        align-items: center;
        height: 100vh;`

const HamburguerMenu = styled.span`
position: fixed;
top: 2rem;
left: 2rem;
z-index: 1000;
#checkbox {
  display: none;
}

.toggle {
  position: relative;
  width: 30px;
  height: 30px;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 6px;
  transition-duration: .5s;
  &.active {
   transition-duration: .5s;
   transform: rotate(180deg);
  .bars {
  position: absolute;
  transition-duration: .5s;
  }
  #bar2 {
  transform: scaleX(0);
  transition-duration: .5s;
  }
  #bar1 {
  width: 100%;
  transform: rotate(45deg);
  transition-duration: .5s;
  }
  #bar3 {
  width: 100%;
  transform: rotate(-45deg);
  transition-duration: .5s;
  }
  
}

.bars {
  width: 100%;
  height: 4px;
  background-color: ${(props) => props.theme.text};
  border-radius: 4px;
}

#bar2 {
  transition-duration: .8s;
}

#bar1,#bar3 {
  width: 70%;
}
`

const Menu = styled.div`
  display: flex;
  alin-items: center;
  list-style: none;
  z-index: 10;
  flex-direction: column;
  position: fixed;
  justify-content: center;
  top: 0; 
  left: 0;
  right: 0;
  bottom: 0;
  width: 100vw;
  background: ${(props) =>`rgba(${props.theme.bgAlpha}, 0.85)`};
  backdrop-filter: blur(3px);
  transform: ${({ $click }) => ($click === "true" ? "translateY(0)" : "translateY(1000%)")};
    transition: transform 0.3s ease;
    .LinkContainer {
    &:hover {
      background: ${(props) => props.theme.bgAlpha};
    }
    .Links {
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
    color: ${(props) => props.theme.text};
    height: 80px;
    .Linkicon {
        padding: ${() => v.smSpacing} ${() => v.mdSpacing};
        display: flex;
        svg {
            font-size: 25px;
        }
        }

  @media 
`;
const Divider = styled.div`
  height: 1px;
  width: 100%;
  background: ${(props) => props.theme.bg4};
  margin: ${() => v.lgSpacing} 0;
`;