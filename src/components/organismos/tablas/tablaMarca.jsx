import styled from "styled-components";
import {useReactTable} from "@tanstack/react-table"
export function TablaMarca({data}) {
    const columns=[
        {

        }
    ]
    const table = useReactTable({
        data,
        columns,
        

    });
    return (<Container>
        <h1>Componente</h1>
    </Container>);
}
const Container = styled.div`
`