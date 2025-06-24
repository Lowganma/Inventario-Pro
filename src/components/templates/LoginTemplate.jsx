import styled from "styled-components";
import { Btnsave, useUsuariosStore } from "../../index";
import {useMutation} from "@tanstack/react-query";  
import { useNavigate } from "react-router-dom";                
export function LoginTemplate() {
    const navigate = useNavigate();
    const {InsertarUsuarioAdmin} = useUsuariosStore();
    const MutationInsertUser = useMutation({
        mutationKey: ['Insertar Usuario Admin'], 
        mutationFn:async () =>{
            const p = {
                correo: "prueba s@gmail.com",
                pass:"123456",
            };
            const dt = await InsertarUsuarioAdmin(p);
            if (dt) {
                navigate("/");
            }
        }
        
    });
    return (<Container>
        <Btnsave titulo="Crear cuenta" bgcolor="#fff" funcion={MutationInsertUser.mutateAsync}/>
            </Container>);
    }
    const Container = styled.div`
    height:100vh;
    `