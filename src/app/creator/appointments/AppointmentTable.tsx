'use client';

import * as React from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, tableCellClasses, Button, Menu, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye } from '@fortawesome/free-solid-svg-icons';


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

const AppointmentTable: React.FC = () => {



    return (
        <div style={{ padding: "20px 30px", width: "100%"}}>


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
                            <StyledTableCell>Service Name</StyledTableCell>
                            <StyledTableCell>Customer Review</StyledTableCell>
                            <StyledTableCell>Time Started</StyledTableCell>
                            <StyledTableCell>Action</StyledTableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {data.map((row) => (
                            <StyledTableRow key={row.srNo}>
                                <StyledTableCell component="th" scope="row">
                                    {row.srNo}
                                </StyledTableCell>
                                <StyledTableCell>{row.name}</StyledTableCell>
                                <StyledTableCell>{row.serviceName}</StyledTableCell>
                                <StyledTableCell>{row.customerReview}</StyledTableCell>
                                <StyledTableCell>{row.timeStarted}</StyledTableCell>
                                <StyledTableCell>
                                    <button className="text-orange-600 flex items-center">
                                        <FontAwesomeIcon icon={faEye} className="w-5 h-5" />
                                    </button></StyledTableCell>
                            </StyledTableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}

export default AppointmentTable;
