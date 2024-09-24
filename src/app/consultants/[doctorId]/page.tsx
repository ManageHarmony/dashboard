'use client';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import StaffCard from '@/components/StaffCard';
import { Spinner } from 'react-bootstrap';
import { useParams } from 'next/navigation';
import Link from 'next/link';

const StyledCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    margin: '10px',
    width: 350,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
}));

const DetailCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    margin: '10px',
    width: 400,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
}));

const StaffDetail: React.FC = () => {
    const [doctorData, setDoctorData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const doctorId = params.doctorId;
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/doctor/profile/${doctorId}`;
                const response = await fetch(apiUrl, { headers: { 'x-api-key': apiKey } });
                const data = await response.json();
                console.log("doctor pro", data)
                setDoctorData(data?.profile);
                // if (data?.profile) setStatus(data?.profile?.status);
            } catch (error) {
                console.error('Error fetching staff data:', error);
            } finally {
                setLoading(false);
            }
        };

        if (doctorId) {
            fetchData();
        }
    }, [doctorId]);


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

    if (!doctorData) {
        return <div className='d-flex justify-content-center items-center vh-100'>No data found</div>;
    }

    // const getStatusTextAndIcon = () => {
    //     switch (status) {
    //         case 'active':
    //             return {
    //                 icon: faCircle,
    //                 iconColor: '#4AF120'
    //             };
    //         case 'inactive':
    //             return {
    //                 icon: faCircle,
    //                 iconColor: '#EC1114'
    //             };
    //         case 'temporaryoff':
    //             return {
    //                 icon: faCircle,
    //                 iconColor: '#908787'
    //             };
    //         default:
    //             return {
    //                 icon: faCircle,
    //             };
    //     }
    // };

    // const { icon, iconColor } = getStatusTextAndIcon();

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
            padding: '20px',
            width: '100%',
            position: "relative"
        }}>
            <Link href="/consultants" style={{ textDecoration: "none", position: "absolute", right: 10, top: 10 }}>
                <button className='see-all w-auto'
                >
                    Go Back{" "}
                    <svg xmlns="http://www.w3.org/2000/svg" style={{ marginLeft: "5px" }} width="16" height="17" viewBox="0 0 16 17" fill="none">
                        <path d="M8 2.875H2.75C2.28587 2.875 1.84075 3.07254 1.51256 3.42417C1.18437 3.77581 1 4.25272 1 4.75V14.125C1 14.6223 1.18437 15.0992 1.51256 15.4508C1.84075 15.8025 2.28587 16 2.75 16H11.5C11.9641 16 12.4092 15.8025 12.7374 15.4508C13.0656 15.0992 13.25 14.6223 13.25 14.125V8.5" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M5 12.6504L12.875 4.21289" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                        <path d="M10.625 1H15V5.6875" stroke="#FFA05D" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                </button>
            </Link>
            <div>
                <Grid container spacing={4}>
                    <Grid item>
                        <StaffCard name={doctorData.name || doctorData.doctorName} role={doctorData.role} imageUrl="/assets/avatar.jpg" />
                    </Grid>
                    <Grid item>
                        <DetailCard>
                            <CardContent style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "7px 16px", padding: "16px" }}>
                                <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', fontSize: "18px", gridColumn: "span 2" }}>
                                    Details
                                </Typography>
                                <Typography variant="body1">Email:</Typography>
                                <Typography variant="body2">{doctorData.email}</Typography>
                                <Typography variant="body1">Contact:</Typography>
                                <Typography variant="body2">{doctorData.contactNumber}</Typography>
                                <Typography variant="body1">State:</Typography>
                                <Typography variant="body2">{doctorData.state}</Typography>
                                <Typography variant="body1">Country:</Typography>
                                <Typography variant="body2">{doctorData.country}</Typography>
                                <Typography variant="body1">Max. Education:</Typography>
                                <Typography variant="body2">{doctorData.maximumEducation}</Typography>
                                <Typography variant="body1">Price per session:</Typography>
                                <Typography variant="body2">{doctorData.pricePerSession}</Typography>
                                <Typography variant="body1">Verification:</Typography>
                                <Typography variant="body2">{doctorData.verified}</Typography>
                            </CardContent>
                        </DetailCard>
                    </Grid>
                </Grid>
            </div>

        </div>
    );
};

export default StaffDetail;
