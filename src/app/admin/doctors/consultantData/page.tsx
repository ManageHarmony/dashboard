'use client';

import React, { useEffect, useState } from 'react';
import { Grid, Button, Menu, MenuItem, ListItemIcon, ListItemText, IconButton } from '@mui/material';
import StaffCard from '../../../../components/StaffCard';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Spinner } from 'react-bootstrap';
type RoleType = 'All' | 'Approved' | 'Pending' | 'Rejected';


const buttonStyle = {
    background: "#fff",
    color: "#2C297E",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    transition: "background-color 0.3s, color 0.3s, border 0.3s"
};

const buttonHoverStyle = {
    background: "#2C297E",
    color: "white"
};

const StaffCardView: React.FC = () => {
    const [hoveredButton, setHoveredButton] = useState<string | null>(null);
    const [doctorData, setDoctorData] = useState<any[]>([]);
    const [loading, setLoading] = useState(false);
    const [selected, setSelected] = useState('All');
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }

    // Fetch doctors based on role
    const fetchDoctors = async (role: RoleType) => {
        setLoading(true);
        const urlMap: Record<RoleType, string> = {
            All: 'https://harmony-backend-z69j.onrender.com/api/admin/get/staff',
            Approved: 'https://harmony-backend-z69j.onrender.com/api/admin/getApprovedDoctors',
            Pending: 'https://harmony-backend-z69j.onrender.com/api/admin/getPendingDoctors',
            Rejected: 'https://harmony-backend-z69j.onrender.com/api/admin/get/rejectedDoctors',
            // Active: 'https://harmony-backend-z69j.onrender.com/api/admin/get/active/doctors',
            // Inactive: 'https://harmony-backend-z69j.onrender.com/api/admin/get/inactive/doctors',
            // TemporaryOff: 'https://harmony-backend-z69j.onrender.com/api/admin/get/temporaryoff/doctors',
        };

        try {
            const response = await fetch(urlMap[role], {
                method: "GET",
                headers: { 'x-api-key': apiKey },
            });

            if (!response.ok) {
                throw new Error("Failed loading data");
            }

            const data = await response.json();
            console.log("data", data)
            setDoctorData(data?.staff?.doctors || data?.data?.approvalDoctors || data?.data?.pendingDoctors || data?.data?.rejectedDoctors || data?.data?.activeDoctors || data?.data?.InactiveDoctors || data?.data?.temporayOffDoctors || []);
        } catch (error) {
            console.error('Error fetching staff data:', error);
        } finally {
            setLoading(false);
        }
    };

    // Handle data fetching based on selected filter
    const roleSetter = (role: RoleType) => {
        setSelected(role);
        fetchDoctors(role);
    };

    useEffect(() => {
        // Default data fetching on load (View All Doctors)
        fetchDoctors('All');
    }, []);

    const handleMouseEnter = (buttonType: string) => {
        setHoveredButton(buttonType);
    };

    const handleMouseLeave = () => {
        setHoveredButton(null);
    };

    const getButtonStyle = (buttonType: string) => {
        return hoveredButton === buttonType ? { ...buttonStyle, ...buttonHoverStyle } : buttonStyle;
    };

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <Spinner animation="border" role="statusCard">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
                <h4 className="mx-2">Loading..</h4>
            </div>
        );
    }

    return (
        <div style={{ display: "flex", flexDirection: "column", gap: "20px", padding: '10px 20px', width: "100%" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <div style={{ display: 'flex' }}>
                    <div style={{ display: "flex", marginRight: '10px', borderColor: '#2C297D' }}>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'Pending' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'Pending' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('Pending')}
                        >
                            Pendings
                        </Button>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'Rejected' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'Rejected' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('Rejected')}
                        >
                            Rejected
                        </Button>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'Approved' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'Approved' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('Approved')}
                        >
                            Approved
                        </Button>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'All' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'All' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('All')}
                        >
                            View All
                        </Button>
                        {/* <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'Active' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'Active' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('Active')}
                        >
                            Active
                        </Button>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'Inactive' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'Inactive' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('Inactive')}
                        >
                            Inactive
                        </Button>
                        <Button
                            variant="contained"
                            className='mx-0'
                            style={{
                                backgroundColor: selected === 'TemporaryOff' ? '#2C297D' : '#FFFFFF',
                                color: selected === 'TemporaryOff' ? '#FFFFFF' : '#2C297D',
                            }}
                            onClick={() => roleSetter('TemporaryOff')}
                        >
                            Temporary Off
                        </Button> */}
                    </div>
                </div>
            </div>

            {doctorData.length === 0 ? (<div style={{ textAlign: 'center', fontSize: '1.5rem', color: '#888' }}>
                No data found
            </div>) : (<Grid container spacing={1}>
                {doctorData.map((staff) => {
                    const detailPath = `/admin/doctors/consultantData/${staff.id}`;
                    return (
                        <Grid item xs={12} sm={6} md={4} lg={3} key={staff.id} style={{ display: 'flex', justifyContent: 'center' }}>
                            <Link href={detailPath} passHref>
                                <div style={{ cursor: 'pointer' }}>
                                    <StaffCard name={staff.name || staff.username} role={staff.role} imageUrl={staff.imageUrl} />
                                </div>
                            </Link>
                        </Grid>
                    );
                })}
            </Grid>)}
        </div>
    );
};

export default StaffCardView;
