'use client'

import React, { useEffect, useState } from 'react';
import { Modal, Spinner } from 'react-bootstrap';
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

import Link from 'next/link';

import AddCreator from './AddCreator';
import { ButtonGroup } from '@nextui-org/react';
import { useRouter } from 'next/navigation';

interface StaffData {
    srNo: number;
    name: string;
    role: string;
    contact: string;
    email: string;
    location: string;
    status: string;
    remarks: string;
    id: number;
}

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
    {
        accessorKey: 'id',
        header: 'ID',
        cell: ({ getValue }) => getValue(),
    },


];

const StaffTable: React.FC = () => {
    const [staffData, setStaffData] = useState<StaffData[]>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const [isOpen, setIsOpen] = useState(false);

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [showAddCreatorModal, setShowAddCreatorModal] = useState(false);
    const [loading, setLoading] = useState<boolean>(false);
    const router = useRouter();

    const fetchData = async () => {
        setLoading(true);
        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/get/staff');
            const data = await response.json();

            console.log("data", data)

            if (data && data.staff) {
                const { creators, managers, doctors } = data.staff;
                console.log("Creator", creators)
                const combinedStaff = [
                    ...creators.map((item: { username: string; contact_number: string; email: string; state: string; status: string; remarks: string; id: number }, index: number) => ({
                        srNo: index + 1,
                        name: item.username,
                        role: 'Creator',
                        contact: item.contact_number,
                        email: item.email,
                        location: item.state,
                        status: item.status,
                        remarks: item.remarks || 'Remarks',
                        id: item.id
                    })),
                    ...managers.map((item: { name: string; contact_number: string; email: string; states: string[]; status: string; remarks: string; id: number }, index: number) => ({
                        srNo: creators.length + index + 1,
                        name: item.name,
                        role: 'Manager',
                        contact: item.contact_number,
                        email: item.email,
                        location: item.states[0],
                        status: item.status,
                        remarks: item.remarks || 'Remarks',
                        id: item.id

                    })),
                    ...doctors.map((item: { doctor_name: string; contact_number: string; email: string; state: string; status: string; remarks: string; id: number }, index: number) => ({
                        srNo: creators.length + managers.length + index + 1,
                        name: item.doctor_name,
                        role: 'Doctor',
                        contact: item.contact_number,
                        email: item.email,
                        location: item.state,
                        status: item.status,
                        remarks: item.remarks || 'Remarks',
                        id: item.id

                    })),
                ];

                setStaffData(combinedStaff);
            } else {
                console.error('Unexpected data structure:', data);
            }
        } catch (error) {
            console.error('Error fetching staff data:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
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

    console.log("rendered");
    useEffect(() => {
        fetchData();
    }, []);


    console.log("renderedf")
    const table = useReactTable({
        data: staffData, // Use the fetched data
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


    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mx-2">Loading..</h4>
            </div>
        );
    }

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
                            style={{
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                zIndex: 1000,
                                marginTop: '5px',
                                backgroundColor: "#fff",
                                boxShadow: "0px 0px 15px rgba(228, 225, 225, 0.5)",
                            }}
                        >
                            <Button className="hover-effect" style={{ width: "100%", textDecoration: "none" }} onClick={handleOpenAddCreatorModal}>
                                <FaPlus style={{ marginRight: "8px" }} />
                                Add Creator
                            </Button>

                            <Button className="hover-effect" style={{ width: "100%", textDecoration: "none" }} onClick={handleAddManagerClick}>
                                <FaPlus style={{ marginRight: "8px" }} />
                                Add Manager
                            </Button>
                        </ButtonGroup>
                    )}
                </div>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder="Search staff..."
                        onChange={(e: { target: { value: string; }; }) => setColumnFilters([{ id: 'name', value: e.target.value }])}
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
                    {table.getRowModel().rows.map((row) => {
                        const id = row.original.id;
                        const role = row.original.role;
                        const detailPath = `/admin/staff/cards/${id}?role=${encodeURIComponent(role)}`;

                        return (
                            <TableRow  onClick={() => router.push(detailPath)} key={row.id} style={{ height: "20px" }}>
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id} style={{ padding: "8px" }}>
                                                <div style={{ textDecoration: 'none', color: 'inherit' }}>
                                                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                                </div>
                                        </TableCell>
                                    );
                                })}
                            </TableRow>
                        );
                    })}
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
