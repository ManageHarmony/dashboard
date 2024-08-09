'use client'

import React, { useState } from 'react';
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Button,
} from "@/components/ui/button";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
    Input,
} from "@/components/ui/input";
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { FaEye } from 'react-icons/fa';


interface Appointment {
    srNo: number;
    name: string;
    serviceName: string;
    customerReview: string;
    timeStarted: string;
}

const defaultData: Appointment[] = [
    { srNo: 1, name: 'Naseem Ahmad', serviceName: 'Mental Support', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 2, name: 'Shubham Solanki', serviceName: 'Child Mental Health', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 3, name: 'Vineet Singh', serviceName: 'Psychological Help', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 4, name: 'Nishu Singla', serviceName: 'Online Workshop', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July ', },
    { srNo: 5, name: 'Kunal Taneja', serviceName: 'Relationship Advice', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 6, name: 'Aditya Tiwari', serviceName: 'Mental Health', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 7, name: 'Mohit Keer', serviceName: 'Support Mental Class', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 8, name: 'Riyaj Mohd', serviceName: 'my First Consultation', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July ', },
    { srNo: 9, name: 'Kaushal Kumar', serviceName: 'Consult With Beast', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July', },
    { srNo: 10, name: 'Vipin Sharma', serviceName: 'Workshop Simplified', customerReview: '4/5 - Nice Discussion', timeStarted: '10:00 Am, 20th July ', },
];

const columns: ColumnDef<Appointment>[] = [
    { accessorKey: 'srNo', header: 'Sr. No' },
    { accessorKey: 'name', header: 'Name' },
    { accessorKey: 'serviceName', header: 'Service Name' },
    { accessorKey: 'customerReview', header: 'Customer Review' },
    { accessorKey: 'timeStarted', header: 'Time Started' },
    {
        id: 'actions',
        header: 'Actions',
        cell: ({ row }) => (
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm">
                        <FaEye />
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                    <DropdownMenuItem onClick={() => console.log(`View details for ${row.original.name}`)}>
                        View Details
                    </DropdownMenuItem>
                    {/* Additional row actions can be added here */}
                </DropdownMenuContent>
            </DropdownMenu>
        ),
    },
];

const AppointmentTable: React.FC = () => {
    const [data, setData] = useState(defaultData);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = useState<SortingState>([]);
    const [pagination, setPagination] = useState({ pageIndex: 0, pageSize: 10 });

    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
            pagination,
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onPaginationChange: setPagination,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div className="p-4 w-full">
            <div className="flex justify-between mb-4">
                <Input
                    placeholder="Search..."
                    value={(table.getColumn('name')?.getFilterValue() as string) ?? ''}
                    onChange={e => table.getColumn('name')?.setFilterValue(e.target.value)}
                    className="max-w-xs"
                />
            </div>

            <Table className="bg-white">
                <TableHeader style={{backgroundColor: '#2C297E'}}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} className="text-white">
                                    {flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} className="bg-white text-black">
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} className="bg-white text-black">
                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>

            <div className="flex items-center justify-between mt-4">
                <div className="flex items-center space-x-2">
                    <Button onClick={() => table.setPageIndex(0)} disabled={!table.getCanPreviousPage()}>
                        <DoubleArrowLeftIcon />
                    </Button>
                    <Button onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                        <ChevronLeftIcon />
                    </Button>
                    <Button onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                        <ChevronRightIcon />
                    </Button>
                    <Button onClick={() => table.setPageIndex(table.getPageCount() - 1)} disabled={!table.getCanNextPage()}>
                        <DoubleArrowRightIcon />
                    </Button>
                </div>
                <span>
                    Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </span>
                <div>
                    <Select value={`${table.getState().pagination.pageSize}`} onValueChange={value => table.setPageSize(Number(value))}>
                        <SelectTrigger className="w-32">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {[10, 20, 30, 40, 50].map(pageSize => (
                                <SelectItem key={pageSize} value={`${pageSize}`}>
                                    Show {pageSize}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
    );
};

export default AppointmentTable;
