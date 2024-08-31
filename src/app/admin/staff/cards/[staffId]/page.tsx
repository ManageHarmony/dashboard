'use client';

import React, { useEffect, useState } from 'react';
import {
    Card,
    CardContent,
    Typography,
    Grid,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
} from '@mui/material';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { styled } from '@mui/material/styles';
import StaffCard from '../StaffCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';
import { useParams, useRouter, useSearchParams } from 'next/navigation';
import { Spinner } from 'react-bootstrap';
import { DeleteIcon } from 'lucide-react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';

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
                    if (role === 'Creator') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/creator/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.creator);
                    } else if (role === 'Manager') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/manager/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.manager);
                        setAssignedCreators(data?.assignedCreators);
                        setAssignedServices(data?.assignedServices)
                    } else if (role === 'Doctor') {
                        apiUrl = `https://harmony-backend-z69j.onrender.com/api/get/doctor/profile/${staffId}`;
                        console.log("API URL: ", apiUrl);

                        const response = await fetch(apiUrl);
                        const data = await response.json();
                        console.log("Details: ", data);
                        setStaffData(data?.doctor);
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

            if (role === 'Creator') {
                apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/creator/${staffId}`;
            } else if (role === 'Manager') {
                apiUrl = `https://harmony-backend-z69j.onrender.com/api/admin/delete/manager/${staffId}`;
            } else if (role === 'Doctor') {
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
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };


    return (
        <div style={{ padding: '10px 20px', width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '15px' }}>
                <Button
                    sx={{ color: '#d32f2f', borderColor: '#d32f2f', marginRight: '10px' }}
                    onClick={handleDelete}
                >
                    <FontAwesomeIcon icon={faTrash} className="" style={{ color: '#2C297D', fontSize: "2rem" }} />
                </Button>
                <Button
                    variant="contained"
                    startIcon={<CircleIcon fontSize="small" sx={{ color: 'green' }} />}
                    endIcon={<ArrowDropDownIcon />}
                    sx={{ color: '#2C297D', backgroundColor: "#fff", marginRight: '10px' }}
                    onClick={handleClick}
                >
                    Active
                </Button>
                <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleClose}
                >
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <CircleIcon fontSize="small" sx={{ color: 'red' }} />
                        </ListItemIcon>
                        <ListItemText primary="Inactive" />
                    </MenuItem>
                    {/* <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <CircleIcon fontSize="small" sx={{ color: 'red' }} />
                        </ListItemIcon>
                        <ListItemText primary="yyy" />
                    </MenuItem> */}
                </Menu>
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
                            {role === 'Creator' ? <>
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
                                {staffData.state}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Country:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.country}
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
                                Manager for
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