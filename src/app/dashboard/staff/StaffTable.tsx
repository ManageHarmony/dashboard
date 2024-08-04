'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import AddIcon from '@mui/icons-material/Add';
import TableChartIcon from '@mui/icons-material/TableChart';
import ViewListIcon from '@mui/icons-material/ViewList';
import IdCardIcon from '@mui/icons-material/Badge'; // Using Badge icon as an example for ID card
import { useRouter } from 'next/navigation'; // Import useRouter

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: '#2C297D',
        color: theme.palette.common.white,
        fontWeight: 'bold',
        borderBottom: 'none',
        padding: '8px 16px',
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
        borderBottom: 'none',
        padding: '8px 16px',
        backgroundColor: '#fff', // Set table cell background to white
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: '#f9f9f9', // Light grey for odd rows
    },
    '&:nth-of-type(even)': {
        backgroundColor: '#fff', // White for even rows
    },
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const data = [
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
];

const StaffTable: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const router = useRouter(); // Initialize useRouter

    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleNavigation = (path: string) => {
        router.push("/dashboard/staff/cards");
        handleClose(); // Close the menu after navigation
    };

    return (
        <div style={{ paddingRight: "20px" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '15px', padding: "10px 0px" }}>
                <Button
                    variant="contained"
                    startIcon={<AddIcon sx={{ color: '#2C297D' }} />}
                    sx={{ color: '#2C297D', borderColor: '#2C297D', marginRight: '10px', backgroundColor: "#fff" }}
                >
                    Add New
                </Button>
                <Button
                    variant="contained"
                    startIcon={<TableChartIcon sx={{ color: '#2C297D' }} />}
                    sx={{ color: '#2C297D', borderColor: '#2C297D', backgroundColor: "#fff" }}
                    onClick={handleClick}
                >
                    View
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={() => handleNavigation('/view')}>
                        <ListItemIcon sx={{ color: '#2C297D' }}>
                            <ViewListIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="View" sx={{ color: '#2C297D' }} />
                    </MenuItem>
                    <MenuItem onClick={() => handleNavigation('/cards')}>
                        <ListItemIcon sx={{ color: '#2C297D' }}>
                            <IdCardIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Cards" sx={{ color: '#2C297D' }} />
                    </MenuItem>
                </Menu>
            </div>

            <TableContainer component={Paper} style={{ padding: '20px', borderRadius: '15px' }}>
                <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead
                        sx={{
                            borderTopLeftRadius: '15px',
                            borderTopRightRadius: '15px',
                            backgroundColor: '#2C297D',
                            '.MuiTableRow-root': {
                                borderTopLeftRadius: '15px',
                                borderTopRightRadius: '15px',
                            },
                        }}
                    >
                        <TableRow>
                            <StyledTableCell>Sr. No</StyledTableCell>
                            <StyledTableCell>Name</StyledTableCell>
                            <StyledTableCell>Role</StyledTableCell>
                            <StyledTableCell>Contact</StyledTableCell>
                            <StyledTableCell>Email</StyledTableCell>
                            <StyledTableCell>Location</StyledTableCell>
                            <StyledTableCell>Status</StyledTableCell>
                            <StyledTableCell>Remarks</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.srNo}>
                                <StyledTableCell component="th" scope="row">
                                    {row.srNo}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.role}</StyledTableCell>
                                <StyledTableCell>{row.contact}</StyledTableCell>
                                <StyledTableCell>{row.email}</StyledTableCell>
                                <StyledTableCell>{row.location}</StyledTableCell>
                                <StyledTableCell>{row.status}</StyledTableCell>
                                <StyledTableCell>{row.remarks}</StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default StaffTable;
