import styled from "styled-components";
import {getCoreRowModel, getFilteredRowModel, getPaginationRowModel, useReactTable} from "@tanstack/react-table"
export function TablaMarca({data}) {
    const columns=[
        {

        }
    ]
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        
    });
    return (<Container>
        <table>
            <thead>
                <tr>
                    <th>Total Valor</th>
                    <th>Cantidad</th>
                    <th>Stock</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>
                        $.12
                    </td>
                    <td>
                       5
                    </td>
                    <td>
                        100
                    </td>
                </tr>
            </tbody>
        </table>
    </Container>);
}
const Container = styled.div`
`