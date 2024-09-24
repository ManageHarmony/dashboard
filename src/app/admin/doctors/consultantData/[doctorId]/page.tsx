'use client';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import StaffCard from '@/components/StaffCard';
import { Spinner } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faTrash, faPause, faCircle } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';
import { useParams } from 'next/navigation';

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
    width: 410,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    padding: '10px',
}));

const StaffDetail: React.FC = () => {
    // const [status, setStatus] = useState<'active' | 'inactive' | 'temporaryoff' | null>(null);
    const [doctorData, setDoctorData] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const params = useParams();
    const doctorId = params.doctorId;
    const [selectedOption, setSelectedOption] = useState('');
    console.log(selectedOption);
    const apiKey = process.env.NEXT_PUBLIC_API_KEY;

    if (!apiKey) {
        throw new Error('API key is missing.');
    }

    const showToastError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    const showToastSuccess = (message: string) => {
        toast.success(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
        });
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/doctor/profile/${doctorId}`;
                const response = await fetch(apiUrl, { headers: { 'x-api-key': apiKey } });
                const data = await response.json();
                console.log("doctor pro", data)
                setDoctorData(data?.profile);
                // if (data?.profile) setStatus(data?.profile?.status);
                setSelectedOption(data?.profile?.verified === 'no' ? 'pending' : data?.profile?.verified || '');
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

    // const handleDelete = async () => {
    //     try {
    //         const apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/doctor/${doctorId}`;
    //         const response = await fetch(apiUrl, {
    //             method: 'DELETE',
    //             headers: { 'x-api-key': apiKey }
    //         });

    //         if (response.ok) {
    //             showToastSuccess('Doctor deleted successfully');
    //             router.push('/admin/staff/cards');
    //         } else {
    //             showToastError('Failed to delete staff member');
    //         }
    //     } catch (error) {
    //         console.error('Error deleting doctor:', error);
    //         showToastError('Failed to delete doctor');
    //     }
    // };

    const handleChange = async (event: any) => {
        const value = event.target.value;
        setSelectedOption(value);

        let url = '';
        if (value === 'aprroved') {
            url = `https://harmony-backend-z69j.onrender.com/api/admin/approveDoctorRequest/${doctorId}`;
        } else if (value === 'rejected') {
            url = `https://harmony-backend-z69j.onrender.com/api/admin/reject/doctor/request/${doctorId}`;
        }

        try {
            const response = await fetch(url, {
                method: 'PUT',
                headers: { 'x-api-key': apiKey },
            });

            const data = await response.json();


            if (!response.ok) {
                // Handle server-side errors or partial failures (like email not being sent)
                if (data.message.includes('email not sent')) {
                    console.warn('Email notification failed but doctor status was updated.');
                    showToastError(`Doctor request ${value}, but email was not sent.`);
                } else {
                    throw new Error('Network response was not ok');
                }
            } else {
                showToastSuccess(`${value === 'approved' ? 'Doctor approved successfully' : 'Doctor rejected successfully'}`);
            }
        } catch (error) {
            showToastError(`Failed to ${value === 'approved' ? 'approved' : 'rejected'} doctor`);
            console.error('Error:', error);
        }
    };



    // const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'temporaryoff') => {
    //     try {
    //         const endpoint = `https://harmony-backend-z69j.onrender.com/api/admin/doctor/status/${newStatus}/${doctorId}`;
    //         const response = await fetch(endpoint, { method: "PUT", headers: { 'x-api-key': apiKey } });

    //         if (!response.ok) throw new Error(`Failed Updating ${newStatus}`);
    //         setStatus(newStatus);
    //         showToastSuccess(`Doctor is set as ${newStatus}`);
    //     } catch (error) {
    //         console.error(`Failed to set as ${newStatus}: `, error);
    //         showToastError(`Failed to set as ${newStatus}`);
    //     }
    // };

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
        <div style={{ padding: '10px 20px', width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '15px' }}>
                {/* <Button
                    sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTrash} className="" style={{ color: '#2C297D', fontSize: "2rem" }} />
                </Button> */}
                {/* <Dropdown>
                    <Dropdown.Toggle
                        as="button"
                        className="flex items-center border-1 rounded-2 bg-white px-2 py-1"
                        style={{ color: "#2C297E", fontSize: "1.2rem" }}
                    >
                        {status} <FontAwesomeIcon icon={icon} className="w-4 h-4 mx-2" style={{ color: iconColor }} />
                    </Dropdown.Toggle>

                    <Dropdown.Menu className="p-0 shadow-lg" style={{ width: 'auto', minWidth: '120px' }}>
                        <Dropdown.Item
                            className={`flex items-center p-2 ${status === 'active' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleStatusChange('active')}
                            style={{ color: "#2C297E", fontSize: "1rem" }}
                        >
                            <FontAwesomeIcon icon={faEye} className="mr-2" style={{ color: '#2C297E' }} />
                            active
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`flex items-center p-2 ${status === 'inactive' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleStatusChange('inactive')}
                            style={{ color: "#2C297E", fontSize: "1rem" }}
                        >
                            <FontAwesomeIcon icon={faTrash} className="mr-2" style={{ color: '#2C297E' }} />
                            inactive
                        </Dropdown.Item>
                        <Dropdown.Item
                            className={`flex items-center p-2 ${status === 'temporaryoff' ? 'bg-gray-200' : ''}`}
                            onClick={() => handleStatusChange('temporaryoff')}
                            style={{ color: "#2C297E", fontSize: "1rem" }}
                        >
                            <FontAwesomeIcon icon={faPause} className="mr-2" style={{ color: '#2C297E' }} />
                            Temporarily off
                        </Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown> */}
                <div className="blog-status">
                    <select
                        id="options"
                        name="options"
                        className="status-dropdown"
                        value={selectedOption}
                        onChange={handleChange}
                    >
                        <option value="pending" disabled>{selectedOption ? selectedOption.toUpperCase() : 'PENDING: Set Status'}</option>
                        <option value="aprroved">APPROVED</option>
                        <option value="rejected">REJECTED</option>
                        {/* improvement has to be added */}
                    </select>
                </div>
            </div>
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

            <ToastContainer />
        </div>
    );
};

export default StaffDetail;
