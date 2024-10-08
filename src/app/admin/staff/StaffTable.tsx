'use client'

import React, { useEffect, useState } from 'react';
import { Spinner } from 'react-bootstrap';
import { Button as BootstrapButton } from "react-bootstrap";
import { Loader2 } from "lucide-react";

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

export function ButtonLoading() {
    return (
        <BootstrapButton disabled style={{ backgroundColor: '#fff', width: "auto", color: "#2C297E", display: "flex", alignItems: "center", border: "none" }}>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            <span style={{ fontSize: "16px" }}>Please wait...</span>
        </BootstrapButton>
    );
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
    const [loadingButton, setLoadingButton] = useState<string | null>(null);
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);

    const handleClick = (buttonType: string) => {
        setLoadingButton(buttonType);
    };

    const handleClickdiv = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };


    const handleMouseEnter = (buttonType: string) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const buttonStyle = {
        background: "#fff",
        color: "#2C297E",
        display: "flex",
        justifyContent: "flex-start",
        alignItems: "center",
        transition: "background-color 0.3s, color 0.3s, border 0.3s",
        width: "100%",
        border: "none",
    };

    const buttonHoverStyle = {
        background: "#2C297E",
        color: "white"
    };

    const loadingButtonStyle = {
        backgroundColor: "#f7f7f7",
        color: "#999"
    };

    const getButtonStyle = (buttonType: string) => {
        if (loadingButton === buttonType) {
            return { ...buttonStyle, ...loadingButtonStyle };
        } else if (hoveredButton === buttonType) {
            return { ...buttonStyle, ...buttonHoverStyle };
        }
        return buttonStyle;
    };

    const fetchData = async () => {
        const apiKey = process.env.NEXT_PUBLIC_API_KEY;

        if (!apiKey) {
            throw new Error('API key is missing.');
        }
        setLoading(true);
        try {
            const response = await fetch('https://harmony-backend-z69j.onrender.com/api/admin/get/staff', {
                headers: { 'x-api-key': apiKey }
            });
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
                        style={getButtonStyle("addNew")}
                        onMouseEnter={() => handleMouseEnter("addNew")}
                        onMouseLeave={handleMouseLeave}
                    >
                        <FaPlus style={{ marginRight: "8px" }} />
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
                                width: "160px",
                            }}
                        >
                            <Link href="/admin/staff/addCreator" style={{ textDecoration: "none" }}>
                                {loadingButton === 'addCreator' ? (
                                    <ButtonLoading />
                                ) : (
                                    <BootstrapButton
                                        variant="outline-warning"
                                        onClick={() => handleClick("addCreator")}
                                        onMouseEnter={() => handleMouseEnter("addCreator")}
                                        onMouseLeave={handleMouseLeave}
                                        style={getButtonStyle("addCreator")}
                                        className='w-auto'

                                    >
                                        <FaPlus style={{ marginRight: "8px" }} />
                                        Add Creator
                                    </BootstrapButton>
                                )}
                            </Link>

                            <Link href="/admin/staff/addManager">
                                {loadingButton === 'addManager' ? (
                                    <ButtonLoading />
                                ) : (
                                    <BootstrapButton
                                        variant="outline-warning"
                                        onClick={() => handleClick("addManager")}
                                        onMouseEnter={() => handleMouseEnter("addManager")}
                                        onMouseLeave={handleMouseLeave}
                                        style={getButtonStyle("addManager")}
                                    >
                                        <FaPlus style={{ marginRight: "8px" }} />
                                        Add Manager
                                    </BootstrapButton>
                                )}
                            </Link>
                        </ButtonGroup>
                    )}
                </div>


                <div style={{ display: 'flex', alignItems: 'center' }}>
                    <Input
                        placeholder="Search staff..."
                        onChange={(e: { target: { value: string; }; }) => setColumnFilters([{ id: 'name', value: e.target.value }])}
                    />
                    <Link href='/admin/staff/cards'>

                        <Button
                            onClick={handleClickdiv}
                            className='ml-3 p-2'
                            style={getButtonStyle("view")}
                            onMouseEnter={() => handleMouseEnter("view")}
                            onMouseLeave={handleMouseLeave}
                        >
                            <FaTable
                                className='mx-2'
                                style={getButtonStyle("tableIcon")}
                                onMouseEnter={() => handleMouseEnter("tableIcon")}
                                onMouseLeave={handleMouseLeave} />
                            View
                            {/* <div className="dropdown">
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
                                        width: "7rem",
                                    }}
                                >
                                    <div
                                        className="d-flex justify-content-evenly fs-6 py-1 items-center"
                                        style={getButtonStyle("viewIcon")}
                                        onMouseEnter={() => handleMouseEnter("viewIcon")}
                                        onMouseLeave={handleMouseLeave}
                                        onClick={() => setIsOpen(false)}
                                    >
                                        <FaListUl className='' style={{ marginRight: "px" }} />
                                        View
                                    </div>
                                    <Link href='/admin/staff/cards'>
                                        <div
                                            className="d-flex justify-content-evenly fs-6 py-1 items-center"
                                            style={getButtonStyle("cardIcon")}
                                            onMouseEnter={() => handleMouseEnter("cardIcon")}
                                            onMouseLeave={handleMouseLeave}
                                        >
                                            <FaIdCard className='' style={{ marginRight: "px" }} />
                                            Cards
                                        </div>
                                    </Link>
                                </div>
                            )}
                        </div> */}
                        </Button>
                    </Link>

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
                        console.log("DP", detailPath);

                        return (
                            <TableRow
                                onClick={() => router.push(detailPath)}
                                key={row.id}
                                style={{ cursor: "pointer", backgroundColor: "transparent" }}
                                onMouseEnter={(e) => {
                                    e.currentTarget.style.backgroundColor = "#2C297E";
                                    e.currentTarget.style.color = "white";
                                }}
                                onMouseLeave={(e) => {
                                    e.currentTarget.style.backgroundColor = "transparent";
                                    e.currentTarget.style.color = "inherit";
                                }}
                            >
                                {row.getVisibleCells().map((cell) => {
                                    return (
                                        <TableCell key={cell.id} style={{ padding: "8px" }}>
                                            <div style={{ textDecoration: "none", color: "inherit" }}>
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
        </div>
    );
};

export default StaffTable;
