'use client';

import React from 'react';
import {
    Card,
    CardContent,
    Typography,
    CardMedia,
    Grid,
    Button,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import StaffCard from '../StaffCard';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import EditIcon from '@mui/icons-material/Edit';
import CircleIcon from '@mui/icons-material/Circle';

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
    maxWidth: 270,
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
}));

const StaffDetail: React.FC = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const staffData = {
        name: 'Naseem Ahmad',
        role: 'Manager for Mental Psychology',
        imageUrl: '/assets/avatar.jpg',
        fullName: 'Naseem Ahmad',
        username: 'naseem01',
        email: 'naseem@hotmail.com',
        contact: '+91 8076254785',
        language: 'English, Hindi',
        states: 'Delhi, Noida, Hyderabad',
        countries: 'India, Qatar',
        password: '@Naseem#01',
        serviceCategories: ['Mental Support', 'Online Classes', 'Mental Workshop'],
        assignedCreators: ['Shubham Solanki', 'Aman Niranjan', 'Ritik Singh'],
        assignedConsultants: [
            { name: 'Christine Michelle', role: 'Consultant in Workshop', imageUrl: '/assets/avatar.jpg' },
            { name: 'Mitali Taneja', role: 'Consultant in Mental Health', imageUrl: '/assets/avatar.jpg' },
            { name: 'Sirina Roger', role: 'Consultant in Online therapy', imageUrl: '/assets/avatar.jpg' },
            { name: 'Sushma Singh', role: 'Consultant in Personal Coach', imageUrl: '/assets/avatar.jpg' },
        ],
    };

    return (
        <div style={{ padding: '10px 20px', width: "100%" }}>
            <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '15px' }}>
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
                            <CircleIcon fontSize="small" sx={{ color: 'green' }} />
                        </ListItemIcon>
                        <ListItemText primary="xxx" />
                    </MenuItem>
                    <MenuItem onClick={handleClose}>
                        <ListItemIcon>
                            <CircleIcon fontSize="small" sx={{ color: 'red' }} />
                        </ListItemIcon>
                        <ListItemText primary="yyy" />
                    </MenuItem>
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
                    <StaffCard name={staffData.name} role={staffData.role} imageUrl={staffData.imageUrl} />
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
                                {staffData.fullName}
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
                                {staffData.contact}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Language:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.language}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                States:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.states}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Countries:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.countries}
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: 'black', fontWeight: 'bold', fontSize: "16px" }}>
                                Password:
                            </Typography>
                            <Typography variant="body2" component="p" sx={{ color: '#606060', fontSize: "16px" }}>
                                {staffData.password}
                            </Typography>
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
                                {staffData.serviceCategories.map((category, index) => (
                                    <Typography key={index} variant="body2" component="p" sx={{ color: '#404040', fontSize: "1rem" }}>
                                        {index + 1}. {category}
                                    </Typography>
                                ))}
                            </div>
                            <Typography variant="body2" component="p" sx={{ color: '#101010', fontWeight: "bold", fontSize: "1.06rem", marginBottom: "8px", marginTop: "5px" }}>
                                Assigned Creators:
                            </Typography>
                            <div style={{ marginLeft: "10px" }}>
                                {staffData.assignedCreators.map((creator, index) => (
                                    <Typography key={index} variant="body2" component="p" sx={{ color: '#404040', fontSize: "1rem" }}>
                                        {index + 1}. {creator}
                                    </Typography>
                                ))}
                            </div>
                        </CardContent>
                    </DetailCard>

                </Grid>
            </Grid>

            <Typography variant="h6" component="div" sx={{ color: '#202020', fontWeight: 'bold', marginTop: '20px' }}>
                Assigned Consultants
            </Typography>
            <Grid container spacing={2}>
                {staffData.assignedConsultants.map((consultant, index) => (
                    <Grid item xs={12} sm={6} md={3} key={index}>
                        <AssignedConsultantsCard style={{padding: "10px"}}>
                            <CardMedia
                                component="img"
                                alt={consultant.name}
                                height="140"
                                image={consultant.imageUrl}
                                title={consultant.name}
                                style={{borderRadius: "10px"}}
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
            </Grid>

        </div>
    );
};

export default StaffDetail;
