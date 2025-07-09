import {
    useReactTable,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
} from "@tanstack/react-table"
import styled from "styled-components";

export function TablaMarca({data}) {
    const columns=[{
        accessorKey: "descripcion",
        header: "Descripcion",
        cell:(info)=> <span>{info.getValue()}</span> 
    }];
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel:getPaginationRowModel(),
        
    });
    return (
    <Container>
        <table>
            <thead>
                {
                    table.getHeaderGroups().map((headerGroup)=>(
                        <tr key={headerGroup.id}>
                            {headerGroup.headers.map((header)=>(
                                <th key={header.id}>
                                    {header.column.columnDef.header}
                                </th>
                            ))}
                        </tr>
                    ))
                }
            </thead>
            <tbody>
               {table.getRowModel().rows.map((item)=>(
                <tr key={item.id}>
                    {
                        item.getVisibleCells().map((cell)=>(
                            <td key={cell.id}>
                                {
                                    flexRender(cell.column.columnDef.cell,cell.getContext())
                                }

                            </td>
                        ))
                    }

                </tr>
               ))}
            </tbody>
        </table>
    </Container>);
}
const Container = styled.div``
