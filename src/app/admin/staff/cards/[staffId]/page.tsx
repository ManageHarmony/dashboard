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
import StaffCard from '../StaffCard';

import EditIcon from '@mui/icons-material/Edit';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from 'react-bootstrap';
import { DeleteIcon } from 'lucide-react';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye, faEdit, faTrash, faPause, faCircle } from "@fortawesome/free-solid-svg-icons";
import Dropdown from 'react-bootstrap/Dropdown';


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

const AssignedConsultantsCard = styled(Card)(({ theme }) => ({
    borderRadius: '15px',
    margin: '10px',
    maxWidth: 300,
    padding: "10px",
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StaffDetail: React.FC = () => {
    const [status, setStatus] = useState<'active' | 'inactive' | 'temporaryoff' | null>(null);
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [staffData, setStaffData] = useState<any>(null);
    const [assignedCreators, setAssignedCreators] = useState<any>(null);
    const [assignedServices, setAssignedServices] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const router = useRouter();
    const searchParams = useSearchParams();
    const params = useParams();
    const staffId = params.staffId as string; // Extract staffId from route params
    const role = searchParams.get('role'); // Extract role from query params

    const showToastError = (message: string) => {
        toast.error(message, {
            position: "top-center",
            autoClose: 3000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
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
            progress: undefined,
        });
    };

    useEffect(() => {
        console.log("ID: ", staffId); // Debugging ID
        console.log("Role: ", role); // Debugging Role

        if (staffId && role) {
            const fetchData = async () => {
                try {
                    let apiUrl = '';
                    if (role === 'creator') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/creator/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.creator);
                        if (data?.creator) setStatus(data?.creator.status);
                    } else if (role === 'manager') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/manager/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.manager);
                        setAssignedCreators(data?.manager.creators);
                        setAssignedServices(data?.manager.assignedCategory)
                        if (data?.manager) setStatus(data?.manager.status);
                    } else if (role === 'doctor') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/doctor/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.doctor);
                        if (data?.doctor) setStatus(data?.doctor.status);
                    }


                } catch (error) {
                    console.error('Error fetching staff data:', error);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [staffId, role]);

    const handleDelete = async () => {
        if (!staffId || !role) {
            alert('Invalid staff ID or role');
            return;
        }

        try {
            let apiUrl = '';

            if (role === 'creator') {
                apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/creator/${staffId}`;
            } else if (role === 'manager') {
                apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/manager/${staffId}`;
            } else if (role === 'doctor') {
                apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/doctor/${staffId}`;
            } else {
                alert('Unknown role');
                return;
            }

            const response = await fetch(apiUrl, {
                method: 'DELETE',
            });

            if (response.ok) {
                showToastSuccess('Staff member deleted successfully');
                router.push('/admin/staff/cards');
            } else {
                showToastError('Failed to delete staff member');
            }
        } catch (error) {
            console.error('Error deleting staff member:', error);
            showToastError('Failed to delete staff member');
        }
    };

    const handleStatusChange = async (newStatus: 'active' | 'inactive' | 'temporaryoff') => {
        try {
            let endpoint = '';
            if (role === 'manager') {
                endpoint = `https://harmony-backend-z69j.onrender.com/api/admin/manager/status/${newStatus}/${staffId}`;
            } else if (role === 'creator') {
                endpoint = `https://harmony-backend-z69j.onrender.com/api/admin/creator/status/${newStatus}/${staffId}`;
            } 
            const response = await fetch(endpoint, { method: "PUT" });

            if (!response.ok) throw new Error(`Failed Updating ${newStatus}`);
            setStatus(newStatus);
            showToastSuccess(`manager is set as ${newStatus}`);
        } catch (error) {
            console.error(`Failed to set as ${newStatus}: `, error);
            showToastError(`Failed to set as ${newStatus}`);
        }
    };

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

    if (!staffData) {
        return <div className='d-flex justify-content-center items-center vh-100'>No data found</div>;
    }

    const getStatusTextAndIcon = () => {
        switch (status) {
            case 'active':
                return { 
                    icon: faCircle, 
                    iconColor: '#4AF120' 
                };
            case 'inactive':
                return { 
                    icon: faCircle, 
                    iconColor: '#EC1114' 
                };
            case 'temporaryoff':
                return { 
                    icon: faCircle, 
                    iconColor: '#908787' 
                };
            default:
                return {  
                    icon: faCircle,
                };
        }
    };
    
    const { icon, iconColor } = getStatusTextAndIcon();



    return (
        <div style={{ padding: '10px 20px', width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '15px' }}>
                <Button
                    sx={{ color: '#d32f2f', borderColor: '#d32f2f' }}
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTrash} className="" style={{ color: '#2C297D', fontSize: "2rem" }} />
                </Button>
                <Dropdown>
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
                            <FontAwesomeIcon icon={faEdit} className="mr-2" style={{ color: '#2C297E' }} />
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
                </Dropdown>
                <Button
                    variant="contained"
                    startIcon={<EditIcon />}
                    sx={{ color: '#2C297D', backgroundColor: '#fff' }}
                >
                    Edit
                </Button>

            </div>
            <Grid container spacing={4}>
                <Grid item>
                    <StaffCard name={staffData.name ? staffData.name : staffData.username} role={staffData.role} imageUrl="/assets/avatar.jpg" />
                </Grid>
                <Grid item>
                    <DetailCard>
                        <CardContent style={{ display: "grid", gridTemplateColumns: "auto 1fr", gap: "7px 16px", padding: "16px" }}>
                            <Typography variant="h6" component="div" sx={{ color: 'black', fontWeight: 'bold', fontSize: "18px", gridColumn: "span 2" }}>
                                Details
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Full Name:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.name}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Username:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.username}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Email:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.email}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Contact:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.contact_number}
                            </Typography>
                            {role === 'creator' ? <>
                                <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                    Language:
                                </Typography>
                                <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                    {staffData.language.join(', ')}
                                </Typography></> : <></>}

                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                States:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.state || staffData.states.join(', ')}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Country:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.country || staffData.countries.join(', ')}
                            </Typography>
                            {/* <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Password:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.password}
                            </Typography> */}
                        </CardContent>
                    </DetailCard>



                </Grid>
                <Grid item>
                    <DetailCard sx={{ maxWidth: '350px' }}>
                        <CardContent>
                            <Typography variant="h6" component="div" sx={{ color: '#101010', fontWeight: 'bold', marginBottom: "10px" }}>
                                manager for
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#101010', fontWeight: "bold", fontSize: "1.06rem", marginBottom: "8px" }}>
                                Service Categories
                            </Typography>
                            <div style={{ marginLeft: "10px" }}>
                                {Array.isArray(assignedServices) && assignedServices.length > 0 ? (
                                    assignedServices.map((service, index) => (
                                        <Typography
                                            key={index}
                                            variant="body2"
                                            component="p"
                                            sx={{ color: '#404040', fontSize: "1rem" }}>
                                            {(index + 1)}. {service}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        sx={{ color: '#404040', fontSize: "1rem" }}>
                                        No assigned services found.
                                    </Typography>
                                )}
                            </div>


                            <Typography variant="body2" component="p" sx={{ color: '#101010', fontWeight: "bold", fontSize: "1.06rem", marginBottom: "8px", marginTop: "5px" }}>
                                Assigned Creators:
                            </Typography>
                            <div style={{ marginLeft: "10px" }}>
                                {Array.isArray(assignedCreators) && assignedCreators.length > 0 ? (
                                    assignedCreators.map((creator, index) => (
                                        <Typography
                                            key={creator.id || index}
                                            variant="body2"
                                            component="p"
                                            sx={{ color: '#404040', fontSize: "1rem" }}>
                                            {index + 1}. {creator.username}
                                        </Typography>
                                    ))
                                ) : (
                                    <Typography
                                        variant="body2"
                                        component="p"
                                        sx={{ color: '#404040', fontSize: "1rem" }}>
                                        No assigned creators found.
                                    </Typography>
                                )}
                            </div>


                        </CardContent>
                    </DetailCard>

                </Grid>
            </Grid>

            <Typography variant="h6" component="div" sx={{ color: '#202020', fontWeight: 'bold', marginTop: '20px' }}>
                Assigned Consultants
            </Typography>
            {/* <Grid container spacing={2}>
                {staffData.assignedConsultants.map((consultant, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <AssignedConsultantsCard >
                            <CardMedia
                                component="img"
                                alt={consultant.name}
                                height="140"
                                image={consultant.imageUrl}
                                title={consultant.name}
                                style={{ borderRadius: "10px" }}
                            />
                            <CardContent>
                                <Typography gutterBottom variant="h6" component="div" sx={{ color: '#202020', fontWeight: 'bold', textAlign: "center" }}>
                                    {consultant.name}
                                </Typography>
                                <Typography variant="body2" color="textSecondary" component="p" sx={{ color: '#202020', textAlign: "center" }}>
                                    {consultant.role}
                                </Typography>
                            </CardContent>
                        </AssignedConsultantsCard>
                    </Grid>
                ))}
            </Grid> */}

            <ToastContainer />

        </div>
    );
};

export default StaffDetail;