'use client'

import React, { useState } from 'react';
import { ButtonGroup, Modal } from 'react-bootstrap';
import AddManager from './AddManager';

import "../dashboard.css"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
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
    Button,
} from "@/components/ui/button";

import {
    Input,
} from "@/components/ui/input"; // Assume there's an Input component in your project
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    DoubleArrowLeftIcon,
    DoubleArrowRightIcon,
    DotsHorizontalIcon,
} from "@radix-ui/react-icons";
import { FaIdCard, FaListUl, FaPlus, FaTable } from 'react-icons/fa';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { ToastContainer } from 'react-toastify';
import AddCreator from './AddCreator';

interface StaffData {
    srNo: number;
    name: string;
    role: string;
    contact: string;
    email: string;
    location: string;
    status: string;
    remarks: string;
}

const data: StaffData[] = [
    { srNo: 1, name: 'Naseem Ahmad', role: 'Manager', contact: '9874597450', email: 'naseem@gmail.com', location: 'Delhi', status: 'Active', remarks: 'Remarks' },
    { srNo: 2, name: 'Shubham Solanki', role: 'Creator', contact: '6547998741', email: 'shubham@gmail.com', location: 'New York', status: 'Active', remarks: 'Remarks' },
    { srNo: 3, name: 'Vineet Singh', role: 'Creator', contact: '2658745897', email: 'vineet@gmail.com', location: 'California', status: 'Active', remarks: 'Remarks' },
    { srNo: 4, name: 'Nishu Singla', role: 'Creator', contact: '9857458745', email: 'nishu@gmail.com', location: 'Dubai', status: 'Leave', remarks: 'Remarks' },
    { srNo: 5, name: 'Kunal Taneja', role: 'Manager', contact: '9999525287', email: 'kunal@gmail.com', location: 'Qatar', status: 'Inactive', remarks: 'Remarks' },
    { srNo: 6, name: 'Aditya Tiwari', role: 'Manager', contact: '4478523659', email: 'aditya@gmail.com', location: 'Noida', status: 'Active', remarks: 'Remarks' },
    { srNo: 7, name: 'Mohit Keer', role: 'Creator', contact: '8745896314', email: 'mohit@gmail.com', location: 'Gurugram', status: 'Active', remarks: 'Remarks' },
    { srNo: 8, name: 'Riyaj Mohd', role: 'Creator', contact: '4587458963', email: 'riyaj@gmail.com', location: 'Mumbai', status: 'Inactive', remarks: 'Remarks' },
    { srNo: 9, name: 'Kaushal Kumar', role: 'Creator', contact: '7844785698', email: 'kaushal@gmail.com', location: 'Chennai', status: 'Off Temp', remarks: 'Remarks' },
    { srNo: 10, name: 'Vipin Sharma', role: 'Creator', contact: '9514758263', email: 'vipin@gmail.com', location: 'Rune', status: 'Active', remarks: 'Remarks' },
    { srNo: 11, name: 'Naseem ', role: 'Manager', contact: '9874597450', email: 'naseem@gmail.com', location: 'Delhi', status: 'Active', remarks: 'Remarks' },
    { srNo: 12, name: 'Shubham ', role: 'Creator', contact: '6547998741', email: 'shubham@gmail.com', location: 'New York', status: 'Active', remarks: 'Remarks' },
    { srNo: 13, name: 'Vineet ', role: 'Creator', contact: '2658745897', email: 'vineet@gmail.com', location: 'California', status: 'Active', remarks: 'Remarks' },
    { srNo: 14, name: 'Nishu ', role: 'Creator', contact: '9857458745', email: 'nishu@gmail.com', location: 'Dubai', status: 'Leave', remarks: 'Remarks' },
    { srNo: 15, name: 'Kunal ', role: 'Manager', contact: '9999525287', email: 'kunal@gmail.com', location: 'Qatar', status: 'Inactive', remarks: 'Remarks' },
    { srNo: 16, name: 'Aditya ', role: 'Manager', contact: '4478523659', email: 'aditya@gmail.com', location: 'Noida', status: 'Active', remarks: 'Remarks' },
    { srNo: 17, name: 'Mohit ', role: 'Creator', contact: '8745896314', email: 'mohit@gmail.com', location: 'Gurugram', status: 'Active', remarks: 'Remarks' },
    { srNo: 18, name: 'Riyaj ', role: 'Creator', contact: '4587458963', email: 'riyaj@gmail.com', location: 'Mumbai', status: 'Inactive', remarks: 'Remarks' },
    { srNo: 19, name: 'Kaushal ', role: 'Creator', contact: '7844785698', email: 'kaushal@gmail.com', location: 'Chennai', status: 'Off Temp', remarks: 'Remarks' },
    { srNo: 20, name: 'Vipin ', role: 'Creator', contact: '9514758263', email: 'vipin@gmail.com', location: 'Rune', status: 'Active', remarks: 'Remarks' },
    // Add more data...
];

const columns: ColumnDef<StaffData>[] = [
    {
        accessorKey: 'srNo',
        header: 'Sr. No',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'role',
        header: 'Role',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'contact',
        header: 'Contact',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'email',
        header: 'Email',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'location',
        header: 'Location',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'status',
        header: 'Status',
        cell: ({ getValue }) => getValue(),
    },
    {
        accessorKey: 'remarks',
        header: 'Remarks',
        cell: ({ getValue }) => getValue(),
    },

];

const StaffTable: React.FC = () => {
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddCreatorModal, setShowAddCreatorModal] = useState(false);



    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleAddManagerClick = () => {
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
    };

    const handleOpenAddCreatorModal = () => {
        setShowAddCreatorModal(true);
    };

    const handleCloseAddCreatorModal = () => {
        setShowAddCreatorModal(false);
    };


    const handleDropdownToggle = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };


    console.log("renderedf")
    const table = useReactTable({
        data,
        columns,
        state: {
            columnFilters,
            sorting,
            columnVisibility,
            rowSelection,
        },
        onColumnFiltersChange: setColumnFilters,
        onSortingChange: setSorting,
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        getCoreRowModel: getCoreRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
    });

    return (
        <div style={{ padding: "0px 30px", paddingBottom: "20px", width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '15px', paddingBottom: "10px" }}>
                <div style={{ position: 'relative' }}>
                    <Button
                        variant="ghost"
                        onClick={handleDropdownToggle}
                        style={{
                            color: '#2C297D',
                            borderColor: '#2C297D',
                            marginRight: '10px',
                            backgroundColor: "#fff",
                        }}
                    >
                        <FaPlus style={{ marginRight: "8px", color: '#2C297D' }} />
                        Add New
                    </Button>

                    {isDropdownOpen && (
                        <ButtonGroup
                            vertical
                            style={{
                                position: 'absolute',
                                top: '100%',
                                left: 0,
                                zIndex: 1000,
                                marginTop: '5px',
                                backgroundColor: "#fff",
                                boxShadow: "0px 0px 15px rgba(228, 225, 225, 0.5)",
                            }}
                        >
                            <Button className="hover-effect" style={{ width: "100%" }} onClick={handleOpenAddCreatorModal}>
                                <FaPlus style={{ marginRight: "8px" }} />
                                Add Creator
                            </Button>

                            <Button className="hover-effect" onClick={handleAddManagerClick}>
                                <FaPlus style={{ marginRight: "8px" }} />
                                Add Manager
                            </Button>
                        </ButtonGroup>
                    )}
                </div>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder="Search staff..."
                        onChange={(e: { target: { value: any; }; }) => setColumnFilters([{ id: 'name', value: e.target.value }])}
                    />
                    <Button
                        variant="ghost"
                        onClick={handleClick}
                        style={{ marginLeft: "10px", color: '#2C297D', borderColor: '#2C297D', backgroundColor: "#fff" }}
                    >
                        <FaTable style={{ marginRight: "8px", color: '#2C297D' }} />
                        View
                    </Button>
                    <div className="dropdown">
                        <button
                            className="dropdown-trigger"
                            style={{ border: "none", background: "none" }}
                            onClick={() => setIsOpen(!isOpen)}
                        >
                            <DotsHorizontalIcon />
                        </button>
                        {isOpen && (
                            <div
                                className="dropdown-content"
                                style={{
                                    position: "absolute",
                                    backgroundColor: "#fff",
                                    boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                                    borderRadius: "4px",
                                    padding: "8px",
                                    marginTop: "4px",
                                }}
                            >
                                <div
                                    className="table-dropdown-item"
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        padding: "8px 12px",
                                        cursor: "pointer",
                                    }}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <FaListUl className='table-dropdown-item' style={{ marginRight: "8px" }} />
                                    View
                                </div>
                                <Link href='/admin/staff/cards'>
                                    <div
                                        className="table-dropdown-item"
                                        style={{
                                            display: "flex",
                                            alignItems: "center",
                                            padding: "8px 12px",
                                            cursor: "pointer",
                                        }}
                                    >
                                        <FaIdCard className='table-dropdown-item' style={{ marginRight: "8px" }} />
                                        Cards
                                    </div>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <Table>
                <TableHeader style={{ backgroundColor: '#2C297E' }}>
                    {table.getHeaderGroups().map(headerGroup => (
                        <TableRow key={headerGroup.id}>
                            {headerGroup.headers.map(header => (
                                <TableHead key={header.id} style={{ color: "#fff", padding: "8px" }}>
                                    {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                                </TableHead>
                            ))}
                        </TableRow>
                    ))}
                </TableHeader>
                <TableBody style={{ backgroundColor: '#fff' }}>
                    {table.getRowModel().rows.map(row => (
                        <TableRow key={row.id} style={{ height: "20p" }}>
                            {row.getVisibleCells().map(cell => (
                                <TableCell key={cell.id} style={{ padding: "8px" }}>
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
                <div>
                    Page <strong>{table.getState().pagination.pageIndex + 1} of {table.getPageCount()}</strong>
                </div>

            </div>


            <Modal
                show={showModal}
                onHide={handleCloseModal}
                fullscreen={true} 
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                }}
            >
                <Modal.Body style={{
                    backgroundColor: '#daf7fd7e',
                    position: "relative",
                    height: "100%",
                    padding: "40px"
                }}>
                    <Button
                       
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            backgroundColor: "transparent",
                            color: "#000000",
                            border: "none",
                            fontSize: "1.5rem",
                            fontWeight: "bold"
                        }}
                        onClick={handleCloseModal}
                    >
                        &times;
                    </Button>
                    <AddManager />
                </Modal.Body>
            </Modal>

            <Modal
                show={showAddCreatorModal}
                onHide={handleCloseAddCreatorModal}
                fullscreen={true} 
                style={{
                    backgroundColor: 'rgba(0, 0, 0, 0.6)', 
                }}
            >
                <Modal.Body style={{
                    backgroundColor: '#daf7fd7e',
                    position: "relative",
                    height: "100%",
                    padding: "40px"
                }}>
                    <Button
                       
                        style={{
                            position: "absolute",
                            top: "20px",
                            right: "20px",
                            backgroundColor: "transparent",
                            color: "#000000",
                            border: "none",
                            fontSize: "1.5rem",
                            fontWeight: "bold"
                        }}
                        onClick={handleCloseAddCreatorModal}
                    >
                        &times;
                    </Button>
                    <AddCreator />
                </Modal.Body>
            </Modal>

        </div>
    );
};

export default StaffTable;
