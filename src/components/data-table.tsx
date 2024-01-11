'use client'
import {
    ColumnDef,
    ColumnFiltersState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { useState } from "react"
import { InputControl, InputLabel, InputPrefix, InputRoot, InputRootInside } from "@/components/input"
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, Search } from "lucide-react"
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[]
    data: TData[]
}

export function DataTable<TData, TValue>({ columns, data }: DataTableProps<TData, TValue>) {


    const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({})
    const [globalFilter, setGlobalFilter] = useState<string>("");

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getFilteredRowModel: getFilteredRowModel(),

        onColumnVisibilityChange: setColumnVisibility,
        onGlobalFilterChange: setGlobalFilter,
        state: {
            globalFilter: globalFilter,
            columnVisibility: columnVisibility
        }
    })
    return (
        <div>
            <div>
                <div className="flex justify-between pr-5 pb-2 items-end">
                    <InputRoot className="w-2/6 px-0">
                        <InputLabel className="text-white">Nome</InputLabel>
                        <InputRootInside className="bg-white">
                            <InputPrefix>
                                <Search className="h-4 w-4 text-black" />
                            </InputPrefix>
                            <InputControl
                                className="placeholder:text-gray-400"
                                type="text"
                                placeholder="pesquise..."
                                value={globalFilter || ""}
                                onChange={e => { 
                                    setGlobalFilter(e.target.value);
                                    table.setGlobalFilter(e.target.value);
                                }}
                            />
                        </InputRootInside>
                    </InputRoot>
                    <DropdownMenu>
                        <DropdownMenuTrigger className="border h-10 px-4 rounded-lg text-sm hover:bg-slate-200 text-sky-900 font-semibold focus:outline-none" >
                            Colunas
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            {table
                                .getAllColumns()
                                .filter((column) => column.getCanHide())
                                .map((column) => {
                                    return (
                                        <DropdownMenuCheckboxItem
                                            key={column.id}
                                            className="capitalize"
                                            checked={column.getIsVisible()}
                                            onCheckedChange={(value: boolean) => {
                                                column.toggleVisibility(!!value);
                                            }}
                                        >
                                            {column.id}
                                        </DropdownMenuCheckboxItem>
                                    );
                                })}
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map(headerGroup => {
                            return (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map(header => {
                                        return (
                                            <TableHead key={header.id} className="text-white text-md text-center border-t bg-sky-700 ">
                                                {flexRender(header.column.columnDef.header,
                                                    header.getContext())}
                                            </TableHead>
                                        )
                                    })}
                                </TableRow>
                            )
                        })}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map(row => {
                                return (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map(cell => {
                                            return (
                                                <TableCell key={cell.id} className=" text-center border-b">
                                                    {flexRender(cell.column.columnDef.cell,
                                                        cell.getContext())}
                                                </TableCell>
                                            )
                                        })}
                                    </TableRow>
                                )
                            })
                        ) : (
                            <TableRow>
                                <TableCell>
                                    no results
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end gap-2 w-full mt-1">
                <select
                    className="border rounded-sm focus:outline-none text-sm text-muted-foreground"
                    value={table.getState().pagination.pageSize}
                    onChange={e => {
                        table.setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            item {pageSize}
                        </option>
                    ))}
                </select>

                <span className="flex items-center gap-1 text-sm text-muted-foreground">
                    <span>página</span>
                    <span>
                        {table.getState().pagination.pageIndex + 1} de{' '}
                        {table.getPageCount()}
                    </span>
                </span>
                <button
                    className="hover:cursor-pointer bg-gray-200 rounded-full p-2"
                    onClick={() => table.setPageIndex(0)}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronsLeft className="h-4 w-4" />
                </button>
                <button
                    className="hover:cursor-pointer bg-gray-200 rounded-full p-2"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    <ChevronLeft className="h-4 w-4" />
                </button>

                <button
                    className="hover:cursor-pointer bg-gray-200 rounded-full p-2"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronRight className="h-4 w-4" />
                </button>
                <button
                    className="hover:cursor-pointer bg-gray-200 rounded-full p-2"
                    onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                    disabled={!table.getCanNextPage()}
                >
                    <ChevronsRight className="h-4 w-4" />
                </button>


            </div>
        </div>

    )
}